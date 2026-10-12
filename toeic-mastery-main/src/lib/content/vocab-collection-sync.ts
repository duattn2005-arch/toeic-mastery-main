import "server-only";
import { db } from "@/lib/db";
import type { IigTopic } from "@/lib/content/iig-vocab/types";
import { collectionDbSlug, topicDaySizes, topicWordsPerDayLabel, type VocabCollection } from "@/lib/content/vocab-collections";

const syncPromises = new Map<string, Promise<void>>();

/** Collection content (IIG, ETS 2026, ...) is static TypeScript (deploy =
 * available, no db:seed needed), but the daily path, SRS review and study
 * games all run on the DB vocabulary tables. This mirrors every topic of a
 * collection into those tables — a VocabularyTopic + VocabularyWords, and a
 * VocabularyPath split into days by topicDaySizes() — idempotently, once per
 * server process (i.e. once after each deploy), the first time one of its
 * pages is opened. Word ids stay stable across syncs, so users' SRS/day
 * progress is kept. */
export function ensureCollectionSynced(collection: VocabCollection): Promise<void> {
  let promise = syncPromises.get(collection.key);
  if (!promise) {
    promise = syncCollection(collection).catch((error) => {
      syncPromises.delete(collection.key);
      throw error;
    });
    syncPromises.set(collection.key, promise);
  }
  return promise;
}

async function syncCollection(collection: VocabCollection) {
  await relocateMovedWords(collection);
  for (const [index, topic] of collection.topics.entries()) {
    await syncTopic(collection, topic, index);
  }
}

/** When content moves a word from one topic to another (e.g. a THPT Unit
 * split into its main list and a "Mở rộng" topic), its DB row would stay in
 * the old topic — still showing up in that topic's games and review — while
 * the new topic got a fresh row without the learner's progress. Moving the
 * existing row instead keeps its SRS history. Rows whose word no longer
 * appears anywhere in the collection are left alone. */
async function relocateMovedWords(collection: VocabCollection) {
  const slugs = collection.topics.map((t) => collectionDbSlug(collection, t.slug));
  const existing = await db.vocabularyTopic.findMany({ where: { slug: { in: slugs } }, select: { id: true, slug: true } });
  if (existing.length === 0) return;

  // Every topic a moved word could land in must exist first.
  const topicIdBySlug = new Map(existing.map((t) => [t.slug, t.id]));
  for (const [index, topic] of collection.topics.entries()) {
    const slug = collectionDbSlug(collection, topic.slug);
    if (topicIdBySlug.has(slug)) continue;
    const created = await db.vocabularyTopic.create({ data: { slug, ...topicFields(collection, topic, index) }, select: { id: true } });
    topicIdBySlug.set(slug, created.id);
  }

  const staticWords = new Map<string, Set<string>>(); // topicId -> words
  const ownersByWord = new Map<string, string[]>(); // word -> topicIds listing it
  for (const topic of collection.topics) {
    const topicId = topicIdBySlug.get(collectionDbSlug(collection, topic.slug))!;
    staticWords.set(topicId, new Set(topic.words.map(([word]) => word)));
    for (const [word] of topic.words) ownersByWord.set(word, [...(ownersByWord.get(word) ?? []), topicId]);
  }

  const rows = await db.vocabularyWord.findMany({ where: { topicId: { in: [...topicIdBySlug.values()] } }, select: { id: true, topicId: true, word: true } });
  const present = new Set(rows.map((r) => `${r.topicId}|${r.word}`));
  for (const row of rows) {
    if (staticWords.get(row.topicId)?.has(row.word)) continue;
    const target = ownersByWord.get(row.word)?.find((topicId) => !present.has(`${topicId}|${row.word}`));
    if (!target) continue;
    await db.vocabularyWord.update({ where: { id: row.id }, data: { topicId: target } });
    present.delete(`${row.topicId}|${row.word}`);
    present.add(`${target}|${row.word}`);
  }
}

function topicFields(collection: VocabCollection, topic: IigTopic, index: number) {
  return {
    name: `${collection.shortLabel} · ${topic.title}`,
    description: `${topic.titleVi} — ${topic.summary}`,
    category: collection.category,
    orderIndex: collection.orderBase + index,
  };
}

