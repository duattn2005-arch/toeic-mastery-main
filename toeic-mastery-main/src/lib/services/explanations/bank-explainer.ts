import "server-only";
import { db } from "@/lib/db";
import type { TestPart } from "@/generated/prisma/enums";
import { completeMentorTask } from "@/lib/services/mentor/llm-client";
import { extractJson } from "@/lib/services/seo/llm";
import { ETS_2026_LISTENING_KEYS, type KeyQuestion } from "@/lib/content/ets-2026-listening-keys";
import { ETS_2026_READING_KEYS } from "@/lib/content/ets-2026-reading-keys";
import { ETS_2024_LISTENING_KEYS } from "@/lib/content/ets-2024-listening-keys";
import { questionText, similarity, words } from "@/lib/listening-key-match";
import { loadMedia, type MediaFile } from "./media";

/**
 * Detailed explanations (and, for Listening, transcripts) for the practice
 * question banks ("Ngân hàng câu hỏi luyện tập — Part N").
 *
 * Grounded in the question as stored: the DB answer key is authoritative
 * and is never changed. Step 1 copies the ETS book's explanation when the
 * question is a known ETS one with the same answer. Step 2 asks the model,
 * sending the passage text, the picture(s) and — when there is no
 * transcript yet — the audio itself, so it explains what is actually in
 * the photo/recording. If the model is convinced the stored answer is
 * wrong, nothing is written and a "wrong_answer" report is filed instead.
 */

export const BANK_PARTS: TestPart[] = ["PART1", "PART2", "PART3", "PART4", "PART5", "PART6", "PART7"];
const LISTENING = new Set<TestPart>(["PART1", "PART2", "PART3", "PART4"]);
/** Shorter than this, an explanation is treated as missing ("Đáp án B" etc.). */
const MIN_EXPLANATION = 150;

const PART_INFO: Record<TestPart, string> = {
  PART1: "Part 1 — Mô tả tranh: nghe 4 câu (A)–(D) mô tả bức ảnh, chọn câu đúng nhất.",
  PART2: "Part 2 — Hỏi đáp: nghe 1 câu hỏi/câu nói và 3 câu trả lời (A)–(C), chọn câu đáp phù hợp.",
  PART3: "Part 3 — Đoạn hội thoại: nghe hội thoại, trả lời 3 câu hỏi in sẵn.",
  PART4: "Part 4 — Bài nói ngắn: nghe một người nói, trả lời 3 câu hỏi in sẵn.",
  PART5: "Part 5 — Câu chưa hoàn chỉnh: chọn từ/cụm từ điền vào chỗ trống.",
  PART6: "Part 6 — Hoàn thành đoạn văn: chọn từ/cụm từ/câu điền vào chỗ trống trong đoạn văn.",
  PART7: "Part 7 — Đọc hiểu: đọc một hoặc nhiều văn bản, trả lời câu hỏi.",
};

const BANK_WHERE = { test: { slug: { startsWith: "practice-pool-" } } } as const;

const QUESTION_SELECT = {
  id: true,
  part: true,
  orderIndex: true,
  prompt: true,
  imageUrl: true,
  audioUrl: true,
  transcript: true,
  correctLabel: true,
  explanationVi: true,
  evidenceText: true,
  passageId: true,
  options: { orderBy: { label: "asc" }, select: { id: true, label: true, content: true, distractorExplanation: true } },
  passage: { select: { id: true, texts: true, imageUrl: true, imageUrls: true, audioUrl: true, transcript: true } },
} as const;

type BankQuestion = Awaited<ReturnType<typeof loadQuestions>>[number];

function loadQuestions(parts: TestPart[]) {
  return db.question.findMany({
    where: { ...BANK_WHERE, part: { in: parts } },
    orderBy: [{ part: "asc" }, { orderIndex: "asc" }, { createdAt: "asc" }],
    select: QUESTION_SELECT,
  });
}

