import "server-only";
import { db } from "@/lib/db";
import { Prisma, type Profile } from "@/generated/prisma/client";
import { REAL_STUDY_SQL, STREAK_MIN_SECONDS_PER_DAY } from "@/lib/data/real-study";

/** Learners are in Vietnam (UTC+7, no DST): a "day" of study runs from
 * midnight to midnight there, not in UTC — with UTC days, studying before
 * 7 am counted as the day before and broke streaks that weren't broken. */
const VN_OFFSET_MS = 7 * 3_600_000;

/** "YYYY-MM-DD" of the Vietnam calendar day `d` falls on. */
export function vnDayKey(d: Date): string {
  return new Date(d.getTime() + VN_OFFSET_MS).toISOString().slice(0, 10);
}

/** The day `n` days after `key` (negative for before). */
export function addDays(key: string, n: number): string {
  const d = new Date(`${key}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

/** The UTC instant Vietnam's day `key` starts at. */
export function vnDayStart(key: string): Date {
  return new Date(Date.parse(`${key}T00:00:00Z`) - VN_OFFSET_MS);
}

/** Days in a row with study, ending today — or yesterday, since a streak
 * is still alive until today is over. */
export function streakFromDays(days: Set<string>, today: string): number {
  let day = days.has(today) ? today : addDays(today, -1);
  let streak = 0;
  while (days.has(day)) {
    streak++;
    day = addDays(day, -1);
  }
  return streak;
}

type StreakFields = Pick<Profile, "id" | "lastStudyDate" | "streakCount" | "longestStreak">;

/**
 * Recomputes the daily streak from the learner's actual study history — the
 * same StudySession rows the dashboard's activity heatmap is drawn from, on
 * Vietnam days — and stores it on the profile when it changed. Any real
 * study counts (tests and practice once a question is answered, even if not
 * submitted; vocabulary, dictionary, grammar, quick study…), so the streak
 * can't disagree with the heatmap, and streaks broken by the old
 * UTC/partial accounting heal on the next visit. A day needs a minute of
 * real study — opening a test and leaving doesn't count (real-study.ts).
 * Returns the profile with the fresh values.
 */
export async function syncStudyStreak<T extends StreakFields>(profile: T): Promise<T> {
  // Days with at least a minute of real study (see real-study.ts): just
  // opening a test or a page doesn't keep a streak going.
  const rows = await db.$queryRaw<{ day: Date }[]>`
    SELECT (s.started_at + interval '7 hours')::date AS day
    FROM study_sessions s
    WHERE s.user_id = ${profile.id}::uuid AND s.started_at >= now() - interval '400 days' AND ${Prisma.raw(REAL_STUDY_SQL)}
    GROUP BY 1
    HAVING SUM(s.duration_sec) >= ${STREAK_MIN_SECONDS_PER_DAY}`;
  const days = new Set(rows.map((r) => new Date(r.day).toISOString().slice(0, 10)));
  const streak = streakFromDays(days, vnDayKey(new Date()));
  const latest = [...days].sort().pop();
  const lastStudyDate = latest ? new Date(`${latest}T00:00:00Z`) : profile.lastStudyDate;
  const longestStreak = Math.max(profile.longestStreak, streak);

  const unchanged =
    streak === profile.streakCount &&
    longestStreak === profile.longestStreak &&
    (lastStudyDate?.getTime() ?? null) === (profile.lastStudyDate ? new Date(profile.lastStudyDate).getTime() : null);
  if (!unchanged) {
    await db.profile.update({ where: { id: profile.id }, data: { streakCount: streak, longestStreak, lastStudyDate } });
  }
  return { ...profile, streakCount: streak, longestStreak, lastStudyDate };
}

/**
 * Called by study actions right after they record a StudySession, so the
 * streak (and XP that depends on it) is up to date at once.
 */
export async function touchStudyStreak(profile: StreakFields) {
  await syncStudyStreak(profile);
}