async function syncTopic(collection: VocabCollection, topic: IigTopic, index: number) {
  const slug = collectionDbSlug(collection, topic.slug);
  const fields = topicFields(collection, topic, index);
  const dbTopic = await db.vocabularyTopic.upsert({
    where: { slug },
    create: { slug, ...fields },
    update: fields,
  });

  const existing = await db.vocabularyWord.findMany({ where: { topicId: dbTopic.id } });
  const byWord = new Map(existing.map((w) => [w.word, w]));

  const missing = topic.words.filter(([word]) => !byWord.has(word));
  if (missing.length > 0) {
    await db.vocabularyWord.createMany({
      data: missing.map(([word, pos, ipa, meaning, example]) => ({
        topicId: dbTopic.id,
        word,
        partOfSpeech: pos || null,
        ipa: ipa || null,
        meaningVi: meaning,
        exampleEn: example || null,
      })),
      skipDuplicates: true,
    });
  }

  // Changed words are written in one statement per topic — a content update
  // (e.g. IPA added to all 1,600 ETS words) must not turn the first page
  // load after a deploy into thousands of sequential round trips.
  const changed: { id: string; partOfSpeech: string | null; ipa: string | null; meaningVi: string; exampleEn: string | null }[] = [];
  for (const [word, pos, ipa, meaning, example] of topic.words) {
    const row = byWord.get(word);
    if (!row) continue;
    const data = { partOfSpeech: pos || null, ipa: ipa || null, meaningVi: meaning, exampleEn: example || null };
    if (row.partOfSpeech !== data.partOfSpeech || row.ipa !== data.ipa || row.meaningVi !== data.meaningVi || row.exampleEn !== data.exampleEn) {
      changed.push({ id: row.id, ...data });
    }
  }
  if (changed.length > 0) {
    await db.$executeRaw`
      UPDATE vocabulary_words AS w
      SET part_of_speech = v.pos, ipa = v.ipa, meaning_vi = v.meaning, example_en = v.example, updated_at = now()
      FROM unnest(
        ${changed.map((c) => c.id)}::uuid[],
        ${changed.map((c) => c.partOfSpeech)}::text[],
        ${changed.map((c) => c.ipa)}::text[],
        ${changed.map((c) => c.meaningVi)}::text[],
        ${changed.map((c) => c.exampleEn)}::text[]
      ) AS v(id, pos, ipa, meaning, example)
      WHERE w.id = v.id`;
  }

  const words = await db.vocabularyWord.findMany({ where: { topicId: dbTopic.id }, select: { id: true, word: true } });
  const idByWord = new Map(words.map((w) => [w.word, w.id]));
  const orderedIds = topic.words.map(([word]) => idByWord.get(word)).filter((id): id is string => Boolean(id));

  const daySizes = topicDaySizes(collection, topic);
  const dayCount = daySizes.length;
  const pathFields = {
    title: `Lộ trình ${topic.title} (${dayCount} ngày)`,
    description: `Học ${topic.words.length} từ ${collection.label} — ${topic.titleVi}, mỗi ngày ${topicWordsPerDayLabel(collection, topic)} từ.`,
  };
  const path = await db.vocabularyPath.upsert({
    where: { slug },
    create: { slug, ...pathFields },
    update: pathFields,
  });

  for (let d = 0; d < dayCount; d++) {
    const dayNumber = d + 1;
    const start = daySizes.slice(0, d).reduce((sum, size) => sum + size, 0);
    const dayWordIds = orderedIds.slice(start, start + daySizes[d]);
    const day = await db.vocabularyPathDay.upsert({
      where: { pathId_dayNumber: { pathId: path.id, dayNumber } },
      create: { pathId: path.id, dayNumber, tierLabel: topic.title },
      update: { tierLabel: topic.title },
      include: { words: { orderBy: { orderIndex: "asc" }, select: { vocabularyWordId: true } } },
    });
    const current = day.words.map((w) => w.vocabularyWordId);
    if (current.join(",") !== dayWordIds.join(",")) {
      await db.$transaction([
        db.vocabularyPathDayWord.deleteMany({ where: { dayId: day.id } }),
        db.vocabularyPathDayWord.createMany({
          data: dayWordIds.map((vocabularyWordId, orderIndex) => ({ dayId: day.id, vocabularyWordId, orderIndex })),
        }),
      ]);
    }
  }

  await db.vocabularyPathDay.deleteMany({ where: { pathId: path.id, dayNumber: { gt: dayCount } } });
}
