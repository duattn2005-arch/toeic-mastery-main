"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { startLearningPathAction } from "@/lib/actions/learning-path";

const TARGETS = [450, 550, 650, 750, 850] as const;

/** "Bắt đầu" on the journey preview. Without a target score on the profile
 * yet, the learner picks one right here first (saved with the path). */
export function StartJourneyButton({ targetScore }: { targetScore: number | null }) {
  const router = useRouter();
  const [pending, startTransition] = React.useTransition();
  const [picked, setPicked] = React.useState<number | null>(targetScore);

  function start() {
    if (picked == null) return;
    startTransition(async () => {
      const result = await startLearningPathAction(targetScore == null ? picked : undefined);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success("Đã mở lộ trình của bạn — Ngày 1 đang chờ!");
      router.refresh();
    });
  }

  return (
    <div className="flex shrink-0 flex-col items-stretch gap-2 sm:items-end">
      {targetScore == null && (
        <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Mục tiêu điểm">
          {TARGETS.map((t) => (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={picked === t}
              onClick={() => setPicked(t)}
              className={cn(
                "h-8 rounded-full px-3 text-xs font-bold tabular-nums transition-colors duration-200",
                picked === t ? "bg-primary-foreground text-primary" : "bg-primary-foreground/15 hover:bg-primary-foreground/25"
              )}
            >
              {t}+
            </button>
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={start}
        disabled={pending || picked == null}
        className="group inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-primary-foreground px-5 text-sm font-bold text-primary shadow-sm transition-transform duration-300 ease-spring hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary disabled:pointer-events-none disabled:opacity-60"
      >
        {pending ? <Loader2 className="size-4 animate-spin" /> : null}
        {targetScore == null && picked == null ? "Chọn mục tiêu" : "Bắt đầu lộ trình"}
        {!pending && <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />}
      </button>
    </div>
  );
}
