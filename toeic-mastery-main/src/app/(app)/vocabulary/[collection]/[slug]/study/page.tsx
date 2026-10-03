import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { collectionBasePath, collectionDbSlug, getCollectionTopic, getVocabCollection } from "@/lib/content/vocab-collections";
import { ensureCollectionSynced } from "@/lib/content/vocab-collection-sync";
import { getTopicStudyItems } from "@/lib/data/vocabulary";
import { StudyGameLauncher } from "@/components/study-game/study-game-launcher";

type Params = Promise<{ collection: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { collection: key, slug } = await params;
  const collection = getVocabCollection(key);
  const found = collection && getCollectionTopic(collection, slug);
  return { title: collection && found ? `Học & Chơi — ${collection.shortLabel} ${found.topic.title}` : "Từ vựng" };
}

export default async function CollectionTopicStudyPage({ params }: { params: Params }) {
  const { collection: key, slug } = await params;
  const collection = getVocabCollection(key);
  const found = collection && getCollectionTopic(collection, slug);
  if (!collection || !found) notFound();
  const { topic } = found;

  const profile = await requireUser();
  await ensureCollectionSynced(collection);
  const { items, starredTerms } = await getTopicStudyItems(collectionDbSlug(collection, slug), profile.id);

  return (
    <StudyGameLauncher
      items={items}
      title={`${collection.shortLabel} · ${topic.title} · ${topic.titleVi}`}
      backHref={`${collectionBasePath(collection)}/${slug}`}
      backLabel="Quay lại chủ đề"
      trackable
      initialStarredTerms={starredTerms}
    />
  );
}
