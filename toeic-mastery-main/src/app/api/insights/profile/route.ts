import { NextResponse } from "next/server";
import { getAuthedProfileOrNull } from "@/lib/auth";
import { buildLearningInsights, STATUS_LABEL, type SkillStat } from "@/lib/services/insights/engine";
import { PART_META } from "@/lib/constants/toeic";
import type { TestPart } from "@/generated/prisma/enums";
import { BLOOM_BY_ID, SCORED_LEVELS } from "@/lib/bloom/config";

const round = (x: number | null) => (x === null ? null : Math.round(x * 100) / 100);

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
    // Thang Bloom (src/lib/bloom): thinking levels, tier, and where each label stands.
    bloom: {
      tier: i.bloom.profile.tier,
      levels: SCORED_LEVELS.map((l) => {
        const m = i.bloom.profile.levels[l];
        return { level: l, name: BLOOM_BY_ID.get(l)!.nameVi, tier: m.tier, score: round(m.score), mastered: m.mastered, attempts: m.attempts, blockers: m.blockers };
      }),
      labels: i.bloom.rows.map((r) => ({
        label: r.label,
        title: r.title,
        frontierLevel: r.frontier.level,
        cells: Object.fromEntries(
          Object.entries(i.bloom.profile.heatmap[r.label] ?? {}).map(([lv, c]) => [lv, { score: round(c!.score), status: c!.inferred ? "inferred" : c!.status, attempts: c!.attempts }])
        ),
      })),
      behavior: i.bloom.profile.behavior,
      noiseRemoved: i.bloom.profile.noise,
    },
  };
  return new NextResponse(JSON.stringify(body, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="ho-so-nang-luc-toeic.json"`,
    },
  });
}
