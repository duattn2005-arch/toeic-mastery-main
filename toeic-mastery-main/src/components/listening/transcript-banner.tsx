import Link from "next/link";
import { ArrowUpRight, FileAudio, Headphones, Keyboard, Languages, PencilLine } from "lucide-react";
import { ThemeScene } from "@/components/layout/theme-scene";

/** Same scrims as the Grammar Mastery banner: solid behind the copy, clear
 * on the right so the theme's scene shows. */
const SCRIM =
  "linear-gradient(90deg, color-mix(in srgb, var(--scrim) 92%, transparent) 0%, color-mix(in srgb, var(--scrim) 78%, transparent) 42%, color-mix(in srgb, var(--scrim) 15%, transparent) 72%, color-mix(in srgb, var(--scrim) 30%, transparent) 100%)";
const SCRIM_LIGHT =
  "linear-gradient(90deg, color-mix(in srgb, var(--scrim) 97%, transparent) 0%, color-mix(in srgb, var(--scrim) 86%, transparent) 42%, color-mix(in srgb, var(--scrim) 10%, transparent) 72%, color-mix(in srgb, var(--scrim) 25%, transparent) 100%)";

const chip =
  "inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 shadow-sm ring-1 ring-black/5 dark:bg-black/40 dark:shadow-none dark:ring-white/15";

/** Featured entry to the Transcript Mastery ETS 2026 dictation, at the top
 * of the Listening page — styled like the Grammar page's Mastery banner. */
export function TranscriptMasteryBanner({
  href,
  title,
  testCount,
  questionCount,
  blankCount,
  themeId,
}: {
  href: string;
  title: string;
  testCount: number;
  questionCount: number;
  blankCount: number;
  themeId: string;
}) {
  return (
    <Link
      href={href}
      data-tour="transcript-banner"
      className="group relative isolate block overflow-hidden rounded-[2rem] border border-primary/30 shadow-lift transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:border-primary/60"
    >
      <ThemeScene themeId={themeId} position="66% 62%" scrim={{ light: SCRIM_LIGHT, dark: SCRIM }} />
      <div className="relative flex min-h-[196px] flex-col justify-between gap-6 p-6 text-foreground sm:flex-row sm:items-center sm:p-8 dark:text-white">
        <div className="flex max-w-2xl items-start gap-4">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-amber-500 text-[#3a2600] shadow-[0_10px_24px_-10px_rgba(251,191,36,0.8)]">
            <Headphones className="size-7" strokeWidth={2} />
          </span>
          <div>
            <p className="inline-flex rounded-full bg-amber-400/25 px-2.5 py-0.5 text-[11px] font-bold text-amber-800 ring-1 ring-amber-500/40 dark:bg-amber-400/20 dark:text-amber-200 dark:ring-amber-300/40">
              Độc quyền
            </p>
            <h2 className="mt-2 text-2xl leading-tight font-extrabold tracking-tight sm:text-3xl dark:[text-shadow:0_2px_12px_rgba(0,0,0,0.5)]">{title}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground/75 dark:text-white/85 dark:[text-shadow:0_1px_6px_rgba(0,0,0,0.6)]">
              Nghe chép chính tả trọn bộ ETS 2026, Part 1–4: nghe lại từng câu, gợi ý chữ cái, chấm ngay từng câu, kèm dịch song ngữ và đáp án.
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
              <span className={chip}>
                <FileAudio className="size-3.5 text-brand-soft" /> <span className="tabular-nums">{testCount}</span> đề
              </span>
              <span className={chip}>
                <Headphones className="size-3.5 text-brand-soft" /> <span className="tabular-nums">{questionCount.toLocaleString("vi-VN")}</span> câu
              </span>
              <span className={chip}>
                <PencilLine className="size-3.5 text-brand-soft" /> <span className="tabular-nums">{blankCount.toLocaleString("vi-VN")}</span> ô nghe điền
              </span>
              <span className={chip}>
                <Languages className="size-3.5 text-brand-soft" /> Dịch & đáp án
              </span>
              <span className={`${chip} hidden sm:inline-flex`}>
                <Keyboard className="size-3.5 text-brand-soft" /> Phím tắt
              </span>
            </div>
          </div>
        </div>

        <span className="inline-flex h-11 shrink-0 items-center gap-2 self-start rounded-full bg-primary py-1 pr-1 pl-5 text-sm font-bold text-primary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_10px_28px_-10px_var(--primary)] sm:self-auto">
          Luyện ngay
          <span className="flex size-9 items-center justify-center rounded-full bg-black/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
            <ArrowUpRight className="size-4" strokeWidth={2.25} />
          </span>
        </span>
      </div>
    </Link>
  );
}
