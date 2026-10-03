import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Crown, SpellCheck2 } from "lucide-react";
import { MASTERY_BASE_PATH, MASTERY_FOLDER_TITLE, getMasteryStats } from "@/lib/content/mastery";
import { requireUser } from "@/lib/auth";
import { getGrammarTopics } from "@/lib/data/grammar";
import { GrammarTour } from "@/components/grammar/grammar-tour";

export const metadata: Metadata = { title: "Ngữ pháp" };

export default async function GrammarPage() {
  await requireUser();
  const topics = await getGrammarTopics();
  const mastery = getMasteryStats();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Ngữ pháp</h1>
        <p className="mt-1 text-sm text-muted-foreground">Lý thuyết, ví dụ và bài luyện tập cho từng chủ điểm ngữ pháp TOEIC.</p>
      </div>

      <Link
        href={MASTERY_BASE_PATH}
        className="group flex items-center gap-4 rounded-2xl border border-primary/30 bg-primary/5 p-5 shadow-soft transition-colors hover:border-primary/60"
      >
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Crown className="size-6" />
        </span>
        <div className="flex-1">
          <p className="text-base font-semibold">{MASTERY_FOLDER_TITLE}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">Tài liệu độc quyền luyện chuyên sâu Ngữ pháp &amp; Từ vựng TOEIC Part 5-6.</p>
          <p className="mt-1 text-[11px] font-medium text-primary">
            {mastery.lessonCount} bài học · {mastery.questionCount} câu luyện tập
          </p>
        </div>
        <ChevronRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
      </Link>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <Link
            key={topic.id}
            href={`/grammar/${topic.slug}`}
            data-tour={topic.slug === "nouns" ? "grammar-topic-nouns" : undefined}
            className="group flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft transition-colors hover:border-primary/40"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <SpellCheck2 className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">{topic.title}</p>
              {topic.summary && <p className="mt-0.5 text-xs text-muted-foreground">{topic.summary}</p>}
              {topic._count.questions > 0 && (
                <p className="mt-1 text-[11px] font-medium text-primary">{topic._count.questions} câu luyện tập</p>
              )}
            </div>
          </Link>
        ))}
      </div>

      <GrammarTour />
    </div>
  );
}
