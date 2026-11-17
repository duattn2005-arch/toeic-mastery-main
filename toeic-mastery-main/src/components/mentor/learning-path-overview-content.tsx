import Link from "next/link";
import { ArrowUpRight, Calendar, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeScene } from "@/components/layout/theme-scene";
import { DEFAULT_SITE_THEME_ID } from "@/lib/constants/site-themes";
import { PART_META } from "@/lib/constants/toeic";
import type { LearningPathOverview } from "@/lib/data/learning-path";
import { buildJourneyStages, journeyStep } from "@/lib/services/journey-map";
import { JourneyMap } from "@/components/journey/journey-map";

/** The whole path: a summary card, today's day, then every stage on the
 * illustrated journey map (same map as the dashboard card shows one stage
 * of) — finished days in green, today's glowing, the rest locked until the
 * day before it is done. */
export function LearningPathOverviewContent({ data }: { data: LearningPathOverview }) {
  const stages = buildJourneyStages(data.days);
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
              bước hoàn thành · {stages.filter((s) => s.state === "done").length}/{stages.length} chặng
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
          <div className="h-full rounded-full bg-gradient-to-r from-primary to-brand-glow" style={{ width: `${pathPercent}%` }} />
        </div>
        {data.rationale && <p className="mt-4 text-sm leading-relaxed text-foreground/85">{data.rationale}</p>}
      </div>

      {data.currentDay && currentDayNumber && (
        <Link
          href={`/mentor/path/day/${currentDayNumber}`}
          className="group relative isolate flex flex-wrap items-center justify-between gap-4 overflow-hidden rounded-[1.75rem] bg-gradient-to-r from-primary to-brand-deep p-6 text-primary-foreground shadow-lift"
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
            <p className="text-xs font-bold tracking-wide uppercase opacity-80">Bước tiếp theo</p>
            <p className="mt-1 text-2xl font-extrabold tracking-tight">
              Chặng {journeyStep(currentDayNumber).stage} · Bước {journeyStep(currentDayNumber).step}
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

      <section className="flex flex-col gap-3" aria-label="Bản đồ lộ trình">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-base font-extrabold tracking-tight">Bản đồ lộ trình</h2>
          <span className="text-xs font-bold text-primary tabular-nums">
            {stages.filter((s) => s.state === "done").length}/{stages.length} chặng
          </span>
        </div>
        <JourneyMap stages={stages} linkDays />
      </section>
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