const hasText = (s: string | null | undefined) => Boolean(s && s.trim());
const weakExplanation = (q: { explanationVi: string }) => q.explanationVi.trim().length < MIN_EXPLANATION;
/** The transcript learners would see for this question (its own, or its group's). */
const transcriptOf = (q: BankQuestion) => (hasText(q.transcript) ? q.transcript! : hasText(q.passage?.transcript) ? q.passage!.transcript! : "");
const missingTranscript = (q: BankQuestion) => LISTENING.has(q.part) && !transcriptOf(q) && Boolean(q.audioUrl || q.passage?.audioUrl);

// ---------------------------------------------------------------------------
// Status (for the admin page)
// ---------------------------------------------------------------------------

export interface BankPartStatus {
  part: TestPart;
  total: number;
  weak: number;
  noTranscript: number;
}

export async function bankStatus(): Promise<BankPartStatus[]> {
  const questions = await loadQuestions(BANK_PARTS);
  return BANK_PARTS.map((part) => {
    const qs = questions.filter((q) => q.part === part);
    return { part, total: qs.length, weak: qs.filter(weakExplanation).length, noTranscript: qs.filter(missingTranscript).length };
  });
}

// ---------------------------------------------------------------------------
// Job state (one job at a time, kept in the long-lived server process)
// ---------------------------------------------------------------------------

export interface BankJob {
  running: boolean;
  startedAt: Date;
  finishedAt: Date | null;
  total: number;
  done: number;
  fromEts: number;
  fromAi: number;
  transcripts: number;
  flagged: { id: string; part: TestPart; note: string }[];
  failed: { id: string; part: TestPart; note: string }[];
  written: { id: string; part: TestPart }[];
  log: string[];
  stopRequested: boolean;
}

let job: BankJob | null = null;

export function currentBankJob() {
  return job;
}

export function stopBankJob() {
  if (job?.running) job.stopRequested = true;
}

function say(message: string) {
  if (!job) return;
  const time = new Date().toLocaleTimeString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
  job.log.push(`${time} ${message}`);
  if (job.log.length > 300) job.log.splice(0, job.log.length - 300);
}

// ---------------------------------------------------------------------------
// Step 1: ETS book explanations
// ---------------------------------------------------------------------------

let keyIndex: { part: number; words: Set<string>; key: KeyQuestion }[] | null = null;

function etsKeys() {
  if (!keyIndex) {
    const sets = [ETS_2026_READING_KEYS, ETS_2026_LISTENING_KEYS, ETS_2024_LISTENING_KEYS] as Record<number, KeyQuestion[]>[];
    keyIndex = sets.flatMap((set) => Object.values(set).flat()).map((key) => ({ part: key.part, words: words(key.textEn), key }));
  }
  return keyIndex;
}

/** The ETS key for this exact question (same text, same answer), if any. */
function etsMatch(q: BankQuestion) {
  const part = Number(q.part.slice(4));
  const own = words(questionText({ prompt: q.prompt, options: q.options }));
  if (own.size < 6) return null; // audio-only questions: nothing reliable to compare
  let best: { score: number; key: KeyQuestion } | null = null;
  for (const k of etsKeys()) {
    if (k.part !== part) continue;
    const score = similarity(own, k.words);
    if (!best || score > best.score) best = { score, key: k.key };
  }
  return best && best.score >= 0.8 && best.key.answer === q.correctLabel && best.key.explanationVi.trim().length >= 40 ? best.key : null;
}

// ---------------------------------------------------------------------------
// Step 2: the model
// ---------------------------------------------------------------------------

