import "server-only";
import { getBankLevels, getLearnerBloom } from "./bank";
import { bloomOfQuestion } from "./from-question";
import { frontierLevel } from "./engine";
import type { ScoredBloomLevel } from "./config";
import type { TestPart } from "@/generated/prisma/enums";

type Candidate = { id: string; part: TestPart; passageId: string | null; testId: string | null; orderIndex: number };

/**
 * Nguyên tắc tầng (src/lib/bloom): a question may be served only when its
 * Bloom level is at or below the frontier of ITS OWN knowledge label — the
 * lowest level of that label the learner hasn't mastered yet. `rank` puts
 * questions exactly at the frontier (or at the level asked for) first.
 */
export interface BloomGate {
  allow: (q: BloomFields) => boolean;
  rank: (q: BloomFields) => number;
}
export type BloomFields = Candidate & {
  prompt: string;
  correctLabel: string;
  difficulty: string;
  grammarTopicSlug: string | null;
  strategicLabelSlugs: string[];
  bloomLevel: number | null;
  passage: { layout: string } | null;
};
export const BLOOM_SELECT = {
  id: true,
  part: true,
  passageId: true,
  testId: true,
  orderIndex: true,
  prompt: true,
  correctLabel: true,
  difficulty: true,
  grammarTopicSlug: true,
  strategicLabelSlugs: true,
  bloomLevel: true,
  passage: { select: { layout: true } },
} as const;

export async function bloomGate(userId: string, askedLevel?: number): Promise<BloomGate> {
  const [learner, bank] = await Promise.all([getLearnerBloom(userId), getBankLevels()]);
  const rows = new Map(learner.rows.map((r) => [r.label, r]));
  const capOf = new Map<string, { max: ScoredBloomLevel; frontier: ScoredBloomLevel | null }>();
  const cap = (label: string) => {
    let c = capOf.get(label);
    if (!c) {
      const row = rows.get(label);
      const f = row ? row.frontier : frontierLevel(undefined, bank.get(label) ?? undefined);
      c = { max: f.maxAllowed, frontier: f.level };
      capOf.set(label, c);
    }
    return c;
  };
  return {
    allow: (q) => {
      const { level, knowledgeLabel } = bloomOfQuestion(q);
      const { max } = cap(knowledgeLabel);
      return level <= Math.min(max, askedLevel ?? 5);
    },
    rank: (q) => {
      const { level, knowledgeLabel } = bloomOfQuestion(q);
      const target = askedLevel ? Math.min(askedLevel, cap(knowledgeLabel).max) : (cap(knowledgeLabel).frontier ?? level);
      return level === target ? 0 : 1;
    },
  };
}
