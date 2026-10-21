import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/public/breadcrumbs";
import { JsonLd } from "@/components/public/json-ld";
import { listPublishedPosts } from "@/lib/data/blog";
import { absoluteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Blog luyện thi TOEIC và học tiếng Anh",
  description: "Bài viết hướng dẫn luyện thi TOEIC, mẹo làm bài từng Part, cách học từ vựng và ngữ pháp tiếng Anh cho người Việt — kèm bài luyện tập miễn phí trên TOEIC Mastery.",
  alternates: { canonical: "/blog" },
};

// New posts (including ones the autopilot publishes) show up within minutes.
export const revalidate = 300;

export default async function BlogIndexPage() {
  const posts = await listPublishedPosts(60);

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog" }]} />
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Blog luyện thi TOEIC</h1>
        <p className="mt-4 max-w-[65ch] leading-relaxed text-muted-foreground">
          Mẹo làm bài, cách học từ vựng – ngữ pháp và lộ trình ôn thi, mỗi bài kèm bài luyện tập để bạn làm ngay trên TOEIC Mastery.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">
          Bài viết sẽ sớm có. Trong lúc chờ, bạn xem{" "}
          <Link href="/huong-dan" className="font-medium text-primary underline-offset-4 hover:underline">
            các hướng dẫn luyện thi TOEIC
          </Link>
          .
        </p>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="flex h-full flex-col justify-between gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent/40"
              >
                <span>
                  <span className="text-xs font-semibold text-primary uppercase">{post.primaryKeyword}</span>
                  <span className="mt-1 block text-lg leading-snug font-bold">{post.title}</span>
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

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Blog luyện thi TOEIC — TOEIC Mastery",
          url: absoluteUrl("/blog"),
          inLanguage: "vi",
          blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: absoluteUrl(`/blog/${p.slug}`), datePublished: p.publishedAt?.toISOString() })),
        }}
      />
    </>
  );
}
