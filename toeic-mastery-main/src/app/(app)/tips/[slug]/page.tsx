import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { getTip } from "@/lib/data/tips";
import { BlogArticle } from "@/components/public/blog-article";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const tip = await getTip(slug);
  // The indexed copy is the public page; this one is only for logged-in reading.
  return tip ? { title: tip.article.title, robots: { index: false }, alternates: { canonical: tip.canonical } } : {};
}

export default async function TipPage({ params }: { params: Params }) {
  await requireUser();
  const { slug } = await params;
  const tip = await getTip(slug);
  if (!tip) notFound();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <Link href="/tips" className="inline-flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="size-4" aria-hidden /> TOEIC Tips
      </Link>

      <div className="rounded-2xl border border-border bg-card p-5 shadow-soft md:p-8">
        <BlogArticle post={tip.article} cta={false} kicker={tip.kicker} />
      </div>

      {tip.related.length > 0 && (
        <nav aria-label="Bài viết liên quan">
          <p className="text-sm font-semibold">Đọc tiếp</p>
          <ul className="mt-3 grid gap-3 sm:grid-cols-3">
            {tip.related.map((r) => (
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
