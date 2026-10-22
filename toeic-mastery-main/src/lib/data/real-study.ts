import "server-only";
import type { Prisma } from "@/generated/prisma/client";

/**
 * Which StudySession rows count as real study — for study time, today's and
 * this week's minutes, XP and the streak alike. A test/practice session is
 * created the moment an attempt is opened and its clock runs while the tab
 * is open, so opening a test and walking away used to earn study time, XP
 * and a streak day. Attempt sessions now count only once at least one
 * question has been answered; every other kind (vocabulary, dictionary,
 * grammar, quick study…) is only ever recorded for something actually done.
 */
export const REAL_STUDY: Prisma.StudySessionWhereInput = {
  OR: [{ attemptId: null }, { attempt: { answers: { some: { selectedLabel: { not: null } } } } }],
};

/** SQL form of REAL_STUDY for raw queries over `study_sessions s`. */
export const REAL_STUDY_SQL = `(s.attempt_id IS NULL OR EXISTS (
  SELECT 1 FROM attempt_answers a WHERE a.attempt_id = s.attempt_id AND a.selected_label IS NOT NULL))`;

/** A day counts toward the streak with at least this much real study. */
export const STREAK_MIN_SECONDS_PER_DAY = 60;
