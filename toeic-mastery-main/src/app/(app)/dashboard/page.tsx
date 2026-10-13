import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, CheckCircle2, Clock3, Layers, Lightbulb, ListChecks, Radar as RadarIcon, Timer } from "lucide-react";

import { requireUser } from "@/lib/auth";
import { getDashboardData } from "@/lib/data/dashboard";
import { getSiteThemeId } from "@/lib/data/site-theme";
import { StatCard } from "@/components/shared/stat-card";
import { SkillRadar } from "@/components/shared/skill-radar";
import { SectionHeader } from "@/components/shared/section-header";
import { TestCard } from "@/components/practice/test-card";
import { ContinueLearningCard } from "@/components/dashboard/continue-learning-card";
import { RecommendationList } from "@/components/dashboard/recommendation-list";
import { DueWordList } from "@/components/vocabulary/due-word-list";
import { DashboardHero, type HeroAction } from "@/components/dashboard/dashboard-hero";
import { EstimatedScoreCard } from "@/components/dashboard/estimated-score-card";
import { LevelAvatarCard } from "@/components/dashboard/level-avatar-card";
import { DailyQuests, type Quest } from "@/components/dashboard/daily-quests";
import { DashboardTour } from "@/components/dashboard/dashboard-tour";
import { StudyMascot } from "@/components/mascot/study-mascot";
import type { MascotState } from "@/components/mascot/types";
import type { DashboardData } from "@/lib/data/dashboard";
import { formatStudyDuration, toDateOnlyUTC } from "@/lib/utils";

export const metadata: Metadata = { title: "Tổng quan" };

/** Dashboard has no live "activity" to react to, so the mascot reflects
 * today's study state instead: already studied today, has a streak to
 * protect, or just a plain greeting for a first-time/inactive user. */
function getDashboardMascotState(profile: DashboardData["profile"]): MascotState {
  const today = toDateOnlyUTC(new Date());
  const last = profile.lastStudyDate ? toDateOnlyUTC(new Date(profile.lastStudyDate)) : null;
  const studiedToday = last !== null && last.getTime() === today.getTime();

  if (studiedToday) return "encouraging";
  if (profile.streakCount > 0) return "reminder";
  return "idle";
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 11) return "Chào buổi sáng";
  if (hour < 14) return "Chào buổi trưa";
  if (hour < 18) return "Chào buổi chiều";
  return "Chào buổi tối";
}

/** Hero buttons, in priority order: due vocabulary review first (it decays
 * if skipped), then the in-progress test, then a first test / practice. */
function getHeroActions(data: DashboardData, score: number | null | undefined): { primary: HeroAction; secondary: HeroAction } {
  const due = data.vocabularyReminder.dueTodayCount;
  const review: HeroAction = { href: "/vocabulary/review", label: `Ôn ${due} từ` };
  const resume: HeroAction | null = data.continueAttempt
    ? { href: `/exam/${data.continueAttempt.id}`, label: "Làm tiếp đề đang dở" }
    : null;
  const practice: HeroAction = score == null ? { href: "/practice/start", label: "Làm bài test đầu tiên" } : { href: "/practice", label: "Luyện đề ngay" };
  const quickStudy: HeroAction = { href: "/quick-study", label: "Quick Study" };

  if (due > 0) return { primary: review, secondary: resume ?? practice };
  if (resume) return { primary: resume, secondary: quickStudy };
  return { primary: practice, secondary: quickStudy };
}

