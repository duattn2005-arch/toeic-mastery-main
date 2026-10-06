import "server-only";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import type { StudyItem } from "@/lib/services/study-game";
import { VOCAB_COLLECTION_CATEGORIES } from "@/lib/content/vocab-collections";
import { srsDueCutoff, vocabStatus } from "@/lib/services/spaced-repetition";

/** Excludes the DB mirror of collection topics (IIG Vocab, ETS 2026) —
 * those have their own tabs and pages (see ensureCollectionSynced). */
export async function getVocabularyTopics() {
  return db.vocabularyTopic.findMany({
    where: { OR: [{ category: null }, { category: { notIn: VOCAB_COLLECTION_CATEGORIES } }] },
    orderBy: { orderIndex: "asc" },
    include: { _count: { select: { words: true } } },
  });
}

export async function getVocabularyOverview(userId: string) {
  const [topics, learnedCount, dueCount, totalUser] = await Promise.all([
    db.vocabularyTopic.count(),
    db.userVocabulary.count({ where: { userId, isLearned: true } }),
    db.userVocabulary.count({ where: { userId, nextReviewDate: { lte: srsDueCutoff() } } }),
    db.userVocabulary.count({ where: { userId } }),
  ]);
  return { topicsCount: topics, learnedCount, dueCount, totalTracked: totalUser };
}

export async function getTopicWithWords(slug: string, userId: string) {
  const topic = await db.vocabularyTopic.findUnique({
    where: { slug },
    include: { words: { orderBy: { word: "asc" } } },
  });
  if (!topic) notFound();

  const tracked = await db.userVocabulary.findMany({
    where: { userId, vocabularyWordId: { in: topic.words.map((w) => w.id) } },
    select: { vocabularyWordId: true, isLearned: true },
  });
  const trackedMap = new Map(tracked.map((t) => [t.vocabularyWordId, t.isLearned]));

  return {
    topic,
    words: topic.words.map((w) => ({ ...w, isTracked: trackedMap.has(w.id), isLearned: trackedMap.get(w.id) ?? false })),
  };
}

/** Study/game items for one topic — every word, regardless of tracking
 * state (the flashcard/quiz/matching games are lightweight practice, not
 * the graded SRS review, so they don't require "starting to learn" first).
 * `userId` is optional (generateMetadata calls this without one, just for
 * the topic name) — when given, also returns which of these words are
 * currently in Đã lưu, feeding StudyGameLauncher's "review again" overview. */
export async function getTopicStudyItems(
  slug: string,
  userId?: string
): Promise<{ topicName: string; items: StudyItem[]; starredTerms: string[] }> {
  const topic = await db.vocabularyTopic.findUnique({
    where: { slug },
    include: { words: { orderBy: { word: "asc" } } },
  });
  if (!topic) notFound();

  const [starredMatches, tracked] = userId
    ? await Promise.all([
        db.savedWord.findMany({
          where: { userId, word: { in: topic.words.map((w) => w.word.toLowerCase()) } },
          select: { word: true },
        }),
        db.userVocabulary.findMany({
          where: { userId, vocabularyWordId: { in: topic.words.map((w) => w.id) } },
          select: { vocabularyWordId: true, isLearned: true },
        }),
      ])
    : [[], []];
  const trackedById = new Map(tracked.map((t) => [t.vocabularyWordId, t]));

  return {
    topicName: topic.name,
    items: topic.words.map((w) => ({
      id: w.id,
      term: w.word,
      ipa: w.ipa,
      partOfSpeech: w.partOfSpeech,
      meaningVi: w.meaningVi,
      exampleEn: w.exampleEn,
      audioUrl: w.audioUrlUk ?? w.audioUrlUs,
      ...(userId ? { status: vocabStatus(trackedById.get(w.id)) } : {}),
    })),
    starredTerms: starredMatches.map((s) => s.word),
  };
}

/** `topicSlug` narrows the queue to one topic (e.g. an IIG topic's own review). */
export async function getDueReviewQueue(userId: string, limit = 30, topicSlug?: string) {
  return db.userVocabulary.findMany({
    where: { userId, nextReviewDate: { lte: srsDueCutoff() }, ...(topicSlug ? { vocabularyWord: { topic: { slug: topicSlug } } } : {}) },
    include: { vocabularyWord: true },
    orderBy: { nextReviewDate: "asc" },
    take: limit,
  });
}

/** Words the learner has already studied (any SRS state), most recently
 * practised first — lets /vocabulary/review still offer the games on a day
 * with nothing due, instead of a dead end. */
export async function getStudiedWordsQueue(userId: string, limit = 200, topicSlug?: string) {
  return db.userVocabulary.findMany({
    where: { userId, ...(topicSlug ? { vocabularyWord: { topic: { slug: topicSlug } } } : {}) },
    include: { vocabularyWord: true },
    orderBy: [{ lastReviewedAt: { sort: "desc", nulls: "last" } }, { nextReviewDate: "asc" }],
    take: limit,
  });
}

export interface VocabularyReminder {
  dueTodayCount: number;
  dueTomorrowCount: number;
  /** Tracked words not yet mastered ("Đang học") / mastered ("Đã thuộc"). */
  learningCount: number;
  masteredCount: number;
}

/** Powers both the dashboard reminder card and the notification bell — same
 * `nextReviewDate` (date-only column) that drives /vocabulary/review.
 * Anchored at UTC midnight, not `setHours(0,0,0,0)`: naively zeroing local
 * hours on a `@db.Date` column reads back as the previous calendar day for
 * any positive UTC offset (all of Vietnam) — the Vietnam day, see srsDueCutoff(). */
export async function getVocabularyReminder(userId: string): Promise<VocabularyReminder> {
  const todayStart = srsDueCutoff();
  const tomorrowStart = new Date(todayStart);
  tomorrowStart.setUTCDate(tomorrowStart.getUTCDate() + 1);
  const dayAfterStart = new Date(todayStart);
  dayAfterStart.setUTCDate(dayAfterStart.getUTCDate() + 2);

  const [dueTodayCount, dueTomorrowCount, learningCount, masteredCount] = await Promise.all([
    db.userVocabulary.count({ where: { userId, nextReviewDate: { lt: tomorrowStart } } }),
    db.userVocabulary.count({ where: { userId, nextReviewDate: { gte: tomorrowStart, lt: dayAfterStart } } }),
    db.userVocabulary.count({ where: { userId, isLearned: false } }),
    db.userVocabulary.count({ where: { userId, isLearned: true } }),
  ]);

  return { dueTodayCount, dueTomorrowCount, learningCount, masteredCount };
}

/** Per-topic SRS snapshot: how many of the topic's words the user is
 * tracking, has learned, and has due for review today. */
export async function getTopicSrsStats(slug: string, userId: string) {
  const where = { userId, vocabularyWord: { topic: { slug } } };
  const [tracked, learned, due] = await Promise.all([
    db.userVocabulary.count({ where }),
    db.userVocabulary.count({ where: { ...where, isLearned: true } }),
    db.userVocabulary.count({ where: { ...where, nextReviewDate: { lte: srsDueCutoff() } } }),
  ]);
  return { tracked, learned, due };
}
