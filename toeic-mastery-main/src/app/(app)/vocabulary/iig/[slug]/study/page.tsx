import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { getIigTopic } from "@/lib/content/iig-vocab";
import { ensureIigContentSynced, iigDbSlug } from "@/lib/content/iig-vocab/sync";
import { getTopicStudyItems } from "@/lib/data/vocabulary";
import { StudyGameLauncher } from "@/components/study-game/study-game-launcher";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = getIigTopic(slug);
  return { title: topic ? `Học & Chơi — IIG ${topic.title}` : "IIG Vocab" };
}

export default async function IigTopicStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getIigTopic(slug);
  if (!topic) notFound();

  const profile = await requireUser();
  await ensureIigContentSynced();
  const { items, starredTerms } = await getTopicStudyItems(iigDbSlug(slug), profile.id);

  return (
    <StudyGameLauncher
      items={items}
      title={`IIG · ${topic.title} · ${topic.titleVi}`}
      backHref={`/vocabulary/iig/${slug}`}
      backLabel="Quay lại chủ đề"
      trackable
      initialStarredTerms={starredTerms}
    />
  );
}
