import "server-only";
import { db } from "@/lib/db";

/** What a quiz restores on load — see UserExerciseProgress. */
export interface ExerciseProgress {
  answers: Record<string, string>;
  submitted: boolean;
  total: number;
  lastCorrect: number | null;
  lastAnswered: number | null;
  /** ISO string so it can cross into a client component. */
  lastDoneAt: string | null;
}

/** Saved progress for a set of static exercises, keyed by exercise key. */
export async function getExerciseProgress(userId: string, keys: string[]): Promise<Record<string, ExerciseProgress>> {
  if (keys.length === 0) return {};
  const rows = await db.userExerciseProgress.findMany({ where: { userId, exerciseKey: { in: keys } } });
  return Object.fromEntries(
    rows.map((r) => [
      r.exerciseKey,
      {
        answers: (r.answers ?? {}) as Record<string, string>,
        submitted: r.submitted,
        total: r.total,
        lastCorrect: r.lastCorrect,
        lastAnswered: r.lastAnswered,
        lastDoneAt: r.lastDoneAt?.toISOString() ?? null,
      },
    ])
  );
}
