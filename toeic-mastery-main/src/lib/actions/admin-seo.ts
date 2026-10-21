"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import type { Prisma } from "@/generated/prisma/client";
import { isBlogCtaKey, slugify } from "@/lib/content/blog";
import { runInBackground } from "@/lib/services/seo/background";
import { analysePendingCompetitors, parseUrls } from "@/lib/services/seo/competitor";
import { addManualTopic, generateTopicIdeas } from "@/lib/services/seo/topics";
import { parseEditedContent, writeArticleForTopic } from "@/lib/services/seo/writer";
import { deletePost, publishPost, unpublishPost } from "@/lib/services/seo/publish";
import { getSeoSettings, runSeoAutopilot } from "@/lib/services/seo/autopilot";
import { clip } from "@/lib/services/seo/llm";

export interface SeoActionResult {
  error?: string;
  message?: string;
}

function refresh() {
  revalidatePath("/admin/seo", "layout");
}

// --- Competitors (n8n Competitor_Analysis_Flow) ------------------------------

export async function addCompetitorUrlsAction(text: string): Promise<SeoActionResult> {
  await requireAdmin();
  const urls = parseUrls(text);
  if (urls.length === 0) return { error: "Không tìm thấy URL hợp lệ (cần bắt đầu bằng http:// hoặc https://)" };
  const created = await db.seoCompetitorPage.createMany({ data: urls.map((url) => ({ url })), skipDuplicates: true });
  runInBackground("competitors", () => analysePendingCompetitors(200));
  refresh();
  return { message: `Đã thêm ${created.count} URL mới${urls.length > created.count ? ` (${urls.length - created.count} URL đã có)` : ""}, đang phân tích…` };
}

export async function analyseCompetitorsAction(): Promise<SeoActionResult> {
  await requireAdmin();
  const started = runInBackground("competitors", () => analysePendingCompetitors(200));
  refresh();
  return { message: started ? "Đang phân tích các URL đang chờ…" : "Đang có một lượt phân tích chạy rồi" };
}

export async function retryCompetitorAction(id: string): Promise<SeoActionResult> {
  await requireAdmin();
  await db.seoCompetitorPage.update({ where: { id }, data: { status: "PENDING", error: null } });
  runInBackground("competitors", () => analysePendingCompetitors(200));
  refresh();
  return {};
}

export async function deleteCompetitorAction(id: string): Promise<SeoActionResult> {
  await requireAdmin();
  await db.seoCompetitorPage.delete({ where: { id } });
  refresh();
  return {};
}

// --- Topics ------------------------------------------------------------------

export async function generateTopicsAction(count: number): Promise<SeoActionResult> {
  await requireAdmin();
  const n = Math.min(Math.max(Math.round(count) || 5, 1), 15);
  const started = runInBackground("topics", () => generateTopicIdeas(n));
  refresh();
  return { message: started ? `Đang đề xuất ${n} chủ đề, chờ khoảng 1 phút rồi trang tự cập nhật…` : "Đang có một lượt đề xuất chạy rồi" };
}

export async function addTopicAction(primaryKeyword: string, title: string): Promise<SeoActionResult> {
  await requireAdmin();
  const error = await addManualTopic({ primaryKeyword, title });
  if (error) return { error };
  refresh();
  return { message: "Đã thêm chủ đề" };
}

export async function writeTopicAction(id: string): Promise<SeoActionResult> {
  await requireAdmin();
  const topic = await db.seoTopic.findUnique({ where: { id }, select: { status: true } });
  if (!topic) return { error: "Không tìm thấy chủ đề" };
  if (topic.status === "WRITING") return { message: "Bài này đang được viết" };
  await db.seoTopic.update({ where: { id }, data: { status: "WRITING", error: null } });
  runInBackground(`write:${id}`, () => writeArticleForTopic(id));
  refresh();
  return { message: "Đang viết bài (1–3 phút), trang sẽ tự cập nhật…" };
}

export async function setTopicStatusAction(id: string, status: "IDEA" | "REJECTED"): Promise<SeoActionResult> {
  await requireAdmin();
  await db.seoTopic.update({ where: { id }, data: { status, error: null } });
  refresh();
  return {};
}

