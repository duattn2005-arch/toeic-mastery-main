import "server-only";
import { db } from "@/lib/db";
import type { Prisma } from "@/generated/prisma/client";
import type { GuideBlock, GuideSection } from "@/lib/content/guides";
import { BLOG_CTAS, countWords, isBlogCtaKey, keepKnownLinks, linkedPaths, slugify, contentTexts, type BlogAds, type BlogContent } from "@/lib/content/blog";
import { askJson, cleanStrings, clip } from "./llm";
import { buildLinkCatalog, relevantLinks } from "./link-catalog";

/** Facts the articles may state, so the model doesn't improvise exam details. */
const FACTS = `Thông tin TOEIC được phép dùng (đừng tự bịa thêm số liệu chính thức khác):
- TOEIC Listening & Reading: 200 câu trắc nghiệm, khoảng 2 giờ. Listening 100 câu (~45 phút, audio phát 1 lần), Reading 100 câu (75 phút).
- Part 1: 6 câu (mô tả tranh) · Part 2: 25 câu (hỏi – đáp) · Part 3: 39 câu (13 hội thoại × 3) · Part 4: 30 câu (10 bài nói × 3) · Part 5: 30 câu (điền câu) · Part 6: 16 câu (4 đoạn × 4) · Part 7: 54 câu (đoạn đơn 29, nhiều đoạn 25).
- Điểm mỗi phần 5–495, tổng 10–990; không trừ điểm câu sai; điểm thường có hiệu lực khoảng 2 năm.
- Đại diện chính thức của ETS tại Việt Nam là IIG Việt Nam. Speaking & Writing là bài thi riêng.`;

const SYSTEM = `Bạn là biên tập viên nội dung SEO và giáo viên TOEIC giàu kinh nghiệm, viết cho blog của TOEIC Mastery — nền tảng luyện thi TOEIC và học tiếng Anh online cho người Việt.

Viết một bài blog HOÀN TOÀN MỚI, bằng tiếng Việt có dấu, giọng thân thiện, rõ ràng, thực tế, giúp người học làm được ngay. Yêu cầu:
- 1200–1800 từ, 5–8 mục (sections), mỗi mục có tiêu đề H2 rõ ràng, nhiều đoạn văn ngắn, có danh sách, bảng hoặc ví dụ khi phù hợp.
- Từ khoá chính xuất hiện tự nhiên trong tiêu đề, đoạn mở đầu và ít nhất một tiêu đề mục; dùng các từ khoá phụ tự nhiên, không nhồi nhét.
- Nội dung chính xác. Không bịa số liệu, nghiên cứu, trích dẫn hay thông tin chính thức. Ví dụ tiếng Anh phải đúng ngữ pháp và đáp án phải đúng.
- Không sao chép nội dung của website khác, không nhắc tên đối thủ, không chèn liên kết ra ngoài.
- Liên kết nội bộ: chèn 3–6 liên kết dạng [chữ neo](/đường-dẫn), CHỈ dùng đường dẫn trong danh sách được cung cấp, rải ở nhiều mục, chữ neo mô tả đúng trang đích.
- Mục cuối gợi ý bước tiếp theo để người đọc luyện tập trên TOEIC Mastery.
- 3–5 câu hỏi thường gặp (faqs) mà người tìm từ khoá này hay hỏi, câu trả lời ngắn gọn.
- Chọn "cta" là một trong: ${Object.keys(BLOG_CTAS).join(", ")} — trang phù hợp nhất để dẫn người đọc vào học.
- "ads": quảng cáo Google Ads cho bài: 5 headlines (mỗi cái ≤ 30 ký tự), 2 descriptions (mỗi cái ≤ 90 ký tự), 5–10 keywords để chạy quảng cáo.

Các loại block được dùng trong "blocks":
{"type":"p","text":"..."} · {"type":"ul","items":["..."]} · {"type":"ol","items":["..."]} · {"type":"table","head":["..."],"rows":[["..."]]} · {"type":"tip","title":"(tuỳ chọn)","text":"..."} · {"type":"example","question":"...","options":["(A) ...","(B) ..."],"answer":"...","explain":"..."}
Trong chữ có thể in đậm bằng **chữ**.

Chỉ trả về đúng một object JSON, không thêm chữ nào khác:
{"title":"...","seoTitle":"≤ 60 ký tự","description":"140–155 ký tự","slug":"duong-dan-khong-dau","keywords":["..."],"summary":["3–5 ý chính của bài"],"cta":"...","sections":[{"heading":"...","blocks":[...]}],"faqs":[{"q":"...","a":"..."}],"ads":{"headlines":["..."],"descriptions":["..."],"keywords":["..."]}}`;

