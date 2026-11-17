import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { getLearningPathOverview, getLearningPathPreview } from "@/lib/data/learning-path";
import { LearningPathOverviewContent } from "@/components/mentor/learning-path-overview-content";
import { JourneyCard } from "@/components/journey/journey-card";

export const metadata: Metadata = { title: "Lộ trình học" };

export default async function LearningPathPage() {
  const profile = await requireUser();
  const overview = await getLearningPathOverview(profile.id);

  return (
    <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-4">
      <Link href="/dashboard" className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Về Tổng quan
      </Link>

      {overview ? (
        <LearningPathOverviewContent data={overview} />
      ) : (
        // No path yet: the same preview + "Bắt đầu lộ trình" as the dashboard card.
        <JourneyCard
          mode="preview"
          days={await getLearningPathPreview(profile.id)}
          targetScore={profile.targetScore}
          currentScore={profile.currentScore}
          streakCount={profile.streakCount}
        />
      )}
    </div>
  );
}