export async function deleteTopicAction(id: string): Promise<SeoActionResult> {
  await requireAdmin();
  await db.seoTopic.delete({ where: { id } });
  refresh();
  return {};
}

// --- Posts -------------------------------------------------------------------

export async function savePostMetaAction(
  id: string,
  input: { title: string; seoTitle: string; description: string; slug: string; primaryKeyword: string; keywords: string; ctaTarget: string }
): Promise<SeoActionResult> {
  await requireAdmin();
  const slug = slugify(input.slug);
  if (!slug) return { error: "Đường dẫn không hợp lệ" };
  const taken = await db.blogPost.findUnique({ where: { slug }, select: { id: true } });
  if (taken && taken.id !== id) return { error: "Đường dẫn này đã có bài khác dùng" };
  const current = await db.blogPost.findUniqueOrThrow({ where: { id }, select: { slug: true, status: true } });
  if (current.status === "PUBLISHED" && current.slug !== slug) return { error: "Bài đã đăng: đổi đường dẫn sẽ làm hỏng link cũ. Bỏ đăng trước nếu thật sự cần đổi." };
  if (!input.title.trim()) return { error: "Tiêu đề không được trống" };
  await db.blogPost.update({
    where: { id },
    data: {
      title: clip(input.title, 150),
      seoTitle: clip(input.seoTitle || input.title, 70),
      description: clip(input.description, 170),
      slug,
      primaryKeyword: clip(input.primaryKeyword, 100),
      keywords: input.keywords.split(",").map((k) => k.trim()).filter(Boolean).slice(0, 12),
      ctaTarget: isBlogCtaKey(input.ctaTarget) ? input.ctaTarget : "free_quiz",
    },
  });
  revalidatePath(`/blog/${slug}`);
  refresh();
  return { message: "Đã lưu" };
}

export async function savePostContentAction(id: string, json: string): Promise<SeoActionResult> {
  await requireAdmin();
  try {
    const { content, wordCount } = await parseEditedContent(json);
    const post = await db.blogPost.update({ where: { id }, data: { content: content as unknown as Prisma.InputJsonValue, wordCount }, select: { slug: true } });
    revalidatePath(`/blog/${post.slug}`);
    refresh();
    return { message: `Đã lưu nội dung (${wordCount} từ)` };
  } catch (err) {
    return { error: (err as Error).message };
  }
}

export async function publishPostAction(id: string): Promise<SeoActionResult> {
  await requireAdmin();
  await publishPost(id);
  refresh();
  return { message: "Đã đăng bài" };
}

export async function unpublishPostAction(id: string): Promise<SeoActionResult> {
  await requireAdmin();
  await unpublishPost(id);
  refresh();
  return { message: "Đã bỏ đăng, bài trở về bản nháp" };
}

export async function deletePostAction(id: string): Promise<SeoActionResult> {
  await requireAdmin();
  await deletePost(id);
  refresh();
  return { message: "Đã xoá bài" };
}

// --- Autopilot ---------------------------------------------------------------

export async function saveSeoSettingsAction(input: {
  autoEnabled: boolean;
  autoPublish: boolean;
  draftsPerRun: number;
  competitorBatch: number;
  runHour: number;
}): Promise<SeoActionResult> {
  await requireAdmin();
  await getSeoSettings();
  await db.seoSettings.update({
    where: { id: "default" },
    data: {
      autoEnabled: input.autoEnabled,
      autoPublish: input.autoPublish,
      draftsPerRun: Math.min(Math.max(Math.round(input.draftsPerRun) || 1, 1), 5),
      competitorBatch: Math.min(Math.max(Math.round(input.competitorBatch) || 5, 0), 30),
      runHour: Math.min(Math.max(Math.round(input.runHour) || 0, 0), 23),
    },
  });
  refresh();
  return { message: "Đã lưu cài đặt" };
}

export async function runAutopilotAction(): Promise<SeoActionResult> {
  await requireAdmin();
  const started = runInBackground("autopilot", () => runSeoAutopilot("manual"));
  refresh();
  return { message: started ? "Đã bắt đầu chạy, có thể mất vài phút. Xem kết quả ở mục Lần chạy gần nhất." : "Đang có một lượt chạy rồi" };
}
