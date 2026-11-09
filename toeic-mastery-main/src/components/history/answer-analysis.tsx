import Link from "next/link";
import { Crown } from "lucide-react";
import { PANEL } from "@/components/analytics/insights-view";
import { PART_META } from "@/lib/constants/toeic";
import { cn } from "@/lib/utils";
import type { AttemptResult } from "@/lib/data/history";

type Analysis = NonNullable<AttemptResult["analysis"]>;
type PartRow = AttemptResult["partBreakdown"][number];

export function AnswerAnalysis({ parts, analysis }: { parts: PartRow[]; analysis: AttemptResult["analysis"] }) {
  return (
    <section className={cn(PANEL, "flex flex-col gap-6")} aria-labelledby="answer-analysis-title">
      <div>
        <h2 id="answer-analysis-title" className="text-lg font-semibold">
          Phân tích câu trả lời
        </h2>
        {analysis && <p className="mt-1 max-w-[68ch] text-base leading-snug text-pretty text-foreground/90">{analysis.headline}</p>}
      </div>

      <div className="grid gap-x-10 gap-y-8 lg:grid-cols-2">
        <PartBars parts={parts} pacing={analysis?.pacing ?? []} />
        {analysis ? (
          <div className="flex flex-col gap-6">
            <Causes causes={analysis.causes} />
            <Habits analysis={analysis} />
            <Traps traps={analysis.traps} />
            <Topics topics={analysis.topics} />
          </div>
        ) : (
          <ProLock />
        )}
      </div>
    </section>
  );
}

function PartBars({ parts, pacing }: { parts: PartRow[]; pacing: Analysis["pacing"] }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold">Theo từng Part</h3>
      <ul className="flex flex-col gap-3.5">
        {parts.map((p) => {
          const pace = pacing.find((x) => x.part === p.part);
          return (
            <li key={p.part}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 text-sm">
                <span className="font-medium">{PART_META[p.part].shortLabel}</span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  <span className="font-semibold text-foreground">
                    {p.correct}/{p.total}
                  </span>{" "}
                  đúng
                  {p.wrong > 0 && `, ${p.wrong} sai`}
                  {p.skipped > 0 && `, ${p.skipped} bỏ qua`}
                </span>
              </div>
              <div
                role="img"
                aria-label={`${PART_META[p.part].shortLabel}: ${p.correct} đúng, ${p.wrong} sai, ${p.skipped} bỏ qua trên ${p.total} câu`}
                className="mt-1.5 flex h-2 gap-0.5 overflow-hidden rounded-full bg-muted"
              >
                <span className="bg-success" style={{ width: `${(p.correct / p.total) * 100}%` }} />
                <span className="bg-destructive" style={{ width: `${(p.wrong / p.total) * 100}%` }} />
              </div>
              {pace && (
                // Warning amber is too faint for small text on the light theme, so the amber goes on a dot.
                <p className={cn("mt-1 flex items-center gap-1.5 text-xs", pace.avgSec > pace.targetSec ? "font-medium text-foreground" : "text-muted-foreground")}>
                  {pace.avgSec > pace.targetSec && <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-warning" />}
                  Trung bình {pace.avgSec} giây/câu, mức chuẩn {pace.targetSec} giây
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Causes({ causes }: { causes: Analysis["causes"] }) {
  const max = causes[0]?.count ?? 0;
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold">Vì sao bạn mất điểm</h3>
      {causes.length === 0 ? (
        <p className="text-sm text-muted-foreground">Bài này không có câu sai hay bỏ qua nào.</p>
      ) : (
        <ul className="flex flex-col gap-3.5">
          {causes.map((c) => (
            <li key={c.cause}>
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="font-medium">{c.label}</span>
                <span className="font-semibold tabular-nums">{c.count} câu</span>
              </div>
              <div aria-hidden className="mt-1.5 h-2 rounded-full bg-muted">
                <div className="h-full rounded-full bg-destructive/70" style={{ width: `${(c.count / max) * 100}%` }} />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{c.tip}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Habits({ analysis }: { analysis: Analysis }) {
  const { changes, flagged, hintedCorrect } = analysis;
  const changed = changes.toCorrect + changes.toWrong + changes.wrongToWrong;
  if (changed + flagged.total + hintedCorrect === 0) return null;

  return (
    <div className="border-t border-border pt-5">
      <h3 className="mb-2 text-sm font-semibold">Thói quen khi làm bài</h3>
      <ul className="flex flex-col gap-1.5 text-sm">
        {changed > 0 && (
          <li>
            Đổi đáp án {changed} lần: {changes.toCorrect} lần từ sai thành đúng, {changes.toWrong} lần từ đúng thành sai
            {changes.wrongToWrong > 0 && `, ${changes.wrongToWrong} lần vẫn sai`}.
          </li>
        )}
        {flagged.total > 0 && (
          <li>
            Trong {flagged.total} câu đã đánh dấu, bạn đúng {flagged.correct} câu.
          </li>
        )}
        {hintedCorrect > 0 && <li>Có {hintedCorrect} câu đúng sau khi mở gợi ý, nên làm lại để chắc đã hiểu.</li>}
      </ul>
    </div>
  );
}

function Traps({ traps }: { traps: Analysis["traps"] }) {
  if (traps.length === 0) return null;
  return (
    <div className="border-t border-border pt-5">
      <h3 className="mb-2 text-sm font-semibold">Bẫy bạn hay dính</h3>
      <ul className="flex flex-col gap-2 text-sm">
        {traps.map((t) => (
          <li key={t.code}>
            <span className="font-medium">
              {t.nameVi} ({t.count} lần)
            </span>
            <span className="block text-xs text-muted-foreground">{t.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Topics({ topics }: { topics: Analysis["topics"] }) {
  if (topics.length === 0) return null;
  return (
    <div className="border-t border-border pt-5">
      <h3 className="mb-2 text-sm font-semibold">Ngữ pháp nên ôn</h3>
      <ul className="flex flex-col gap-1.5 text-sm">
        {topics.map((t) => (
          <li key={t.slug} className="flex items-baseline justify-between gap-3">
            <Link href={`/grammar/${t.slug}`} className="font-medium text-primary underline-offset-2 hover:underline">
              {t.title}
            </Link>
            <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
              {t.correct}/{t.total} đúng
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProLock() {
  return (
    <div className="flex flex-col items-start gap-2 self-start rounded-2xl bg-accent/50 p-5">
      <Crown className="size-5 text-primary" />
      <h3 className="text-sm font-semibold">Biết vì sao bạn mất điểm</h3>
      <p className="max-w-[44ch] text-sm text-muted-foreground">
        Gói Pro chỉ ra lý do mất từng câu, bẫy bạn hay dính, tốc độ làm bài, số lần đổi đáp án và phần ngữ pháp nên ôn.
      </p>
      <Link
        href="/pricing"
        className="mt-1 inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors duration-300 hover:bg-[var(--primary-hover)]"
      >
        Nâng cấp Pro
      </Link>
    </div>
  );
}