const SYSTEM = `Bạn là giáo viên TOEIC người Việt nhiều năm kinh nghiệm, viết lời giải chi tiết cho ngân hàng câu hỏi luyện tập của TOEIC Mastery.

Nguyên tắc bắt buộc:
- "Đáp án đúng theo dữ liệu" là đáp án chính thức. Giải thích VÌ SAO đáp án đó đúng, dựa trên đúng nội dung được cung cấp (đoạn văn, ảnh, audio, transcript). Không bịa thêm chi tiết không có.
- Có ảnh: nhìn kỹ ảnh, mô tả ngắn những gì thấy liên quan tới câu hỏi (người, hành động, đồ vật, vị trí; với biểu mẫu/bảng/email trong ảnh: đọc chữ trong ảnh) rồi mới giải thích.
- Có audio và được yêu cầu transcript: nghe và chép lại CHÍNH XÁC lời tiếng Anh (không tóm tắt). Part 1: "(A) ...\\n(B) ...\\n(C) ...\\n(D) ...". Part 2: dòng đầu là câu hỏi, sau đó "(A) ...\\n(B) ...\\n(C) ...". Part 3: mỗi lượt nói một dòng, bắt đầu bằng "M:" (nam) hoặc "W:" (nữ) (nhiều người cùng giới: "M1:", "M2:"). Part 4: chép liền bài nói, xuống dòng theo câu.
- Chỉ khi CHẮC CHẮN đáp án theo dữ liệu sai (ví dụ nội dung nói rõ điều ngược lại) thì đặt "agree": false, ghi "suggest" là chữ cái bạn cho là đúng và "reason" giải thích ngắn. Còn lại luôn "agree": true.

Nội dung "explanation" (tiếng Việt, xuống dòng giữa các ý, không dùng markdown tiêu đề):
- Dòng "Dạng câu hỏi: ..." (vd: từ loại, thì động từ, giới từ, từ vựng, câu hỏi chi tiết, suy luận, ý định của người nói, câu hỏi Wh-, Yes/No...).
- Phân tích: dấu hiệu nhận biết / từ khoá / vị trí thông tin trong bài; với ngữ pháp nêu rõ quy tắc.
- "=> Chọn (X)" kèm lý do ngắn.
- "Dịch:" dịch câu hỏi (và câu/đoạn chứa thông tin) sang tiếng Việt.
- "Từ vựng:" 2–5 từ/cụm đáng nhớ dạng "word (loại từ): nghĩa".
- Part 1: tả ngắn bức ảnh trước, rồi dịch cả 4 câu (A)–(D). Part 2: dịch câu hỏi và cả 3 câu trả lời.

"distractors": với MỖI đáp án sai, 1–2 câu vì sao sai (bẫy gì: sai từ loại, sai thì, nghe giống âm, sai chi tiết, không có trong ảnh...).
"evidence": Part 3/4/6/7: trích NGUYÊN VĂN câu tiếng Anh trong đoạn văn/transcript chứa thông tin trả lời (copy đúng từng chữ); các Part khác để "".

Chỉ trả về đúng một object JSON, không thêm chữ nào khác.`;

interface ModelAnswer {
  transcript?: string;
  questions?: {
    ref?: string;
    agree?: boolean;
    suggest?: string;
    reason?: string;
    transcript?: string;
    explanation?: string;
    distractors?: Record<string, string>;
    evidence?: string;
  }[];
}

interface Unit {
  questions: BankQuestion[];
  /** Passage-level transcript should be written (Part 3/4 group without one). */
  groupTranscript: boolean;
}

function passageTexts(q: BankQuestion) {
  const texts = (q.passage?.texts ?? []) as unknown as { label?: string; content?: string }[];
  return Array.isArray(texts) ? texts.filter((t) => t && hasText(t.content)) : [];
}

const normalizeSpace = (s: string) => s.replace(/\s+/g, " ").trim().toLowerCase();

