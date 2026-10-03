import { IIG_TOPICS, IIG_WORDS_PER_DAY } from "@/lib/content/iig-vocab";
import { ETS_2026_TOPICS } from "@/lib/content/ets-2026";
import type { IigTopic } from "@/lib/content/iig-vocab/types";

/** A static word collection (IIG Vocab, ETS 2026, ...) that gets its own
 * tab on /vocabulary and the full learning flow per topic: daily path,
 * SRS review, Học & Chơi — all on the shared DB vocabulary tables, which
 * ensureCollectionSynced() mirrors the static content into. */
export interface VocabCollection {
  /** URL segment: /vocabulary/<key>/<topic slug>. */
  key: string;
  label: string;
  /** Prefix for DB topic names, e.g. "IIG · Offices". */
  shortLabel: string;
  description: string;
  /** VocabularyTopic.category of the mirrored rows. */
  category: string;
  /** DB slug prefix for the mirrored VocabularyTopic/VocabularyPath. */
  dbPrefix: string;
  orderBase: number;
  topics: IigTopic[];
}

export const IIG_COLLECTION: VocabCollection = {
  key: "iig",
  label: "IIG Vocab",
  shortLabel: "IIG",
  description:
    "Từ vựng IIG theo 9 chủ đề thực tế — mỗi chủ đề có lộ trình học theo ngày (Học → Luyện tập → Kiểm tra), ôn tập ghi nhớ theo lịch lặp lại ngắt quãng, Học & Chơi và bài kiểm tra tổng hợp.",
  category: "IIG Vocab",
  dbPrefix: "iig",
  orderBase: 1000,
  topics: IIG_TOPICS,
};

export const ETS_2026_COLLECTION: VocabCollection = {
  key: "ets-2026",
  label: "ETS 2026",
  shortLabel: "ETS 2026",
  description:
    "Từ vựng ETS TOEIC 2026 Vol. 5 theo từng đề: 10 đề Đọc (RC) và 10 đề Nghe (LC), mỗi đề 80 từ — lộ trình học theo ngày (Học → Luyện tập → Kiểm tra), ôn tập ghi nhớ theo lịch lặp lại ngắt quãng và Học & Chơi.",
  category: "ETS 2026",
  dbPrefix: "ets26",
  orderBase: 2000,
  topics: ETS_2026_TOPICS,
};

export const VOCAB_COLLECTIONS = [IIG_COLLECTION, ETS_2026_COLLECTION];
export const VOCAB_COLLECTION_CATEGORIES = VOCAB_COLLECTIONS.map((c) => c.category);

export function getVocabCollection(key: string): VocabCollection | null {
  return VOCAB_COLLECTIONS.find((c) => c.key === key) ?? null;
}

export function collectionBasePath(collection: VocabCollection) {
  return `/vocabulary/${collection.key}`;
}

export function collectionDbSlug(collection: VocabCollection, topicSlug: string) {
  return `${collection.dbPrefix}-${topicSlug}`;
}

export function collectionDayCount(topic: IigTopic) {
  return Math.ceil(topic.words.length / IIG_WORDS_PER_DAY);
}

export function getCollectionTopic(collection: VocabCollection, slug: string) {
  const index = collection.topics.findIndex((t) => t.slug === slug);
  if (index === -1) return null;
  return {
    topic: collection.topics[index],
    index,
    prev: collection.topics[index - 1] ?? null,
    next: collection.topics[index + 1] ?? null,
  };
}

/** Serializable card data for the client-side tab grid — keeps the full
 * word lists out of the client bundle. */
export interface CollectionSummary {
  key: string;
  label: string;
  description: string;
  basePath: string;
  groups: {
    label: string | null;
    topics: { slug: string; title: string; titleVi: string; number: number; wordCount: number; dayCount: number; quizCount: number }[];
  }[];
}

export function summarizeCollection(collection: VocabCollection): CollectionSummary {
  const groups: CollectionSummary["groups"] = [];
  collection.topics.forEach((topic, index) => {
    const label = topic.group ?? null;
    let group = groups.find((g) => g.label === label);
    if (!group) {
      group = { label, topics: [] };
      groups.push(group);
    }
    group.topics.push({
      slug: topic.slug,
      title: topic.title,
      titleVi: topic.titleVi,
      number: index + 1,
      wordCount: topic.words.length,
      dayCount: collectionDayCount(topic),
      quizCount: topic.quiz.length,
    });
  });
  return { key: collection.key, label: collection.label, description: collection.description, basePath: collectionBasePath(collection), groups };
}
