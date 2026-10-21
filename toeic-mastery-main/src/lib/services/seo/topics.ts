import "server-only";
import { db } from "@/lib/db";
import { GUIDES } from "@/lib/content/guides";
import { askJson, cleanStrings, clip, normalize } from "./llm";

const SYSTEM = `Bạn là trưởng nhóm nội dung SEO của TOEIC Mastery — website luyện thi TOEIC và học tiếng Anh online cho người Việt (luyện đề đủ 7 Part, từ vựng theo lộ trình, ngữ pháp, AI Mentor, bài thi thử miễn phí, từ vựng Tiếng Anh THPT).

Nhiệm vụ: đề xuất chủ đề bài blog MỚI để kéo người học từ Google về web. Ưu tiên:
- từ khoá dài, cụ thể, người Việt thật sự gõ trên Google (viết tiếng Việt có dấu, hoặc tiếng Anh nếu người học hay gõ như vậy);
- chủ đề đối thủ đang có mà web mình chưa có bài, hoặc góc nhìn tốt hơn họ;
- chủ đề dẫn tự nhiên tới việc luyện đề, học từ vựng hoặc làm bài thi thử trên web;
- KHÔNG trùng hoặc gần trùng với nội dung web đã có.

Chỉ trả về đúng một mảng JSON, không thêm chữ nào khác:
[{"title": "tiêu đề bài viết", "primaryKeyword": "từ khoá chính", "keywords": ["từ khoá phụ", "..."], "intent": "informational | commercial | navigational", "angle": "điểm khác biệt / giá trị riêng của bài"}]`;

/** What the site already covers, so ideas don't cannibalise existing pages. */
async function coverage() {
  const [posts, topics] = await Promise.all([
    db.blogPost.findMany({ select: { title: true, primaryKeyword: true } }),
    db.seoTopic.findMany({ where: { status: { not: "REJECTED" } }, select: { title: true, primaryKeyword: true } }),
  ]);
  return {
    lines: [
      ...GUIDES.map((g) => `- ${g.title}`),
      "- Từ vựng Tiếng Anh 11 và Tiếng Anh 9 (Global Success) theo từng Unit",
      "- Thi thử TOEIC Part 5 miễn phí",
      ...posts.map((p) => `- ${p.title} [${p.primaryKeyword}]`),
      ...topics.map((t) => `- ${t.title} [${t.primaryKeyword}]`),
    ],
    keywords: new Set([...posts, ...topics].map((x) => normalize(x.primaryKeyword))),
  };
}

/** Asks the model for `count` new topics from recent competitor analyses and
 * stores them as IDEA. Returns how many were added (duplicates are dropped). */
export async function generateTopicIdeas(count: number) {
  const competitors = await db.seoCompetitorPage.findMany({
    where: { status: "ANALYSED" },
    orderBy: { analysedAt: "desc" },
    take: 60,
    select: { topic: true, keywords: true },
  });
  const have = await coverage();
  const prompt = [
    competitors.length
      ? `Chủ đề và từ khoá của đối thủ:\n${competitors.map((c) => `- ${c.topic} | ${c.keywords.join(", ")}`).join("\n")}`
      : "Chưa có dữ liệu đối thủ: hãy đề xuất dựa trên những gì người Việt hay tìm khi học TOEIC và tiếng Anh.",
    `Nội dung web ĐÃ CÓ (không đề xuất trùng):\n${have.lines.join("\n")}`,
    `Đề xuất ${count} chủ đề mới.`,
  ].join("\n\n");

  const ideas = await askJson<unknown[]>({ system: SYSTEM, prompt, maxTokens: 3000, timeoutMs: 90_000 });
  if (!Array.isArray(ideas)) throw new Error("AI không trả về danh sách chủ đề");

  let added = 0;
  for (const raw of ideas.slice(0, count * 2)) {
    const idea = raw as Record<string, unknown>;
    const title = typeof idea.title === "string" ? clip(idea.title, 150) : "";
    const primaryKeyword = typeof idea.primaryKeyword === "string" ? clip(idea.primaryKeyword, 100) : "";
    if (!title || !primaryKeyword || have.keywords.has(normalize(primaryKeyword))) continue;
    have.keywords.add(normalize(primaryKeyword));
    await db.seoTopic.create({
      data: {
        title,
        primaryKeyword,
        keywords: cleanStrings(idea.keywords, 8, 80),
        intent: typeof idea.intent === "string" ? clip(idea.intent, 40) : null,
        angle: typeof idea.angle === "string" ? clip(idea.angle, 300) : null,
        source: competitors.length ? "competitor" : "ai",
      },
    });
    if (++added >= count) break;
  }
  return added;
}

/** A topic typed in by an admin. Returns an error message when it duplicates. */
export async function addManualTopic(input: { primaryKeyword: string; title?: string }) {
  const primaryKeyword = clip(input.primaryKeyword, 100);
  if (!primaryKeyword) return "Hãy nhập từ khoá chính";
  const have = await coverage();
  if (have.keywords.has(normalize(primaryKeyword))) return "Đã có chủ đề hoặc bài viết cho từ khoá này";
  await db.seoTopic.create({
    data: { primaryKeyword, title: clip(input.title || primaryKeyword, 150), source: "manual" },
  });
  return null;
}
