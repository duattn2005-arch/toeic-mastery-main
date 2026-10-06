import "server-only";
import { randomUUID } from "node:crypto";
import { db } from "@/lib/db";
import { ETS_2026_LISTENING_KEYS, type KeyQuestion } from "@/lib/content/ets-2026-listening-keys";
import { ETS_2026_READING_KEYS } from "@/lib/content/ets-2026-reading-keys";
import { ETS_2024_LISTENING_KEYS } from "@/lib/content/ets-2024-listening-keys";
import { matchSection, questionText } from "@/lib/listening-key-match";
import type { TestPart } from "@/generated/prisma/enums";

export type KeySection = "listening" | "reading" | "listening-2024";
export const KEY_SECTIONS: KeySection[] = ["listening", "reading", "listening-2024"];

const SECTIONS = {
  listening: { parts: ["PART1", "PART2", "PART3", "PART4"], firstNumber: 1, keys: ETS_2026_LISTENING_KEYS as Record<number, KeyQuestion[]> },
  // ETS 2024 web tests may only have audio for Part 1–2 (no text), so those
  // fall back to exam order; Part 3/4 questions match by their printed text.
  "listening-2024": { parts: ["PART1", "PART2", "PART3", "PART4"], firstNumber: 1, keys: ETS_2024_LISTENING_KEYS as Record<number, KeyQuestion[]> },
  // Reading prompts are distinct sentences, so a content match below this
  // is more likely a wrong guess (e.g. a key whose printed question is in
  // Vietnamese) than a real one — those fall back to exam order instead.
  reading: { parts: ["PART5", "PART6", "PART7"], firstNumber: 101, keys: ETS_2026_READING_KEYS, minScore: 0.3 },
} as const;

/** The Part numbers a section covers (1–4 Listening, 5–7 Reading). */
export function sectionPartNumbers(section: KeySection) {
  return SECTIONS[section].parts.map((p) => Number(p.slice(4)));
}

/** Key file numbers available for a section (Test 1–5 for every set). */
export function keyTestNumbers(section: KeySection) {
  return Object.keys(SECTIONS[section].keys).map(Number);
}
/** Below this content similarity a content match is flagged for review. */
const LOW_MATCH = 0.5;

export interface ImportRow {
  number: number;
  questionId: string;
  passageId: string | null;
  /** The file's Part for this question. */
  part: number;
  /** The Part the question is stored under on the web — differs from
   * `part` when it was saved under the wrong Part. */
  dbPart: number;
  /** Position of the question in the section in exam order — the number
   * learners see (1–100 Listening, 101–200 Reading). */
  webNumber: number;
  dbAnswer: string;
  /** Start of the DB question's own text, for eyeballing the match. */
  dbText: string;
  /** "content" = matched by question/option text, "order" = by position. */
  method: "content" | "order";
  /** 0–1 word overlap with the file's text; null for order matches. */
  score: number | null;
  key: KeyQuestion;
}

export interface ImportPlan {
  testId: string;
  testTitle: string;
  rows: ImportRow[];
  /** Blocking problems — the import is refused while any exist. */
  errors: string[];
  /** Non-blocking things worth checking in the preview. */
  warnings: string[];
  /** Web questions in this section that match nothing in the file (left
   * untouched by the import). */
  extras: { webNumber: number; part: number; text: string }[];
  /** File questions with no web question at all — "Sửa toàn bộ theo file"
   * creates them; the explanation-only import skips them. */
  missing: KeyQuestion[];
}

const partNumber = (part: string) => Number(part.slice(4));

/** Lines a DB test's Listening or Reading questions up with one ETS 2026
 * key file — see matchSection: by content wherever the web questions carry
 * distinct text (even across a wrongly chosen Part), otherwise by exam
 * order (the orderIndex sort the exam uses, ties by creation order). */
