import type { Metadata } from "next";
import { requireUser, isPro } from "@/lib/auth";
import { getMistakeDetails } from "@/lib/bloom/bank";
import { getAnalyticsData } from "@/lib/data/analytics";
import { buildLearningInsights } from "@/lib/services/insights/engine";
import { AnalyticsView } from "@/components/analytics/analytics-view";
import { PANEL } from "@/components/analytics/insights-view";
import { ProLockedRadar } from "@/components/billing/pro-locked-radar";

export const metadata: Metadata = { title: "Phân tích năng lực" };

const NOTICES: Record<string, string> = {
  noWeakness: "Chưa tìm thấy điểm yếu đủ dữ liệu để ghép đề tổng hợp — làm thêm vài bài nhé.",
  noQuestions: "Ngân hàng câu hỏi chưa có đủ câu cho mục này. Hãy thử một điểm yếu khác.",
};

export default async function AnalyticsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const profile = await requireUser();
  // Checked before any query runs, so a Free account's response never carries analysis data.
  if (!isPro(profile)) {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Phân tích năng lực</h1>
          <p className="mt-1 text-sm text-muted-foreground">Radar kỹ năng, thang Bloom, điểm yếu và bài luyện vá lỗi riêng cho bạn đều nằm trong gói Pro.</p>
        </div>
        <section className={PANEL}>
          <ProLockedRadar />
        </section>
      </div>
    );
  }

  const [data, insights, params] = await Promise.all([getAnalyticsData(profile.id), buildLearningInsights(profile.id), searchParams]);
  const notice = Object.keys(NOTICES).find((k) => params[k]);
  const mistakeDetails = await getMistakeDetails(insights.bloom.mistakes);

  return <AnalyticsView insights={insights} data={data} mistakeDetails={mistakeDetails} notice={notice && NOTICES[notice]} />;
}
