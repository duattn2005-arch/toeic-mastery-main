export type ReviewRating = "AGAIN" | "HARD" | "GOOD" | "EASY";

export interface SrsState {
  /** How many separate days in a row the word was answered right with no
   * miss — 0 while it is "Đang học". */
  repetitions: number;
  intervalDays: number;
  easeFactor: number;
  isLearned?: boolean;
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

/** Days until a mastered word's next light review, by how many days in a
 * row it has been answered right (index = level - 1). */
const MASTERED_INTERVALS = [4, 7, 14, 30, 60];

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

function masteredInterval(level: number) {
  return MASTERED_INTERVALS[Math.min(Math.max(level, 1), MASTERED_INTERVALS.length) - 1];
}

/**
 * Quizlet-style stages:
 * - Answered right with no miss (flashcard "Nhớ"/"Rất dễ", a quiz answer
 *   right on the first try, a clean match) -> "Đã thuộc", reviewed lightly
 *   later (4 days, a week, two weeks ...).
 * - Any miss (flashcard "Học lại", a wrong quiz answer even if fixed on a
 *   retry, a wrong match) -> "Đang học", due right away and kept in the
 *   review list; "Khó" -> "Đang học", due tomorrow.
 * - A word missed today stays "Đang học" for the rest of the day even if
 *   answered right afterwards — it comes back tomorrow, and answering it
 *   right then (with no miss) makes it "Đã thuộc".
 */
export function computeNextReview(state: SrsState, rating: ReviewRating, now: Date = new Date()): SrsResult {
  const reviewedToday = state.lastReviewedAt ? dayKey(state.lastReviewedAt) === dayKey(now) : false;
  const base = { easeFactor: state.easeFactor };

  if (rating === "AGAIN") return { ...base, repetitions: 0, intervalDays: 0, nextReviewDate: vnDay(now, 0), isLearned: false };
  if (rating === "HARD") return { ...base, repetitions: 0, intervalDays: 1, nextReviewDate: vnDay(now, 1), isLearned: false };

  if (reviewedToday) {
    // Missed (or "Khó") earlier today: still learning, back tomorrow.
    if (!state.isLearned) return { ...base, repetitions: 0, intervalDays: 1, nextReviewDate: vnDay(now, 1), isLearned: false };
    // Already right today: nothing new to prove, keep today's schedule.
    const scheduled = state.nextReviewDate ?? vnDay(now, masteredInterval(state.repetitions));
    return { ...base, repetitions: state.repetitions, intervalDays: state.intervalDays, nextReviewDate: scheduled, isLearned: true };
  }

  const level = (state.isLearned ? state.repetitions : 0) + 1;
  const interval = masteredInterval(rating === "EASY" ? level + 1 : level);
  return { ...base, repetitions: level, intervalDays: interval, nextReviewDate: vnDay(now, interval), isLearned: true };
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
