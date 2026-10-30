import type { Metadata } from "next";
import { Clock3, Download, ListChecks, Radar as RadarIcon, TrendingUp } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { getAnalyticsData } from "@/lib/data/analytics";
import { buildLearningInsights } from "@/lib/services/insights/engine";
import { FREE_PRACTICE_STARTS_PER_DAY } from "@/lib/constants/limits";
import { StatCard } from "@/components/shared/stat-card";
import { SkillRadar } from "@/components/shared/skill-radar";
import { SectionHeader } from "@/components/shared/section-header";
import { ScoreTrendChart } from "@/components/analytics/score-trend-chart";
import { StudyTimeChart } from "@/components/analytics/study-time-chart";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import {
  AlertsStrip,
  BehaviorPanel,
  CompetencyMap,
  MistakesPanel,
  PANEL,
  PartTable,
  PlanTimeline,
  RoutingHero,
  StaminaPanel,
  StrengthsPanel,
  WeaknessSection,
} from "@/components/analytics/insights-view";
import { formatStudyDuration } from "@/lib/utils";
import { BloomPanel } from "@/components/analytics/bloom-panel";

export const metadata: Metadata = { title: "Phân tích năng lực" };

const NOTICES: Record<string, string> = {
  practiceLimitReached: `Gói Free được bắt đầu ${FREE_PRACTICE_STARTS_PER_DAY} bài luyện mỗi ngày. Nâng cấp Pro để luyện điểm yếu không giới hạn, hoặc quay lại vào ngày mai.`,
  noWeakness: "Chưa tìm thấy điểm yếu đủ dữ liệu để ghép đề tổng hợp — làm thêm vài bài nhé.",
  noQuestions: "Ngân hàng câu hỏi chưa có đủ câu cho mục này. Hãy thử một điểm yếu khác.",
};

export default async function AnalyticsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const profile = await requireUser();
  const [data, insights, params] = await Promise.all([getAnalyticsData(profile.id), buildLearningInsights(profile.id), searchParams]);
  const notice = Object.keys(NOTICES).find((k) => params[k]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Phân tích năng lực</h1>
          <p className="mt-1 text-sm text-muted-foreground">AI chưng cất từng câu bạn đã làm để chỉ ra chính xác bạn yếu ở đâu, vì sao, và tự sinh đề để vá.</p>
        </div>
        <Button asChild variant="outline" size="sm" className="gap-1.5">
          <a href="/api/insights/profile" download>
            <Download className="size-4" /> Tải hồ sơ năng lực
          </a>
        </Button>
      </div>

      {notice && <div className="rounded-2xl border border-warning/35 bg-warning/10 px-4 py-3 text-sm">{NOTICES[notice]}</div>}

      <RoutingHero insights={insights} />
      <AlertsStrip alerts={insights.alerts} />
      <BloomPanel bloom={insights.bloom} />
      <PlanTimeline insights={insights} />
      <WeaknessSection insights={insights} />
      <CompetencyMap insights={insights} />
      <PartTable parts={insights.parts} />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <BehaviorPanel insights={insights} />
        <StaminaPanel stamina={insights.stamina} />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[3fr_2fr]">
        <MistakesPanel insights={insights} />
        <StrengthsPanel strengths={insights.strengths} />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard icon={ListChecks} label="Đề đã hoàn thành" value={data.overallStats.attemptsCompleted} />
        <StatCard icon={ListChecks} label="Câu đã làm" value={data.overallStats.questionsAnswered} />
        <StatCard icon={Clock3} label="Tổng giờ học" value={formatStudyDuration(data.overallStats.totalStudySeconds)} />
        <StatCard icon={TrendingUp} label="Độ chính xác" value={`${Math.round(insights.accuracy * 100)}%`} accent="success" />
      </div>

      <section className={PANEL}>
        <SectionHeader icon={TrendingUp} title="Tiến độ điểm số theo thời gian" />
        {data.scoreTrend.length === 0 ? (
          <EmptyState icon={TrendingUp} title="Chưa có dữ liệu điểm số" description="Hoàn thành một đề Full Test để bắt đầu theo dõi." />
        ) : (
          <ScoreTrendChart data={data.scoreTrend} />
        )}
      </section>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <section className={PANEL}>
          <SectionHeader icon={RadarIcon} title="Radar kỹ năng theo Part" />
          <SkillRadar data={data.partAccuracies} />
        </section>
        <section className={PANEL}>
          <SectionHeader icon={Clock3} title="Thời gian học (14 ngày gần đây)" />
          <StudyTimeChart data={data.studyTimeTrend} />
        </section>
      </div>
    </div>
  );
}
