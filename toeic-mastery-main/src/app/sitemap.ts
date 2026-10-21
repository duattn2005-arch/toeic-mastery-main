import type { MetadataRoute } from "next";
import { GUIDES } from "@/lib/content/guides";
import { PUBLIC_VOCAB_PAGES } from "@/lib/content/public-vocab";
import { listPublishedPosts } from "@/lib/data/blog";
import { PUBLIC_CONTENT_UPDATED, absoluteUrl } from "@/lib/site-url";

/** Only the pages a logged-out visitor (and so a crawler) can actually see —
 * see PUBLIC_ROUTES / PUBLIC_PREFIXES in lib/auth/proxy-session.ts. Content
 * pages carry the date their text was last edited (PUBLIC_CONTENT_UPDATED);
 * /practice changes as tests are added, so it uses the current date. */
// Re-generated every few minutes so newly published blog posts get listed.
export const revalidate = 600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const updated = new Date(PUBLIC_CONTENT_UPDATED);
  const posts = await listPublishedPosts(1000);
  return [
    { url: absoluteUrl("/"), lastModified: updated, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/practice"), lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: absoluteUrl("/thi-thu-mien-phi"), lastModified: updated, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/huong-dan"), lastModified: updated, changeFrequency: "weekly", priority: 0.8 },
    ...GUIDES.map((g) => ({ url: absoluteUrl(`/huong-dan/${g.slug}`), lastModified: updated, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: absoluteUrl("/tu-vung"), lastModified: updated, changeFrequency: "weekly", priority: 0.8 },
    ...PUBLIC_VOCAB_PAGES.map((p) => ({ url: absoluteUrl(`/tu-vung/${p.slug}`), lastModified: updated, changeFrequency: "monthly" as const, priority: p.isExtension ? 0.5 : 0.7 })),
    { url: absoluteUrl("/blog"), lastModified: posts[0]?.publishedAt ?? updated, changeFrequency: "daily", priority: 0.8 },
    ...posts.map((p) => ({ url: absoluteUrl(`/blog/${p.slug}`), lastModified: p.updatedAt, changeFrequency: "monthly" as const, priority: 0.7 })),
    { url: absoluteUrl("/register"), lastModified: updated, changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/login"), lastModified: updated, changeFrequency: "monthly", priority: 0.3 },
  ];
}
