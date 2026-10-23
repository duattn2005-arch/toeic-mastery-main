import "server-only";
import { db } from "@/lib/db";
import { Prisma } from "@/generated/prisma/client";
import type { Difficulty, TestPart } from "@/generated/prisma/enums";
import { STRATEGIC_LABELS } from "../../../../prisma/seed-data/strategic-labels";
import { CALIBRATION_MIN_ANSWERS, calibrateDifficulty, tagQuestion, type TagInput } from "./rules";
import { runAiLabelling } from "./ai-labeller";

/**
 * Runs the rule-based labeller (rules.ts) over the question bank and writes
 * the labels back — the job behind "every question on the site is labelled
 * and distilled". Safe to run any time and as often as wanted:
 *
 *  - A label an admin set by hand is never touched. `labelMeta.auto` lists
 *    the fields the labeller set itself; only those, or empty ones, change.
 *    Admin saves clear labelMeta, so whatever they saved becomes manual.
 *  - Difficulty is distilled from real answers once a question has
 *    CALIBRATION_MIN_ANSWERS of them (how hard learners actually found it),
 *    and re-distilled on every run as answers accumulate; before that a
 *    rule-based estimate stands in.
 *  - Rows are only written when something actually changed.
 *
 * Part 5/6 questions the rules can't read then go to the AI pass
 * (ai-labeller.ts).
 *
 * Triggered by the in-process scheduler (instrumentation-node.ts) after
 * every deploy and daily, right after an admin saves questions, and from
 * Admin → Câu hỏi → Nhãn & chưng cất.
 */

/** Bump when rules.ts changes meaningfully — every auto label is refreshed. */
export const TAGGER_VERSION = 2;
const BATCH = 300;

export type Field = "grammar" | "strategy" | "vocab" | "difficulty";
export interface LabelMeta {
  v: number;
  auto: Field[];
  difficultySource?: "data" | "rule";
  answers?: number;
  at: string;
  reasons?: string[];
  /** Set once the AI pass has read the question; `fields` are the ones it filled. */
  ai?: { at: string; fields: Field[] };
}

export interface TaggingSummary {
  scanned: number;
  updated: number;
  grammar: number;
  strategy: number;
  vocab: number;
  difficultyFromData: number;
  difficultyFromRules: number;
  ai: number;
  startedAt: string;
  finishedAt: string;
  trigger: string;
}

/** Live progress for the admin page (the server is one long-lived process). */
export const taggingState: { running: boolean; trigger: string | null; scanned: number; total: number; last: TaggingSummary | null } = {
  running: false,
  trigger: null,
  scanned: 0,
  total: 0,
  last: null,
};

/** Makes sure every label in the taxonomy exists (deploys don't run the seed). */
export async function ensureStrategicLabels() {
  await Promise.all(
    STRATEGIC_LABELS.map((l, i) =>
      db.strategicLabel.upsert({
        where: { slug: l.slug },
        create: { slug: l.slug, title: l.title, category: l.category, appliesToParts: l.appliesToParts, orderIndex: i },
        update: { title: l.title, category: l.category, appliesToParts: l.appliesToParts, orderIndex: i },
      })
    )
  );
}

function readMeta(raw: Prisma.JsonValue | null): LabelMeta | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const m = raw as unknown as LabelMeta;
  return Array.isArray(m.auto) ? m : null;
}

const sameList = (a: string[], b: string[]) => a.length === b.length && a.every((x, i) => x === b[i]);

/**
 * @param ids     only these questions (after an admin save); all otherwise
 * @param onlyStale  skip questions already labelled by this version and not
 *                   edited since — the cheap periodic pass
 */
