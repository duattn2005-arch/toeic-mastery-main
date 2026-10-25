import "server-only";
import { addDays, vnDayKey, vnDayStart } from "@/lib/services/study-streak";
import { REAL_STUDY } from "@/lib/data/real-study";
import { db } from "@/lib/db";
import { getOverallStats, getPartAccuracies } from "@/lib/data/skill-stats";
import { getVocabularyReminder } from "@/lib/data/vocabulary";
import { generateRecommendations } from "@/lib/services/recommendation";
import { computeXp, getXpProgress } from "@/lib/services/xp";
import { srsDueCutoff } from "@/lib/services/spaced-repetition";

export async function getDashboardData(userId: string) {
  const [
    profile,
    latestScore,
    continueAttempt,
    suggestedTests,
    partAccuracies,
    overallStats,
    dueVocabulary,
    vocabMistakeAgg,
    vocabularyReminder,
  ] = await Promise.all([
      db.profile.findUniqueOrThrow({ where: { id: userId } }),
      db.scoreHistory.findFirst({ where: { userId }, orderBy: { recordedAt: "desc" } }),
      db.attempt.findFirst({
        where: { userId, status: "IN_PROGRESS" },
        orderBy: { lastSyncedAt: "desc" },
        include: { test: { select: { id: true, title: true, totalQuestions: true } } },
      }),
      db.test.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { createdAt: "desc" },
        take: 3,
        include: {
          _count: { select: { attempts: true } },
          attempts: {
            where: { userId, status: "SUBMITTED" },
            select: { totalScore: true },
            orderBy: { totalScore: "desc" },
            take: 1,
          },
        },
      }),
      getPartAccuracies(userId),
      getOverallStats(userId),
      db.userVocabulary.findMany({
        where: { userId, nextReviewDate: { lte: srsDueCutoff() } },
        include: { vocabularyWord: true },
        orderBy: { nextReviewDate: "asc" },
        take: 8,
      }),
      db.attemptAnswer.aggregate({
        where: { attempt: { userId, status: "SUBMITTED" }, isCorrect: false, question: { part: { in: ["PART5", "PART6"] } } },
        _count: { _all: true },
      }),
      getVocabularyReminder(userId),
    ]);

  // A finished full test (not a Part/retry subset) is what makes the
  // estimated score meaningful; before that the dashboard leads with skills.
  const fullTestsDone = await db.attempt.count({
    where: { userId, status: "SUBMITTED", parts: { isEmpty: true }, questionIds: { isEmpty: true }, test: { isFullTest: true } },
  });

  const wrongTotalAgg = await db.attemptAnswer.count({
    where: { attempt: { userId, status: "SUBMITTED" }, isCorrect: false },
  });

  const vocabularyMistakeRate = wrongTotalAgg > 0 ? (vocabMistakeAgg._count._all ?? 0) / wrongTotalAgg : 0;

  const recommendations = generateRecommendations({ partAccuracies, vocabularyMistakeRate });

  const weeklyStudySeconds = await db.studySession.aggregate({
    where: { userId, startedAt: { gte: new Date(Date.now() - 7 * 86_400_000) }, ...REAL_STUDY },
    _sum: { durationSec: true },
  });

  const activityHeatmap = await getActivityHeatmap(userId);

  const xp = computeXp(overallStats, profile.streakCount);
  const xpProgress = getXpProgress(xp);
  // Lower-bound proxy for "XP earned today": the day's study minutes, which
  // is one real component of the XP formula. Undercounts today's correct-
  // answer/vocabulary XP since there's no per-event ledger, but never fabricates.
  const todayXp = activityHeatmap[activityHeatmap.length - 1]?.minutes ?? 0;

  return {
    profile,
    xpProgress,
    todayXp,
    hasFullTest: fullTestsDone > 0,
    predictedScore: latestScore
      ? { listening: latestScore.listeningScore, reading: latestScore.readingScore, total: latestScore.totalScore }
      : null,
    continueAttempt,
    suggestedTests: suggestedTests.map((t) => ({
      id: t.id,
      title: t.title,
      difficulty: t.difficulty,
      totalQuestions: t.totalQuestions,
      durationMinutes: t.durationMinutes,
      usersCompleted: t._count.attempts,
      bestScore: t.attempts[0]?.totalScore ?? null,
    })),
    partAccuracies,
    overallStats,
    dueVocabulary,
    vocabularyReminder,
    recommendations,
    weeklyStudyMinutes: Math.round((weeklyStudySeconds._sum.durationSec ?? 0) / 60),
    activityHeatmap,
  };
}

const HEATMAP_DAYS = 14;

/** Last 14 days of study time, oldest first, for the streak heatmap widget. */
/** Minutes studied per Vietnam day over the last HEATMAP_DAYS days — the
 * same days the streak counts (study-streak.ts). */
async function getActivityHeatmap(userId: string) {
  const today = vnDayKey(new Date());
  const firstDay = addDays(today, -(HEATMAP_DAYS - 1));

  const sessions = await db.studySession.findMany({
    where: { userId, startedAt: { gte: vnDayStart(firstDay) }, ...REAL_STUDY },
    select: { startedAt: true, durationSec: true },
  });

  const minutesByDay = new Map<string, number>();
  for (const s of sessions) {
    const key = vnDayKey(s.startedAt);
    minutesByDay.set(key, (minutesByDay.get(key) ?? 0) + s.durationSec / 60);
  }

  return Array.from({ length: HEATMAP_DAYS }, (_, i) => {
    const key = addDays(firstDay, i);
    return { date: key, minutes: Math.round(minutesByDay.get(key) ?? 0) };
  });
}

export type DashboardData = Awaited<ReturnType<typeof getDashboardData>>;
