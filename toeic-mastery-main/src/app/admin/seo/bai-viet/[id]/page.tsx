import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { db } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { BLOG_CTAS, type BlogAds, type BlogContent, contentTexts, linkedPaths } from "@/lib/content/blog";
import { autoPublishable } from "@/lib/services/seo/writer";
import { deletePostAction, publishPostAction, savePostContentAction, savePostMetaAction, unpublishPostAction, writeTopicAction } from "@/lib/actions/admin-seo";
import { CopyList, PostContentEditor, PostMetaForm, SeoActionButton, SeoAutoRefresh } from "@/components/admin/seo/seo-controls";
import { SEO_STATUS_LABEL, SEO_STATUS_VARIANT, SeoNav } from "@/components/admin/seo/seo-nav";
import { BlogArticle } from "@/components/public/blog-article";
import { absoluteUrl } from "@/lib/site-url";

export const metadata: Metadata = { title: "Duyệt bài viết" };
export const dynamic = "force-dynamic";

type Params = Promise<{ id: string }>;

export default async function AdminPostPage({ params }: { params: Params }) {
  const { id } = await params;
  const post = await db.blogPost.findUnique({ where: { id }, include: { topic: { select: { id: true, status: true } } } });
  if (!post) notFound();
  const content = post.content as unknown as BlogContent;
  const ads = (post.ads ?? { headlines: [], descriptions: [], keywords: [] }) as unknown as BlogAds;
  const links = [...new Set(contentTexts(content).flatMap(linkedPaths))];
  const rewriting = post.topic?.status === "WRITING";
  const adUrl = `${absoluteUrl(`/blog/${post.slug}`)}?utm_source=google&utm_medium=cpc&utm_campaign=blog-${post.slug}`;

  return (
    <div className="flex flex-col gap-6">
      <SeoNav active="/admin/seo/bai-viet" title="Duyệt bài viết" description="Đọc lại bản xem trước bên dưới (đúng như người đọc sẽ thấy), sửa nếu cần, rồi bấm Đăng bài." />

      <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <Badge variant={SEO_STATUS_VARIANT[post.status]}>{SEO_STATUS_LABEL[post.status]}</Badge>
          <span>{post.wordCount} từ</span>
          <span className="text-muted-foreground">· {links.length} liên kết nội bộ</span>
          {post.status === "PUBLISHED" && (
            <Link href={`/blog/${post.slug}`} target="_blank" className="inline-flex items-center gap-1 text-primary hover:underline">
              Xem trên web <ExternalLink className="size-3.5" />
            </Link>
          )}
          {!autoPublishable(post) && <span className="text-xs text-warning">Chưa đạt chuẩn tự đăng — nên đọc kỹ trước khi đăng.</span>}
          <SeoAutoRefresh active={rewriting} />
        </div>
        <div className="flex flex-wrap gap-2">
          {post.status === "DRAFT" ? (
            <SeoActionButton action={publishPostAction.bind(null, post.id)} variant="default" confirm="Đăng bài này lên /blog?">
              Đăng bài
            </SeoActionButton>
          ) : (
            <SeoActionButton action={unpublishPostAction.bind(null, post.id)} confirm="Gỡ bài khỏi /blog (trở về bản nháp)?">
              Bỏ đăng
            </SeoActionButton>
          )}
          {post.status === "DRAFT" && post.topic && !rewriting && (
            <SeoActionButton action={writeTopicAction.bind(null, post.topic.id)} confirm="AI sẽ viết lại toàn bộ bài này (bản nháp hiện tại bị thay). Tiếp tục?">
              Viết lại bằng AI
            </SeoActionButton>
          )}
          <SeoActionButton action={deletePostAction.bind(null, post.id)} variant="ghost" confirm="Xoá hẳn bài này?">
            Xoá
          </SeoActionButton>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1fr_22rem]">
        <section className="rounded-2xl border border-border bg-background p-6 shadow-soft">
          <p className="mb-4 text-xs font-semibold text-muted-foreground uppercase">Xem trước</p>
          <BlogArticle post={{ ...post, content }} />
        </section>

        <aside className="flex flex-col gap-6">
          <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <h2 className="mb-3 text-sm font-semibold text-muted-foreground">THÔNG TIN SEO</h2>
            <PostMetaForm
              initial={{
                title: post.title,
                seoTitle: post.seoTitle,
                description: post.description,
                slug: post.slug,
                primaryKeyword: post.primaryKeyword,
                keywords: post.keywords.join(", "),
                ctaTarget: post.ctaTarget,
              }}
              ctas={Object.entries(BLOG_CTAS).map(([key, c]) => ({ key, label: c.title }))}
              save={savePostMetaAction.bind(null, post.id)}
            />
          </section>

          <section className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
            <h2 className="text-sm font-semibold text-muted-foreground">QUẢNG CÁO GOOGLE ADS (SEM)</h2>
            <CopyList title="Dòng tiêu đề (≤ 30 ký tự)" items={ads.headlines} max={30} />
            <CopyList title="Mô tả (≤ 90 ký tự)" items={ads.descriptions} max={90} />
            <CopyList title="Từ khoá quảng cáo" items={ads.keywords} />
            <CopyList title="URL đích (đã gắn UTM)" items={[adUrl]} />
          </section>

          {links.length > 0 && (
            <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <h2 className="mb-2 text-sm font-semibold text-muted-foreground">LIÊN KẾT NỘI BỘ TRONG BÀI</h2>
              <ul className="flex flex-col gap-1 font-mono text-xs">
                {links.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>

      <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
        <h2 className="mb-1 text-sm font-semibold text-muted-foreground">SỬA NỘI DUNG (NÂNG CAO)</h2>
        <p className="mb-3 text-xs text-muted-foreground">
          Nội dung dạng JSON: mỗi mục có tiêu đề và các khối (đoạn văn, danh sách, bảng, mẹo, ví dụ). Liên kết viết dạng [chữ](/duong-dan) và chỉ được trỏ tới trang trong web.
        </p>
        <PostContentEditor initial={JSON.stringify(content, null, 2)} save={savePostContentAction.bind(null, post.id)} />
      </section>
    </div>
  );
}
