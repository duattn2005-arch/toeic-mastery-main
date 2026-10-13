import Link from "next/link";
import { ArrowUpRight, Check, Lock, RotateCcw, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeScene } from "@/components/layout/theme-scene";
import { DEFAULT_SITE_THEME_ID } from "@/lib/constants/site-themes";
import type { getVocabularyPathOverview } from "@/lib/data/vocabulary-path";

type PathOverview = Awaited<ReturnType<typeof getVocabularyPathOverview>>;

const STEPS_PER_DAY = 3;

/** The "20 ngày" tab's content: rank/XP widget, today's callout, and the
 * tier-grouped, horizontally-scrollable day rows. Pure presentational (data
 * fetched once in the /vocabulary page and passed down), so it can be
 * rendered inside the client-side tab switcher without itself needing to be
 * a Client Component. */
export function PathOverviewContent({
  data,
  dayBasePath = "/vocabulary/path/day",
  showXp = true,
}: {
  data: PathOverview;
  /** Day N links to `${dayBasePath}/N`, so IIG topic paths reuse this view. */
  dayBasePath?: string;
  showXp?: boolean;
}) {
  const { xpProgress } = data;
  const currentDayNumber = data.currentDay && !data.currentDay.isCompleted ? data.currentDay.dayNumber : null;
  const pathPercent = data.totalDays > 0 ? Math.round((data.daysCompleted / data.totalDays) * 100) : 0;

  return (
    <div className="flex flex-col gap-7">
      {/* Header: path title, overall progress, level */}
      <div className="grid gap-4 rounded-[1.75rem] border border-border/60 bg-card p-5 shadow-soft sm:p-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight">{data.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            <span className="font-bold text-foreground tabular-nums">
              {data.daysCompleted}/{data.totalDays}
            </span>{" "}
            ngày hoàn thành, <span className="tabular-nums">{data.totalWords}</span> từ trong lộ trình
          </p>
          <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-gradient-to-r from-primary to-[#5eead4]" style={{ width: `${pathPercent}%` }} />
          </div>
        </div>
        {showXp && (
        <div className="flex items-center gap-3 rounded-2xl bg-muted/60 px-4 py-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
            <Sparkles className="size-5" strokeWidth={1.75} />
          </span>
          <div>
            <p className="text-sm font-extrabold">{xpProgress.level.name}</p>
            <p className="text-xs text-muted-foreground">
              {xpProgress.nextLevel ? (
                <>
                  còn <span className="font-bold text-primary tabular-nums">{xpProgress.xpToNext}</span> XP lên {xpProgress.nextLevel.name}
                </>
              ) : (
                "Đã đạt cấp cao nhất"
              )}
            </p>
          </div>
        </div>
        )}
      </div>

      {/* Today callout */}
      {data.currentDay && currentDayNumber && (
        <Link
          href={`${dayBasePath}/${currentDayNumber}`}
          className="group relative isolate flex flex-wrap items-center justify-between gap-4 overflow-hidden rounded-[1.75rem] bg-gradient-to-r from-primary to-[#14b8a6] p-5 text-primary-foreground shadow-lift sm:p-6"
        >
          {/* The lily-pond cat on the right half, fading into the teal
              toward the copy on the left */}
          <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 isolate w-[60%] sm:w-1/2">
            <ThemeScene
              themeId={DEFAULT_SITE_THEME_ID}
              size="cover"
              position="56% 64%"
              className="[mask-image:linear-gradient(to_right,transparent,black_45%)]"
            />
          </div>
          <div className="relative">
            <p className="text-xs font-bold tracking-wide uppercase opacity-80">Hôm nay</p>
            <p className="mt-1 text-2xl font-extrabold tracking-tight">Ngày {currentDayNumber}</p>
            <StepBar done={data.currentDay.stepsCompleted} className="mt-3 w-48" tone="onPrimary" />
          </div>
          <span className="relative inline-flex h-11 w-full items-center justify-between gap-2 rounded-full bg-[#04201c] py-1 pr-1 pl-5 text-sm font-bold text-white sm:w-auto sm:justify-start transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-active:scale-[0.97]">
            {data.currentDay.stepsCompleted > 0 ? `Tiếp tục (${data.currentDay.stepsCompleted}/${STEPS_PER_DAY})` : "Học ngay"}
            <span className="flex size-9 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px">
              <ArrowUpRight className="size-4" strokeWidth={2.25} />
            </span>
          </span>
        </Link>
      )}

      {data.tiers.map((tier) => {
        const done = tier.days.filter((d) => d.isCompleted).length;
        return (
          <section key={tier.label} className="flex flex-col gap-3">
            <div className="flex items-end justify-between gap-4">
              <h3 className="text-base font-extrabold tracking-tight">
                {tier.label}
                <span className="ml-2 text-sm font-medium text-muted-foreground">
                  Ngày {tier.days[0].dayNumber}-{tier.days[tier.days.length - 1].dayNumber}
                </span>
              </h3>
              <div className="flex items-center gap-2">
                <div className="hidden h-1.5 w-24 overflow-hidden rounded-full bg-muted sm:block">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${(done / tier.days.length) * 100}%` }} />
                </div>
                <span className="text-xs font-bold text-primary tabular-nums">
                  {done}/{tier.days.length}
                </span>
              </div>
            </div>
            <div className="-mx-4 flex snap-x snap-mandatory scroll-px-4 items-stretch gap-3 overflow-x-auto px-4 pt-1 pb-3 sm:mx-0 sm:snap-none sm:gap-4 sm:px-1">
              {tier.days.map((day) => (
                <DayCard
                  key={day.dayNumber}
                  day={day}
                  href={`${dayBasePath}/${day.dayNumber}`}
                  isCurrent={day.dayNumber === currentDayNumber}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

/** Three segments, one per study step of a day. */
function StepBar({ done, className, tone = "default" }: { done: number; className?: string; tone?: "default" | "onPrimary" }) {
  return (
    <div className={cn("grid grid-cols-3 gap-1", className)} aria-label={`${done}/${STEPS_PER_DAY} bước`}>
      {Array.from({ length: STEPS_PER_DAY }, (_, i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 rounded-full",
            tone === "onPrimary" ? (i < done ? "bg-[#04201c]" : "bg-[#04201c]/25") : i < done ? "bg-primary" : "bg-muted"
          )}
        />
      ))}
    </div>
  );
}

function DayCard({
  day,
  href,
  isCurrent,
}: {
  day: {
    dayNumber: number;
    wordCount: number;
    topicNames: string[];
    stepsCompleted: number;
    stars: number;
    isCompleted: boolean;
    isUnlocked: boolean;
  };
  href: string;
  isCurrent: boolean;
}) {
  const shownTags = day.topicNames.slice(0, 2);
  const extraCount = day.topicNames.length - shownTags.length;
  const locked = !day.isUnlocked;

  const content = (
    <div
      className={cn(
        "relative flex h-full w-56 shrink-0 snap-start flex-col gap-4 overflow-hidden rounded-[1.5rem] border p-4 transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] sm:w-64",
        day.isCompleted && "border-primary/40 bg-gradient-to-b from-primary/20 via-card to-card shadow-soft hover:-translate-y-1 hover:shadow-lift",
        isCurrent && "border-2 border-primary bg-card shadow-[0_0_0_4px_rgba(45,212,191,0.15),0_18px_40px_-18px_rgba(45,212,191,0.55)] hover:-translate-y-1",
        !day.isCompleted && !isCurrent && !locked && "border-border/70 bg-card shadow-soft hover:-translate-y-1 hover:border-primary/40",
        locked && "border-border/40 bg-card/50"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-xl text-base font-extrabold tabular-nums",
              day.isCompleted && "bg-primary text-primary-foreground shadow-[0_6px_16px_-6px_rgba(45,212,191,0.8)]",
              isCurrent && "bg-primary/15 text-primary ring-2 ring-primary/50",
              !day.isCompleted && !isCurrent && !locked && "bg-muted text-foreground",
              locked && "bg-muted/60 text-muted-foreground"
            )}
          >
            {day.isCompleted ? <Check className="size-5" strokeWidth={3} /> : locked ? <Lock className="size-4" /> : day.dayNumber}
          </span>
          <div>
            <p className={cn("text-[15px] leading-tight font-extrabold", locked && "text-muted-foreground")}>Ngày {day.dayNumber}</p>
            <p className="text-xs text-muted-foreground tabular-nums">{day.wordCount} từ</p>
          </div>
        </div>
        {day.isCompleted ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[11px] font-bold text-primary ring-1 ring-primary/30">
            Hoàn thành
          </span>
        ) : isCurrent ? (
          <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-bold text-primary-foreground">Hôm nay</span>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {shownTags.map((name) => (
          <span
            key={name}
            title={name}
            className={cn(
              "max-w-full truncate rounded-md px-2 py-1 text-[11px] font-semibold ring-1",
              locked ? "bg-muted/40 text-muted-foreground ring-border/40" : "bg-muted text-foreground/90 ring-border"
            )}
          >
            {name}
          </span>
        ))}
        {extraCount > 0 && (
          <span className="rounded-md bg-muted/50 px-2 py-1 text-[11px] font-semibold text-muted-foreground tabular-nums">
            +{extraCount}
          </span>
        )}
      </div>

      <div className="mt-auto flex flex-col gap-3">
        {!locked && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-0.5" aria-label={`${day.stars}/3 sao`}>
              {[1, 2, 3].map((n) => (
                <Star
                  key={n}
                  className={cn("size-4", n <= day.stars ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30")}
                  strokeWidth={1.75}
                />
              ))}
            </div>
            {!day.isCompleted && <StepBar done={day.stepsCompleted} className="w-20" />}
          </div>
        )}

        {locked ? (
          <span className="flex h-10 items-center justify-center gap-1.5 rounded-full bg-muted/40 text-sm font-medium text-muted-foreground">
            <Lock className="size-3.5" /> Chưa mở khóa
          </span>
        ) : day.isCompleted ? (
          <span className="flex h-10 items-center justify-center gap-1.5 rounded-full text-sm font-bold text-primary ring-1 ring-primary/40 transition-colors duration-300 group-hover:bg-primary/10">
            <RotateCcw className="size-3.5" strokeWidth={2.25} /> Ôn lại
          </span>
        ) : (
          <span className="flex h-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition-colors duration-300 group-hover:bg-[var(--primary-hover)]">
            {day.stepsCompleted > 0 ? `Tiếp tục (${day.stepsCompleted}/${STEPS_PER_DAY})` : "Học ngay"}
          </span>
        )}
      </div>
    </div>
  );

  return locked ? (
    <div aria-disabled>{content}</div>
  ) : (
    <Link href={href} className="group rounded-[1.5rem] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50">
      {content}
    </Link>
  );
}
