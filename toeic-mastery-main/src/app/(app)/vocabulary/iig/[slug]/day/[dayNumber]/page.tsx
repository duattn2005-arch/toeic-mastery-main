import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { getIigTopic } from "@/lib/content/iig-vocab";
import { ensureIigContentSynced, iigDbSlug } from "@/lib/content/iig-vocab/sync";
import { getPathDayDetail } from "@/lib/data/vocabulary-path";
import { PathDayRunner } from "@/components/vocabulary/path/path-day-runner";

export async function generateMetadata({ params }: { params: Promise<{ slug: string; dayNumber: string }> }): Promise<Metadata> {
  const { slug, dayNumber } = await params;
  const topic = getIigTopic(slug);
  return { title: topic ? `IIG ${topic.title} — Ngày ${dayNumber}` : "IIG Vocab" };
}

export default async function IigPathDayPage({ params }: { params: Promise<{ slug: string; dayNumber: string }> }) {
  const { slug, dayNumber: dayNumberParam } = await params;
  const topic = getIigTopic(slug);
  const dayNumber = Number(dayNumberParam);
  if (!topic || !Number.isInteger(dayNumber) || dayNumber < 1) notFound();

  const profile = await requireUser();
  await ensureIigContentSynced();
  const day = await getPathDayDetail(dayNumber, profile.id, iigDbSlug(slug));

  const topicHref = `/vocabulary/iig/${slug}`;
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
      backLabel={`IIG Vocab · ${topic.title}`}
      title={`IIG · ${topic.title} · ${topic.titleVi}`}
    />
  );
}
