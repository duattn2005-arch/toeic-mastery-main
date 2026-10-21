import "server-only";
import { db } from "@/lib/db";
import { analysePendingCompetitors } from "./competitor";
import { generateTopicIdeas } from "./topics";
import { autoPublishable, writeArticleForTopic } from "./writer";
import { publishPost } from "./publish";
import { runInBackground } from "./background";

export async function getSeoSettings() {
  return db.seoSettings.upsert({ where: { id: "default" }, create: { id: "default" }, update: {} });
}

/** Hour and calendar day in Vietnam time (the VPS clock may be UTC). */
function vietnamNow(date = new Date()) {
  const vn = new Date(date.getTime() + 7 * 3600 * 1000);
  return { hour: vn.getUTCHours(), day: vn.toISOString().slice(0, 10) };
}

/** One autopilot pass: analyse waiting competitor URLs, top up topic ideas,
 * write `draftsPerRun` articles, and publish them when auto-publish is on and
 * they pass the quality bar. Writes a short log onto the settings row. */
export async function runSeoAutopilot(trigger: "schedule" | "manual" | "cron") {
  const settings = await getSeoSettings();
  const log: string[] = [`${new Date().toISOString()} · chạy (${trigger})`];
  try {
    const analysed = await analysePendingCompetitors(settings.competitorBatch);
    log.push(`Phân tích đối thủ: ${analysed} trang`);

    const ideas = await db.seoTopic.count({ where: { status: "IDEA" } });
    if (ideas < settings.draftsPerRun * 2) {
      const added = await generateTopicIdeas(Math.max(5, settings.draftsPerRun * 3));
      log.push(`Chủ đề mới: ${added}`);
    }

    const topics = await db.seoTopic.findMany({ where: { status: "IDEA" }, orderBy: { createdAt: "asc" }, take: settings.draftsPerRun, select: { id: true, title: true } });
    for (const topic of topics) {
      const postId = await writeArticleForTopic(topic.id);
      if (!postId) {
        log.push(`Viết lỗi: ${topic.title}`);
        continue;
      }
      const post = await db.blogPost.findUniqueOrThrow({ where: { id: postId }, select: { slug: true, wordCount: true, content: true } });
      if (settings.autoPublish && autoPublishable(post)) {
        await publishPost(postId);
        log.push(`Đã đăng: /blog/${post.slug} (${post.wordCount} từ)`);
      } else {
        log.push(`Bản nháp: ${topic.title} (${post.wordCount} từ)${settings.autoPublish ? " — chưa đạt chuẩn tự đăng" : ""}`);
      }
    }
  } catch (err) {
    log.push(`Lỗi: ${(err as Error).message}`);
  }
  await db.seoSettings.update({ where: { id: "default" }, data: { lastRunAt: new Date(), lastRunLog: log.join("\n").slice(0, 4000) } });
  return log;
}

/** Called every 15 minutes by the in-process scheduler: runs the autopilot
 * once a day, after `runHour` Vietnam time, when it is switched on. */
export async function maybeRunScheduledAutopilot() {
  const settings = await getSeoSettings();
  if (!settings.autoEnabled) return;
  const now = vietnamNow();
  if (now.hour < settings.runHour) return;
  if (settings.lastRunAt && vietnamNow(settings.lastRunAt).day === now.day) return;
  runInBackground("autopilot", () => runSeoAutopilot("schedule"));
}
