import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, FolderOpen } from "lucide-react";
import { TRANSCRIPT_SETS } from "@/lib/content/transcripts";
import { requireUser } from "@/lib/auth";
import { getSkillHubData } from "@/lib/data/skill-hub";
import { SkillHubView } from "@/components/skills/skill-hub-view";
import { ListeningHubTour } from "@/components/listening/listening-hub-tour";

export const metadata: Metadata = { title: "Listening" };

export default async function ListeningPage() {
  const profile = await requireUser();
  const items = await getSkillHubData(profile.id, "LISTENING");

  return (
    <>
      <SkillHubView
        title="Listening"
        subtitle="Luyện nghe theo từng Part — Photographs, Question-Response, Conversations, Talks."
        items={items}
        basePath="listening"
      />
      <section className="mt-8 flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-muted-foreground">NGHE ĐIỀN TỪ</h2>
        {TRANSCRIPT_SETS.map((set) => (
          <Link
            key={set.key}
            href={`/listening/transcripts/${set.key}`}
            className="group flex items-center gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-4 transition-colors hover:border-primary/60"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <FolderOpen className="size-5" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold">{set.title}</p>
              <p className="text-xs text-muted-foreground">
                {set.tests.length} đề · {set.description}
              </p>
            </div>
            <ChevronRight className="size-5 text-muted-foreground" />
          </Link>
        ))}
      </section>
      <ListeningHubTour />
    </>
  );
}
