import "server-only";
import { db } from "@/lib/db";
import { ETS_2026_LISTENING_KEYS, type ListeningKeyQuestion } from "@/lib/content/ets-2026-listening-keys";

const LISTENING_PARTS = ["PART1", "PART2", "PART3", "PART4"] as const;
/** Below this content similarity a content match is flagged for review. */
const LOW_MATCH = 0.5;
/** A DB question needs at least this many words to be matched by content. */
const MIN_WORDS = 4;

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
}

function words(text: string) {
  return new Set(
    text
      .toLowerCase()
      .replace(/^\s*\d+\s*\./, "")
      .replace(/\([a-d]\)/g, " ")
      .replace(/[^a-z0-9]+/g, " ")
      .split(" ")
      .filter((w) => w.length > 1)
  );
}

/** Dice overlap of two word sets, 0–1. */
function similarity(a: Set<string>, b: Set<string>) {
  if (a.size === 0 || b.size === 0) return 0;
  let shared = 0;
  for (const w of a) if (b.has(w)) shared++;
  return (2 * shared) / (a.size + b.size);
}

/** Lines a DB test's Listening questions up with one ETS 2026 key file.
 *
 * Within each Part, questions are matched by content (question + option
 * text vs. the file's printed text) whenever the DB questions carry text —
 * so a test whose orderIndex is missing or duplicated (older imports left
 * it at 0) still maps each file question onto the right DB question.
 * Audio-only questions (no text to compare) fall back to exam order: the
 * same orderIndex sort the exam uses, ties broken by creation order. */
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
  LISTENING_PARTS.forEach((partName, partIndex) => {
    const part = partIndex + 1;
    const dbPart = questions.filter((q) => q.part === partName);
    const keyPart = keys.filter((k) => k.part === part);
    if (dbPart.length !== keyPart.length) {
      errors.push(`Part ${part}: đề trên web có ${dbPart.length} câu, file có ${keyPart.length} câu.`);
      return;
    }

    const dbTexts = dbPart.map((q) => [q.prompt, ...q.options.map((o) => o.content)].join(" "));
    const dbWords = dbTexts.map(words);
    const keyWords = keyPart.map((k) => words(k.textEn));
    const textual = dbWords.filter((w) => w.size >= MIN_WORDS).length >= Math.ceil(dbPart.length / 2);

    const assigned = new Map<number, { dbIndex: number; score: number | null; method: ImportRow["method"] }>();
    const usedDb = new Set<number>();

    if (textual) {
      const pairs: { k: number; d: number; s: number }[] = [];
      keyWords.forEach((kw, k) => dbWords.forEach((dw, d) => dw.size >= MIN_WORDS && pairs.push({ k, d, s: similarity(kw, dw) })));
      pairs.sort((a, b) => b.s - a.s);
      for (const { k, d, s } of pairs) {
        if (assigned.has(k) || usedDb.has(d) || s <= 0) continue;
        assigned.set(k, { dbIndex: d, score: s, method: "content" });
        usedDb.add(d);
      }
    }
    // Whatever content matching couldn't place keeps exam order.
    const freeDb = dbPart.map((_, d) => d).filter((d) => !usedDb.has(d));
    keyPart.forEach((_, k) => {
      if (!assigned.has(k)) assigned.set(k, { dbIndex: freeDb.shift()!, score: null, method: "order" });
    });

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

  rows.sort((a, b) => a.number - b.number);
  return { testTitle: test.title, rows, errors, warnings };
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
