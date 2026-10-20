import Link from "next/link";
import { ArrowUpRight, BookOpenCheck, Crown, ListChecks } from "lucide-react";
import { ThemeScene } from "@/components/layout/theme-scene";

/** Dark on the left where the copy sits, clear on the right so the scene's
 * subject (the cat, by default) shows. */
const SCRIM =
  "linear-gradient(90deg, color-mix(in srgb, var(--scrim) 92%, transparent) 0%, color-mix(in srgb, var(--scrim) 78%, transparent) 42%, color-mix(in srgb, var(--scrim) 15%, transparent) 72%, color-mix(in srgb, var(--scrim) 30%, transparent) 100%)";
const SCRIM_LIGHT =
  "linear-gradient(90deg, color-mix(in srgb, var(--scrim) 97%, transparent) 0%, color-mix(in srgb, var(--scrim) 86%, transparent) 42%, color-mix(in srgb, var(--scrim) 10%, transparent) 72%, color-mix(in srgb, var(--scrim) 25%, transparent) 100%)";

/**
 * Entry point to the Mastery grammar course, shown on the Grammar page. Uses
 * the learner's Live theme scene (animated for the default lily-pond cat) as
 * its backdrop so it reads as a featured, premium section.
 */
export function MasteryBanner({
  href,
  title,
  lessonCount,
  questionCount,
  themeId,
}: {
  href: string;
  title: string;
  lessonCount: number;
  questionCount: number;
  themeId: string;
}) {
  return (
    <Link
      href={href}
      className="group relative isolate block overflow-hidden rounded-[2rem] border border-primary/30 shadow-lift transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:border-primary/60"
    >
      <ThemeScene themeId={themeId} position="66% 62%" scrim={{ light: SCRIM_LIGHT, dark: SCRIM }} />
      <div className="relative flex min-h-[176px] flex-col justify-between gap-6 p-6 text-foreground sm:flex-row dark:text-white sm:items-center sm:p-8">
        <div className="flex max-w-xl items-start gap-4">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-amber-500 text-[#3a2600] shadow-[0_10px_24px_-10px_rgba(251,191,36,0.8)]">
            <Crown className="size-7" strokeWidth={2} />
          </span>
          <div>
            <p className="inline-flex rounded-full bg-amber-400/25 px-2.5 py-0.5 text-[11px] font-bold text-amber-800 ring-1 ring-amber-500/40 dark:bg-amber-400/20 dark:text-amber-200 dark:ring-amber-300/40">
              Độc quyền
            </p>
            <h2 className="mt-2 text-2xl leading-tight font-extrabold tracking-tight sm:text-3xl dark:[text-shadow:0_2px_12px_rgba(0,0,0,0.5)]">
              {title}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground/75 dark:text-white/85 dark:[text-shadow:0_1px_6px_rgba(0,0,0,0.6)]">
              Luyện chuyên sâu Ngữ pháp &amp; Từ vựng TOEIC Part 5-6: danh từ, động từ, tính từ, trạng từ, giới từ, kèm bài tập.
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 shadow-sm ring-1 ring-black/5 dark:bg-black/40 dark:shadow-none dark:ring-white/15">
                <BookOpenCheck className="size-3.5 text-brand-soft" /> <span className="tabular-nums">{lessonCount}</span> bài học
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 shadow-sm ring-1 ring-black/5 dark:bg-black/40 dark:shadow-none dark:ring-white/15">
                <ListChecks className="size-3.5 text-brand-soft" /> <span className="tabular-nums">{questionCount}</span> câu luyện tập
              </span>
            </div>
          </div>
        </div>

        <span className="inline-flex h-11 shrink-0 items-center gap-2 self-start rounded-full bg-primary py-1 pr-1 pl-5 text-sm font-bold text-primary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_10px_28px_-10px_rgba(45,212,191,0.7)] sm:self-auto">
          Vào học
          <span className="flex size-9 items-center justify-center rounded-full bg-black/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
            <ArrowUpRight className="size-4" strokeWidth={2.25} />
          </span>
        </span>
      </div>
    </Link>
  );
}
