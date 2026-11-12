import { CircleAlert, Clock3, Goal, Layers, ListChecks, ListTodo, Radar as RadarIcon, TrendingUp } from "lucide-react";
import type { MistakeDetail } from "@/lib/bloom/bank";
import type { getAnalyticsData } from "@/lib/data/analytics";
import type { LearnerOutcomes } from "@/lib/bloom/outcomes";
import type { LearningInsights } from "@/lib/services/insights/engine";
import { formatStudyDuration } from "@/lib/utils";
import { AnalyticsHero } from "@/components/analytics/analytics-hero";
import { OutcomesPanel } from "@/components/analytics/outcomes-panel";
import { AnswerHabits, BloomPanel, MistakeMap } from "@/components/analytics/bloom-panel";
import {
  AlertsStrip,
  BehaviorPanel,
  CompetencyMap,
  FocusVocabulary,
  PANEL,
  PartTable,
  PlanTimeline,
  ReadinessCard,
  StaminaPanel,
  StrengthsPanel,
  WeaknessSection,
} from "@/components/analytics/insights-view";
import { ScoreTrendChart } from "@/components/analytics/score-trend-chart";
import { StudyTimeChart } from "@/components/analytics/study-time-chart";
import { EmptyState } from "@/components/shared/empty-state";
import { PanelHeader } from "@/components/analytics/panel-header";
import { SkillRadar } from "@/components/shared/skill-radar";
import { StatCard } from "@/components/shared/stat-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TABS = [
  { value: "todo", label: "Việc cần làm", icon: ListTodo },
  { value: "bloom", label: "Thang Bloom", icon: Layers },
  { value: "outcomes", label: "Chuẩn đầu ra", icon: Goal },
  { value: "mistakes", label: "Lỗi sai", icon: CircleAlert },
  { value: "skills", label: "Kỹ năng", icon: RadarIcon },
  { value: "progress", label: "Tiến độ", icon: TrendingUp },
];
const TAB_BODY = "an-enter flex flex-col gap-6";

/** One job per tab, so the page opens on what to do next rather than on every number at once. */
export function AnalyticsView({
  insights,
  data,
  mistakeDetails,
  outcomes,
  notice,
}: {
  insights: LearningInsights;
  outcomes: LearnerOutcomes;
  data: Awaited<ReturnType<typeof getAnalyticsData>>;
  mistakeDetails: Map<string, MistakeDetail>;
  notice?: string;
}) {
  return (
    <div className="flex flex-col gap-6">
      {notice && <div className="rounded-2xl border border-warning/35 bg-warning/10 px-4 py-3 text-sm">{notice}</div>}

      <AnalyticsHero insights={insights} />

      <Tabs defaultValue="todo" className="gap-6">
        <div className="overflow-x-auto [scrollbar-width:none]">
          <TabsList className="h-auto w-max min-w-full justify-start gap-1 rounded-full bg-card p-1.5 shadow-soft group-data-[orientation=horizontal]/tabs:h-auto">
            {TABS.map((t) => (
              <TabsTrigger
                key={t.value}
                value={t.value}
                className="h-auto flex-none gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent/60 data-[state=active]:bg-primary data-[state=active]:shadow-soft data-[state=active]:text-primary-foreground sm:px-5 dark:text-muted-foreground dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground"
              >
                <t.icon className="size-4" />
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="todo" className={TAB_BODY}>
          <AlertsStrip alerts={insights.alerts} />
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <PlanTimeline insights={insights} />
            <ReadinessCard insights={insights} />
          </div>
          <WeaknessSection insights={insights} />
        </TabsContent>

        <TabsContent value="bloom" className={TAB_BODY}>
          <BloomPanel bloom={insights.bloom} mistakeDetails={mistakeDetails} />
        </TabsContent>

        <TabsContent value="outcomes" className={TAB_BODY}>
          <OutcomesPanel data={outcomes} />
        </TabsContent>

        <TabsContent value="mistakes" className={TAB_BODY}>
          <MistakeMap bloom={insights.bloom} mistakeDetails={mistakeDetails} />
          <AnswerHabits bloom={insights.bloom} />
          <BehaviorPanel insights={insights} />
          <FocusVocabulary words={insights.focusVocabulary} />
        </TabsContent>

        <TabsContent value="skills" className={TAB_BODY}>
          <CompetencyMap insights={insights} />
          <PartTable parts={insights.parts} />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <section className={PANEL}>
              <PanelHeader icon={RadarIcon} title="Radar kỹ năng theo Part" />
              <SkillRadar data={data.partAccuracies} />
            </section>
            <StrengthsPanel strengths={insights.strengths} />
          </div>
        </TabsContent>

        <TabsContent value="progress" className={TAB_BODY}>
          <div className="grid grid-cols-2 gap-3">
            <StatCard icon={ListChecks} label="Đề đã hoàn thành" value={data.overallStats.attemptsCompleted} />
            <StatCard icon={Clock3} label="Tổng giờ học" value={formatStudyDuration(data.overallStats.totalStudySeconds)} />
          </div>
          <section className={PANEL}>
            <PanelHeader icon={TrendingUp} title="Tiến độ điểm số theo thời gian" />
            {data.scoreTrend.length === 0 ? <EmptyState icon={TrendingUp} title="Chưa có dữ liệu điểm số" description="Hoàn thành một đề Full Test để bắt đầu theo dõi." /> : <ScoreTrendChart data={data.scoreTrend} />}
          </section>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <section className={PANEL}>
              <PanelHeader icon={Clock3} title="Thời gian học (14 ngày gần đây)" />
              <StudyTimeChart data={data.studyTimeTrend} />
            </section>
            <StaminaPanel stamina={insights.stamina} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
