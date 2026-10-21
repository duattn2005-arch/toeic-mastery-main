import "server-only";
import { GUIDES, getGuide, readingMinutes } from "@/lib/content/guides";
import { countWords, type BlogContent } from "@/lib/content/blog";
import { getPublishedPost, listPublishedPosts, relatedPosts } from "@/lib/data/blog";
import { PUBLIC_CONTENT_UPDATED } from "@/lib/site-url";

/** TOEIC Tips = the blog posts plus the /huong-dan guides, read inside the app. */

export interface TipCard {
  slug: string;
  title: string;
  description: string;
  label: string;
  minutes: number;
}

/** Links between articles stay inside the app instead of jumping to the public pages. */
function inApp(content: BlogContent): BlogContent {
  return JSON.parse(JSON.stringify(content).replace(/\]\(\/(?:blog|huong-dan)\//g, "](/tips/")) as BlogContent;
}

export async function listTips(): Promise<{ posts: TipCard[]; guides: TipCard[] }> {
  const posts = await listPublishedPosts(100);
  return {
    posts: posts.map((p) => ({ slug: p.slug, title: p.title, description: p.description, label: p.primaryKeyword, minutes: Math.max(1, Math.round(p.wordCount / 200)) })),
    guides: GUIDES.map((g) => ({ slug: g.slug, title: g.title, description: g.summary, label: g.category, minutes: readingMinutes(g) })),
  };
}

export async function getTip(slug: string) {
  const guide = getGuide(slug);
  if (guide) {
    const content = { sections: guide.sections, faqs: guide.faqs };
    return {
      kicker: guide.category,
      canonical: `/huong-dan/${guide.slug}`,
      article: { title: guide.title, description: guide.description, content: inApp(content), ctaTarget: "free_quiz", wordCount: countWords(content), publishedAt: null, updatedAt: new Date(PUBLIC_CONTENT_UPDATED) },
      related: guide.related.map((s) => getGuide(s)).filter((g) => g !== null).map((g) => ({ slug: g.slug, title: g.title })),
    };
  }
  const post = await getPublishedPost(slug);
  if (!post) return null;
  const related = await relatedPosts(post.slug, [post.primaryKeyword, ...post.keywords]);
  return {
    kicker: "Blog luyện thi TOEIC",
    canonical: `/blog/${post.slug}`,
    article: { ...post, content: inApp(post.content) },
    related: related.map((r) => ({ slug: r.slug, title: r.title })),
  };
}
