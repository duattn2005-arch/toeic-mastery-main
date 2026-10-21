import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { getPublishedPost, relatedPosts } from "@/lib/data/blog";
import { BlogArticle } from "@/components/public/blog-article";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  // The indexed copy is /blog/<slug>; this one is only for logged-in reading.
  return post ? { title: post.title, robots: { index: false }, alternates: { canonical: `/blog/${post.slug}` } } : {};
}

export default async function TipPage({ params }: { params: Params }) {
  await requireUser();
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();
  const related = await relatedPosts(post.slug, [post.primaryKeyword, ...post.keywords]);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <Link href="/tips" className="inline-flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="size-4" aria-hidden /> TOEIC Tips
      </Link>

      <div className="rounded-2xl border border-border bg-card p-5 shadow-soft md:p-8">
        <BlogArticle post={post} cta={false} />
      </div>

      {related.length > 0 && (
        <nav aria-label="Bài viết liên quan">
          <p className="text-sm font-semibold">Đọc tiếp</p>
          <ul className="mt-3 grid gap-3 sm:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/tips/${r.slug}`} className="block h-full rounded-xl border border-border bg-card p-4 text-sm font-medium leading-snug transition-colors hover:border-primary/40">
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
