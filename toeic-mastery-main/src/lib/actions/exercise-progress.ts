"use server";

import { db } from "@/lib/db";
import { getCurrentProfile } from "@/lib/auth";

const KEY_PATTERN = /^(mastery|vocab):[a-z0-9:_-]{1,160}$/;
const LABELS = new Set(["A", "B", "C", "D"]);
const MAX_QUESTIONS = 500;

export interface SaveExerciseProgressInput {
  key: string;
  total: number;
  answers: Record<string, string>;
  submitted: boolean;
  /** Set when the sitting is finished (practice: every question answered;
   * test: submitted) — becomes the "Lần trước" result kept across a redo. */
  result?: { correct: number; answered: number };
}

/** Saves a learner's answers on a static exercise. No revalidatePath: the
 * quiz already holds this state client-side, and re-rendering the page
 * mid-quiz is exactly what must not happen. */
export async function saveExerciseProgressAction(input: SaveExerciseProgressInput): Promise<{ error?: string }> {
  const profile = await getCurrentProfile();
  if (!profile) return { error: "Bạn cần đăng nhập để lưu tiến trình" };

  const { key, total, submitted, result } = input;
  if (!KEY_PATTERN.test(key) || !Number.isInteger(total) || total < 1 || total > MAX_QUESTIONS) return { error: "Bài tập không hợp lệ" };

  const answers: Record<string, string> = {};
  for (const [index, label] of Object.entries(input.answers ?? {})) {
    const i = Number(index);
    if (Number.isInteger(i) && i >= 0 && i < total && LABELS.has(label)) answers[String(i)] = label;
  }

  const finished =
    result && Number.isInteger(result.correct) && Number.isInteger(result.answered) && result.correct >= 0 && result.correct <= result.answered && result.answered <= total
      ? { lastCorrect: result.correct, lastAnswered: result.answered, lastDoneAt: new Date() }
      : {};

  await db.userExerciseProgress.upsert({
    where: { userId_exerciseKey: { userId: profile.id, exerciseKey: key } },
    create: { userId: profile.id, exerciseKey: key, total, answers, submitted, ...finished },
    update: { total, answers, submitted, ...finished },
  });
  return {};
}
