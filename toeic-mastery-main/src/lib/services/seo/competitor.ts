import "server-only";
import { db } from "@/lib/db";
import { askJson, cleanStrings, clip, normalize } from "./llm";
import { extractPageText, fetchPublicPage } from "./safe-fetch";

/** The n8n "Competitor_Analysis_Flow" prompt, moved from the dental example to
 * this site's field and asked for JSON instead of a Markdown table. */
const SYSTEM = `Bạn là thành viên của một đội ngũ SEO chuyên nghiệp cho TOEIC Mastery, nền tảng luyện thi TOEIC và học tiếng Anh online cho người Việt.

Công việc của bạn là phân tích bài viết blog của đối thủ cạnh tranh để giúp team đưa ra chiến lược nội dung và từ khoá. Đối thủ là các website luyện thi TOEIC / IELTS / học tiếng Anh (lĩnh vực: luyện đề, từ vựng, ngữ pháp, kỹ năng nghe – đọc, lộ trình học, chứng chỉ tiếng Anh).

Với mỗi bài, bạn xác định:
- topic: chủ đề chính của bài.
- keywords: 3–5 từ khoá SEO hàng đầu của bài, liên quan đến lĩnh vực trên; kết hợp từ khoá dài (long tail) và ngắn (short tail). Từ khoá PHẢI xuất hiện trực tiếp trong nội dung bài, viết đúng như trong bài.
- summary: 3–6 ý tóm tắt ngắn, mỗi ý là một chủ đề phụ khác nhau trong bài.

Chỉ trả về đúng một object JSON, không thêm chữ nào khác:
{"topic": "...", "keywords": ["...", "..."], "summary": ["...", "..."]}`;

const STALE_MS = 15 * 60 * 1000;

function promptFor(url: string, page: ReturnType<typeof extractPageText>) {
  return [
    `URL: ${url}`,
    `Tiêu đề: ${page.title || "(không có)"}`,
    page.description ? `Mô tả: ${page.description}` : "",
    page.headings.length ? `Các đề mục:\n${page.headings.join("\n")}` : "",
    `Nội dung (đã rút gọn):\n${page.body}`,
  ]
    .filter(Boolean)
    .join("\n\n");
}

/** Analyses one competitor page and stores the result (or the error) on its row. */
export async function analyseCompetitorPage(id: string) {
  const row = await db.seoCompetitorPage.update({ where: { id }, data: { status: "ANALYSING", error: null } });
  try {
    const { finalUrl, html } = await fetchPublicPage(row.url);
    const page = extractPageText(html);
    if (page.body.length < 300) throw new Error("Trang có quá ít chữ để phân tích (có thể trang dựng bằng JavaScript hoặc chặn bot)");

    const result = await askJson<{ topic?: unknown; keywords?: unknown; summary?: unknown }>({
      system: SYSTEM,
      prompt: promptFor(finalUrl, page),
      maxTokens: 1500,
      timeoutMs: 90_000,
    });
    const topic = typeof result.topic === "string" ? clip(result.topic, 200) : "";
    if (!topic) throw new Error("AI không trả về chủ đề");
    const proposed = cleanStrings(result.keywords, 6, 80);
    // Like the n8n prompt asks: keep keywords that really occur in the page.
    const haystack = normalize(`${page.title} ${page.description} ${page.headings.join(" ")} ${page.body}`);
    const found = proposed.filter((k) => haystack.includes(normalize(k)));

    await db.seoCompetitorPage.update({
      where: { id },
      data: {
        status: "ANALYSED",
        title: page.title ? clip(page.title, 200) : null,
        topic,
        keywords: found.length > 0 ? found : proposed,
        summary: cleanStrings(result.summary, 6, 300),
        analysedAt: new Date(),
      },
    });
  } catch (err) {
    await db.seoCompetitorPage.update({ where: { id }, data: { status: "FAILED", error: (err as Error).message.slice(0, 500) } });
  }
}

/** Analyses up to `limit` waiting rows, oldest first (rows stuck in
 * ANALYSING after a server restart are picked up again). Returns how many ran. */
export async function analysePendingCompetitors(limit: number) {
  const rows = await db.seoCompetitorPage.findMany({
    where: { OR: [{ status: "PENDING" }, { status: "ANALYSING", updatedAt: { lt: new Date(Date.now() - STALE_MS) } }] },
    orderBy: { createdAt: "asc" },
    take: limit,
    select: { id: true },
  });
  for (const row of rows) await analyseCompetitorPage(row.id);
  return rows.length;
}

/** Valid, de-duplicated http(s) URLs from free text (one per line, or
 * separated by spaces/commas), without #fragments. */
export function parseUrls(text: string) {
  const urls = new Set<string>();
  for (const token of text.split(/[\s,]+/)) {
    try {
      const url = new URL(token.trim());
      if (url.protocol === "http:" || url.protocol === "https:") {
        url.hash = "";
        urls.add(url.toString());
      }
    } catch {
      // not a URL — skip
    }
  }
  return [...urls].slice(0, 200);
}
