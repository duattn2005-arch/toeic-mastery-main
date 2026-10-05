import "server-only";
import { db } from "@/lib/db";
import { IIG_WORDS_PER_DAY } from "@/lib/content/iig-vocab";
import type { IigTopic } from "@/lib/content/iig-vocab/types";
import { collectionDayCount, collectionDbSlug, type VocabCollection } from "@/lib/content/vocab-collections";

const syncPromises = new Map<string, Promise<void>>();

/** Collection content (IIG, ETS 2026, ...) is static TypeScript (deploy =
 * available, no db:seed needed), but the daily path, SRS review and study
 * games all run on the DB vocabulary tables. This mirrors every topic of a
 * collection into those tables — a VocabularyTopic + VocabularyWords, and a
 * VocabularyPath of IIG_WORDS_PER_DAY-word days — idempotently, once per
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
  for (const [index, topic] of collection.topics.entries()) {
    await syncTopic(collection, topic, index);
  }
}

async function syncTopic(collection: VocabCollection, topic: IigTopic, index: number) {
  const slug = collectionDbSlug(collection, topic.slug);
  const topicFields = {
    name: `${collection.shortLabel} · ${topic.title}`,
    description: `${topic.titleVi} — ${topic.summary}`,
    category: collection.category,
    orderIndex: collection.orderBase + index,
  };
  const dbTopic = await db.vocabularyTopic.upsert({
    where: { slug },
    create: { slug, ...topicFields },
    update: topicFields,
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

  const dayCount = collectionDayCount(topic);
  const pathFields = {
    title: `Lộ trình ${topic.title} (${dayCount} ngày)`,
    description: `Học ${topic.words.length} từ ${collection.label} — ${topic.titleVi}, mỗi ngày ${IIG_WORDS_PER_DAY} từ.`,
  };
  const path = await db.vocabularyPath.upsert({
    where: { slug },
    create: { slug, ...pathFields },
    update: pathFields,
  });

  for (let d = 0; d < dayCount; d++) {
    const dayNumber = d + 1;
    const dayWordIds = orderedIds.slice(d * IIG_WORDS_PER_DAY, (d + 1) * IIG_WORDS_PER_DAY);
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
