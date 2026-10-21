import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { listTips, type TipCard } from "@/lib/data/tips";

export const metadata: Metadata = { title: "TOEIC Tips", robots: { index: false } };

function TipGrid({ items }: { items: TipCard[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((t) => (
        <li key={t.slug}>
          <Link
            href={`/tips/${t.slug}`}
            className="flex h-full flex-col justify-between gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition-colors hover:border-primary/40"
          >
            <span>
              <span className="text-xs font-semibold text-primary uppercase">{t.label}</span>
              <span className="mt-1 block text-base leading-snug font-bold">{t.title}</span>
              <span className="mt-2 line-clamp-3 block text-sm leading-relaxed text-muted-foreground">{t.description}</span>
            </span>
            <span className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="size-3.5" aria-hidden /> {t.minutes} phút đọc
              </span>
              <ArrowRight className="size-3.5" aria-hidden />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Blog posts and guides, read from inside the app (the indexed copies are /blog and /huong-dan). */
export default async function TipsPage() {
  await requireUser();
  const { posts, guides } = await listTips();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">TOEIC Tips</h1>
        <p className="mt-1 text-sm text-muted-foreground">Mẹo làm bài, cách học từ vựng – ngữ pháp và lộ trình ôn thi TOEIC.</p>
      </div>

      {posts.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-muted-foreground">BÀI VIẾT MỚI</h2>
          <TipGrid items={posts} />
        </section>
      )}

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-muted-foreground">CẨM NANG LUYỆN THI</h2>
        <TipGrid items={guides} />
      </section>
    </div>
  );
}