async function runUnit(unit: Unit, overwrite: boolean, adminId: string) {
  const first = unit.questions[0];
  const listening = LISTENING.has(first.part);
  const media: MediaFile[] = [];
  const notes: string[] = [];

  // Pictures: Part 1 photo, Part 6/7 scanned documents, any question image.
  const imageUrls = new Set<string>([...(first.passage?.imageUrls ?? []), ...(first.passage?.imageUrl ? [first.passage.imageUrl] : [])]);
  for (const q of unit.questions) if (q.imageUrl) imageUrls.add(q.imageUrl);
  for (const url of [...imageUrls].slice(0, 4)) {
    try {
      media.push(await loadMedia(url));
    } catch (err) {
      notes.push((err as Error).message);
    }
  }

  // Audio only when there is no transcript to work from.
  const needAudio = listening && unit.questions.some((q) => !transcriptOf(q));
  if (needAudio) {
    const url = first.passage?.audioUrl ?? first.audioUrl;
    if (!url) throw new Error("Câu nghe không có file audio và chưa có transcript");
    media.push(await loadMedia(url));
  }
  if (notes.length) say(`⚠ ${notes.join("; ")}`);

  const refs = unit.questions.map((q, i) => ({ ref: `Q${i + 1}`, q }));
  const texts = passageTexts(first);
  const groupTranscript = hasText(first.passage?.transcript) ? first.passage!.transcript! : "";
  const prompt = [
    PART_INFO[first.part],
    texts.length ? `ĐOẠN VĂN:\n${texts.map((t) => (t.label ? `[${t.label}]\n${t.content}` : t.content)).join("\n\n")}` : "",
    groupTranscript ? `TRANSCRIPT:\n${groupTranscript}` : "",
    imageUrls.size ? `(Kèm ${imageUrls.size} ảnh — đọc kỹ nội dung ảnh.)` : "",
    needAudio
      ? unit.groupTranscript
        ? `(Kèm file audio — chép transcript của cả đoạn vào "transcript" ở ngoài cùng.)`
        : `(Kèm file audio — chép transcript của câu vào "transcript" trong từng câu.)`
      : "",
    "CÂU HỎI:",
    ...refs.map(({ ref, q }) =>
      [
        `${ref}${q.prompt.trim() ? `: ${q.prompt.trim()}` : ""}`,
        ...q.options.map((o) => `(${o.label}) ${o.content.trim() === "." ? "(chỉ có trong audio)" : o.content.trim()}`),
        !unit.groupTranscript && hasText(q.transcript) ? `Transcript câu này:\n${q.transcript}` : "",
        `Đáp án đúng theo dữ liệu: ${q.correctLabel}`,
      ]
        .filter(Boolean)
        .join("\n")
    ),
    `Trả về JSON: {"transcript":"${unit.groupTranscript && needAudio ? "transcript cả đoạn" : ""}","questions":[{"ref":"Q1","agree":true,"suggest":"","reason":"","transcript":"${!unit.groupTranscript && needAudio ? "transcript câu này" : ""}","explanation":"...","distractors":{"A":"..."},"evidence":""}]}`,
  ]
    .filter(Boolean)
    .join("\n\n");

  const raw = await completeMentorTask({
    system: SYSTEM,
    messages: [{ role: "user", content: prompt, ...(media.length ? { media } : {}) }],
    maxTokens: 3000 + unit.questions.length * 1800,
    timeoutMs: 180_000,
  });
  const answer = extractJson<ModelAnswer>(raw);
  const byRef = new Map((answer.questions ?? []).map((a) => [String(a.ref ?? "").toUpperCase(), a]));

  // Group transcript (Part 3/4) — only ever filled in, never replaced.
  let sourceText = [texts.map((t) => t.content).join("\n"), groupTranscript].join("\n");
  if (unit.groupTranscript && needAudio && first.passage && hasText(answer.transcript)) {
    const transcript = answer.transcript!.trim();
    await db.passage.update({ where: { id: first.passage.id }, data: { transcript } });
    sourceText += `\n${transcript}`;
    job!.transcripts++;
  }

  for (const { ref, q } of refs) {
    const a = byRef.get(ref);
    if (!a || !hasText(a.explanation)) {
      job!.failed.push({ id: q.id, part: q.part, note: "AI không trả lời cho câu này" });
      continue;
    }
    if (a.agree === false) {
      const suggest = String(a.suggest ?? "").trim().toUpperCase().slice(0, 1);
      const note = `AI cho rằng đáp án đúng là ${suggest || "?"} (dữ liệu: ${q.correctLabel}). ${String(a.reason ?? "").slice(0, 400)}`;
      job!.flagged.push({ id: q.id, part: q.part, note });
      const open = await db.questionReport.findFirst({ where: { questionId: q.id, userId: adminId, status: "OPEN", reason: "wrong_answer" }, select: { id: true } });
      if (!open) await db.questionReport.create({ data: { questionId: q.id, userId: adminId, reason: "wrong_answer", message: `[Kiểm tra tự động khi viết giải thích] ${note}` } });
      continue;
    }

    const data: { explanationVi?: string; evidenceText?: string; transcript?: string } = {};
    let ownTranscript = "";
    if (!unit.groupTranscript && needAudio && !hasText(q.transcript) && hasText(a.transcript)) {
      ownTranscript = a.transcript!.trim();
      data.transcript = ownTranscript;
      job!.transcripts++;
    }
    if (overwrite || weakExplanation(q)) {
      const body = a.explanation!.trim().replace(/^đáp án( đúng)?\s*:?\s*\(?[A-D]\)?\.?\s*\n*/i, "");
      data.explanationVi = `Đáp án đúng: ${q.correctLabel}\n\n${body}`;
    }
    const evidence = String(a.evidence ?? "").trim();
    if (evidence && (overwrite || !hasText(q.evidenceText)) && normalizeSpace(`${sourceText}\n${ownTranscript}`).includes(normalizeSpace(evidence))) {
      data.evidenceText = evidence;
    }
    if (Object.keys(data).length) await db.question.update({ where: { id: q.id }, data });

    for (const o of q.options) {
      if (o.label === q.correctLabel) continue;
      const why = String(a.distractors?.[o.label] ?? "").trim();
      if (why && (overwrite || !hasText(o.distractorExplanation))) {
        await db.questionOption.update({ where: { id: o.id }, data: { distractorExplanation: why.slice(0, 1000) } });
      }
    }
    job!.fromAi++;
    job!.written.push({ id: q.id, part: q.part });
  }
}

