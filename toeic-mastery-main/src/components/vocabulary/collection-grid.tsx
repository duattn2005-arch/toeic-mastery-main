"use client";

import * as React from "react";
import Link from "next/link";
import { BookText, ChevronRight, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CollectionSummary } from "@/lib/content/vocab-collections";

type Group = CollectionSummary["groups"][number];

/** Topic cards for one static word collection (IIG Vocab, ETS 2026, THPT),
 * split into the collection's groups (e.g. Đọc / Nghe) when it has them —
 * each card links to /vocabulary/<collection>/<topic>. A `groupTabs`
 * collection (THPT: Lớp 11 / Lớp 9) shows only the group buttons at first;
 * a group's topics appear once it is picked. */
export function CollectionGrid({ collection }: { collection: CollectionSummary }) {
  const [activeGroup, setActiveGroup] = React.useState<string | null>(null);

  if (collection.groupTabs) {
    const selected = collection.groups.find((g) => g.label === activeGroup);
    return (
      <div className="flex flex-col gap-4">
        <p className="text-xs text-muted-foreground">{collection.description}</p>
        <div className="flex flex-wrap gap-2">
          {collection.groups.map((group) => {
            const active = group.label === activeGroup;
            const wordCount = group.topics.reduce((sum, t) => sum + t.wordCount, 0);
            return (
              <button
                key={group.label ?? "all"}
                type="button"
                onClick={() => setActiveGroup(active ? null : group.label)}
                aria-expanded={active}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border px-4 py-3 text-left shadow-soft transition-colors",
                  active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary/40"
                )}
              >
                <FolderOpen className="size-5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold">{group.label}</p>
                  <p className={cn("text-xs", active ? "text-primary-foreground/80" : "text-muted-foreground")}>
                    {group.topics.length} Unit · {wordCount} từ
                  </p>
                </div>
                <ChevronRight className={cn("size-4 shrink-0 transition-transform", active && "rotate-90")} />
              </button>
            );
          })}
        </div>
        {selected ? (
          <TopicCards basePath={collection.basePath} group={selected} />
        ) : (
          <p className="text-sm text-muted-foreground">Chọn một lớp để xem các Unit.</p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-muted-foreground">{collection.description}</p>
      {collection.groups.map((group) => (
        <section key={group.label ?? "all"} className="flex flex-col gap-3">
          {group.label && <h3 className="text-sm font-semibold text-muted-foreground">{group.label.toUpperCase()}</h3>}
          <TopicCards basePath={collection.basePath} group={group} />
        </section>
      ))}
    </div>
  );
}

function TopicCards({ basePath, group }: { basePath: string; group: Group }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {group.topics.map((topic) => (
        <Link
          key={topic.slug}
          href={`${basePath}/${topic.slug}`}
          className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft transition-colors hover:border-primary/40"
        >
          <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
            <BookText className="size-5" />
          </span>
          <div>
            <p className="text-xs font-bold text-primary">#{topic.number}</p>
            <p className="text-sm font-semibold">{topic.title}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{topic.titleVi}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {topic.wordCount} từ · {topic.dayCount} ngày{topic.quizCount > 0 ? ` · ${topic.quizCount} câu hỏi` : ""}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
