import "server-only";
import { db } from "@/lib/db";
import { ETS_2026_LISTENING_KEYS, type ListeningKeyQuestion } from "@/lib/content/ets-2026-listening-keys";

const LISTENING_PARTS = ["PART1", "PART2", "PART3", "PART4"] as const;

export interface ImportRow {
  number: number;
  questionId: string;
  passageId: string | null;
  part: number;
  dbAnswer: string;
  key: ListeningKeyQuestion;
}

export interface ImportPlan {
  testTitle: string;
  rows: ImportRow[];
  /** Blocking problems — the import is refused while any exist. */
  errors: string[];
}

/** Lines a DB test's Listening questions up with one ETS 2026 key file.
 * Questions are numbered 1–100 in exam order (Part 1→4, then orderIndex),
 * so a test that also holds Reading still maps correctly; any count or Part
 * mismatch is reported instead of guessed at. */
export async function buildListeningKeyImportPlan(testId: string, keyTest: number): Promise<ImportPlan | null> {
  const keys = ETS_2026_LISTENING_KEYS[keyTest];
  const test = await db.test.findUnique({ where: { id: testId }, select: { title: true } });
  if (!keys || !test) return null;

  const questions = await db.question.findMany({
    where: { testId, part: { in: [...LISTENING_PARTS] } },
    select: { id: true, part: true, orderIndex: true, passageId: true, correctLabel: true },
  });
  questions.sort((a, b) => LISTENING_PARTS.indexOf(a.part as never) - LISTENING_PARTS.indexOf(b.part as never) || a.orderIndex - b.orderIndex);

  const errors: string[] = [];
  if (questions.length !== keys.length) {
    errors.push(`Đề trên web có ${questions.length} câu Listening, file có ${keys.length} câu.`);
  }

  const rows: ImportRow[] = [];
  keys.forEach((key, index) => {
    const question = questions[index];
    if (!question) return;
    const part = LISTENING_PARTS.indexOf(question.part as never) + 1;
    if (part !== key.part) errors.push(`Câu ${key.number}: trên web là Part ${part}, trong file là Part ${key.part}.`);
    rows.push({ number: key.number, questionId: question.id, passageId: question.passageId, part, dbAnswer: question.correctLabel, key });
  });

  return { testTitle: test.title, rows, errors };
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
