import Image from "next/image";
import Link from "next/link";
import { BarChart3, CircleAlert, Download, ListChecks, Target } from "lucide-react";
import { BLOOM_LEVELS, MASTERY_THRESHOLD, MIN_ATTEMPTS_PER_LEVEL, SCORED_LEVELS, type ScoredBloomLevel } from "@/lib/bloom/config";
import type { LevelMastery } from "@/lib/bloom/engine";
import { levelRoadmap, scorePct } from "@/lib/bloom/level-roadmap";
import type { LearningInsights } from "@/lib/services/insights/engine";
import { TaskAction } from "@/components/analytics/bloom-panel";
import { PracticeButton } from "@/components/analytics/practice-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LEVEL = new Map(BLOOM_LEVELS.map((l) => [l.id, l]));
const STEP_HEIGHT: Record<ScoredBloomLevel, string> = { 1: "h-[28%]", 2: "h-[42%]", 3: "h-[56%]", 4: "h-[70%]", 5: "h-[84%]" };

/** The learner's position, drawn: solid steps filled, the current one marked by the mascot standing on it. */
function Staircase({ levels, current }: { levels: Record<ScoredBloomLevel, LevelMastery>; current: ScoredBloomLevel | null }) {
  const standingOn = current ?? 5;
  return (
    <ol className="flex h-48 w-full items-end gap-1.5 sm:h-56 sm:gap-2 lg:h-72" aria-label="Vị trí của bạn trên thang Bloom">
      {SCORED_LEVELS.map((lvl) => {
        const m = levels[lvl];
        const here = lvl === standingOn;
        const val = m.score ?? m.pooledAccuracy;
        return (
          <li key={lvl} className={cn("relative flex min-w-0 flex-1 flex-col justify-end", STEP_HEIGHT[lvl])} aria-current={here ? "step" : undefined}>
            {here && (
              <Image
                src="/mascot-avatar.png"
                alt=""
                width={96}
                height={96}
                className="absolute bottom-full left-1/2 mb-1.5 size-12 max-w-none -translate-x-1/2 rounded-full shadow-soft ring-3 ring-card sm:size-16 lg:size-20"
              />
            )}
            <div
              className={cn(
                "flex h-full flex-col justify-between rounded-t-2xl p-1.5 text-center sm:p-2.5",
                m.mastered ? "bg-primary text-primary-foreground" : here ? "bg-card text-foreground ring-2 ring-primary ring-inset" : "bg-card/50 text-muted-foreground"
              )}
            >
              <span className="text-sm font-extrabold tabular-nums sm:text-base">{val === null ? "" : scorePct(val)}</span>
              <span className="text-[10px] leading-tight font-semibold sm:text-xs">{LEVEL.get(lvl)!.nameVi}</span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function heroCopy(insights: LearningInsights) {
  const { profile, rows } = insights.bloom;
  const current = profile.tier.frontier;
  const task = current !== null ? levelRoadmap(current, profile, rows).tasks[0] : undefined;
  if (profile.totalAnswered === 0) {
    return { task, title: "Làm bài đầu tiên để biết bạn đang ở đâu", body: "Sau vài bài, trang này sẽ chỉ ra bậc tư duy hiện tại, lỗi hay gặp và việc nên làm tiếp theo." };
  }
  if (current === null) {
    return { task, title: "Bạn đã vững cả 5 bậc tư duy", body: "Giờ là lúc giữ phong độ bằng đề có tính giờ và tự xây chiến thuật làm bài riêng." };
  }
  const m = profile.levels[current];
  const status =
    m.score === null
      ? `Bậc này mới có ${m.scoredAttempts} câu, cần ${MIN_ATTEMPTS_PER_LEVEL} câu để được chấm.`
      : m.score >= MASTERY_THRESHOLD
        ? `Đã đạt ${scorePct(m.score)}, nhưng còn một điều kiện: ${m.blockers[0]}.`
        : `Bạn đạt ${scorePct(m.score)}, cần ${scorePct(MASTERY_THRESHOLD)} để vững bậc này.`;
  return { task, title: `Bạn đang ở bậc ${LEVEL.get(current)!.nameVi}`, body: task ? `${status} Nên luyện trước: ${task.row.title}.` : status };
}

export function AnalyticsHero({ insights }: { insights: LearningInsights }) {
  const { profile, mistakes } = insights.bloom;
  const r = insights.routing;
  const current = profile.tier.frontier;
  const { title, body, task } = heroCopy(insights);
  const hasData = profile.totalAnswered > 0;
  const met = r.checklist.filter((c) => c.ok).length;
  const stats = [
    { icon: ListChecks, label: "Câu đã làm", value: insights.answered.toLocaleString("vi-VN") },
    { icon: Target, label: "Độ chính xác", value: hasData ? `${Math.round(insights.accuracy * 100)}%` : "Chưa có" },
    { icon: CircleAlert, label: "Câu vẫn đang sai", value: mistakes.stillWrong.toLocaleString("vi-VN") },
    { icon: BarChart3, label: r.level === "ADVANCED" ? "Điều kiện thi thật" : "Điều kiện lên cấp", value: `${met}/${r.checklist.length}` },
  ];

  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,var(--accent),color-mix(in_srgb,var(--accent)_35%,var(--card)))] p-6 sm:p-9 lg:p-12">
      <div className="grid items-end gap-x-10 gap-y-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-card px-3.5 py-1.5 text-sm font-semibold text-accent-foreground shadow-soft">{r.levelLabel}</span>
            <a href="/api/insights/profile" download className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-accent-foreground hover:bg-card/60 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none">
              <Download className="size-4" /> Tải hồ sơ năng lực
            </a>
          </div>
          <h1 className="mt-5 text-4xl leading-[1.08] font-extrabold tracking-tight text-pretty text-accent-foreground sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-pretty text-foreground/80 sm:text-lg">{body}</p>
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
            {!hasData ? (
              <Button asChild size="lg" className="font-bold">
                <Link href="/practice">Bắt đầu luyện tập</Link>
              </Button>
            ) : current === null ? (
              <Button asChild size="lg" className="font-bold">
                <Link href="/mentor/path">Xem lộ trình của bạn</Link>
              </Button>
            ) : task ? (
              <TaskAction task={task} level={current} hero />
            ) : (
              <PracticeButton target={{ kind: "part", key: "PART5", bloom: current }} label={`Luyện bậc ${current}`} size="default" className="w-full font-bold sm:w-auto" />
            )}
            {insights.weaknesses.length > 0 && <PracticeButton target={{ kind: "mix", foundation: r.branch === "rebuild" }} label="Đề tổng hợp điểm yếu" variant="outline" size="default" className="w-full font-semibold sm:w-auto" />}
          </div>
        </div>
        {/* Top padding leaves room for the mascot standing on the tallest step. */}
        <div className="min-w-0 pt-8 sm:pt-10 lg:pt-0">
          <Staircase levels={profile.levels} current={current} />
        </div>
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-3 rounded-2xl bg-card p-3.5 shadow-soft sm:p-4">
            <span className="hidden size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground sm:flex">
              <s.icon className="size-5" />
            </span>
            <div className="min-w-0">
              <dt className="text-xs leading-snug text-muted-foreground sm:text-sm">{s.label}</dt>
              <dd className="text-xl font-extrabold tabular-nums sm:text-2xl">{s.value}</dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}
