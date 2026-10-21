import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Lightbulb } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { listPublishedPosts } from "@/lib/data/blog";
import { EmptyState } from "@/components/shared/empty-state";

export const metadata: Metadata = { title: "TOEIC Tips", robots: { index: false } };

/** The blog, read from inside the app (the public, indexed copy is /blog). */
export default async function TipsPage() {
  await requireUser();
  const posts = await listPublishedPosts(100);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">TOEIC Tips</h1>
        <p className="mt-1 text-sm text-muted-foreground">Mẹo làm bài, cách học từ vựng – ngữ pháp và lộ trình ôn thi TOEIC.</p>
      </div>

      {posts.length === 0 ? (
        <EmptyState icon={Lightbulb} title="Chưa có bài viết nào" description="Các bài mẹo luyện thi sẽ sớm xuất hiện ở đây." />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/tips/${post.slug}`}
                className="flex h-full flex-col justify-between gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition-colors hover:border-primary/40"
              >
                <span>
                  <span className="text-xs font-semibold text-primary uppercase">{post.primaryKeyword}</span>
                  <span className="mt-1 block text-base leading-snug font-bold">{post.title}</span>
                  <span className="mt-2 line-clamp-3 block text-sm leading-relaxed text-muted-foreground">{post.description}</span>
                </span>
                <span className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="size-3.5" aria-hidden /> {Math.max(1, Math.round(post.wordCount / 200))} phút đọc
                  </span>
                  <ArrowRight className="size-3.5" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
