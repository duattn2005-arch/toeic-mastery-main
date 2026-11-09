"use client";

import * as React from "react";
import { useMotionValue, useReducedMotion, useTransform, animate } from "framer-motion";

function AnimatedNumber({ value }: { value: number }) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v));
  const [display, setDisplay] = React.useState(0);
  const reducedMotion = useReducedMotion();

  React.useEffect(() => {
    const controls = animate(motionValue, value, { duration: reducedMotion ? 0 : 1.1, ease: "easeOut" });
    const unsubscribe = rounded.on("change", setDisplay);
    return () => {
      controls.stop();
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <>{display}</>;
}

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m} phút ${s} giây`;
}

export function ScoreResultHeader({
  isEstimated,
  totalScore,
  listeningScore,
  readingScore,
  correctCount,
  wrongCount,
  skippedCount,
  accuracy,
  timeUsedSec,
}: {
  isEstimated: boolean;
  totalScore: number | null;
  listeningScore: number | null;
  readingScore: number | null;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  accuracy: number;
  timeUsedSec: number;
}) {
  const total = correctCount + wrongCount + skippedCount;

  return (
    <div className="grid items-start gap-x-10 gap-y-6 md:grid-cols-[auto_minmax(0,1fr)] lg:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.2fr)]">
      {totalScore !== null ? (
        <>
          <div>
            <p className="text-sm text-muted-foreground">{isEstimated ? "Điểm ước tính" : "Điểm số"}</p>
            <p className="mt-1 text-6xl leading-none font-extrabold tracking-tighter text-primary tabular-nums sm:text-7xl">
              <AnimatedNumber value={totalScore} />
              <span className="ml-2 text-xl font-medium tracking-normal text-muted-foreground">/ 990</span>
            </p>
          </div>
          <div className="flex flex-col gap-3 md:pt-6">
            <SkillScore label="Listening" score={listeningScore} />
            <SkillScore label="Reading" score={readingScore} />
          </div>
        </>
      ) : (
        <div>
          <p className="text-sm text-muted-foreground">Kết quả luyện tập</p>
          <p className="mt-1 text-5xl leading-none font-extrabold tracking-tighter text-primary tabular-nums">
            {correctCount}
            <span className="ml-2 text-xl font-medium tracking-normal text-muted-foreground">/ {total} câu đúng</span>
          </p>
          <p className="mt-2 text-xs text-muted-foreground">Bài luyện tập một phần không quy đổi ra thang điểm 990.</p>
        </div>
      )}

      <dl className="grid grid-cols-3 gap-x-4 gap-y-3 text-sm md:col-span-2 lg:col-span-1">
        <Fact label="Câu đúng" value={`${correctCount}/${total}`} valueClassName="text-success" />
        <Fact label="Câu sai" value={wrongCount} valueClassName="text-destructive" />
        <Fact label="Bỏ qua" value={skippedCount} />
        <Fact label="Thời gian" value={formatTime(timeUsedSec)} />
        <div className="col-span-2">
          {/* Named in full: it differs from correct/total above because skipped questions don't count. */}
          <Fact label="Tỷ lệ đúng trên câu đã làm" value={`${Math.round(accuracy * 100)}%`} />
        </div>
      </dl>
    </div>
  );
}

function SkillScore({ label, score }: { label: string; score: number | null }) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold tabular-nums">{score ?? "–"} / 495</span>
      </div>
      <div aria-hidden className="mt-1 h-1.5 rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary" style={{ width: `${((score ?? 0) / 495) * 100}%` }} />
      </div>
    </div>
  );
}

function Fact({ label, value, valueClassName }: { label: string; value: React.ReactNode; valueClassName?: string }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className={`mt-0.5 text-base font-semibold tabular-nums ${valueClassName ?? ""}`}>{value}</dd>
    </div>
  );
}
