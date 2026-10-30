"use server";

import { db } from "@/lib/db";
import { getCurrentProfile } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import { answerSnapshot, SNAPSHOT_QUESTION_SELECT } from "@/lib/bloom/answer-log";

export type PracticeAnswerSource = "mistake_drill" | "quick_study" | "grammar_quiz";
const SOURCES: PracticeAnswerSource[] = ["mistake_drill", "quick_study", "grammar_quiz"];
const LABEL = /^[A-D]$/;

/**
 * Records one answer from a drill that doesn't run through an Attempt (Ôn lỗi
 * sai, Quick Study, quiz ngữ pháp) so the Bloom distillation sees that
 * practice too. Fire-and-forget from the client; correctness is always
 * re-derived here from the question's own key, never trusted from the client.
 * Callers log only the FIRST answer to a question in a session — a question
 * re-shown after its answer was revealed would just measure memory.
 */
export async function logPracticeAnswerAction(input: {
  questionId: string;
  selectedLabel: string;
  source: PracticeAnswerSource;
  /** Seconds on the question, or null when the view can't measure it. */
  timeSpentSec: number | null;
}): Promise<void> {
  const profile = await getCurrentProfile();
  if (!profile) return;
  if (!SOURCES.includes(input.source) || !LABEL.test(input.selectedLabel) || typeof input.questionId !== "string") return;
  if (!rateLimit(`practice-answer:${profile.id}`, 120, 60_000).ok) return;

  const question = await db.question.findUnique({ where: { id: input.questionId }, select: { id: true, ...SNAPSHOT_QUESTION_SELECT } }).catch(() => null);
  if (!question) return;

  const time = typeof input.timeSpentSec === "number" && Number.isFinite(input.timeSpentSec) ? Math.max(0, Math.min(3600, Math.round(input.timeSpentSec))) : null;
  await db.practiceAnswer.create({
    data: {
      userId: profile.id,
      questionId: question.id,
      source: input.source,
      selectedLabel: input.selectedLabel,
      isCorrect: input.selectedLabel === question.correctLabel,
      timeSpentSec: time,
      ...answerSnapshot(question, input.selectedLabel),
    },
  });
}
