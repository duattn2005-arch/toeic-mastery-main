import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, Target } from "lucide-react";

const MAX_SCORE = 990;
const CX = 110;
const CY = 108;
const R = 90;

function pointOnArc(score: number, radius = R) {
  const angle = Math.PI - (Math.min(MAX_SCORE, Math.max(0, score)) / MAX_SCORE) * Math.PI;
  return [CX + radius * Math.cos(angle), CY - radius * Math.sin(angle)] as const;
}

/**
 * Estimated TOEIC score as a half-circle gauge (0-990) with a tick at the
 * learner's target. With no score yet, the card becomes an invitation to
 * take a mock test instead of showing an empty dash.
 */
export function EstimatedScoreCard({
  score,
  targetScore,
  listening,
  reading,
}: {
  score: number | null;
  targetScore: number | null;
  listening: number | null;
  reading: number | null;
}) {
  const percent = score != null ? (score / MAX_SCORE) * 100 : 0;
  const [tx1, ty1] = targetScore ? pointOnArc(targetScore, R - 12) : [0, 0];
  const [tx2, ty2] = targetScore ? pointOnArc(targetScore, R + 12) : [0, 0];

  return (
    <section className="flex h-full flex-col rounded-[2rem] border border-border/60 bg-card p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold tracking-tight">Điểm ước tính</h2>
        {targetScore && (
          <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground tabular-nums">
            <Target className="size-3.5" strokeWidth={2} /> Mục tiêu {targetScore}
          </span>
        )}
      </div>

      <div className="relative mx-auto mt-4 w-full max-w-[240px]">
        <svg viewBox="0 0 220 124" className="w-full" aria-hidden>
          <path d={`M${CX - R} ${CY} A${R} ${R} 0 0 1 ${CX + R} ${CY}`} fill="none" strokeWidth={14} strokeLinecap="round" className="stroke-muted" />
          {score != null && score > 0 && (
            <path
              d={`M${CX - R} ${CY} A${R} ${R} 0 0 1 ${CX + R} ${CY}`}
              fill="none"
              strokeWidth={14}
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray={100}
              strokeDashoffset={100 - percent}
              className="ring-draw stroke-primary"
              style={{ "--ring-from": 100 } as CSSProperties}
            />
          )}
          {targetScore && (
            <line x1={tx1} y1={ty1} x2={tx2} y2={ty2} strokeWidth={3} strokeLinecap="round" className="stroke-foreground/70" />
          )}
        </svg>
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center">
          <p className="text-4xl leading-none font-extrabold tracking-tight tabular-nums">{score ?? "?"}</p>
          <p className="mt-1 text-xs text-muted-foreground tabular-nums">/ {MAX_SCORE}</p>
        </div>
      </div>

      {score != null ? (
        <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
          <div className="rounded-2xl bg-muted/60 px-4 py-2.5">
            <p className="text-[11px] font-medium text-muted-foreground">Listening</p>
            <p className="text-lg font-extrabold tabular-nums">{listening ?? "-"}</p>
          </div>
          <div className="rounded-2xl bg-muted/60 px-4 py-2.5">
            <p className="text-[11px] font-medium text-muted-foreground">Reading</p>
            <p className="text-lg font-extrabold tabular-nums">{reading ?? "-"}</p>
          </div>
        </div>
      ) : (
        <Link
          href="/practice/start"
          className="group mt-auto flex items-center justify-between gap-3 rounded-2xl bg-accent px-4 py-3 transition-colors duration-300 hover:bg-primary/15"
        >
          <span>
            <span className="block text-sm font-bold text-accent-foreground">Làm bài test thử</span>
            <span className="block text-xs text-muted-foreground">Để biết điểm hiện tại của bạn</span>
          </span>
          <ArrowRight className="size-4 text-accent-foreground transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      )}
    </section>
  );
}
