import "server-only";
import { db } from "@/lib/db";
import {
  MASTERY_THRESHOLD as GATE_PASS_THRESHOLD,
  MIN_SAMPLE_FOR_WEAKNESS,
  NOISE_MAX_SECONDS,
  NOISE_MIN_SECONDS,
  PART_STANDARD_SECONDS,
  SPEED_BONUS_MAX,
  TRAP_PENALTY,
  TRAP_PENALTY_MAX,
  WEAK_THRESHOLD as HONG_LABEL_THRESHOLD,
} from "@/lib/bloom/config";
import { PART_META } from "@/lib/constants/toeic";
import type { SkillDimensionType, TestPart } from "@/generated/prisma/enums";

/**
 * "Bản đồ nhiệt năng lực" (docs/ai-mentor-architecture.md mục 12) — a
 * weighted competency score per label, layered ON TOP OF SkillMastery
 * rather than replacing it (mục 12.2 điểm 1's confirmed direction):
 * SkillMastery.masteryScore stays the plain EWMA of correct/incorrect that
 * getWeakestDimensions/evaluateLevelGate/learning-path-generator already
 * depend on; this module computes a separate, richer score
 * (accuracy + speed bonus - answer-switch trap penalty) straight from raw
 * AttemptAnswer/MentorTestQuestion rows, used only by the heatmap
 * endpoint/UI — nothing here writes back to SkillMastery.
 */

// All numbers from the one Bloom config (src/lib/bloom/config.ts). The
// label x Bloom-level heatmap itself lives in src/lib/bloom/engine.ts.
const MIN_SAMPLE_SIZE = MIN_SAMPLE_FOR_WEAKNESS;

/** "Đoán mò"/"mất tập trung" cutoffs from the Cấp AI spec's mục IV bước 2
 * (<8-10s / >2.5 phút). Answers outside this range are excluded from the
 * speed calculation entirely (mục 12.2 điểm 2's confirmed direction: apply
 * this filter to the heatmap, but never to evaluateLevelGate's own scoring,
 * which stays exactly as decided in mục 10.2). A timeSpentSec of exactly 0
 * (MentorTestQuestion rows — mục 11.5, no route writes real timing there
 * yet) is naturally excluded by this same range check, no special case
 * needed. */
const NOISE_MIN_SEC = NOISE_MIN_SECONDS;
const NOISE_MAX_SEC = NOISE_MAX_SECONDS;

const MAX_SPEED_BONUS = SPEED_BONUS_MAX;
const MAX_TRAP_PENALTY = TRAP_PENALTY_MAX;

export type HeatmapBand = "RED" | "YELLOW" | "GREEN";

export interface HeatmapEntry {
  dimensionType: SkillDimensionType;
  dimensionKey: string;
  attemptedCount: number;
  baseAccuracy: number;
  speedBonus: number;
  trapPenalty: number;
  weightedScore: number;
  band: HeatmapBand;
}

function bandFor(score: number): HeatmapBand {
  if (score >= GATE_PASS_THRESHOLD) return "GREEN";
  if (score >= HONG_LABEL_THRESHOLD) return "YELLOW";
  return "RED";
}

interface Bucket {
  total: number;
  correct: number;
  /** Only real, noise-filtered timing — see NOISE_MIN_SEC/MAX_SEC above. */
  timedTotal: number;
  timedSumSec: number;
  switchTotal: number;
  switchToWrong: number;
}

interface RawAnswer {
  isCorrect: boolean | null;
  timeSpentSec: number;
  initialSelectedLabel: string | null;
  selectedLabel: string | null;
  question: { part: TestPart; grammarTopicSlug: string | null; strategicLabelSlugs: string[]; correctLabel: string };
}

/**
 * Reads every graded answer this learner has (regular practice Attempts +
 * every MentorTest type) and folds it into per-label buckets, then turns
 * each bucket into a weighted score — mirrors skill-mastery.ts's own
 * PART/GRAMMAR_TOPIC/STRATEGIC_LABEL bucketing so the heatmap's label set
 * matches what the rest of the AI Mentor engine already tracks.
 */
