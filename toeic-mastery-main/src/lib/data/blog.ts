import "server-only";
import { db } from "@/lib/db";
import type { BlogContent } from "@/lib/content/blog";

/** Public blog reads. They swallow database errors and return nothing, so a
 * DB hiccup (or the blog tables not existing yet on a fresh deploy) shows an
 * empty blog instead of breaking the page or the build. */

export async function listPublishedPosts(limit = 50) {
  try {
    return await db.blogPost.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take: limit,
      select: { slug: true, title: true, description: true, primaryKeyword: true, wordCount: true, publishedAt: true, updatedAt: true },
    });
  } catch (err) {
    console.error("[blog] listPublishedPosts failed", err);
    return [];
  }
}

export async function getPublishedPost(slug: string) {
  try {
    const post = await db.blogPost.findFirst({ where: { slug, status: "PUBLISHED" } });
    return post ? { ...post, content: post.content as unknown as BlogContent } : null;
  } catch (err) {
    console.error("[blog] getPublishedPost failed", err);
    return null;
  }
}

/** Other published posts sharing words with this one's keywords. */
export async function relatedPosts(slug: string, keywords: string[], limit = 3) {
  const posts = await listPublishedPosts(100);
  const words = new Set(keywords.join(" ").toLowerCase().split(/\s+/).filter((w) => w.length > 2));
  return posts
    .filter((p) => p.slug !== slug)
    .map((p) => ({ p, score: `${p.title} ${p.primaryKeyword}`.toLowerCase().split(/\s+/).filter((w) => words.has(w)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}
