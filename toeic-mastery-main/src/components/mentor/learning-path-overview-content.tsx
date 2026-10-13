import Link from "next/link";
import { ArrowUpRight, Calendar, Check, Lock, RotateCcw, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeScene } from "@/components/layout/theme-scene";
import { DEFAULT_SITE_THEME_ID } from "@/lib/constants/site-themes";
import { PART_META } from "@/lib/constants/toeic";
import type { LearningPathOverview, LearningPathDaySummary } from "@/lib/data/learning-path";

/** Same visual language as the vocabulary 20-day path (path-overview-content):
 * completed days glow mint with a check, today's day has a thick teal
 * border, locked days are dimmed. */
export function LearningPathOverviewContent({ data }: { data: LearningPathOverview }) {
  const currentDayNumber = data.currentDay && data.currentDay.status !== "COMPLETED" ? data.currentDay.dayNumber : null;
  const pathPercent = data.totalDays > 0 ? Math.round((data.daysCompleted / data.totalDays) * 100) : 0;

  return (
    <div className="flex flex-col gap-7">
      <div className="rounded-[1.75rem] border border-border/60 bg-card p-6 shadow-soft">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">Lộ trình học cá nhân hóa</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              <span className="font-bold text-foreground tabular-nums">
                {data.daysCompleted}/{data.totalDays}
              </span>{" "}
              ngày hoàn thành
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
              <Target className="size-3.5" /> Mục tiêu <span className="tabular-nums">{data.targetScore}</span>
            </span>
            {data.examDate && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-bold text-foreground/85">
                <Calendar className="size-3.5" /> Thi ngày {new Date(data.examDate).toLocaleDateString("vi-VN")}
              </span>
            )}
          </div>
        </div>
        <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-gradient-to-r from-primary to-[#5eead4]" style={{ width: `${pathPercent}%` }} />
        </div>
        {data.rationale && <p className="mt-4 text-sm leading-relaxed text-foreground/85">{data.rationale}</p>}
      </div>

      {data.currentDay && currentDayNumber && (
        <Link
          href={`/mentor/path/day/${currentDayNumber}`}
          className="group relative isolate flex flex-wrap items-center justify-between gap-4 overflow-hidden rounded-[1.75rem] bg-gradient-to-r from-primary to-[#14b8a6] p-6 text-primary-foreground shadow-lift"
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
            <p className="mt-1 text-2xl font-extrabold tracking-tight">
              Ngày {currentDayNumber}
              <span className="ml-2 text-base font-bold opacity-80">
                {data.currentDay.focusParts.map((p) => PART_META[p].shortLabel).join(", ")}
              </span>
            </p>
            <ItemsBar done={data.currentDay.itemsDone} total={data.currentDay.itemsTotal} className="mt-3 w-48" tone="onPrimary" />
          </div>
          <span className="relative inline-flex h-11 items-center gap-2 rounded-full bg-[#04201c] py-1 pr-1 pl-5 text-sm font-bold text-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-active:scale-[0.97]">
            {data.currentDay.itemsDone > 0 ? `Tiếp tục (${data.currentDay.itemsDone}/${data.currentDay.itemsTotal})` : "Học ngay"}
            <span className="flex size-9 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px">
              <ArrowUpRight className="size-4" strokeWidth={2.25} />
            </span>
          </span>
        </Link>
      )}

      {data.weeks.map((week) => {
        const done = week.days.filter((d) => d.status === "COMPLETED").length;
        return (
          <section key={week.label} className="flex flex-col gap-3">
            <div className="flex items-end justify-between gap-4">
              <h3 className="text-base font-extrabold tracking-tight">{week.label}</h3>
              <div className="flex items-center gap-2">
                <div className="hidden h-1.5 w-24 overflow-hidden rounded-full bg-muted sm:block">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${(done / week.days.length) * 100}%` }} />
                </div>
                <span className="text-xs font-bold text-primary tabular-nums">
                  {done}/{week.days.length}
                </span>
              </div>
            </div>
            <div className="-mx-1 flex items-stretch gap-4 overflow-x-auto px-1 pt-1 pb-3">
              {week.days.map((day) => (
                <DayCard key={day.dayNumber} day={day} isCurrent={day.dayNumber === currentDayNumber} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function ItemsBar({
  done,
  total,
  className,
  tone = "default",
}: {
  done: number;
  total: number;
  className?: string;
  tone?: "default" | "onPrimary";
}) {
  const percent = total > 0 ? (done / total) * 100 : 0;
  return (
    <div
      className={cn("h-1.5 overflow-hidden rounded-full", tone === "onPrimary" ? "bg-[#04201c]/25" : "bg-muted", className)}
      aria-label={`${done}/${total} mục`}
    >
      <div className={cn("h-full rounded-full", tone === "onPrimary" ? "bg-[#04201c]" : "bg-primary")} style={{ width: `${percent}%` }} />
    </div>
  );
}

function DayCard({ day, isCurrent }: { day: LearningPathDaySummary; isCurrent: boolean }) {
  const locked = day.status === "LOCKED";
  const completed = day.status === "COMPLETED";

  const content = (
    <div
      className={cn(
        "relative flex h-full w-60 shrink-0 flex-col gap-4 overflow-hidden rounded-[1.5rem] border p-4 transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
        completed && "border-primary/40 bg-gradient-to-b from-primary/20 via-card to-card shadow-soft hover:-translate-y-1 hover:shadow-lift",
        isCurrent && "border-2 border-primary bg-card shadow-[0_0_0_4px_rgba(45,212,191,0.15),0_18px_40px_-18px_rgba(45,212,191,0.55)] hover:-translate-y-1",
        !completed && !isCurrent && !locked && "border-border/70 bg-card shadow-soft hover:-translate-y-1 hover:border-primary/40",
        locked && "border-border/40 bg-card/50"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-xl text-base font-extrabold tabular-nums",
              completed && "bg-primary text-primary-foreground shadow-[0_6px_16px_-6px_rgba(45,212,191,0.8)]",
              isCurrent && "bg-primary/15 text-primary ring-2 ring-primary/50",
              !completed && !isCurrent && !locked && "bg-muted text-foreground",
              locked && "bg-muted/60 text-muted-foreground"
            )}
          >
            {completed ? <Check className="size-5" strokeWidth={3} /> : locked ? <Lock className="size-4" /> : day.dayNumber}
          </span>
          <div>
            <p className={cn("text-[15px] leading-tight font-extrabold", locked && "text-muted-foreground")}>Ngày {day.dayNumber}</p>
            <p className="text-xs text-muted-foreground tabular-nums">{new Date(day.scheduledDate).toLocaleDateString("vi-VN")}</p>
          </div>
        </div>
        {completed ? (
          <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[11px] font-bold text-primary ring-1 ring-primary/30">Hoàn thành</span>
        ) : isCurrent ? (
          <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-bold text-primary-foreground">Hôm nay</span>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {day.focusParts.map((part) => (
          <span
            key={part}
            className={cn(
              "rounded-md px-2 py-1 text-[11px] font-semibold ring-1",
              locked ? "bg-muted/40 text-muted-foreground ring-border/40" : "bg-muted text-foreground/90 ring-border"
            )}
          >
            {PART_META[part].shortLabel}
          </span>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-3">
        {!locked && !completed && (
          <div className="flex items-center gap-2">
            <ItemsBar done={day.itemsDone} total={day.itemsTotal} className="flex-1" />
            <span className="text-[11px] font-semibold text-muted-foreground tabular-nums">
              {day.itemsDone}/{day.itemsTotal}
            </span>
          </div>
        )}

        {locked ? (
          <span className="flex h-10 items-center justify-center gap-1.5 rounded-full bg-muted/40 text-sm font-medium text-muted-foreground">
            <Lock className="size-3.5" /> Chưa mở khóa
          </span>
        ) : completed ? (
          <span className="flex h-10 items-center justify-center gap-1.5 rounded-full text-sm font-bold text-primary ring-1 ring-primary/40 transition-colors duration-300 group-hover:bg-primary/10">
            <RotateCcw className="size-3.5" strokeWidth={2.25} /> Xem lại
          </span>
        ) : (
          <span className="flex h-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition-colors duration-300 group-hover:bg-[var(--primary-hover)]">
            {day.itemsDone > 0 ? "Tiếp tục" : "Học ngay"}
          </span>
        )}
      </div>
    </div>
  );

  return locked ? (
    <div aria-disabled>{content}</div>
  ) : (
    <Link href={`/mentor/path/day/${day.dayNumber}`} className="group rounded-[1.5rem] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50">
      {content}
    </Link>
  );
}