function getQuests(data: DashboardData, todayMinutes: number, dailyGoal: number): Quest[] {
  const due = data.vocabularyReminder.dueTodayCount;
  const attempt = data.continueAttempt;

  const quests: Quest[] = [
    due > 0
      ? { icon: Layers, title: `Ôn ${due} từ đến hạn`, progressLabel: `còn ${due} từ`, progress: 0, done: false, href: "/vocabulary/review" }
      : { icon: Layers, title: "Ôn từ đến hạn", progressLabel: "Đã xong", progress: 100, done: true, href: "/vocabulary/review" },
    attempt
      ? {
          icon: ListChecks,
          title: `Làm tiếp: ${attempt.test.title}`,
          progressLabel: `${attempt.currentQuestionIndex}/${attempt.test.totalQuestions} câu`,
          progress: (attempt.currentQuestionIndex / attempt.test.totalQuestions) * 100,
          done: false,
          href: `/exam/${attempt.id}`,
        }
      : { icon: ListChecks, title: "Làm 1 đề luyện tập", progressLabel: "0/1 đề", progress: 0, done: false, href: "/practice" },
    {
      icon: Timer,
      title: `Học đủ ${dailyGoal} phút`,
      progressLabel: `${Math.min(todayMinutes, dailyGoal)}/${dailyGoal} phút`,
      progress: dailyGoal > 0 ? (todayMinutes / dailyGoal) * 100 : 0,
      done: dailyGoal > 0 && todayMinutes >= dailyGoal,
      href: "/quick-study",
    },
  ];
  // Review first, then the test, then study time; finished quests sink to
  // the bottom (stable sort keeps that order within each group).
  return [...quests].sort((a, b) => Number(a.done) - Number(b.done));
}

/**
 * Staggered fade+slide entrance, pure CSS (tw-animate-css), no client JS.
 * Class strings must stay static/literal so Tailwind's build-time scanner
 * can find them; interpolating the delay value would produce a class name
 * Tailwind never generates CSS for.
 */
const REVEAL = [
  "animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both",
  "animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-both",
  "animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both",
  "animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both",
  "animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-both",
] as const;

const PANEL = "rounded-[2rem] border border-border/60 bg-card p-6 shadow-soft";