export async function buildListeningKeyImportPlan(testId: string, keyTest: number, section: KeySection = "listening"): Promise<ImportPlan | null> {
  const config = SECTIONS[section];
  const keys = config.keys[keyTest];
  const test = await db.test.findUnique({ where: { id: testId }, select: { title: true } });
  if (!keys || !test) return null;

  const questions = await db.question.findMany({
    where: { testId, part: { in: [...config.parts] } },
    orderBy: [{ orderIndex: "asc" }, { createdAt: "asc" }, { id: "asc" }],
    select: {
      id: true,
      part: true,
      orderIndex: true,
      passageId: true,
      correctLabel: true,
      prompt: true,
      options: { orderBy: { label: "asc" }, select: { label: true, content: true } },
    },
  });

  const warnings: string[] = [];
  const webNumberOf = new Map(questions.map((q, i) => [q.id, config.firstNumber + i]));

  const indexes = questions.map((q) => q.orderIndex);
  if (new Set(indexes).size !== indexes.length) {
    warnings.push("Đề này có nhiều câu trùng thứ tự (orderIndex) — câu được ghép theo nội dung; câu chỉ có audio cần kiểm tra kỹ.");
  }

  const dbRows = questions.map((q) => ({ ...q, part: partNumber(q.part) }));
  const match = matchSection(dbRows, keys, "minScore" in config ? config.minScore : 0);
  const dbTexts = dbRows.map((q) => questionText(q).replace(/\s+/g, " ").trim().slice(0, 90));
  const extras: ImportPlan["extras"] = match.extras.map((d) => ({ webNumber: webNumberOf.get(dbRows[d].id)!, part: dbRows[d].part, text: dbTexts[d] }));

  const rows: ImportRow[] = [];
  keys.forEach((key, k) => {
    const hit = match.assigned.get(k);
    if (!hit) return;
    const q = dbRows[hit.dbIndex];
    rows.push({
      number: key.number,
      questionId: q.id,
      passageId: q.passageId,
      part: key.part,
      dbPart: q.part,
      webNumber: webNumberOf.get(q.id)!,
      dbAnswer: q.correctLabel,
      dbText: dbTexts[hit.dbIndex],
      method: hit.method,
      score: hit.score,
      key,
    });
  });

  const weak = rows.filter((r) => r.method === "content" && (r.score ?? 0) < LOW_MATCH);
  if (weak.length > 0) warnings.push(`${weak.length} câu khớp nội dung thấp (tô đỏ) — kiểm tra xem đã chọn đúng đề chưa.`);
  const moved = rows.filter((r) => r.webNumber !== r.number).length;
  if (moved > 0) warnings.push(`${moved} câu có số thứ tự trên web khác số câu trong file — “Sửa toàn bộ theo file” sẽ xếp lại đúng thứ tự.`);
  const wrongPart = rows.filter((r) => r.dbPart !== r.part);
  if (wrongPart.length > 0) {
    warnings.push(
      `${wrongPart.length} câu đang nằm sai Part trên web (${wrongPart.map((r) => `câu ${r.number}: Part ${r.dbPart} → ${r.part}`).join(", ")}) — “Sửa toàn bộ theo file” sẽ chuyển về đúng Part.`
    );
  }

  const groupsByPassage = new Map<string, Set<string>>();
  for (const r of rows) if (r.passageId && r.key.group) (groupsByPassage.get(r.passageId) ?? groupsByPassage.set(r.passageId, new Set()).get(r.passageId)!).add(r.key.group);
  const mixed = [...groupsByPassage.values()].filter((g) => g.size > 1).map((g) => [...g].join(" + "));
  if (mixed.length > 0) warnings.push(`Một nhóm câu trên web đang nhận câu của nhiều nhóm trong file (${mixed.join("; ")}) — đoạn văn/transcript nhóm đó có thể không khớp.`);

  if (extras.length > 0) {
    warnings.push(`${extras.length} câu trên web không có trong file (câu ${extras.map((e) => e.webNumber).join(", ")}) — có thể bị nhập nhầm phần; import sẽ bỏ qua các câu này.`);
  }

  const missing = match.missing.map((k) => keys[k]).sort((a, b) => a.number - b.number);
  if (missing.length > 0) {
    warnings.push(
      `${missing.length} câu trong file chưa có trên web (câu ${missing.map((k) => k.number).join(", ")}) — “Sửa toàn bộ theo file” sẽ tạo mới các câu này từ file (câu hỏi, đáp án, transcript, giải thích; dùng chung audio với nhóm câu nếu nhóm đã có trên web). “Chỉ chèn giải thích” sẽ bỏ qua.`
    );
  }

  rows.sort((a, b) => a.number - b.number);
  return { testId, testTitle: test.title, rows, errors: match.errors, warnings, extras, missing };
}