export async function runQuestionTagging(opts: { ids?: string[]; onlyStale?: boolean; trigger?: string } = {}): Promise<TaggingSummary | null> {
  if (taggingState.running && !opts.ids) return null;
  const trigger = opts.trigger ?? (opts.ids ? "admin-save" : "manual");
  const startedAt = new Date().toISOString();
  const summary: TaggingSummary = { scanned: 0, updated: 0, grammar: 0, strategy: 0, vocab: 0, difficultyFromData: 0, difficultyFromRules: 0, ai: 0, startedAt, finishedAt: startedAt, trigger };
  const track = !opts.ids;
  if (track) Object.assign(taggingState, { running: true, trigger, scanned: 0, total: 0 });

  try {
    await ensureStrategicLabels();
    const [topics, words, answerTotals, answerRight] = await Promise.all([
      db.grammarTopic.findMany({ select: { id: true, slug: true } }),
      db.vocabularyWord.findMany({ select: { word: true } }),
      db.attemptAnswer.groupBy({
        by: ["questionId"],
        where: { selectedLabel: { not: null }, attempt: { status: "SUBMITTED" }, ...(opts.ids ? { questionId: { in: opts.ids } } : {}) },
        _count: { _all: true },
      }),
      db.attemptAnswer.groupBy({
        by: ["questionId"],
        where: { selectedLabel: { not: null }, isCorrect: true, attempt: { status: "SUBMITTED" }, ...(opts.ids ? { questionId: { in: opts.ids } } : {}) },
        _count: { _all: true },
      }),
    ]);
    const topicId = new Map(topics.map((t) => [t.slug, t.id]));
    const knownWords = new Set(words.map((w) => w.word.trim().toLowerCase()).filter((w) => /^[a-z][a-z-]+$/.test(w)));
    const totals = new Map(answerTotals.map((a) => [a.questionId, a._count._all]));
    const rights = new Map(answerRight.map((a) => [a.questionId, a._count._all]));

    const where: Prisma.QuestionWhereInput = opts.ids ? { id: { in: opts.ids } } : {};
    if (track) taggingState.total = await db.question.count({ where });

    let cursor: string | undefined;
    for (;;) {
      const batch = await db.question.findMany({
        where,
        orderBy: { id: "asc" },
        take: BATCH,
        ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
        select: {
          id: true,
          part: true,
          prompt: true,
          correctLabel: true,
          explanationVi: true,
          transcript: true,
          grammarTopicSlug: true,
          strategicLabelSlugs: true,
          vocabularyFocus: true,
          difficulty: true,
          labelMeta: true,
          updatedAt: true,
          passageId: true,
          orderIndex: true,
          options: { select: { label: true, content: true }, orderBy: { label: "asc" } },
          passage: { select: { layout: true, transcript: true, questions: { select: { id: true }, orderBy: { orderIndex: "asc" } } } },
        },
      });
      if (batch.length === 0) break;
      cursor = batch[batch.length - 1].id;

      const writes: Prisma.PrismaPromise<unknown>[] = [];
      for (const q of batch) {
        summary.scanned++;
        const old = readMeta(q.labelMeta);
        const n = totals.get(q.id) ?? 0;
        // New answers only matter while the labeller owns the difficulty.
        const answersMoved = !!old?.auto.includes("difficulty") && n !== old.answers && (n >= CALIBRATION_MIN_ANSWERS || old.difficultySource === "data");
        const stale = !old || old.v < TAGGER_VERSION || q.updatedAt.getTime() - Date.parse(old.at) > 10_000 || answersMoved;
        if (opts.onlyStale && !stale) continue;

        const input: TagInput = {
          part: q.part as TagInput["part"],
          prompt: q.prompt ?? "",
          options: q.options,
          correctLabel: q.correctLabel,
          explanationVi: q.explanationVi ?? "",
          transcript: q.transcript ?? q.passage?.transcript ?? null,
          passageLayout: q.passage?.layout ?? null,
          groupIndex: q.passage ? Math.max(0, q.passage.questions.findIndex((x) => x.id === q.id)) : 0,
        };
        const r = tagQuestion(input, knownWords);
        const auto = new Set<Field>(old?.auto ?? []);
        const may = (f: Field, empty: boolean) => empty || auto.has(f);
        // What the AI filled stays while the rules still find nothing there.
        const aiFields = new Set(old?.ai?.fields ?? []);
        const data: Prisma.QuestionUpdateInput = {};

        if ((q.part === "PART5" || q.part === "PART6") && may("grammar", !q.grammarTopicSlug)) {
          const slug = r.grammarTopicSlug && topicId.has(r.grammarTopicSlug) ? r.grammarTopicSlug : aiFields.has("grammar") ? q.grammarTopicSlug : null;
          if (slug !== q.grammarTopicSlug && (slug || auto.has("grammar"))) {
            data.grammarTopicSlug = slug;
            data.grammarTopic = slug ? { connect: { id: topicId.get(slug)! } } : { disconnect: true };
            summary.grammar++;
          }
          if (slug) auto.add("grammar");
          else auto.delete("grammar");
          if (slug !== q.grammarTopicSlug || r.grammarTopicSlug) aiFields.delete("grammar");
        }
        if (r.strategicLabelSlugs.length) aiFields.delete("strategy");
        if (may("strategy", q.strategicLabelSlugs.length === 0) && !aiFields.has("strategy")) {
          if (!sameList(r.strategicLabelSlugs, q.strategicLabelSlugs) && (r.strategicLabelSlugs.length || auto.has("strategy"))) {
            data.strategicLabelSlugs = r.strategicLabelSlugs;
            summary.strategy++;
          }
          if (r.strategicLabelSlugs.length) auto.add("strategy");
        }
        if (may("vocab", q.vocabularyFocus.length === 0)) {
          if (!sameList(r.vocabularyFocus, q.vocabularyFocus) && (r.vocabularyFocus.length || auto.has("vocab"))) {
            data.vocabularyFocus = r.vocabularyFocus;
            summary.vocab++;
          }
          if (r.vocabularyFocus.length) auto.add("vocab");
        }
        // Difficulty is never "empty"; a never-labelled MEDIUM (the default)
        // counts as unset.
        let difficultySource = old?.difficultySource;
        if (may("difficulty", !old && q.difficulty === "MEDIUM")) {
          const measured = calibrateDifficulty(n, rights.get(q.id) ?? 0);
          const next: Difficulty = measured ?? r.difficulty;
          difficultySource = measured ? "data" : "rule";
          if (next !== q.difficulty) {
            data.difficulty = next;
            if (measured) summary.difficultyFromData++;
            else summary.difficultyFromRules++;
          }
          auto.add("difficulty");
        }

        const ai = old?.ai && { at: old.ai.at, fields: old.ai.fields.filter((f) => aiFields.has(f)) };
        const meta: LabelMeta = { v: TAGGER_VERSION, auto: [...auto], difficultySource, answers: n, at: new Date().toISOString(), reasons: r.reasons.slice(0, 6), ...(ai ? { ai } : {}) };
        const metaChanged = !old || old.v !== meta.v || !sameList([...old.auto].sort(), [...meta.auto].sort()) || old.difficultySource !== meta.difficultySource || (answersMoved && old.answers !== meta.answers);
        if (Object.keys(data).length === 0 && !metaChanged && !stale) continue;
        data.labelMeta = meta as unknown as Prisma.InputJsonValue;
        writes.push(db.question.update({ where: { id: q.id }, data, select: { id: true } }));
        if (Object.keys(data).length > 1) summary.updated++;
      }
      for (let i = 0; i < writes.length; i += 50) await db.$transaction(writes.slice(i, i + 50));
      if (track) taggingState.scanned = summary.scanned;
      if (batch.length < BATCH) break;
    }
    summary.ai = await runAiLabelling({ ids: opts.ids }).catch((err) => {
      console.error("[tagging] AI pass failed", err);
      return 0;
    });
  } finally {
    summary.finishedAt = new Date().toISOString();
    if (track) Object.assign(taggingState, { running: false, last: summary });
  }
  if (track) console.log(`[tagging] ${trigger}: scanned ${summary.scanned}, updated ${summary.updated}`);
  return summary;
}

