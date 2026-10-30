import "server-only";
import { db } from "@/lib/db";
import { PART_META } from "@/lib/constants/toeic";
import type { ScoredBloomLevel } from "./config";
import { parseKnowledgeLabel, type KnowledgeLabel } from "./classify";
import { bloomOfQuestion } from "./from-question";
import { buildBloomProfile, frontierLevel, type BloomProfile, type Frontier } from "./engine";
import { loadBloomAttempts, loadRememberSignals } from "./evidence";

/**
 * Ngân hàng câu theo ô (nhãn chính × bậc): nhãn nào có câu ở bậc nào — để
 * nguyên tắc tầng chỉ xét các bậc thực sự ra đề được. Nhớ tạm 10 phút (cả
 * site dùng chung, ngân hàng ít thay đổi).
 */
const TTL_MS = 10 * 60_000;
let cache: { at: number; levels: Map<KnowledgeLabel, ScoredBloomLevel[]> } | null = null;

export async function getBankLevels(): Promise<Map<KnowledgeLabel, ScoredBloomLevel[]>> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.levels;
  const rows = await db.question.findMany({
    where: { status: "PUBLISHED" },
    select: { part: true, prompt: true, correctLabel: true, difficulty: true, grammarTopicSlug: true, strategicLabelSlugs: true, bloomLevel: true, passage: { select: { layout: true } } },
  });
  const sets = new Map<KnowledgeLabel, Set<ScoredBloomLevel>>();
  for (const q of rows) {
    const { knowledgeLabel, level } = bloomOfQuestion(q);
    const set = sets.get(knowledgeLabel) ?? new Set<ScoredBloomLevel>();
    set.add(level);
    sets.set(knowledgeLabel, set);
  }
  const levels = new Map([...sets.entries()].map(([k, v]) => [k, [...v].sort((a, b) => a - b)]));
  cache = { at: Date.now(), levels };
  return levels;
}

export interface BloomLabelRow {
  label: KnowledgeLabel;
  kind: "grammar" | "strategy" | "vocab" | "part";
  key: string;
  title: string;
  /** Bậc mà ngân hàng có câu cho nhãn này. */
  available: ScoredBloomLevel[];
  frontier: Frontier;
  attempts: number;
}

export interface LearnerBloom {
  profile: BloomProfile;
  rows: BloomLabelRow[];
  remember: { lookups30d: number; savedWords: number };
}

/** Hồ sơ Bloom đầy đủ của một người học + bậc rìa của từng nhãn. */
export async function getLearnerBloom(userId: string): Promise<LearnerBloom> {
  const [attempts, bank, remember, topics, labels] = await Promise.all([
    loadBloomAttempts(userId),
    getBankLevels(),
    loadRememberSignals(userId),
    db.grammarTopic.findMany({ select: { slug: true, title: true } }),
    db.strategicLabel.findMany({ select: { slug: true, title: true } }),
  ]);
  const profile = buildBloomProfile(attempts);
  const topicTitle = new Map(topics.map((t) => [t.slug, t.title]));
  const labelTitle = new Map(labels.map((l) => [l.slug, l.title]));
  const titleOf = (label: KnowledgeLabel) => {
    const { kind, key } = parseKnowledgeLabel(label);
    if (kind === "vocab") return "Từ vựng";
    if (kind === "grammar") return topicTitle.get(key) ?? key;
    if (kind === "strategy") return labelTitle.get(key) ?? key;
    return PART_META[key as keyof typeof PART_META]?.label ?? key;
  };

  const rows: BloomLabelRow[] = Object.entries(profile.heatmap).map(([label, row]) => {
    const { kind, key } = parseKnowledgeLabel(label);
    const seen = Object.keys(row).map(Number) as ScoredBloomLevel[];
    const available = [...new Set([...(bank.get(label) ?? []), ...seen])].sort((a, b) => a - b);
    return {
      label,
      kind,
      key,
      title: titleOf(label),
      available,
      frontier: frontierLevel(row, available),
      attempts: Object.values(row).reduce((s, c) => s + (c?.attempts ?? 0), 0),
    };
  });
  // Lowest thinking level first, then the labels with the most evidence.
  rows.sort((a, b) => (a.frontier.level ?? 9) - (b.frontier.level ?? 9) || b.attempts - a.attempts);
  return { profile, rows, remember };
}
