import type { Metadata } from "next";
import { db } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { addCompetitorUrlsAction, analyseCompetitorsAction, deleteCompetitorAction, retryCompetitorAction } from "@/lib/actions/admin-seo";
import { CompetitorUrlForm, SeoActionButton, SeoAutoRefresh } from "@/components/admin/seo/seo-controls";
import { SEO_STATUS_LABEL, SEO_STATUS_VARIANT, SeoNav } from "@/components/admin/seo/seo-nav";

export const metadata: Metadata = { title: "Phân tích đối thủ" };
export const dynamic = "force-dynamic";

export default async function CompetitorsPage() {
  const rows = await db.seoCompetitorPage.findMany({ orderBy: [{ status: "asc" }, { createdAt: "desc" }], take: 300 });
  const busy = rows.some((r) => r.status === "PENDING" || r.status === "ANALYSING");

  return (
    <div className="flex flex-col gap-6">
      <SeoNav
        active="/admin/seo/doi-thu"
        title="1. Phân tích đối thủ"
        description="Dán URL bài blog của các web luyện thi TOEIC / học tiếng Anh khác. Web tự đọc từng bài và rút ra chủ đề, từ khoá (có xuất hiện trong bài) và ý chính — chỉ để biết người ta đang tìm gì, không chép nội dung."
      />

      <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
        <CompetitorUrlForm action={addCompetitorUrlsAction} />
      </section>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">{rows.length} URL</p>
        <div className="flex items-center gap-3">
          <SeoAutoRefresh active={busy} />
          {busy && <SeoActionButton action={analyseCompetitorsAction}>Tiếp tục phân tích</SeoActionButton>}
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="px-4 py-3 font-medium">Bài của đối thủ</th>
              <th className="px-4 py-3 font-medium">Chủ đề</th>
              <th className="px-4 py-3 font-medium">Từ khoá</th>
              <th className="px-4 py-3 font-medium">Tóm tắt</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-border align-top last:border-0">
                <td className="max-w-64 px-4 py-3">
                  <a href={r.url} target="_blank" rel="noopener noreferrer nofollow" className="line-clamp-2 break-all text-xs text-primary hover:underline">
                    {r.url}
                  </a>
                  <Badge variant={SEO_STATUS_VARIANT[r.status]} className="mt-1.5">
                    {SEO_STATUS_LABEL[r.status]}
                  </Badge>
                  {r.error && <p className="mt-1 text-xs text-destructive">{r.error}</p>}
                </td>
                <td className="max-w-56 px-4 py-3 font-medium">{r.topic ?? "—"}</td>
                <td className="max-w-56 px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {r.keywords.map((k) => (
                      <span key={k} className="rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground">
                        {k}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="max-w-md px-4 py-3">
                  <ul className="ml-4 list-disc text-xs text-muted-foreground">
                    {r.summary.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-1.5">
                    {r.status === "FAILED" && <SeoActionButton action={retryCompetitorAction.bind(null, r.id)}>Thử lại</SeoActionButton>}
                    <SeoActionButton action={deleteCompetitorAction.bind(null, r.id)} variant="ghost" confirm="Xoá URL này?">
                      Xoá
                    </SeoActionButton>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-muted-foreground">
                  Chưa có URL nào. Dán URL bài viết của đối thủ ở ô phía trên.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
