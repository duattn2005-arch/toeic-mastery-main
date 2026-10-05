export type ReviewRating = "AGAIN" | "HARD" | "GOOD" | "EASY";

export interface SrsState {
  /** Mastery level: how many separate days in a row the word was recalled
   * correctly since it was last missed. */
  repetitions: number;
  intervalDays: number;
  easeFactor: number;
  /** When the word was last rated anywhere (review, game, flashcard). */
  lastReviewedAt?: Date | null;
  nextReviewDate?: Date | null;
}

export interface SrsResult {
  repetitions: number;
  intervalDays: number;
  easeFactor: number;
  nextReviewDate: Date;
  isLearned: boolean;
}

/** Correct on this many separate days (since the last miss) = "Đã thuộc".
 * Below it a tracked word is "Đang học". */
export const MASTERED_AT_LEVEL = 3;

/** Days until the next review once a word reaches level N (index N-1):
 * tomorrow, then 3 days, a week, two weeks, a month, two months. */
const INTERVALS_BY_LEVEL = [1, 3, 7, 14, 30, 60];

/** Days are Vietnam calendar days — learners are in Asia/Ho_Chi_Minh, and a
 * UTC day would make "tomorrow" start at 7 AM or land on the same evening. */
const TZ = "Asia/Ho_Chi_Minh";

function dayKey(date: Date) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
}

/** The Vietnam calendar day `offset` days from `now`, as the UTC-midnight
 * Date a `@db.Date` column stores. */
function vnDay(now: Date, offset: number) {
  const day = new Date(`${dayKey(now)}T00:00:00Z`);
  day.setUTCDate(day.getUTCDate() + offset);
  return day;
}

function intervalForLevel(level: number) {
  return INTERVALS_BY_LEVEL[Math.min(level, INTERVALS_BY_LEVEL.length) - 1];
}

/**
 * Quizlet-style progression, kept honest across days:
 * - "Học lại" / any miss in a game (AGAIN): back to level 0 — "Đang học" —
 *   and due right away, so it stays in "Từ cần ôn hôm nay" until recalled.
 * - "Khó" (HARD): no progress (and drops a mastered word back to "Đang
 *   học"); due tomorrow.
 * - Correct (GOOD / EASY): one level up — but at most once per day. Getting
 *   a word right in Học, Luyện tập and Kiểm tra of the same session only
 *   proves you know it *right now*; mastery needs recall on separate days
 *   (day 1, day 2, day 5 ...). A word learned today is always back tomorrow.
 *   EASY skips one interval step once the word is past its first day.
 */
export function computeNextReview(state: SrsState, rating: ReviewRating, now: Date = new Date()): SrsResult {
  const level = state.repetitions;
  const reviewedToday = state.lastReviewedAt ? dayKey(state.lastReviewedAt) === dayKey(now) : false;
  let nextLevel: number;
  let interval: number;

  if (rating === "AGAIN") {
    nextLevel = 0;
    interval = 0;
  } else if (rating === "HARD") {
    nextLevel = Math.min(level, MASTERED_AT_LEVEL - 1);
    interval = 1;
  } else if (reviewedToday) {
    // Already rated today: keep today's level, and never pull the next
    // review earlier than tomorrow (or than what today's first rating set).
    nextLevel = level;
    const tomorrow = vnDay(now, 1);
    const scheduled = state.nextReviewDate && state.nextReviewDate > tomorrow ? state.nextReviewDate : tomorrow;
    return {
      repetitions: nextLevel,
      intervalDays: Math.max(1, Math.round((scheduled.getTime() - vnDay(now, 0).getTime()) / 86_400_000)),
      easeFactor: state.easeFactor,
      nextReviewDate: scheduled,
      isLearned: nextLevel >= MASTERED_AT_LEVEL,
    };
  } else {
    nextLevel = level + 1;
    interval = intervalForLevel(rating === "EASY" && nextLevel >= 2 ? nextLevel + 1 : nextLevel);
  }

  return {
    repetitions: nextLevel,
    intervalDays: interval,
    easeFactor: state.easeFactor,
    nextReviewDate: vnDay(now, interval),
    isLearned: nextLevel >= MASTERED_AT_LEVEL,
  };
}

export function initialSrsState(): SrsState {
  return { repetitions: 0, intervalDays: 0, easeFactor: 2.5 };
}

export type VocabStatus = "new" | "learning" | "mastered";

/** Quizlet's three buckets: never studied, still learning, mastered. */
export function vocabStatus(tracked: { isLearned: boolean } | null | undefined): VocabStatus {
  if (!tracked) return "new";
  return tracked.isLearned ? "mastered" : "learning";
}

export const VOCAB_STATUS_LABEL: Record<VocabStatus, string> = {
  new: "Chưa học",
  learning: "Đang học",
  mastered: "Đã thuộc",
};

/** Words with `nextReviewDate` <= this are due: the whole current Vietnam
 * day counts as today, from midnight (not from 7 AM, as comparing a date
 * column with the UTC clock would). */
export function srsDueCutoff(now: Date = new Date()) {
  return vnDay(now, 0);
}
