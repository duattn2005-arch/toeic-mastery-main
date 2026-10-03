import "server-only";
import { db } from "@/lib/db";
import { IIG_TOPICS, IIG_WORDS_PER_DAY } from "@/lib/content/iig-vocab";
import type { IigTopic } from "@/lib/content/iig-vocab/types";

/** Category of the DB VocabularyTopic rows mirrored from IIG content —
 * excluded from the regular "Theo chủ đề"/band/Part topic tabs, since IIG
 * has its own tab and pages. */
export const IIG_CATEGORY = "IIG Vocab";

/** Slug shared by the mirrored VocabularyTopic and its VocabularyPath. */
export function iigDbSlug(slug: string) {
  return `iig-${slug}`;
}

export function iigDayCount(topic: IigTopic) {
  return Math.ceil(topic.words.length / IIG_WORDS_PER_DAY);
}

let syncPromise: Promise<void> | null = null;

/** IIG content is static TypeScript (deploy = available, no db:seed needed),
 * but the daily path, SRS review and study games all run on the DB
 * vocabulary tables. This mirrors every IIG topic into those tables —
 * a VocabularyTopic + VocabularyWords, and a VocabularyPath of
 * IIG_WORDS_PER_DAY-word days — idempotently, once per server process
 * (i.e. once after each deploy), the first time an IIG page is opened.
 * Word ids stay stable across syncs, so users' SRS/day progress is kept. */
export function ensureIigContentSynced(): Promise<void> {
  if (!syncPromise) {
    syncPromise = syncAll().catch((error) => {
      syncPromise = null;
      throw error;
    });
  }
  return syncPromise;
}

async function syncAll() {
  for (const [index, topic] of IIG_TOPICS.entries()) {
    await syncTopic(topic, index);
  }
}

async function syncTopic(topic: IigTopic, index: number) {
  const slug = iigDbSlug(topic.slug);
  const topicFields = {
    name: `IIG · ${topic.title}`,
    description: `${topic.titleVi} — ${topic.summary}`,
    category: IIG_CATEGORY,
    orderIndex: 1000 + index,
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
        partOfSpeech: pos,
        ipa: ipa || null,
        meaningVi: meaning,
        exampleEn: example,
      })),
      skipDuplicates: true,
    });
  }

  for (const [word, pos, ipa, meaning, example] of topic.words) {
    const row = byWord.get(word);
    if (!row) continue;
    const ipaValue = ipa || null;
    if (row.partOfSpeech !== pos || row.ipa !== ipaValue || row.meaningVi !== meaning || row.exampleEn !== example) {
      await db.vocabularyWord.update({
        where: { id: row.id },
        data: { partOfSpeech: pos, ipa: ipaValue, meaningVi: meaning, exampleEn: example },
      });
    }
  }

  const words = await db.vocabularyWord.findMany({ where: { topicId: dbTopic.id }, select: { id: true, word: true } });
  const idByWord = new Map(words.map((w) => [w.word, w.id]));
  const orderedIds = topic.words.map(([word]) => idByWord.get(word)).filter((id): id is string => Boolean(id));

  const dayCount = iigDayCount(topic);
  const pathFields = {
    title: `Lộ trình ${topic.title} (${dayCount} ngày)`,
    description: `Học ${topic.words.length} từ IIG chủ đề ${topic.titleVi}, mỗi ngày ${IIG_WORDS_PER_DAY} từ.`,
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
