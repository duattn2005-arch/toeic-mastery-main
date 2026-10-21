import type { GuideBlock, GuideSection } from "@/lib/content/guides";

/** Stored in BlogPost.content: the same shape as the hand-written guides, so
 * one renderer (GuideBody) serves both and no model-written HTML reaches the page. */
export interface BlogContent {
  sections: GuideSection[];
  faqs: { q: string; a: string }[];
}

/** Google Ads copy kept with a post (SEM). */
export interface BlogAds {
  headlines: string[];
  descriptions: string[];
  keywords: string[];
}

/** Where a post sends its readers. The model picks a key; the box itself is
 * rendered by the site, never written by the model. */
export const BLOG_CTAS = {
  free_quiz: {
    href: "/thi-thu-mien-phi",
    title: "Làm thử 10 câu TOEIC Part 5 miễn phí",
    text: "Chấm điểm ngay, có giải thích từng câu. Không cần đăng nhập.",
    button: "Làm bài ngay",
  },
  practice: {
    href: "/practice",
    title: "Luyện đề TOEIC đủ 7 Part",
    text: "Thi thử như thật, chấm điểm tự động và thống kê điểm yếu theo từng Part.",
    button: "Vào luyện đề",
  },
  vocab: {
    href: "/tu-vung",
    title: "Học từ vựng theo lộ trình từng ngày",
    text: "Flashcard, game và nhắc ôn đúng lúc để nhớ lâu.",
    button: "Học từ vựng",
  },
  register: {
    href: "/register",
    title: "Tạo tài khoản TOEIC Mastery miễn phí",
    text: "Lưu tiến độ, học theo lộ trình và nhận gợi ý từ AI Mentor.",
    button: "Đăng ký miễn phí",
  },
} as const;

export type BlogCtaKey = keyof typeof BLOG_CTAS;

export function isBlogCtaKey(value: unknown): value is BlogCtaKey {
  return typeof value === "string" && value in BLOG_CTAS;
}

const LINK = /\[([^\]\n]{1,120})\]\(([^)\s]{1,300})\)/g;

/** Keeps a `[anchor](/path)` link only when `/path` is one of `allowed`
 * (the internal-link catalog); any other link — external, invented, or
 * malformed — is reduced to its anchor text. */
export function keepKnownLinks(text: string, allowed: ReadonlySet<string>) {
  return text.replace(LINK, (_, anchor: string, href: string) => (allowed.has(href) ? `[${anchor}](${href})` : anchor));
}

/** Internal paths linked from a piece of text. */
export function linkedPaths(text: string) {
  return [...text.matchAll(LINK)].map((m) => m[2]);
}

function blockTexts(block: GuideBlock): string[] {
  switch (block.type) {
    case "p":
    case "tip":
      return [block.text];
    case "ul":
    case "ol":
      return block.items;
    case "table":
      return [...block.head, ...block.rows.flat()];
    case "example":
      return [block.question, ...(block.options ?? []), block.answer, block.explain];
  }
}

/** Every human-readable string in an article, for word counts and link checks. */
export function contentTexts(content: BlogContent) {
  return [
    ...content.sections.flatMap((s) => [s.heading, ...s.blocks.flatMap(blockTexts)]),
    ...content.faqs.flatMap((f) => [f.q, f.a]),
  ];
}

export function countWords(content: BlogContent) {
  return contentTexts(content)
    .join(" ")
    .replace(LINK, "$1")
    .split(/\s+/)
    .filter(Boolean).length;
}

/** Vietnamese-safe URL slug: "Cách học từ vựng TOEIC" → "cach-hoc-tu-vung-toeic". */
export function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");
}
