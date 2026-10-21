import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { isRunning } from "@/lib/services/seo/background";
import { addTopicAction, deleteTopicAction, generateTopicsAction, setTopicStatusAction, writeTopicAction } from "@/lib/actions/admin-seo";
import { SeoActionButton, SeoAutoRefresh, TopicForms } from "@/components/admin/seo/seo-controls";
import { SEO_STATUS_LABEL, SEO_STATUS_VARIANT, SeoNav } from "@/components/admin/seo/seo-nav";

export const metadata: Metadata = { title: "Chủ đề bài viết" };
export const dynamic = "force-dynamic";

const ORDER = ["WRITING", "IDEA", "FAILED", "DRAFTED", "PUBLISHED", "REJECTED"];

export default async function TopicsPage() {
  const topics = await db.seoTopic.findMany({ orderBy: { createdAt: "desc" }, take: 300, include: { post: { select: { id: true, slug: true, status: true } } } });
  topics.sort((a, b) => ORDER.indexOf(a.status) - ORDER.indexOf(b.status));
  const busy = topics.some((t) => t.status === "WRITING") || isRunning("topics");

  return (
    <div className="flex flex-col gap-6">
      <SeoNav
        active="/admin/seo/chu-de"
        title="2. Chủ đề"
        description="Các chủ đề còn trống mà web nên viết, đề xuất từ dữ liệu đối thủ hoặc do bạn tự thêm. Bấm “Viết bài” để AI viết bản nháp (1–3 phút). Chủ đề trùng từ khoá với bài đã có sẽ bị bỏ qua để các bài không tự giành thứ hạng của nhau."
      />

      <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
        <TopicForms generate={generateTopicsAction} add={addTopicAction} />
      </section>

      <div className="flex justify-end">
        <SeoAutoRefresh active={busy} />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="px-4 py-3 font-medium">Chủ đề</th>
              <th className="px-4 py-3 font-medium">Từ khoá</th>
              <th className="px-4 py-3 font-medium">Góc nhìn</th>
              <th className="px-4 py-3 font-medium">Trạng thái</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {topics.map((t) => (
              <tr key={t.id} className="border-b border-border align-top last:border-0">
                <td className="max-w-72 px-4 py-3">
                  <p className="font-medium">{t.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {t.source === "manual" ? "Tự thêm" : t.source === "competitor" ? "Từ dữ liệu đối thủ" : "AI đề xuất"}
                    {t.intent ? ` · ${t.intent}` : ""}
                  </p>
                </td>
                <td className="max-w-64 px-4 py-3">
                  <p className="font-medium text-primary">{t.primaryKeyword}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{t.keywords.join(", ")}</p>
                </td>
                <td className="max-w-72 px-4 py-3 text-xs text-muted-foreground">{t.angle ?? "—"}</td>
                <td className="px-4 py-3">
                  <Badge variant={SEO_STATUS_VARIANT[t.status]}>{SEO_STATUS_LABEL[t.status]}</Badge>
                  {t.error && <p className="mt-1 max-w-48 text-xs text-destructive">{t.error}</p>}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-1.5">
                    {(t.status === "IDEA" || t.status === "FAILED") && (
                      <SeoActionButton action={writeTopicAction.bind(null, t.id)} variant="default">
                        Viết bài
                      </SeoActionButton>
                    )}
                    {t.post && (
                      <Link href={`/admin/seo/bai-viet/${t.post.id}`} className="text-center text-xs font-medium text-primary hover:underline">
                        Xem bài
                      </Link>
                    )}
                    {t.status === "IDEA" && <SeoActionButton action={setTopicStatusAction.bind(null, t.id, "REJECTED")}>Bỏ qua</SeoActionButton>}
                    {t.status === "REJECTED" && <SeoActionButton action={setTopicStatusAction.bind(null, t.id, "IDEA")}>Khôi phục</SeoActionButton>}
                    {!t.post && t.status !== "WRITING" && (
                      <SeoActionButton action={deleteTopicAction.bind(null, t.id)} variant="ghost" confirm="Xoá chủ đề này?">
                        Xoá
                      </SeoActionButton>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {topics.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-muted-foreground">
                  Chưa có chủ đề. Bấm “Đề xuất chủ đề” hoặc tự thêm từ khoá.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
