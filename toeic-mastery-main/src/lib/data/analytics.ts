import "server-only";
import { db } from "@/lib/db";
import { REAL_STUDY } from "@/lib/data/real-study";
import { addDays, vnDayKey, vnDayStart } from "@/lib/services/study-streak";
import { getOverallStats, getPartAccuracies } from "@/lib/data/skill-stats";
import { PART_META } from "@/lib/constants/toeic";

export async function getAnalyticsData(userId: string) {
  const [scoreHistory, partAccuracies, overallStats, sessions] = await Promise.all([
    db.scoreHistory.findMany({ where: { userId }, orderBy: { recordedAt: "asc" }, take: 30 }),
    getPartAccuracies(userId),
    getOverallStats(userId),
    db.studySession.findMany({
      where: { userId, startedAt: { gte: vnDayStart(addDays(vnDayKey(new Date()), -13)) }, ...REAL_STUDY },
      select: { startedAt: true, durationSec: true },
    }),
  ]);

  const studyByDay = new Map<string, number>();
  const today = vnDayKey(new Date());
  for (let i = 13; i >= 0; i--) studyByDay.set(addDays(today, -i), 0);
  for (const s of sessions) {
    const key = vnDayKey(s.startedAt);
    if (studyByDay.has(key)) studyByDay.set(key, (studyByDay.get(key) ?? 0) + s.durationSec);
  }

  const sortedByAccuracy = [...partAccuracies].filter((p) => p.attempted > 0).sort((a, b) => b.accuracy - a.accuracy);
  const strongParts = sortedByAccuracy.slice(0, 2);
  const weakParts = sortedByAccuracy.slice(-2).reverse();

  return {
    scoreTrend: scoreHistory.map((s) => ({
      date: s.recordedAt.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" }),
      listening: s.listeningScore,
      reading: s.readingScore,
      total: s.totalScore,
    })),
    partAccuracies,
    overallStats,
    strongParts: strongParts.map((p) => ({ ...p, label: PART_META[p.part].shortLabel })),
    weakParts: weakParts.map((p) => ({ ...p, label: PART_META[p.part].shortLabel })),
    studyTimeTrend: [...studyByDay.entries()].map(([date, seconds]) => ({
      date: date.slice(5),
      minutes: Math.round(seconds / 60),
    })),
  };
}
