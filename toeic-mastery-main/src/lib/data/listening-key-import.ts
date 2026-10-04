import "server-only";
import { db } from "@/lib/db";
import { ETS_2026_LISTENING_KEYS, type ListeningKeyQuestion } from "@/lib/content/ets-2026-listening-keys";
import { matchListeningPart, questionText } from "@/lib/listening-key-match";

const LISTENING_PARTS = ["PART1", "PART2", "PART3", "PART4"] as const;
/** Below this content similarity a content match is flagged for review. */
const LOW_MATCH = 0.5;

export interface ImportRow {
  number: number;
  questionId: string;
  passageId: string | null;
  part: number;
  /** Position (1-based) of the question among the test's Listening
   * questions in exam order — the number learners see. */
  webNumber: number;
  dbAnswer: string;
  /** Start of the DB question's own text, for eyeballing the match. */
  dbText: string;
  /** "content" = matched by question/option text, "order" = by position. */
  method: "content" | "order";
  /** 0–1 word overlap with the file's text; null for order matches. */
  score: number | null;
  key: ListeningKeyQuestion;
}

export interface ImportPlan {
  testTitle: string;
  rows: ImportRow[];
  /** Blocking problems — the import is refused while any exist. */
  errors: string[];
  /** Non-blocking things worth checking in the preview. */
  warnings: string[];
  /** Web questions under a Listening part that match nothing in the file
   * (left untouched by the import). */
  extras: { webNumber: number; part: number; text: string }[];
}

/** Lines a DB test's Listening questions up with one ETS 2026 key file.
 *
 * Within each Part, questions are matched by content (question + option
 * text vs. the file's printed text) whenever the DB questions carry
 * distinct text — so a reordered Part, or one padded with a stray
 * question, still maps each file question onto the right DB question.
 * Audio-only questions fall back to exam order: the same orderIndex sort
 * the exam uses, ties broken by creation order. */
export async function buildListeningKeyImportPlan(testId: string, keyTest: number): Promise<ImportPlan | null> {
  const keys = ETS_2026_LISTENING_KEYS[keyTest];
  const test = await db.test.findUnique({ where: { id: testId }, select: { title: true } });
  if (!keys || !test) return null;

  const questions = await db.question.findMany({
    where: { testId, part: { in: [...LISTENING_PARTS] } },
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

  const errors: string[] = [];
  const warnings: string[] = [];
  const webNumberOf = new Map(questions.map((q, i) => [q.id, i + 1]));

  const indexes = questions.map((q) => q.orderIndex);
  if (new Set(indexes).size !== indexes.length) {
    warnings.push("Đề này có nhiều câu trùng thứ tự (orderIndex) — câu được ghép theo nội dung; câu chỉ có audio cần kiểm tra kỹ.");
  }

  const rows: ImportRow[] = [];
  const extras: ImportPlan["extras"] = [];
  LISTENING_PARTS.forEach((partName, partIndex) => {
    const part = partIndex + 1;
    const dbPart = questions.filter((q) => q.part === partName);
    const keyPart = keys.filter((k) => k.part === part);

    const match = matchListeningPart(dbPart, keyPart.map((k) => k.textEn));
    if (match.error) {
      errors.push(`Part ${part}: ${match.error}`);
      return;
    }
    const dbTexts = dbPart.map(questionText);
    for (const d of match.extras) {
      extras.push({ webNumber: webNumberOf.get(dbPart[d].id)!, part, text: dbTexts[d].replace(/\s+/g, " ").trim().slice(0, 90) });
    }
    const { assigned } = match;

    keyPart.forEach((key, k) => {
      const { dbIndex, score, method } = assigned.get(k)!;
      const q = dbPart[dbIndex];
      rows.push({
        number: key.number,
        questionId: q.id,
        passageId: q.passageId,
        part,
        webNumber: webNumberOf.get(q.id)!,
        dbAnswer: q.correctLabel,
        dbText: dbTexts[dbIndex].replace(/\s+/g, " ").trim().slice(0, 90),
        method,
        score,
        key,
      });
    });
  });

  const weak = rows.filter((r) => r.method === "content" && (r.score ?? 0) < LOW_MATCH);
  if (weak.length > 0) warnings.push(`${weak.length} câu khớp nội dung thấp (tô cam) — kiểm tra xem đã chọn đúng đề chưa.`);
  const moved = rows.filter((r) => r.webNumber !== r.number).length;
  if (moved > 0) warnings.push(`${moved} câu có số thứ tự trên web khác số câu trong file — đã ghép theo nội dung, xem cột “Câu trên web”.`);

  const groupsByPassage = new Map<string, Set<string>>();
  for (const r of rows) if (r.passageId && r.key.group) (groupsByPassage.get(r.passageId) ?? groupsByPassage.set(r.passageId, new Set()).get(r.passageId)!).add(r.key.group);
  const mixed = [...groupsByPassage.values()].filter((g) => g.size > 1).map((g) => [...g].join(" + "));
  if (mixed.length > 0) warnings.push(`Một nhóm hội thoại trên web đang nhận câu của nhiều nhóm trong file (${mixed.join("; ")}) — transcript nhóm đó có thể không khớp.`);

  if (extras.length > 0) {
    warnings.push(`${extras.length} câu trên web không có trong file (câu ${extras.map((e) => e.webNumber).join(", ")}) — có thể bị nhập nhầm vào phần Listening; import sẽ bỏ qua các câu này.`);
  }

  rows.sort((a, b) => a.number - b.number);
  return { testTitle: test.title, rows, errors, warnings, extras };
}

/** Writes a plan's transcripts and Vietnamese explanations into the DB in
 * one transaction. Part 3/4 transcripts go on the shared Passage when the
 * question belongs to one (one write per group), otherwise on the question
 * itself. Answers only change when `updateAnswers` is set — by default a
 * mismatch is just reported in the preview. */
export async function applyListeningKeyImport(plan: ImportPlan, updateAnswers: boolean) {
  const writes = [];
  const passagesDone = new Set<string>();
  let updatedAnswers = 0;

  for (const row of plan.rows) {
    const { key } = row;
    const sharedTranscript = row.part >= 3 && row.passageId;
    writes.push(
      db.question.update({
        where: { id: row.questionId },
        data: {
          explanationVi: key.explanationVi,
          ...(sharedTranscript ? {} : { transcript: key.transcript || null }),
          ...(updateAnswers && row.dbAnswer !== key.answer ? { correctLabel: key.answer } : {}),
        },
      })
    );
    if (sharedTranscript && row.passageId && !passagesDone.has(row.passageId)) {
      passagesDone.add(row.passageId);
      writes.push(db.passage.update({ where: { id: row.passageId }, data: { transcript: key.transcript || null } }));
    }
    if (updateAnswers && row.dbAnswer !== key.answer) {
      updatedAnswers++;
      writes.push(db.questionOption.updateMany({ where: { questionId: row.questionId }, data: { isCorrect: false } }));
      writes.push(db.questionOption.updateMany({ where: { questionId: row.questionId, label: key.answer }, data: { isCorrect: true } }));
    }
  }

  await db.$transaction(writes);
  return { updatedQuestions: plan.rows.length, updatedPassages: passagesDone.size, updatedAnswers };
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
export async function rankKeyFilesForTest(testId: string): Promise<KeyFileFit[]> {
  const fits: KeyFileFit[] = [];
  for (const keyTest of Object.keys(ETS_2026_LISTENING_KEYS).map(Number)) {
    const plan = await buildListeningKeyImportPlan(testId, keyTest);
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
