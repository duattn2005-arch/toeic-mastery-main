import { NextResponse } from "next/server";
import { getAuthedProfileOrNull } from "@/lib/auth";
import { buildLearningInsights, STATUS_LABEL, type SkillStat } from "@/lib/services/insights/engine";
import { PART_META } from "@/lib/constants/toeic";
import type { TestPart } from "@/generated/prisma/enums";

/**
 * GET: the learner's distilled competency profile as a JSON download — the
 * "hồ sơ bàn giao" of the B/I/A mentor docs (level, every label's status
 * and score, strengths/weaknesses, Part accuracy, behaviour signals,
 * stamina), so it can be kept, shared with a teacher or read by another
 * tool without re-surveying the learner. Read-only.
 */
export async function GET() {
  const profile = await getAuthedProfileOrNull();
  if (!profile) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const i = await buildLearningInsights(profile.id);
  const label = (s: SkillStat) => ({
    type: s.kind,
    key: s.key,
    title: s.kind === "part" ? PART_META[s.key as TestPart].label : s.title,
    attempted: s.attempted,
    accuracy: Math.round(s.accuracy * 100) / 100,
    recentAccuracy: Math.round(s.recentAccuracy * 100) / 100,
    score: Math.round(s.score * 100) / 100,
    status: STATUS_LABEL[s.status],
  });
  const body = {
    generatedAt: new Date().toISOString(),
    level: i.routing.level,
    levelLabel: i.routing.levelLabel,
    branch: i.routing.branch,
    branchTitle: i.routing.title,
    readiness: Math.round(i.routing.readiness * 100) / 100,
    checklist: i.routing.checklist,
    totals: { answered: i.answered, skipped: i.skipped, accuracy: Math.round(i.accuracy * 100) / 100, rawAccuracy: Math.round(i.rawAccuracy * 100) / 100, noise: i.noise },
    parts: i.parts.map((p) => ({ ...label(p), skipped: p.skipped, avgSec: p.avgSec, targetSec: p.targetSec, pace: p.pace })),
    labels: [...i.grammar, ...i.strategies].map(label),
    strengths: i.strengths.slice(0, 3).map(label),
    weaknesses: i.weaknesses.slice(0, 3).map((w) => ({ ...label(w), pointsGain: w.pointsGain })),
    behaviors: i.behaviors,
    stamina: i.stamina,
    openMistakes: i.openMistakes.length,
    focusVocabulary: i.focusVocabulary.map((v) => v.word),
    notes: i.alerts.filter((a) => a.tone === "warn").map((a) => `${a.title}: ${a.detail}`),
  };
  return new NextResponse(JSON.stringify(body, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="ho-so-nang-luc-toeic.json"`,
    },
  });
}