/** Labels freshly saved questions in the background — never blocks the save. */
export function tagQuestionsSoon(ids: string[]) {
  if (ids.length === 0) return;
  setTimeout(() => {
    runQuestionTagging({ ids, trigger: "admin-save" }).catch((err) => console.error("[tagging] admin-save failed", err));
  }, 500).unref?.();
}

/** Coverage numbers for Admin → Nhãn & chưng cất. */
export async function getTaggingCoverage() {
  const [byPart, labelRows, topicRows, diffRows] = await Promise.all([
    db.$queryRaw<{ part: TestPart; total: bigint; strategy: bigint; grammar: bigint; vocab: bigint; auto: bigint; data_difficulty: bigint }[]>`
      SELECT part,
        COUNT(*) AS total,
        COUNT(*) FILTER (WHERE cardinality(strategic_label_slugs) > 0) AS strategy,
        COUNT(*) FILTER (WHERE grammar_topic_slug IS NOT NULL) AS grammar,
        COUNT(*) FILTER (WHERE cardinality(vocabulary_focus) > 0) AS vocab,
        COUNT(*) FILTER (WHERE label_meta IS NOT NULL) AS auto,
        COUNT(*) FILTER (WHERE label_meta->>'difficultySource' = 'data') AS data_difficulty
      FROM questions GROUP BY part ORDER BY part`,
    db.$queryRaw<{ slug: string; n: bigint }[]>`SELECT unnest(strategic_label_slugs) AS slug, COUNT(*) AS n FROM questions GROUP BY 1 ORDER BY 2 DESC`,
    db.$queryRaw<{ slug: string; n: bigint }[]>`SELECT grammar_topic_slug AS slug, COUNT(*) AS n FROM questions WHERE grammar_topic_slug IS NOT NULL GROUP BY 1 ORDER BY 2 DESC`,
    db.$queryRaw<{ difficulty: Difficulty; n: bigint }[]>`SELECT difficulty, COUNT(*) AS n FROM questions GROUP BY 1`,
  ]);
  const num = (x: bigint) => Number(x);
  return {
    parts: byPart.map((p) => ({ part: p.part, total: num(p.total), strategy: num(p.strategy), grammar: num(p.grammar), vocab: num(p.vocab), auto: num(p.auto), dataDifficulty: num(p.data_difficulty) })),
    labels: labelRows.map((l) => ({ slug: l.slug, count: num(l.n) })),
    topics: topicRows.map((t) => ({ slug: t.slug, count: num(t.n) })),
    difficulty: diffRows.map((d) => ({ level: d.difficulty, count: num(d.n) })),
  };
}
