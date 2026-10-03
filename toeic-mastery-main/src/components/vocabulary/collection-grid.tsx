import Link from "next/link";
import { BookText } from "lucide-react";
import type { CollectionSummary } from "@/lib/content/vocab-collections";

/** Topic cards for one static word collection (IIG Vocab, ETS 2026), split
 * into the collection's groups (e.g. Đọc / Nghe) when it has them — each
 * card links to /vocabulary/<collection>/<topic>. */
export function CollectionGrid({ collection }: { collection: CollectionSummary }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-muted-foreground">{collection.description}</p>
      {collection.groups.map((group) => (
        <section key={group.label ?? "all"} className="flex flex-col gap-3">
          {group.label && <h3 className="text-sm font-semibold text-muted-foreground">{group.label.toUpperCase()}</h3>}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {group.topics.map((topic) => (
              <Link
                key={topic.slug}
                href={`${collection.basePath}/${topic.slug}`}
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
        </section>
      ))}
    </div>
  );
}
