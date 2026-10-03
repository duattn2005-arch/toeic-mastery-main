import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Headphones, Music } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { BLANK_PATTERN } from "@/lib/content/transcripts/types";
import { getTranscriptSet } from "@/lib/content/transcripts";
import { getTranscriptAudioMap } from "@/lib/data/transcripts";
import { cn } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ set: string }> }): Promise<Metadata> {
  const { set: key } = await params;
  return { title: getTranscriptSet(key)?.title ?? "Transcript" };
}

export default async function TranscriptSetPage({ params }: { params: Promise<{ set: string }> }) {
  const { set: key } = await params;
  await requireUser();
  const set = getTranscriptSet(key);
  if (!set) notFound();
  const audio = await getTranscriptAudioMap(set.key);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
          <Link href="/listening" className="hover:text-foreground">Listening</Link>
          <ChevronRight className="size-3" />
          <span className="font-medium text-primary">{set.title}</span>
        </div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">{set.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {set.description} <span className="text-xs">— {set.author}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {set.tests.map((test) => {
          const blanks = test.parts.reduce(
            (sum, part) => sum + part.groups.reduce((s, g) => s + g.lines.reduce((n, l) => n + (l.text.match(BLANK_PATTERN)?.length ?? 0), 0), 0),
            0
          );
          const hasAudio = Object.keys(audio[test.number] ?? {}).length > 0;
          return (
            <Link
              key={test.number}
              href={`/listening/transcripts/${set.key}/${test.number}`}
              className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft transition-colors hover:border-primary/40"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Headphones className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">Test {test.number}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Part 1–4 · {blanks} chỗ trống</p>
                <p className={cn("mt-1 flex items-center gap-1 text-xs", hasAudio ? "text-success" : "text-muted-foreground")}>
                  <Music className="size-3" /> {hasAudio ? "Có file nghe" : "Chưa có file nghe"}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