const str = (v: unknown, max = 4000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

type Obj = Record<string, unknown>;
const isObj = (v: unknown): v is Obj => typeof v === "object" && v !== null && !Array.isArray(v);
/** First present value among several key spellings the model might use. */
const pick = (o: Obj, keys: string[]) => keys.map((k) => o[k]).find((v) => v !== undefined && v !== null);

const BLOCK_TYPES: Record<string, GuideBlock["type"]> = {
  p: "p", paragraph: "p", text: "p", para: "p", h3: "p", heading: "p", subheading: "p", quote: "p",
  ul: "ul", list: "ul", bullets: "ul", bullet_list: "ul", unordered_list: "ul", unordered: "ul",
  ol: "ol", numbered: "ol", numbered_list: "ol", ordered_list: "ol", ordered: "ol", steps: "ol",
  table: "table", tip: "tip", note: "tip", callout: "tip", warning: "tip",
  example: "example", quiz: "example", question: "example", exercise: "example",
};

/** Turns one model block into a GuideBlock, or null when it is unusable.
 * Accepts the shapes models commonly drift to (plain strings, "paragraph",
 * "content" instead of "text", rows as objects…), not just the asked one. */
function toBlock(input: unknown, allowed: ReadonlySet<string>): GuideBlock | null {
  if (typeof input === "string") input = { type: "p", text: input };
  if (Array.isArray(input)) input = { type: "ul", items: input };
  if (!isObj(input)) return null;
  const raw = input;
  const kind = String(raw.type ?? raw.kind ?? "").toLowerCase().replace(/[\s-]+/g, "_");
  let type = BLOCK_TYPES[kind];
  if (!type) type = Array.isArray(raw.rows) ? "table" : Array.isArray(raw.items) ? "ul" : raw.question ? "example" : "p";
  if (type === "ul" && (raw.ordered === true || raw.style === "ordered")) type = "ol";
  const text = pick(raw, ["text", "content", "value", "body", "paragraph"]);
  const items = pick(raw, ["items", "list", "points", "bullets", "steps"]);
  const head = pick(raw, ["head", "headers", "header", "columns"]);
  const b: Obj = {
    type,
    text: typeof text === "string" ? (kind.startsWith("h") && kind !== "h" ? `**${text}**` : text) : Array.isArray(text) ? text.join(" ") : undefined,
    title: raw.title,
    items: Array.isArray(items) ? items.map((i) => (isObj(i) ? String(pick(i, ["text", "content", "value"]) ?? "") : i)) : undefined,
    head,
    rows: Array.isArray(raw.rows) ? raw.rows.map((r) => (isObj(r) ? Object.values(r) : r)) : undefined,
    question: raw.question,
    options: raw.options ?? raw.choices,
    answer: raw.answer,
    explain: raw.explain ?? raw.explanation,
  };
  if (type === "table" && !Array.isArray(head) && Array.isArray(raw.rows) && isObj(raw.rows[0])) b.head = Object.keys(raw.rows[0]);
  const fix = (s: string) => keepKnownLinks(s, allowed);
  switch (b.type) {
    case "p": {
      const text = fix(str(b.text));
      return text ? { type: "p", text } : null;
    }
    case "tip": {
      const text = fix(str(b.text));
      const title = str(b.title, 80);
      return text ? { type: "tip", text, ...(title ? { title } : {}) } : null;
    }
    case "ul":
    case "ol": {
      const items = cleanStrings(b.items, 15, 600).map(fix);
      return items.length ? { type: b.type, items } : null;
    }
    case "table": {
      const head = cleanStrings(b.head, 6, 120);
      const rows = Array.isArray(b.rows)
        ? b.rows
            .map((r) => cleanStrings(r, head.length || 6, 300).map(fix))
            .filter((r) => r.length > 0)
            .map((r) => [...r, ...Array(Math.max(0, head.length - r.length)).fill("")])
            .slice(0, 20)
        : [];
      return head.length && rows.length ? { type: "table", head, rows } : null;
    }
    case "example": {
      const question = str(b.question, 600);
      const answer = str(b.answer, 200);
      const explain = fix(str(b.explain, 800));
      if (!question || !answer) return null;
      const options = cleanStrings(b.options, 6, 200);
      return { type: "example", question, answer, explain, ...(options.length ? { options } : {}) };
    }
    default:
      return null;
  }
}

/** Validates and cleans the model's article; throws when it isn't publishable material. */
/** The article object itself, even when the model wrapped it ({"article": {...}}). */
export function articleRoot(raw: unknown): Obj {
  if (Array.isArray(raw)) return { sections: raw };
  if (!isObj(raw)) return {};
  if (Array.isArray(pick(raw, SECTION_KEYS))) return raw;
  for (const v of Object.values(raw)) if (isObj(v) && Array.isArray(pick(v, SECTION_KEYS))) return { ...raw, ...v };
  return raw;
}

const SECTION_KEYS = ["sections", "body", "content", "outline", "parts", "muc"];

/** A section's blocks under whatever key the model used; a plain string
 * becomes paragraphs. */
function sectionBlocks(sec: Obj): unknown[] {
  const v = pick(sec, ["blocks", "content", "body", "paragraphs", "items", "text"]);
  if (typeof v === "string") return v.split(/\n{2,}/).map((t) => t.trim()).filter(Boolean);
  if (Array.isArray(v)) return v;
  return [];
}

export function toBlogContent(input: Record<string, unknown>, allowed: ReadonlySet<string>): BlogContent {
  const raw = articleRoot(input);
  const list = pick(raw, SECTION_KEYS);
  const ids = new Set<string>();
  const sections: GuideSection[] = (Array.isArray(list) ? list : [])
    .map((s) => {
      const sec = isObj(s) ? s : {};
      const heading = str(pick(sec, ["heading", "title", "h2", "name", "header"]), 160);
      const blocks = sectionBlocks(sec)
        .map((b) => toBlock(b, allowed))
        .filter((b): b is GuideBlock => b !== null);
      if (!heading || blocks.length === 0) return null;
      let id = slugify(heading) || "muc";
      while (ids.has(id)) id = `${id}-2`;
      ids.add(id);
      return { id, heading, blocks };
    })
    .filter((s): s is GuideSection => s !== null)
    .slice(0, 12);
  const faqList = pick(raw, ["faqs", "faq", "questions"]);
  const faqs = (Array.isArray(faqList) ? faqList : [])
    .map((f) => {
      const x = isObj(f) ? f : {};
      return { q: str(pick(x, ["q", "question", "hoi"]), 200), a: keepKnownLinks(str(pick(x, ["a", "answer", "tra_loi"]), 800), allowed) };
    })
    .filter((f) => f.q && f.a)
    .slice(0, 6);
  if (sections.length < 3) {
    const shape = Array.isArray(list) ? `${list.length} mục, ${sections.length} dùng được` : `khoá nhận được: ${Object.keys(raw).slice(0, 10).join(", ") || "không có"}`;
    throw new Error(`Bài viết có quá ít mục hợp lệ (${shape})`);
  }
  return { sections, faqs };
}

function toAds(raw: unknown): BlogAds {
  const a = (raw ?? {}) as Record<string, unknown>;
  return {
    headlines: cleanStrings(a.headlines, 15, 200).map((h) => clip(h, 30)),
    descriptions: cleanStrings(a.descriptions, 4, 300).map((d) => clip(d, 90)),
    keywords: cleanStrings(a.keywords, 20, 80),
  };
}

async function uniqueSlug(base: string, ownId?: string) {
  const root = slugify(base) || "bai-viet";
  for (let n = 1; ; n++) {
    const slug = n === 1 ? root : `${root}-${n}`;
    const taken = await db.blogPost.findUnique({ where: { slug }, select: { id: true } });
    if (!taken || taken.id === ownId) return slug;
  }
}

/** Quality bar a draft must meet to be published automatically. */
export function autoPublishable(post: { wordCount: number; content: unknown }) {
  const content = post.content as BlogContent;
  const links = contentTexts(content).flatMap(linkedPaths).length;
  return post.wordCount >= 900 && links >= 2 && content.sections.length >= 4 && content.faqs.length >= 2;
}

const MIN_WORDS = 600;

/** Writes (or rewrites) the article for a topic as a DRAFT BlogPost. Records
 * failures on the topic instead of throwing. Returns the post id, or null. */
export async function writeArticleForTopic(topicId: string): Promise<string | null> {
  const topic = await db.seoTopic.findUnique({ where: { id: topicId }, include: { post: { select: { id: true, status: true } } } });
  if (!topic) return null;
  if (topic.post?.status === "PUBLISHED") {
    await db.seoTopic.update({ where: { id: topicId }, data: { error: "Bài đã đăng — bỏ đăng trước khi viết lại" } });
    return null;
  }
  const clash = await db.blogPost.findFirst({
    where: { id: topic.post ? { not: topic.post.id } : undefined, primaryKeyword: { equals: topic.primaryKeyword, mode: "insensitive" } },
    select: { slug: true },
  });
  if (clash) {
    await db.seoTopic.update({ where: { id: topicId }, data: { status: "REJECTED", error: `Trùng từ khoá với bài /blog/${clash.slug}` } });
    return null;
  }

  await db.seoTopic.update({ where: { id: topicId }, data: { status: "WRITING", error: null } });
  try {
    const catalog = await buildLinkCatalog();
    const links = relevantLinks(catalog, [topic.primaryKeyword, topic.title, ...topic.keywords], 18);
    const allowed = new Set(catalog.map((t) => t.path));
    const prompt = [
      `Tiêu đề định hướng: ${topic.title}`,
      `Từ khoá chính: ${topic.primaryKeyword}`,
      topic.keywords.length ? `Từ khoá phụ: ${topic.keywords.join(", ")}` : "",
      topic.intent ? `Ý định tìm kiếm: ${topic.intent}` : "",
      topic.angle ? `Góc nhìn / điểm khác biệt: ${topic.angle}` : "",
      FACTS,
      `Trang nội bộ được phép liên kết (đường dẫn — tên trang):\n${links.map((l) => `${l.path} — ${l.title}`).join("\n")}`,
    ]
      .filter(Boolean)
      .join("\n\n");

    let raw: Record<string, unknown> | null = null;
    let content: BlogContent | null = null;
    let words = 0;
    let lastError: Error | null = null;
    // Retries: a short or malformed answer is usually fine the next time.
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const answer = await askJson<Record<string, unknown>>({ system: SYSTEM, prompt, maxTokens: 16_000, timeoutMs: 240_000 });
        const parsed = toBlogContent(answer, allowed);
        const n = countWords(parsed);
        if (n > words) [raw, content, words] = [articleRoot(answer), parsed, n];
        if (words >= MIN_WORDS) break;
        lastError = new Error(`Bài quá ngắn (${n} từ)`);
      } catch (err) {
        lastError = err as Error;
        console.error(`[seo] write attempt ${attempt + 1} failed for topic ${topicId}:`, lastError.message);
      }
    }
    if (!raw || !content || words < MIN_WORDS) throw lastError ?? new Error(`Bài quá ngắn (${words} từ)`);

    const title = clip(str(raw.title, 200) || topic.title, 150);
    const data = {
      title,
      seoTitle: clip(str(raw.seoTitle, 200) || title, 60),
      description: clip(str(raw.description, 400), 160) || clip(contentTexts(content)[1] ?? title, 160),
      primaryKeyword: topic.primaryKeyword,
      keywords: cleanStrings(raw.keywords, 10, 80),
      summary: cleanStrings(raw.summary, 6, 300),
      content: content as unknown as Prisma.InputJsonValue,
      ads: toAds(raw.ads) as unknown as Prisma.InputJsonValue,
      ctaTarget: isBlogCtaKey(raw.cta) ? raw.cta : "free_quiz",
      wordCount: words,
    };
    const post = topic.post
      ? await db.blogPost.update({ where: { id: topic.post.id }, data })
      : await db.blogPost.create({ data: { ...data, slug: await uniqueSlug(str(raw.slug, 120) || title), topicId } });
    await db.seoTopic.update({ where: { id: topicId }, data: { status: "DRAFTED" } });
    return post.id;
  } catch (err) {
    await db.seoTopic.update({ where: { id: topicId }, data: { status: "FAILED", error: (err as Error).message.slice(0, 500) } });
    return null;
  }
}

/** For the admin "edit content" box: validates pasted JSON the same way. */
export async function parseEditedContent(json: string) {
  let raw: Record<string, unknown>;
  try {
    raw = JSON.parse(json) as Record<string, unknown>;
  } catch (err) {
    throw new Error(`JSON không hợp lệ: ${(err as Error).message}`);
  }
  // Admin edits keep sections' own ids/structure, but links are still checked.
  const allowed = new Set((await buildLinkCatalog()).map((t) => t.path));
  const content = toBlogContent(raw, allowed);
  return { content, wordCount: countWords(content) };
}

