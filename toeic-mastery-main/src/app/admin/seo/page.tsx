import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { getSeoSettings } from "@/lib/services/seo/autopilot";
import { isRunning } from "@/lib/services/seo/background";
import { runAutopilotAction, saveSeoSettingsAction } from "@/lib/actions/admin-seo";
import { SeoActionButton, SeoAutoRefresh, SeoSettingsForm } from "@/components/admin/seo/seo-controls";
import { SeoNav } from "@/components/admin/seo/seo-nav";

export const metadata: Metadata = { title: "Viết bài SEO" };
export const dynamic = "force-dynamic";

function Stat({ label, value, href }: { label: string; value: number; href: string }) {
  return (
    <Link href={href} className="rounded-2xl border border-border bg-card p-4 shadow-soft transition-colors hover:border-primary/40">
      <p className="text-2xl font-semibold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </Link>
  );
}

export default async function AdminSeoPage() {
  const [settings, competitors, analysed, ideas, drafts, published] = await Promise.all([
    getSeoSettings(),
    db.seoCompetitorPage.count(),
    db.seoCompetitorPage.count({ where: { status: "ANALYSED" } }),
    db.seoTopic.count({ where: { status: "IDEA" } }),
    db.blogPost.count({ where: { status: "DRAFT" } }),
    db.blogPost.count({ where: { status: "PUBLISHED" } }),
  ]);
  const running = isRunning("autopilot");

  return (
    <div className="flex flex-col gap-6">
      <SeoNav
        active="/admin/seo"
        title="Viết bài SEO"
        description="Phân tích bài của đối thủ → tìm chủ đề còn trống → AI viết bài có liên kết nội bộ và dẫn người đọc vào học trên web → bạn duyệt và đăng lên /blog. Bài do AI viết luôn ở dạng nháp, trừ khi bạn bật tự đăng."
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <Stat label="URL đối thủ" value={competitors} href="/admin/seo/doi-thu" />
        <Stat label="Đã phân tích" value={analysed} href="/admin/seo/doi-thu" />
        <Stat label="Chủ đề chờ viết" value={ideas} href="/admin/seo/chu-de" />
        <Stat label="Bản nháp chờ duyệt" value={drafts} href="/admin/seo/bai-viet" />
        <Stat label="Bài đã đăng" value={published} href="/admin/seo/bai-viet" />
      </div>

      <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">CHẾ ĐỘ TỰ ĐỘNG</h2>
        <SeoSettingsForm
          initial={{
            autoEnabled: settings.autoEnabled,
            autoPublish: settings.autoPublish,
            draftsPerRun: settings.draftsPerRun,
            competitorBatch: settings.competitorBatch,
            runHour: settings.runHour,
          }}
          save={saveSeoSettingsAction}
        />
      </section>

      <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-muted-foreground">LẦN CHẠY GẦN NHẤT</h2>
          <div className="flex items-center gap-3">
            <SeoAutoRefresh active={running} />
            <SeoActionButton action={runAutopilotAction} variant="default">
              Chạy ngay một lượt
            </SeoActionButton>
          </div>
        </div>
        {settings.lastRunLog ? (
          <pre className="overflow-x-auto rounded-xl bg-muted/50 p-3 text-xs whitespace-pre-wrap">{settings.lastRunLog}</pre>
        ) : (
          <p className="text-sm text-muted-foreground">Chưa chạy lần nào.</p>
        )}
        <p className="mt-3 text-xs text-muted-foreground">
          Khi bật, web tự chạy mỗi ngày một lần sau giờ đã chọn (không cần cài thêm gì trên máy chủ). Bài viết dùng cùng AI với AI Mentor.
        </p>
      </section>
    </div>
  );
}