/** Splits the work into model calls: one per passage group, Part 5 in
 * batches of 6, every other standalone question on its own (its own
 * photo/audio). */
function buildUnits(questions: BankQuestion[]): Unit[] {
  const units: Unit[] = [];
  const groups = new Map<string, BankQuestion[]>();
  const part5: BankQuestion[] = [];
  for (const q of questions) {
    if (q.passageId) (groups.get(q.passageId) ?? groups.set(q.passageId, []).get(q.passageId)!).push(q);
    else if (q.part === "PART5") part5.push(q);
    else units.push({ questions: [q], groupTranscript: false });
  }
  for (const qs of groups.values()) {
    const listening = LISTENING.has(qs[0].part);
    // A group shares one recording; its transcript belongs on the passage.
    units.push({ questions: qs, groupTranscript: listening && !qs.some((q) => hasText(q.transcript)) });
  }
  for (let i = 0; i < part5.length; i += 6) units.push({ questions: part5.slice(i, i + 6), groupTranscript: false });
  return units.sort((a, b) => BANK_PARTS.indexOf(a.questions[0].part) - BANK_PARTS.indexOf(b.questions[0].part));
}

const pause = (ms: number) => new Promise((r) => setTimeout(r, ms));

export interface BankJobOptions {
  parts: TestPart[];
  /** Rewrite explanations that already look complete too. */
  overwrite: boolean;
  /** Stop after this many questions (0 = all). */
  limit: number;
  adminId: string;
}

