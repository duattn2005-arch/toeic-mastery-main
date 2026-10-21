import "server-only";
import { db } from "@/lib/db";
import { GUIDES } from "@/lib/content/guides";
import { PUBLIC_VOCAB_GRADES, PUBLIC_VOCAB_PAGES, unitName } from "@/lib/content/public-vocab";
import { normalize } from "./llm";

/** A page an article may link to. The in-app version of the n8n
 * "Internal_Linking_Flow" sheet: instead of re-analysing our own URLs, it is
 * built from what the site already knows about its pages. */
export interface LinkTarget {
  path: string;
  title: string;
  keywords: string[];
}

const CORE: LinkTarget[] = [
  { path: "/thi-thu-mien-phi", title: "Thi thử TOEIC Part 5 miễn phí (10 câu, có đáp án)", keywords: ["thi thử toeic miễn phí", "part 5", "ngữ pháp toeic", "kiểm tra trình độ"] },
  { path: "/practice", title: "Luyện đề TOEIC online đủ 7 Part", keywords: ["luyện đề toeic", "đề thi thử toeic", "toeic online", "listening", "reading"] },
  { path: "/tu-vung", title: "Từ vựng Tiếng Anh THPT theo từng Unit (Lớp 11, Lớp 9)", keywords: ["từ vựng tiếng anh", "từ vựng lớp 11", "từ vựng lớp 9", "global success"] },
  { path: "/huong-dan", title: "Hướng dẫn luyện thi TOEIC", keywords: ["luyện thi toeic", "hướng dẫn toeic", "mẹo toeic"] },
];

async function publishedPosts(): Promise<LinkTarget[]> {
  const posts = await db.blogPost.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true, title: true, primaryKeyword: true, keywords: true },
    orderBy: { publishedAt: "desc" },
    take: 300,
  });
  return posts.map((p) => ({ path: `/blog/${p.slug}`, title: p.title, keywords: [p.primaryKeyword, ...p.keywords] }));
}

/** Every page an article is allowed to link to. */
export async function buildLinkCatalog(): Promise<LinkTarget[]> {
  const guides: LinkTarget[] = GUIDES.map((g) => ({
    path: `/huong-dan/${g.slug}`,
    title: g.title,
    keywords: [g.seoTitle, g.category, ...g.sections.map((s) => s.heading)],
  }));
  const grades: LinkTarget[] = PUBLIC_VOCAB_GRADES.map((g) => ({
    path: `/tu-vung/${g.pages[0]?.slug ?? ""}`,
    title: `Từ vựng ${g.label} Unit 1`,
    keywords: [`từ vựng ${g.label.toLowerCase()}`, "global success"],
  }));
  const units: LinkTarget[] = PUBLIC_VOCAB_PAGES.filter((p) => !p.isExtension).map((p) => ({
    path: `/tu-vung/${p.slug}`,
    title: `Từ vựng Tiếng Anh ${p.grade} Unit ${p.unit}: ${unitName(p)}`,
    keywords: [`unit ${p.unit} lớp ${p.grade}`, unitName(p)],
  }));
  const seen = new Set<string>();
  return [...CORE, ...guides, ...(await publishedPosts()), ...grades, ...units].filter((t) => (seen.has(t.path) ? false : (seen.add(t.path), true)));
}

/** The `limit` catalog entries most related to `keywords` (shared words),
 * always including the core pages — keeps the writing prompt short. */
export function relevantLinks(catalog: LinkTarget[], keywords: string[], limit: number, exclude?: string) {
  const wanted = new Set(keywords.flatMap((k) => normalize(k).split(" ")).filter((w) => w.length > 2));
  const scored = catalog
    .filter((t) => t.path !== exclude)
    .map((t) => {
      const words = normalize([t.title, ...t.keywords].join(" ")).split(" ");
      const score = words.reduce((n, w) => n + (wanted.has(w) ? 1 : 0), 0) + (CORE.some((c) => c.path === t.path) ? 2 : 0);
      return { t, score };
    })
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.t);
}
