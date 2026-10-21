import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/public/blog-article";
import { Breadcrumbs } from "@/components/public/breadcrumbs";
import { JsonLd } from "@/components/public/json-ld";
import { getPublishedPost, relatedPosts } from "@/lib/data/blog";
import { absoluteUrl } from "@/lib/site-url";

type Params = Promise<{ slug: string }>;

// Rendered on first visit, then cached; edits show up within minutes (an
// admin publish/save also refreshes it immediately). The empty param list
// is what turns on that cache-on-first-visit for posts created after build.
export const revalidate = 300;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) return {};
  return {
    title: post.seoTitle,
    description: post.description,
    keywords: [post.primaryKeyword, ...post.keywords],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.seoTitle,
      description: post.description,
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();
  const related = await relatedPosts(post.slug, [post.primaryKeyword, ...post.keywords]);

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.primaryKeyword }]} />
      <BlogArticle post={post} />

      {related.length > 0 && (
        <nav aria-label="Bài viết liên quan" className="mt-12 border-t border-border pt-6">
          <p className="text-sm font-semibold">Bài viết liên quan</p>
          <ul className="mt-3 grid gap-3 sm:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/blog/${r.slug}`} className="block h-full rounded-xl border border-border bg-card p-4 text-sm font-medium leading-snug transition-colors hover:border-primary/40">
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
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          inLanguage: "vi",
          keywords: [post.primaryKeyword, ...post.keywords].join(", "),
          datePublished: post.publishedAt?.toISOString(),
          dateModified: post.updatedAt.toISOString(),
          mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
          image: absoluteUrl("/opengraph-image.png"),
          wordCount: post.wordCount,
          author: { "@type": "Organization", name: "TOEIC Mastery", url: absoluteUrl("/") },
          publisher: { "@type": "Organization", name: "TOEIC Mastery", url: absoluteUrl("/"), logo: { "@type": "ImageObject", url: absoluteUrl("/icon.png") } },
        }}
      />
    </>
  );
}