export interface ApplyOptions {
  /** Set correctLabel/isCorrect from the file where they differ. */
  updateAnswers: boolean;
  /** Also move questions saved under the wrong Part and renumber the whole
   * test so this section follows the file's question order. */
  fixStructure?: boolean;
  /** Only touch these (file) Parts — questions the file puts in any other
   * Part, and the order of other Parts' questions, are left as they are.
   * Omitted = every Part of the section. */
  parts?: number[];
}

/** Writes a plan's transcripts and Vietnamese explanations into the DB in
 * one transaction. Part 3/4 transcripts go on the shared Passage when the
 * question belongs to one (one write per group), otherwise on the question
 * itself. Answers only change when `updateAnswers` is set; Parts and exam
 * order only with `fixStructure`. */
export async function applyListeningKeyImport(plan: ImportPlan, { updateAnswers, fixStructure = false, parts }: ApplyOptions) {
  const inScope = (part: number) => !parts || parts.includes(part);
  const rows = plan.rows.filter((r) => inScope(r.part));
  const writes = [];
  const passagesDone = new Set<string>();
  let updatedAnswers = 0;
  let movedParts = 0;
  let reordered = 0;

  const sectionIdByPart = new Map<string, string>();
  if (fixStructure) {
    const sections = await db.testSection.findMany({ where: { testId: plan.testId }, select: { id: true, part: true } });
    for (const s of sections) sectionIdByPart.set(s.part, s.id);
  }

  for (const row of rows) {
    const { key } = row;
    // Reading keys have no transcript — never touch transcripts then.
    const hasTranscript = key.transcript !== undefined;
    const sharedTranscript = hasTranscript && row.part >= 3 && row.passageId;
    const fixAnswer = updateAnswers && row.dbAnswer !== key.answer;
    const movePart = fixStructure && row.dbPart !== row.part;
    const targetPart = `PART${row.part}` as TestPart;
    writes.push(
      db.question.update({
        where: { id: row.questionId },
        data: {
          explanationVi: key.explanationVi,
          ...(hasTranscript && !sharedTranscript ? { transcript: key.transcript || null } : {}),
          ...(fixAnswer ? { correctLabel: key.answer } : {}),
          ...(movePart ? { part: targetPart, testSectionId: sectionIdByPart.get(targetPart) ?? null } : {}),
        },
      })
    );
    if (movePart) {
      movedParts++;
      if (row.passageId) writes.push(db.passage.update({ where: { id: row.passageId }, data: { part: targetPart } }));
    }
    if (sharedTranscript && row.passageId && !passagesDone.has(row.passageId)) {
      passagesDone.add(row.passageId);
      writes.push(db.passage.update({ where: { id: row.passageId }, data: { transcript: key.transcript || null } }));
    }
    if (fixAnswer) {
      updatedAnswers++;
      writes.push(db.questionOption.updateMany({ where: { questionId: row.questionId }, data: { isCorrect: false } }));
      writes.push(db.questionOption.updateMany({ where: { questionId: row.questionId, label: key.answer }, data: { isCorrect: true } }));
    }
  }

  // File questions absent on the web, created by "Sửa toàn bộ theo file".
  const created = fixStructure ? plan.missing.filter((key) => inScope(key.part)).map((key) => ({ id: randomUUID(), key, ...splitKeyText(key) })) : [];

  if (fixStructure) {
    // The exam lists a test's questions by orderIndex alone, so renumber
    // the whole test: Part by Part, this section's questions in the file's
    // order, anything else (the other section, unmatched extras) keeping its
    // current relative order after them. With a Part selection, questions
    // outside it are ranked by their current position, so only the chosen
    // Parts get rearranged.
    const all = await db.question.findMany({
      where: { testId: plan.testId },
      orderBy: [{ orderIndex: "asc" }, { createdAt: "asc" }, { id: "asc" }],
      select: { id: true, part: true, orderIndex: true },
    });
    const fileNumber = new Map(rows.map((r) => [r.questionId, r]));
    const sortKey = all.map((q, i) => {
      const row = fileNumber.get(q.id);
      return { id: q.id, current: q.orderIndex, part: row ? row.part : partNumber(q.part), rank: row ? row.number : 10_000 + i };
    });
    for (const c of created) sortKey.push({ id: c.id, current: -1, part: c.key.part, rank: c.key.number });
    sortKey.sort((a, b) => a.part - b.part || a.rank - b.rank);
    const newOrder = new Map<string, number>();
    sortKey.forEach((q, i) => {
      newOrder.set(q.id, i);
      if (q.current === i || q.current === -1) return;
      reordered++;
      writes.push(db.question.update({ where: { id: q.id }, data: { orderIndex: i } }));
    });

    // A created question joins its group's passage (and audio) when the
    // group is on the web; a group missing entirely gets a new passage
    // carrying the transcript.
    const passageByGroup = new Map<string, string>();
    for (const r of plan.rows) if (r.key.group && r.passageId && !passageByGroup.has(r.key.group)) passageByGroup.set(r.key.group, r.passageId);
    for (const c of created) {
      const { key } = c;
      const part = `PART${key.part}` as TestPart;
      const orderIndex = newOrder.get(c.id)!;
      let passageId: string | null = null;
      if (key.group && key.part >= 3) {
        passageId = passageByGroup.get(key.group) ?? null;
        if (!passageId) {
          passageId = randomUUID();
          passageByGroup.set(key.group, passageId);
          writes.push(db.passage.create({ data: { id: passageId, testId: plan.testId, part, transcript: key.transcript || null, orderIndex } }));
        }
      }
      writes.push(
        db.question.create({
          data: {
            id: c.id,
            testId: plan.testId,
            testSectionId: sectionIdByPart.get(part) ?? null,
            passageId,
            part,
            orderIndex,
            prompt: c.prompt,
            transcript: passageId ? null : key.transcript || null,
            correctLabel: key.answer,
            explanationVi: key.explanationVi,
            options: { create: c.options.map((o) => ({ label: o.label, content: o.content, isCorrect: o.label === key.answer })) },
          },
        })
      );
    }
  }

  await db.$transaction(writes);
  return { updatedQuestions: rows.length, updatedPassages: passagesDone.size, updatedAnswers, movedParts, reordered, createdQuestions: created.length };
}

