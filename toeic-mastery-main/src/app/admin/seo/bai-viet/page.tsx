import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { SEO_STATUS_LABEL, SEO_STATUS_VARIANT, SeoNav } from "@/components/admin/seo/seo-nav";

export const metadata: Metadata = { title: "Bài viết blog" };
export const dynamic = "force-dynamic";

function formatDate(d: Date | null) {
  return d ? d.toLocaleDateString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }) : "—";
}

export default async function AdminPostsPage() {
  const posts = await db.blogPost.findMany({
    orderBy: [{ status: "asc" }, { updatedAt: "desc" }],
    take: 300,
    select: { id: true, slug: true, title: true, primaryKeyword: true, wordCount: true, status: true, publishedAt: true, updatedAt: true },
  });

  return (
    <div className="flex flex-col gap-6">
      <SeoNav
        active="/admin/seo/bai-viet"
        title="3. Bài viết"
        description="Bản nháp do AI viết và các bài đã đăng trên /blog. Mở từng bài để đọc lại, sửa và đăng. Nên đọc kỹ mỗi bản nháp trước khi đăng: AI có thể viết sai chi tiết."
      />

      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="px-4 py-3 font-medium">Bài viết</th>
              <th className="px-4 py-3 font-medium">Từ khoá chính</th>
              <th className="px-4 py-3 font-medium">Số từ</th>
              <th className="px-4 py-3 font-medium">Trạng thái</th>
              <th className="px-4 py-3 font-medium">Ngày đăng</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-0">
                <td className="max-w-md px-4 py-3">
                  <Link href={`/admin/seo/bai-viet/${p.id}`} className="font-medium hover:text-primary hover:underline">
                    {p.title}
                  </Link>
                  <p className="font-mono text-xs text-muted-foreground">/blog/{p.slug}</p>
                </td>
                <td className="px-4 py-3 text-primary">{p.primaryKeyword}</td>
                <td className="px-4 py-3">{p.wordCount}</td>
                <td className="px-4 py-3">
                  <Badge variant={SEO_STATUS_VARIANT[p.status]}>{SEO_STATUS_LABEL[p.status]}</Badge>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{formatDate(p.publishedAt)}</td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-muted-foreground">
                  Chưa có bài nào. Vào mục Chủ đề và bấm “Viết bài”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
