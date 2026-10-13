import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/public/breadcrumbs";
import { Faq } from "@/components/public/faq";
import { GuideBody } from "@/components/public/guide-body";
import { JsonLd } from "@/components/public/json-ld";
import { GUIDES, getGuide, readingMinutes } from "@/lib/content/guides";
import { PUBLIC_CONTENT_UPDATED, absoluteUrl } from "@/lib/site-url";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.seoTitle,
    description: guide.description,
    alternates: { canonical: `/huong-dan/${slug}` },
    openGraph: { type: "article", title: guide.seoTitle, description: guide.description, modifiedTime: PUBLIC_CONTENT_UPDATED },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default async function GuidePage({ params }: { params: Params }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const related = guide.related.map((s) => getGuide(s)).filter((g): g is NonNullable<typeof g> => g !== null);

  return (
    <>
      <Breadcrumbs items={[{ label: "Hướng dẫn", href: "/huong-dan" }, { label: guide.category }]} />

      <article>
        <header>
          <p className="text-xs font-semibold text-primary uppercase">{guide.category}</p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-balance md:text-4xl">{guide.title}</h1>
          <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" aria-hidden /> {readingMinutes(guide)} phút đọc
            </span>
            <span>
              Cập nhật <time dateTime={PUBLIC_CONTENT_UPDATED}>{formatDate(PUBLIC_CONTENT_UPDATED)}</time>
            </span>
            <span>Biên soạn: TOEIC Mastery</span>
          </p>
          <p className="mt-5 max-w-[65ch] text-lg leading-relaxed text-muted-foreground">{guide.description}</p>
        </header>

        <div className="mt-8">
          <GuideBody guide={guide} />
        </div>
      </article>

      <aside className="mt-12 flex flex-col gap-4 rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-bold">Luyện ngay những gì vừa đọc</p>
          <p className="mt-1 text-sm text-muted-foreground">Thi thử đủ 7 Part, chấm điểm tự động và thống kê điểm yếu theo từng Part.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/practice"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[var(--primary-hover)]"
          >
            Luyện đề TOEIC <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link href="/thi-thu-mien-phi" className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-accent/50">
            Thử Part 5 miễn phí
          </Link>
        </div>
      </aside>

      <Faq items={guide.faqs} />

      {related.length > 0 && (
        <nav aria-label="Bài viết liên quan" className="mt-12 border-t border-border pt-6">
          <p className="text-sm font-semibold">Bài viết liên quan</p>
          <ul className="mt-3 grid gap-3 sm:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/huong-dan/${r.slug}`} className="block h-full rounded-xl border border-border bg-card p-4 text-sm font-medium leading-snug transition-colors hover:border-primary/40">
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guide.title,
          description: guide.description,
          inLanguage: "vi",
          datePublished: PUBLIC_CONTENT_UPDATED,
          dateModified: PUBLIC_CONTENT_UPDATED,
          mainEntityOfPage: absoluteUrl(`/huong-dan/${guide.slug}`),
          image: absoluteUrl("/opengraph-image.png"),
          author: { "@type": "Organization", name: "TOEIC Mastery", url: absoluteUrl("/") },
          publisher: { "@type": "Organization", name: "TOEIC Mastery", url: absoluteUrl("/"), logo: { "@type": "ImageObject", url: absoluteUrl("/icon.png") } },
        }}
      />
    </>
  );
}
