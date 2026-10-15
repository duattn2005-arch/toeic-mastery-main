import type { Metadata } from "next";
import { db } from "@/lib/db";
import { StatCard } from "@/components/shared/stat-card";
import { QuestionReportList } from "@/components/admin/question-report-list";
import { getOpenReportContexts } from "@/lib/data/question-reports";
import { AlertTriangle, ClipboardList, TrendingUp, Users } from "lucide-react";

export const metadata: Metadata = { title: "Thống kê quản trị" };

function daysAgo(days: number) {
  return new Date(Date.now() - days * 86_400_000);
}

export default async function AdminAnalyticsPage() {
  const sevenDaysAgo = daysAgo(7);

  const [totalAttempts, weeklyAttempts, activeUsers, popularTests, openReports] = await Promise.all([
    db.attempt.count({ where: { status: "SUBMITTED" } }),
    db.attempt.count({ where: { status: "SUBMITTED", submittedAt: { gte: sevenDaysAgo } } }),
    db.profile.count({ where: { lastStudyDate: { gte: sevenDaysAgo } } }),
    db.test.findMany({
      orderBy: { attempts: { _count: "desc" } },
      take: 5,
      select: { id: true, title: true, _count: { select: { attempts: true } } },
    }),
    getOpenReportContexts(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Thống kê hệ thống</h1>
        <p className="mt-1 text-sm text-muted-foreground">Tổng quan hoạt động và nội dung cần xử lý.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard icon={ClipboardList} label="Tổng lượt làm bài" value={totalAttempts} />
        <StatCard icon={TrendingUp} label="Lượt làm bài (7 ngày)" value={weeklyAttempts} accent="success" />
        <StatCard icon={Users} label="Người dùng hoạt động (7 ngày)" value={activeUsers} accent="info" />
        <StatCard icon={AlertTriangle} label="Báo lỗi chưa xử lý" value={openReports.length} accent="warning" />
      </div>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">ĐỀ THI PHỔ BIẾN NHẤT</h2>
        <div className="flex flex-col divide-y divide-border">
          {popularTests.map((t) => (
            <div key={t.id} className="flex items-center justify-between py-2.5 text-sm">
              <span>{t.title}</span>
              <span className="text-muted-foreground">{t._count.attempts} lượt làm</span>
            </div>
          ))}
        </div>
      </section>

      <section id="reports" className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 shadow-soft">
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">BÁO CÁO LỖI CÂU HỎI</h2>
        <QuestionReportList reports={openReports} />
      </section>
    </div>
  );
}