/** Runs the whole job. Returns false when one is already running. */
export async function runBankExplainer(options: BankJobOptions): Promise<boolean> {
  if (job?.running) return false;
  job = { running: true, startedAt: new Date(), finishedAt: null, total: 0, done: 0, fromEts: 0, fromAi: 0, transcripts: 0, flagged: [], failed: [], written: [], log: [], stopRequested: false };
  try {
    const all = await loadQuestions(options.parts);
    let todo = all.filter((q) => options.overwrite || weakExplanation(q) || missingTranscript(q));
    if (options.limit > 0) todo = todo.slice(0, options.limit);
    job.total = todo.length;
    say(`Bắt đầu: ${todo.length} câu cần xử lý (${options.parts.map((p) => p.replace("PART", "Part ")).join(", ")}).`);

    // Step 1 — ETS book explanations where the question is a known ETS one.
    const rest: BankQuestion[] = [];
    for (const q of todo) {
      const key = !missingTranscript(q) && weakExplanation(q) ? etsMatch(q) : null;
      if (!key) {
        rest.push(q);
        continue;
      }
      await db.question.update({ where: { id: q.id }, data: { explanationVi: key.explanationVi } });
      job.fromEts++;
      job.done++;
      job.written.push({ id: q.id, part: q.part });
    }
    if (job.fromEts) say(`Lấy ${job.fromEts} giải thích từ sách ETS (câu trùng nội dung và đáp án).`);

    // Step 2 — the model, unit by unit.
    const units = buildUnits(rest);
    for (const [i, unit] of units.entries()) {
      if (job.stopRequested) {
        say("Đã dừng theo yêu cầu.");
        break;
      }
      const label = `${unit.questions[0].part.replace("PART", "Part ")} (${unit.questions.length} câu)`;
      try {
        await runUnit(unit, options.overwrite, options.adminId);
        say(`✓ ${i + 1}/${units.length} ${label}`);
      } catch (err) {
        const message = (err as Error).message.slice(0, 300);
        for (const q of unit.questions) job.failed.push({ id: q.id, part: q.part, note: message });
        say(`✗ ${i + 1}/${units.length} ${label}: ${message}`);
        // Quota exhausted on every key: no point hammering on.
        if (/hết hạn mức|quota/i.test(message)) {
          say("Hết hạn mức AI — dừng lại, chạy tiếp sau (chỉ những câu còn thiếu sẽ được làm).");
          break;
        }
      }
      job.done += unit.questions.length;
      await pause(1500);
    }
    say(`Xong: ${job.fromEts} từ sách ETS, ${job.fromAi} do AI viết, ${job.transcripts} transcript mới, ${job.flagged.length} câu nghi sai đáp án, ${job.failed.length} câu lỗi.`);
  } catch (err) {
    say(`Lỗi: ${(err as Error).message}`);
  } finally {
    job.running = false;
    job.finishedAt = new Date();
  }
  return true;
}

// ---------------------------------------------------------------------------
// Export / import (explanations written outside the app)
// ---------------------------------------------------------------------------

function absolute(url: string | null | undefined) {
  if (!url) return null;
  try {
    return new URL(url, process.env.NEXT_PUBLIC_SITE_URL).toString();
  } catch {
    return url;
  }
}

/** The banks as plain JSON; by default only questions that still need an
 * explanation or a transcript. */
export async function exportBank(all: boolean) {
  const questions = await loadQuestions(BANK_PARTS);
  const picked = all ? questions : questions.filter((q) => weakExplanation(q) || missingTranscript(q));
  return {
    exportedAt: new Date().toISOString(),
    howToReturn:
      'Trả về mảng [{"id","answer","explanationVi","distractors":{"A":"..."},"evidence","transcript","passageTranscript"}] — "answer" phải trùng đáp án đang lưu, nếu không câu đó bị bỏ qua.',
    questions: picked.map((q) => ({
      id: q.id,
      part: q.part,
      order: q.orderIndex,
      passageId: q.passageId,
      prompt: q.prompt,
      options: q.options.map((o) => ({ label: o.label, content: o.content, distractorExplanation: o.distractorExplanation })),
      answer: q.correctLabel,
      imageUrl: absolute(q.imageUrl),
      audioUrl: absolute(q.audioUrl),
      transcript: q.transcript,
      explanationVi: q.explanationVi,
      evidenceText: q.evidenceText,
      needs: { explanation: weakExplanation(q), transcript: missingTranscript(q) },
      passage: q.passage
        ? {
            texts: q.passage.texts,
            imageUrls: [...new Set([...(q.passage.imageUrls ?? []), ...(q.passage.imageUrl ? [q.passage.imageUrl] : [])])].map(absolute),
            audioUrl: absolute(q.passage.audioUrl),
            transcript: q.passage.transcript,
          }
        : null,
    })),
  };
}

