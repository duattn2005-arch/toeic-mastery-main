import "server-only";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

/** Immediate refresh when called from an admin click (a Server Function).
 * From the background autopilot there is no request to attach it to, so
 * Next refuses; the blog pages then pick the change up through their own
 * time-based revalidation (a few minutes) instead. */
function refreshPublicPages(slug: string) {
  try {
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/sitemap.xml");
  } catch {
    // Outside a request (autopilot) — see above.
  }
}

export async function publishPost(id: string) {
  const post = await db.blogPost.update({
    where: { id },
    data: { status: "PUBLISHED", publishedAt: new Date() },
    select: { slug: true, topicId: true, publishedAt: true },
  });
  if (post.topicId) await db.seoTopic.update({ where: { id: post.topicId }, data: { status: "PUBLISHED" } });
  refreshPublicPages(post.slug);
}

export async function unpublishPost(id: string) {
  const post = await db.blogPost.update({ where: { id }, data: { status: "DRAFT" }, select: { slug: true, topicId: true } });
  if (post.topicId) await db.seoTopic.update({ where: { id: post.topicId }, data: { status: "DRAFTED" } });
  refreshPublicPages(post.slug);
}

export async function deletePost(id: string) {
  const post = await db.blogPost.delete({ where: { id }, select: { slug: true, topicId: true } });
  if (post.topicId) await db.seoTopic.update({ where: { id: post.topicId }, data: { status: "IDEA" } });
  refreshPublicPages(post.slug);
}