export async function buildCompetencyHeatmap(userId: string): Promise<HeatmapEntry[]> {
  const buckets = new Map<string, Bucket>();

  const bump = (dimensionType: SkillDimensionType, dimensionKey: string): Bucket => {
    const key = `${dimensionType}:${dimensionKey}`;
    let bucket = buckets.get(key);
    if (!bucket) {
      bucket = { total: 0, correct: 0, timedTotal: 0, timedSumSec: 0, switchTotal: 0, switchToWrong: 0 };
      buckets.set(key, bucket);
    }
    return bucket;
  };

  const apply = (a: RawAnswer) => {
    const isCorrect = a.isCorrect === true;
    const labels: { dimensionType: SkillDimensionType; dimensionKey: string }[] = [{ dimensionType: "PART", dimensionKey: a.question.part }];
    if (a.question.grammarTopicSlug) labels.push({ dimensionType: "GRAMMAR_TOPIC", dimensionKey: a.question.grammarTopicSlug });
    for (const slug of a.question.strategicLabelSlugs) labels.push({ dimensionType: "STRATEGIC_LABEL", dimensionKey: slug });

    for (const label of labels) {
      const bucket = bump(label.dimensionType, label.dimensionKey);
      bucket.total += 1;
      if (isCorrect) bucket.correct += 1;
      if (a.timeSpentSec >= NOISE_MIN_SEC && a.timeSpentSec <= NOISE_MAX_SEC) {
        bucket.timedTotal += 1;
        bucket.timedSumSec += a.timeSpentSec;
      }
      if (a.initialSelectedLabel) {
        bucket.switchTotal += 1;
        if (a.initialSelectedLabel === a.question.correctLabel && a.selectedLabel !== a.question.correctLabel) {
          bucket.switchToWrong += 1;
        }
      }
    }
  };

  const [attemptAnswers, mentorAnswers] = await Promise.all([
    db.attemptAnswer.findMany({
      where: { attempt: { userId }, isCorrect: { not: null } },
      select: {
        isCorrect: true,
        timeSpentSec: true,
        initialSelectedLabel: true,
        selectedLabel: true,
        question: { select: { part: true, grammarTopicSlug: true, strategicLabelSlugs: true, correctLabel: true } },
      },
    }),
    db.mentorTestQuestion.findMany({
      where: { mentorTest: { userId }, isCorrect: { not: null } },
      select: {
        isCorrect: true,
        timeSpentSec: true,
        initialSelectedLabel: true,
        selectedLabel: true,
        question: { select: { part: true, grammarTopicSlug: true, strategicLabelSlugs: true, correctLabel: true } },
      },
    }),
  ]);

  for (const a of attemptAnswers) apply(a);
  for (const a of mentorAnswers) apply(a);

  const entries: HeatmapEntry[] = [];
  for (const [key, bucket] of buckets) {
    if (bucket.total < MIN_SAMPLE_SIZE) continue;
    const [dimensionType, dimensionKey] = key.split(":") as [SkillDimensionType, string];
    const baseAccuracy = bucket.correct / bucket.total;

    let speedBonus = 0;
    if (dimensionType === "PART" && bucket.timedTotal > 0) {
      const target = PART_STANDARD_SECONDS[dimensionKey as TestPart] ?? PART_META[dimensionKey as TestPart].targetSeconds;
      const avg = bucket.timedSumSec / bucket.timedTotal;
      if (avg <= target) speedBonus = Math.min(MAX_SPEED_BONUS, ((target - avg) / target) * MAX_SPEED_BONUS);
    }

    let trapPenalty = 0;
    if (bucket.switchTotal > 0) {
      const switchRate = bucket.switchToWrong / bucket.switchTotal;
      trapPenalty = Math.min(MAX_TRAP_PENALTY, switchRate * TRAP_PENALTY);
    }

    const weightedScore = Math.max(0, Math.min(1, baseAccuracy + speedBonus - trapPenalty));
    entries.push({
      dimensionType,
      dimensionKey,
      attemptedCount: bucket.total,
      baseAccuracy,
      speedBonus,
      trapPenalty,
      weightedScore,
      band: bandFor(weightedScore),
    });
  }

  return entries.sort((a, b) => a.weightedScore - b.weightedScore);
}