export interface ImportedExplanation {
  id?: unknown;
  answer?: unknown;
  explanationVi?: unknown;
  distractors?: unknown;
  evidence?: unknown;
  transcript?: unknown;
  passageTranscript?: unknown;
}

/** Writes explanations prepared outside the app. Same rules as the AI job:
 * only bank questions, the answer must match the stored key (which is never
 * changed), transcripts are only filled in where empty, evidence must be a
 * quote from the passage/transcript. */
export async function importBankExplanations(items: ImportedExplanation[], overwrite: boolean) {
  const questions = new Map((await loadQuestions(BANK_PARTS)).map((q) => [q.id, q]));
  const result = { written: 0, transcripts: 0, skipped: [] as string[] };
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const passagesDone = new Set<string>();

  for (const item of items) {
    const id = str(item.id);
    const q = questions.get(id);
    if (!q) {
      result.skipped.push(`${id.slice(0, 8) || "?"}: không phải câu trong ngân hàng`);
      continue;
    }
    if (str(item.answer).toUpperCase() !== q.correctLabel) {
      result.skipped.push(`${id.slice(0, 8)}: đáp án trong file (${str(item.answer) || "trống"}) khác đáp án đang lưu (${q.correctLabel})`);
      continue;
    }

    const passageTranscript = str(item.passageTranscript);
    if (passageTranscript && q.passage && !hasText(q.passage.transcript) && !passagesDone.has(q.passage.id)) {
      await db.passage.update({ where: { id: q.passage.id }, data: { transcript: passageTranscript } });
      passagesDone.add(q.passage.id);
      result.transcripts++;
    }

    const data: { explanationVi?: string; evidenceText?: string; transcript?: string } = {};
    const transcript = str(item.transcript);
    if (transcript && !hasText(q.transcript)) {
      data.transcript = transcript;
      result.transcripts++;
    }
    const explanation = str(item.explanationVi);
    if (explanation && (overwrite || weakExplanation(q))) {
      const body = explanation.replace(/^đáp án( đúng)?\s*:?\s*\(?[A-D]\)?\.?\s*\n*/i, "");
      data.explanationVi = `Đáp án đúng: ${q.correctLabel}\n\n${body}`;
    }
    const evidence = str(item.evidence);
    const source = [passageTexts(q).map((t) => t.content).join("\n"), q.passage?.transcript ?? "", passageTranscript, q.transcript ?? "", transcript].join("\n");
    if (evidence && (overwrite || !hasText(q.evidenceText)) && normalizeSpace(source).includes(normalizeSpace(evidence))) data.evidenceText = evidence;
    if (Object.keys(data).length) await db.question.update({ where: { id: q.id }, data });

    const distractors = (item.distractors && typeof item.distractors === "object" ? item.distractors : {}) as Record<string, unknown>;
    for (const o of q.options) {
      const why = str(distractors[o.label]);
      if (o.label !== q.correctLabel && why && (overwrite || !hasText(o.distractorExplanation))) {
        await db.questionOption.update({ where: { id: o.id }, data: { distractorExplanation: why.slice(0, 1000) } });
      }
    }
    if (data.explanationVi) result.written++;
  }
  return result;
}
