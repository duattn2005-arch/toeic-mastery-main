import { Flame, Sparkles, User as UserIcon } from "lucide-react";
import { AnimatedNumber } from "@/components/dashboard/animated-number";
import { ProgressRing } from "@/components/dashboard/progress-ring";
import { AccountAvatar } from "@/components/shared/account-avatar";
import { XP_LEVELS, XP_WEIGHTS, type XpProgress } from "@/lib/services/xp";
import { cn } from "@/lib/utils";

const EARN_RULES = [
  { label: "Mỗi câu đúng", xp: XP_WEIGHTS.perCorrectAnswer },
  { label: "Xong 1 đề", xp: XP_WEIGHTS.perCompletedAttempt },
  { label: "Học 1 từ mới", xp: XP_WEIGHTS.perVocabularyLearned },
  { label: "Mỗi ngày chuỗi", xp: XP_WEIGHTS.perStreakDay },
];

/**
 * Level card: avatar wrapped in an XP ring toward the next level, the XP
 * total, and the full Rookie → Master path so a learner sees where they are
 * and what comes next.
 */
export function LevelAvatarCard({
  avatarUrl,
  equippedShopItemId,
  xpProgress,
  todayXp,
  streakCount,
}: {
  avatarUrl: string | null;
  equippedShopItemId: string | null;
  xpProgress: XpProgress;
  todayXp: number;
  streakCount: number;
}) {
  const { level, nextLevel, percentToNext, xpToNext, xp } = xpProgress;
  const currentIndex = XP_LEVELS.findIndex((l) => l.name === level.name);

  return (
    <section className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-border/60 bg-card p-6 shadow-soft">
      <div aria-hidden className="pointer-events-none absolute -top-24 -right-20 size-64 rounded-full bg-primary/15 blur-3xl" />

      <div className="relative flex items-center gap-5">
        <ProgressRing value={percentToNext} size={104} stroke={7} trackClassName="stroke-muted" indicatorClassName="stroke-primary">
          <span className="flex size-[78px] items-center justify-center overflow-hidden rounded-full bg-muted ring-2 ring-card">
            <AccountAvatar
              avatarUrl={avatarUrl}
              equippedShopItemId={equippedShopItemId}
              size={78}
              fallback={<UserIcon className="size-8 text-muted-foreground" />}
            />
          </span>
        </ProgressRing>

        <div className="min-w-0">
          <span className="inline-flex items-center gap-1 rounded-md bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground">
            <Sparkles className="size-3" strokeWidth={2} />
            {level.name}
          </span>
          <p className="mt-1.5 text-4xl leading-none font-extrabold tracking-tight tabular-nums">
            <AnimatedNumber value={xp} />
            <span className="ml-1 text-base font-semibold text-muted-foreground">XP</span>
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            {nextLevel && xpToNext !== null ? (
              <>
                Còn <span className="font-bold text-foreground tabular-nums">{xpToNext}</span> XP để lên{" "}
                <span className="font-bold text-primary">{nextLevel.name}</span>
              </>
            ) : (
              "Bạn đã đạt cấp cao nhất"
            )}
          </p>
        </div>
      </div>

      {/* Level path: every tier as a node, filled up to the current one */}
      <ol className="relative mt-7 grid grid-cols-5" aria-label="Lộ trình cấp độ">
        <span aria-hidden className="absolute top-[9px] right-[10%] left-[10%] h-0.5 rounded-full bg-muted" />
        <span
          aria-hidden
          className="absolute top-[9px] left-[10%] h-0.5 rounded-full bg-primary"
          style={{ width: `${(Math.max(0, currentIndex) / (XP_LEVELS.length - 1)) * 80}%` }}
        />
        {XP_LEVELS.map((l, i) => {
          const reached = i <= currentIndex;
          const current = i === currentIndex;
          return (
            <li key={l.name} className="relative flex flex-col items-center gap-1.5" aria-current={current ? "step" : undefined}>
              <span
                className={cn(
                  "flex size-5 items-center justify-center rounded-full border-2",
                  reached ? "border-primary bg-primary" : "border-muted bg-card",
                  current && "ring-4 ring-primary/25"
                )}
              >
                {reached && <span className="size-1.5 rounded-full bg-primary-foreground" />}
              </span>
              <span className={cn("text-[11px] font-semibold", current ? "text-foreground" : "text-muted-foreground")}>
                {l.name}
              </span>
            </li>
          );
        })}
      </ol>

      {/* How to earn XP: the real weights from computeXp, so the numbers
          always match what a learner actually gets. */}
      <div className="mt-6">
        <p className="mb-2 text-xs font-semibold text-muted-foreground">Cách kiếm XP</p>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
          {EARN_RULES.map((rule) => (
            <li key={rule.label} className="flex items-center justify-between gap-2">
              <span className="truncate text-muted-foreground">{rule.label}</span>
              <span className="shrink-0 font-bold text-primary tabular-nums">+{rule.xp}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto grid grid-cols-2 gap-2 pt-6">
        <div className="rounded-2xl bg-muted/60 px-4 py-3">
          <p className="text-[11px] font-medium text-muted-foreground">Hôm nay</p>
          <p className="text-lg font-extrabold text-primary tabular-nums">+{todayXp} XP</p>
        </div>
        <div className="rounded-2xl bg-muted/60 px-4 py-3">
          <p className="text-[11px] font-medium text-muted-foreground">Chuỗi ngày</p>
          <p className="flex items-center gap-1 text-lg font-extrabold tabular-nums">
            <Flame className="size-4 text-orange-400" />
            {streakCount}
          </p>
        </div>
      </div>
    </section>
  );
}
