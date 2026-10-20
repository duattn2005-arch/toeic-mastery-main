import Link from "next/link";
import { ArrowUpRight, CalendarDays, Flame } from "lucide-react";
import { StreakHeatmap } from "@/components/dashboard/streak-heatmap";
import { MotivationalQuote } from "@/components/dashboard/motivational-quote";
import { ProgressRing } from "@/components/dashboard/progress-ring";
import { SiteThemeOverlay } from "@/components/layout/site-theme-overlay";
import { getSiteTheme } from "@/lib/constants/site-themes";
import { ThemeScene } from "@/components/layout/theme-scene";

export interface HeroAction {
  href: string;
  label: string;
}

/** Readability scrims: solid behind the copy on the left, clear on the right
 * so the theme's scene (the cat by the pond, by default) shows. Light mode
 * pairs the morning scene with dark ink text; dark mode the night scene
 * with white text. */
const SCRIM =
  "linear-gradient(90deg, color-mix(in srgb, var(--scrim) 88%, transparent) 0%, color-mix(in srgb, var(--scrim) 62%, transparent) 38%, color-mix(in srgb, var(--scrim) 12%, transparent) 68%, color-mix(in srgb, var(--scrim) 35%, transparent) 100%)";
const SCRIM_LIGHT =
  "linear-gradient(90deg, color-mix(in srgb, var(--scrim) 96%, transparent) 0%, color-mix(in srgb, var(--scrim) 82%, transparent) 38%, color-mix(in srgb, var(--scrim) 10%, transparent) 68%, color-mix(in srgb, var(--scrim) 25%, transparent) 100%)";

export function DashboardHero({
  greeting,
  firstName,
  themeId,
  todayMinutes,
  dailyGoalMinutes,
  streakCount,
  weeklyStudyMinutes,
  weeklyGoalMinutes,
  activityHeatmap,
  primaryAction,
  secondaryAction,
}: {
  greeting: string;
  firstName: string;
  /** Current site-wide Live theme (see site-theme-gallery.tsx). */
  themeId: string;
  todayMinutes: number;
  dailyGoalMinutes: number;
  streakCount: number;
  weeklyStudyMinutes: number;
  weeklyGoalMinutes: number;
  activityHeatmap: { date: string; minutes: number }[];
  primaryAction: HeroAction;
  secondaryAction?: HeroAction;
}) {
  const theme = getSiteTheme(themeId);
  const todayPercent = dailyGoalMinutes > 0 ? Math.round((todayMinutes / dailyGoalMinutes) * 100) : 0;
  const goalReached = todayMinutes >= dailyGoalMinutes && dailyGoalMinutes > 0;
  const today = new Intl.DateTimeFormat("vi-VN", { weekday: "long", day: "numeric", month: "numeric" }).format(new Date());

  return (
    <section className="relative isolate flex h-full min-h-[340px] flex-col overflow-hidden rounded-[2rem] border border-white/60 text-foreground shadow-lift dark:border-transparent dark:text-white">
      <ThemeScene themeId={themeId} position="62% 60%" scrim={{ light: SCRIM_LIGHT, dark: SCRIM }} />
      {theme.media === "video" && theme.videoSrc && (
        <>
          <video
            className="absolute inset-0 -z-10 size-full object-cover"
            src={theme.videoSrc}
            poster={theme.previewSrc}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
          />
          <div className="absolute inset-0 -z-10 bg-black/30" aria-hidden />
        </>
      )}
      {theme.media !== "gradient" && <SiteThemeOverlay themeId={theme.id} />}

      <div className="relative flex flex-1 flex-col justify-between gap-8 p-6 sm:p-8 md:flex-row md:items-stretch">
        {/* Left: greeting, quote, next action */}
        <div className="flex max-w-md flex-col justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-foreground/75 capitalize shadow-sm ring-1 ring-black/5 dark:bg-white/10 dark:font-medium dark:text-white/80 dark:shadow-none dark:ring-white/10">
              <CalendarDays className="size-3.5" strokeWidth={1.75} />
              {today}
            </span>
            <h1 className="mt-4 text-3xl leading-[1.1] font-extrabold tracking-tight sm:text-4xl">
              {greeting}, <span className="text-brand-soft">{firstName}</span>
            </h1>
            <div className="mt-3 max-w-sm">
              <MotivationalQuote />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href={primaryAction.href}
              className="group inline-flex h-11 items-center gap-2 rounded-full bg-primary py-1 pr-1 pl-5 text-sm font-semibold text-primary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_10px_28px_-10px_rgba(45,212,191,0.7)] transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[var(--primary-hover)] active:scale-[0.97]"
            >
              {primaryAction.label}
              <span className="flex size-9 items-center justify-center rounded-full bg-black/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                <ArrowUpRight className="size-4" strokeWidth={2.25} />
              </span>
            </Link>
            {secondaryAction && (
              <Link
                href={secondaryAction.href}
                className="inline-flex h-11 items-center rounded-full bg-white/85 px-5 text-sm font-semibold text-foreground shadow-sm ring-1 ring-black/5 transition-colors duration-300 hover:bg-white dark:bg-white/10 dark:text-white dark:shadow-none dark:ring-white/15 dark:hover:bg-white/15"
              >
                {secondaryAction.label}
              </Link>
            )}
          </div>
        </div>

        {/* Right: today's goal ring, streak and the last 14 days */}
        <div
          data-tour="dashboard-goals"
          className="flex w-full flex-col items-center justify-between gap-4 self-start rounded-[1.75rem] bg-white/85 p-5 shadow-soft ring-1 ring-black/5 md:w-auto md:self-stretch dark:bg-[#06100d]/85 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] dark:ring-white/10"
        >
          <ProgressRing
            value={todayPercent}
            size={132}
            stroke={11}
            trackClassName="stroke-black/10 dark:stroke-white/15"
            indicatorClassName="stroke-brand-soft"
          >
            <span className="text-3xl leading-none font-extrabold tabular-nums">{todayMinutes}</span>
            <span className="mt-1 text-[11px] font-medium text-muted-foreground tabular-nums dark:text-white/70">/ {dailyGoalMinutes} phút</span>
          </ProgressRing>
          <p className="text-center text-xs font-semibold text-foreground/80 dark:text-white/85">
            {goalReached ? "Đã đạt mục tiêu hôm nay" : "Mục tiêu hôm nay"}
          </p>

          <div className="flex w-full items-center justify-between gap-3 rounded-2xl bg-muted px-3 py-2 dark:bg-white/5">
            <span className="flex items-center gap-1.5 text-sm font-bold tabular-nums">
              <Flame className="glow-pulse size-4 text-orange-500 dark:text-orange-300" />
              {streakCount} ngày
            </span>
            <span className="text-[11px] text-muted-foreground tabular-nums dark:text-white/65">
              Tuần: {weeklyStudyMinutes}/{weeklyGoalMinutes}p
            </span>
          </div>

          <div className="w-full">
            <p className="mb-1.5 text-[11px] font-medium text-muted-foreground dark:text-white/60">14 ngày qua</p>
            <StreakHeatmap data={activityHeatmap} />
          </div>
        </div>
      </div>
    </section>
  );
}
