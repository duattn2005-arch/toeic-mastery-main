"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getCurrentProfile } from "@/lib/auth";
import { computeNextReview, type ReviewRating } from "@/lib/services/spaced-repetition";
import { touchStudyStreak } from "@/lib/services/study-streak";

export interface ActionResult {
  error?: string;
}

export async function startLearningWordsAction(vocabularyWordIds: string[]): Promise<ActionResult> {
  const profile = await getCurrentProfile();
  if (!profile) return { error: "Vui lòng đăng nhập" };

  // Outside a $transaction — each word is an independent upsert, and topics
  // with many words (band-tier topics run up to 18) risk the default 5s
  // interactive-transaction timeout (P2028) over a slower connection; same
  // fix already applied elsewhere for the same reason.
  await Promise.all(
    vocabularyWordIds.map((vocabularyWordId) =>
      db.userVocabulary.upsert({
        where: { userId_vocabularyWordId: { userId: profile.id, vocabularyWordId } },
        create: { userId: profile.id, vocabularyWordId, nextReviewDate: new Date() },
        update: {},
      })
    )
  );

  revalidatePath("/vocabulary");
  return {};
}

/** Shared by the graded review flow and the flashcard/quiz/matching games —
 * one SRS update, one place. `existing` must already belong to `profile`. */
async function applyReview(
  existing: { id: string; repetitions: number; intervalDays: number; easeFactor: number; isLearned: boolean; lastReviewedAt: Date | null; nextReviewDate: Date },
  rating: ReviewRating
) {
  const result = computeNextReview(existing, rating);

  await db.$transaction([
    db.userVocabulary.update({
      where: { id: existing.id },
      data: {
        repetitions: result.repetitions,
        intervalDays: result.intervalDays,
        easeFactor: result.easeFactor,
        nextReviewDate: result.nextReviewDate,
        lastReviewedAt: new Date(),
        isLearned: result.isLearned,
      },
    }),
    db.vocabularyReview.create({
      data: {
        userVocabularyId: existing.id,
        rating,
        previousInterval: existing.intervalDays,
        newInterval: result.intervalDays,
        previousEase: existing.easeFactor,
        newEase: result.easeFactor,
      },
    }),
  ]);
}

/**
 * Same SRS update as a graded flashcard rating, but keyed by `vocabularyWordId` (what
 * the study-game components actually know about a word) and auto-starts
 * tracking if this is the first time the word's been practiced anywhere —
 * so playing a game with a not-yet-tracked word still counts, exactly like
 * `startLearningWordsAction` + a review would. This is what makes "Từ vựng
 * đã học" (and the XP derived from it) move when playing games, not just
 * when using the dedicated /vocabulary/review flow.
 */
export async function practiceVocabularyWordAction(vocabularyWordId: string, rating: ReviewRating): Promise<ActionResult> {
  const profile = await getCurrentProfile();
  if (!profile) return { error: "Vui lòng đăng nhập" };

  const existing = await db.userVocabulary.upsert({
    where: { userId_vocabularyWordId: { userId: profile.id, vocabularyWordId } },
    create: { userId: profile.id, vocabularyWordId, nextReviewDate: new Date() },
    update: {},
  });

  await applyReview(existing, rating);

  revalidatePath("/dashboard");
  return {};
}

/** Logs time spent in a flashcard/quiz/matching game or graded review
 * session so it counts toward "Tổng giờ học" and the activity heatmap, same
 * as exam/practice time. Called once when a session ends (not incrementally
 * — these sessions are short, so there's no mid-session sync to keep current). */
export async function logStudySessionAction(durationSec: number): Promise<ActionResult> {
  const profile = await getCurrentProfile();
  if (!profile) return { error: "Vui lòng đăng nhập" };
  if (durationSec <= 0) return {};

  await db.studySession.create({
    data: { userId: profile.id, activityType: "VOCABULARY", durationSec, endedAt: new Date() },
  });
  await touchStudyStreak(profile);

  revalidatePath("/dashboard");
  return {};
}

/** "Học lại từ đầu" — wipes the signed-in user's own vocabulary learning
 * state: SRS rows (+ their review history, via cascade), 20-day/IIG path
 * day progress, and the AI Mentor's per-vocab-topic mastery/unlocks. With
 * `includeSaved`, also clears Đã lưu (SavedWord + vocabulary bookmarks).
 * Study time (StudySession) and exam history are left untouched. One
 * transaction, so it either fully resets or not at all. */
export async function resetVocabularyProgressAction(includeSaved: boolean): Promise<ActionResult & { deletedWords?: number }> {
  const profile = await getCurrentProfile();
  if (!profile) return { error: "Vui lòng đăng nhập" };
  const userId = profile.id;

  const [srs] = await db.$transaction([
    db.userVocabulary.deleteMany({ where: { userId } }),
    db.userVocabularyPathDayProgress.deleteMany({ where: { userId } }),
    db.skillMastery.deleteMany({ where: { userId, dimensionType: "VOCAB_TOPIC" } }),
    db.skillUnlock.deleteMany({ where: { userId, dimensionType: "VOCAB_TOPIC" } }),
    ...(includeSaved
      ? [db.savedWord.deleteMany({ where: { userId } }), db.bookmark.deleteMany({ where: { userId, type: "VOCABULARY" } })]
      : []),
  ]);

  revalidatePath("/vocabulary");
  revalidatePath("/dashboard");
  revalidatePath("/bookmarks");
  return { deletedWords: srs.count };
}