export default async function DashboardPage() {
  const profile = await requireUser();
  const [data, siteThemeId] = await Promise.all([getDashboardData(profile.id), getSiteThemeId(profile.id)]);
  const firstName = (data.profile.fullName ?? "bạn").split(" ").pop() ?? "bạn";
  const score = data.predictedScore?.total ?? data.profile.currentScore;
  const todayMinutes = data.activityHeatmap[data.activityHeatmap.length - 1]?.minutes ?? 0;
  const dailyGoal = data.profile.dailyStudyTargetMinutes;
  const due = data.vocabularyReminder.dueTodayCount;
  const heroActions = getHeroActions(data, score);
  const hasSkillData = data.partAccuracies.some((p) => p.attempted > 0);

  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5">
      <div className={`grid grid-cols-1 gap-5 lg:grid-cols-12 ${REVEAL[0]}`}>
        <div className="lg:col-span-8">
          <DashboardHero
            greeting={getGreeting()}
            firstName={firstName}
            themeId={siteThemeId}
            todayMinutes={todayMinutes}
            dailyGoalMinutes={dailyGoal}
            streakCount={data.profile.streakCount}
            weeklyStudyMinutes={data.weeklyStudyMinutes}
            weeklyGoalMinutes={dailyGoal * 7}
            activityHeatmap={data.activityHeatmap}
            primaryAction={heroActions.primary}
            secondaryAction={heroActions.secondary}
          />
        </div>
        <div className="lg:col-span-4">
          <LevelAvatarCard
            avatarUrl={data.profile.avatarUrl}
            equippedShopItemId={profile.equippedShopItemId}
            xpProgress={data.xpProgress}
            todayXp={data.todayXp}
            streakCount={data.profile.streakCount}
          />
        </div>
      </div>

      <div className={`grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12 ${REVEAL[1]}`}>
        <div className="lg:col-span-4">
          <EstimatedScoreCard
            score={score ?? null}
            targetScore={data.profile.targetScore}
            listening={data.predictedScore?.listening ?? null}
            reading={data.predictedScore?.reading ?? null}
          />
        </div>
        <div className="lg:col-span-4">
          <DailyQuests quests={getQuests(data, todayMinutes, dailyGoal)} />
        </div>
        <div className="grid grid-cols-2 gap-3 md:col-span-2 lg:col-span-4">
          <StatCard icon={CheckCircle2} label="Độ chính xác" value={`${Math.round(data.overallStats.accuracy * 100)}%`} accent="success" />
          <StatCard icon={ListChecks} label="Đề đã làm" value={data.overallStats.attemptsCompleted} accent="info" />
          <StatCard icon={Layers} label="Từ đã học" value={data.overallStats.vocabularyLearned} accent="warning" />
          <StatCard icon={Clock3} label="Giờ học" value={formatStudyDuration(data.overallStats.totalStudySeconds)} />
        </div>
      </div>

      {data.continueAttempt && (
        <div className={REVEAL[2]}>
          <ContinueLearningCard
            testTitle={data.continueAttempt.test.title}
            currentQuestionIndex={data.continueAttempt.currentQuestionIndex}
            totalQuestions={data.continueAttempt.test.totalQuestions}
            attemptId={data.continueAttempt.id}
          />
        </div>
      )}

      <div className={`grid grid-cols-1 gap-5 lg:grid-cols-12 ${REVEAL[3]}`}>
        <section className={`${PANEL} lg:col-span-7`}>
          <SectionHeader icon={RadarIcon} title="Phân tích kỹ năng" />
          {hasSkillData ? (
            <SkillRadar data={data.partAccuracies} />
          ) : (
            <div className="relative">
              <div className="pointer-events-none opacity-30 blur-[1px]" aria-hidden>
                <SkillRadar data={data.partAccuracies} />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
                <p className="text-base font-bold">Biểu đồ đang chờ bài làm đầu tiên</p>
                <p className="max-w-[34ch] text-sm text-muted-foreground">
                  Làm một đề bất kỳ để xem bạn mạnh, yếu ở Part nào.
                </p>
                <Link
                  href="/practice"
                  className="mt-1 inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors duration-300 hover:bg-[var(--primary-hover)]"
                >
                  Chọn đề luyện
                </Link>
              </div>
            </div>
          )}
        </section>

        <section className={`${PANEL} lg:col-span-5`}>
          <SectionHeader icon={Layers} title="Từ cần ôn hôm nay" />
          {(data.vocabularyReminder.learningCount > 0 || data.vocabularyReminder.masteredCount > 0) && (
            <div className="mb-3 flex flex-wrap gap-2 text-xs">
              <span className="rounded-md bg-warning/15 px-2.5 py-1 font-bold text-warning tabular-nums">
                Đang học: {data.vocabularyReminder.learningCount}
              </span>
              <span className="rounded-md bg-primary/15 px-2.5 py-1 font-bold text-primary tabular-nums">
                Đã thuộc: {data.vocabularyReminder.masteredCount}
              </span>
            </div>
          )}
          {(due > 0 || data.vocabularyReminder.dueTomorrowCount > 0) && (
            <p className="mb-3 rounded-xl bg-accent/60 px-3 py-2 text-xs text-accent-foreground">
              {due > 0 && <>Hôm nay bạn có <strong>{due}</strong> từ cần ôn. </>}
              {data.vocabularyReminder.dueTomorrowCount > 0 && (
                <>Ngày mai còn <strong>{data.vocabularyReminder.dueTomorrowCount}</strong> từ.</>
              )}
            </p>
          )}
          <DueWordList words={data.dueVocabulary} />
        </section>
      </div>

      <section className={REVEAL[4]}>
        <SectionHeader icon={Lightbulb} title="Gợi ý cho bạn" />
        <RecommendationList recommendations={data.recommendations} />
        {data.suggestedTests.length > 0 && (
          <>
            <p className="mt-6 mb-3 flex items-center gap-1.5 text-sm font-bold">
              <BookOpen className="size-4 text-primary" strokeWidth={1.75} /> Đề thi gợi ý
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.suggestedTests.map((test) => (
                <TestCard
                  key={test.id}
                  title={test.title}
                  difficulty={test.difficulty}
                  totalQuestions={test.totalQuestions}
                  durationMinutes={test.durationMinutes}
                  usersCompleted={profile.role === "ADMIN" ? test.usersCompleted : undefined}
                  bestScore={test.bestScore}
                  href={`/practice/${test.id}`}
                  ctaLabel="Làm đề"
                />
              ))}
            </div>
          </>
        )}
      </section>

      <StudyMascot state={getDashboardMascotState(data.profile)} equippedShopItemId={profile.equippedShopItemId} />
      <DashboardTour />
    </div>
  );
}