export interface KeyFileFit {
  keyTest: number;
  /** Average content similarity over content-matched questions, 0–1. */
  avgScore: number;
  contentMatched: number;
  answerMismatches: number;
  blocked: boolean;
}

/** How well one DB test fits each ETS 2026 key file, best fit first — so
 * a web test numbered differently from the files ("Test 02" holding the
 * file's Test 3) is caught before anything is written. */
export async function rankKeyFilesForTest(testId: string, section: KeySection = "listening"): Promise<KeyFileFit[]> {
  const fits: KeyFileFit[] = [];
  for (const keyTest of Object.keys(SECTIONS[section].keys).map(Number)) {
    const plan = await buildListeningKeyImportPlan(testId, keyTest, section);
    if (!plan) continue;
    const scored = plan.rows.filter((r) => r.score !== null);
    fits.push({
      keyTest,
      avgScore: scored.length ? scored.reduce((s, r) => s + r.score!, 0) / scored.length : 0,
      contentMatched: scored.length,
      answerMismatches: plan.rows.filter((r) => r.dbAnswer !== r.key.answer).length,
      blocked: plan.errors.length > 0,
    });
  }
  return fits.sort((a, b) => Number(a.blocked) - Number(b.blocked) || b.avgScore - a.avgScore || a.answerMismatches - b.answerMismatches);
}

/** A file question's printed text as a DB prompt + options. Part 1/2 are
 * audio-only in the exam, so like the other web questions they get no
 * visible prompt and "." options (the script goes in the transcript). */
function splitKeyText(key: KeyQuestion) {
  const labels = key.part === 2 ? ["A", "B", "C"] : ["A", "B", "C", "D"];
  if (key.part <= 2) return { prompt: "", options: labels.map((label) => ({ label, content: "." })) };
  const text = key.textEn.replace(/^\s*\d+\.\s*/, "");
  const pieces = text.split(/\s*\(([A-D])\)\s*/);
  const options = labels.map((label) => {
    const i = pieces.indexOf(label);
    return { label, content: i >= 0 ? (pieces[i + 1] ?? "").trim() : "" };
  });
  return { prompt: pieces[0].trim(), options };
}
