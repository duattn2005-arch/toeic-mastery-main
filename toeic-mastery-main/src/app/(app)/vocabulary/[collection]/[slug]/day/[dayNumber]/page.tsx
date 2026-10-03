import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { collectionBasePath, collectionDbSlug, getCollectionTopic, getVocabCollection } from "@/lib/content/vocab-collections";
import { ensureCollectionSynced } from "@/lib/content/vocab-collection-sync";
import { getPathDayDetail } from "@/lib/data/vocabulary-path";
import { PathDayRunner } from "@/components/vocabulary/path/path-day-runner";

type Params = Promise<{ collection: string; slug: string; dayNumber: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { collection: key, slug, dayNumber } = await params;
  const collection = getVocabCollection(key);
  const found = collection && getCollectionTopic(collection, slug);
  return { title: collection && found ? `${collection.shortLabel} ${found.topic.title} — Ngày ${dayNumber}` : "Từ vựng" };
}

export default async function CollectionPathDayPage({ params }: { params: Params }) {
  const { collection: key, slug, dayNumber: dayNumberParam } = await params;
  const collection = getVocabCollection(key);
  const found = collection && getCollectionTopic(collection, slug);
  const dayNumber = Number(dayNumberParam);
  if (!collection || !found || !Number.isInteger(dayNumber) || dayNumber < 1) notFound();
  const { topic } = found;

  const profile = await requireUser();
  await ensureCollectionSynced(collection);
  const day = await getPathDayDetail(dayNumber, profile.id, collectionDbSlug(collection, slug));

  const topicHref = `${collectionBasePath(collection)}/${slug}`;
  if (!day.isUnlocked) redirect(topicHref);

  return (
    <PathDayRunner
      dayId={day.dayId}
      dayNumber={day.dayNumber}
      tierLabel={day.tierLabel}
      totalDays={day.totalDays}
      initialStepsCompleted={day.stepsCompleted}
      initialStars={day.stars}
      items={day.items}
      starredTerms={day.starredTerms}
      dayBasePath={`${topicHref}/day`}
      backHref={topicHref}
      backLabel={`${collection.label} · ${topic.title}`}
      title={`${collection.shortLabel} · ${topic.title} · ${topic.titleVi}`}
    />
  );
}
