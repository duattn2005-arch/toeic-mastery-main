import type { Metadata } from "next";
import { requireUser } from "@/lib/auth";
import { getDueReviewQueue } from "@/lib/data/vocabulary";
import { db } from "@/lib/db";
import { ReviewSession } from "@/components/vocabulary/review-session";

export const metadata: Metadata = { title: "Ôn tập từ vựng" };

export default async function VocabularyReviewPage({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const { topic: topicSlug } = await searchParams;
  const profile = await requireUser();
  const [due, topic] = await Promise.all([
    getDueReviewQueue(profile.id, 30, topicSlug),
    topicSlug ? db.vocabularyTopic.findUnique({ where: { slug: topicSlug }, select: { name: true } }) : Promise.resolve(null),
  ]);

  const items = due.map((d) => ({
    vocabularyWordId: d.vocabularyWordId,
    word: {
      word: d.vocabularyWord.word,
      ipa: d.vocabularyWord.ipa,
      partOfSpeech: d.vocabularyWord.partOfSpeech,
      meaningVi: d.vocabularyWord.meaningVi,
      exampleEn: d.vocabularyWord.exampleEn,
      audioUrlUs: d.vocabularyWord.audioUrlUs,
      audioUrlUk: d.vocabularyWord.audioUrlUk,
    },
  }));

  const starredMatches = await db.savedWord.findMany({
    where: { userId: profile.id, word: { in: due.map((d) => d.vocabularyWord.word.toLowerCase()) } },
    select: { word: true },
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Ôn tập từ vựng{topic ? ` — ${topic.name}` : ""}</h1>
        <p className="mt-1 text-sm text-muted-foreground">Flashcard theo lịch lặp lại ngắt quãng (spaced repetition).</p>
      </div>
      <ReviewSession items={items} starredTerms={starredMatches.map((s) => s.word)} />
    </div>
  );
}
