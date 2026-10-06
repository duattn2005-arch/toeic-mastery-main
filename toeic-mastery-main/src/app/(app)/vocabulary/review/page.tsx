import type { Metadata } from "next";
import { requireUser } from "@/lib/auth";
import { getDueReviewQueue, getStudiedWordsQueue } from "@/lib/data/vocabulary";
import { db } from "@/lib/db";
import { ReviewSession } from "@/components/vocabulary/review-session";

export const metadata: Metadata = { title: "Ôn tập từ vựng" };

export default async function VocabularyReviewPage({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const { topic: topicSlug } = await searchParams;
  const profile = await requireUser();
  const [due, topic] = await Promise.all([
    getDueReviewQueue(profile.id, 200, topicSlug),
    topicSlug ? db.vocabularyTopic.findUnique({ where: { slug: topicSlug }, select: { name: true } }) : Promise.resolve(null),
  ]);

  // Nothing due today -> offer the already-studied words for free practice.
  const studied = due.length === 0 ? await getStudiedWordsQueue(profile.id, 200, topicSlug) : [];

  const toItem = (d: (typeof due)[number]) => ({
    vocabularyWordId: d.vocabularyWordId,
    isLearned: d.isLearned,
    word: {
      word: d.vocabularyWord.word,
      ipa: d.vocabularyWord.ipa,
      partOfSpeech: d.vocabularyWord.partOfSpeech,
      meaningVi: d.vocabularyWord.meaningVi,
      exampleEn: d.vocabularyWord.exampleEn,
      audioUrlUs: d.vocabularyWord.audioUrlUs,
      audioUrlUk: d.vocabularyWord.audioUrlUk,
    },
  });
  const items = due.map(toItem);
  const practiceItems = studied.map(toItem);

  const starredMatches = await db.savedWord.findMany({
    where: { userId: profile.id, word: { in: [...due, ...studied].map((d) => d.vocabularyWord.word.toLowerCase()) } },
    select: { word: true },
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Ôn tập từ vựng{topic ? ` — ${topic.name}` : ""}</h1>
        <p className="mt-1 text-sm text-muted-foreground">Flashcard theo lịch lặp lại ngắt quãng (spaced repetition).</p>
      </div>
      <ReviewSession items={items} practiceItems={practiceItems} starredTerms={starredMatches.map((s) => s.word)} />
    </div>
  );
}
