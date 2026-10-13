import Link from "next/link";
import { Clock, Crown, Flame, ListChecks, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DIFFICULTY_LABEL_VI } from "@/lib/constants/toeic";

const DIFFICULTY_VARIANT: Record<string, string> = {
  EASY: "bg-success/10 text-success",
  MEDIUM: "bg-warning/10 text-warning",
  HARD: "bg-destructive/10 text-destructive",
};

export function TestCard({
  title,
  difficulty,
  totalQuestions,
  durationMinutes,
  usersCompleted,
  questionsPracticed,
  bestScore,
  progressPercent,
  href,
  ctaLabel,
  isPro = false,
}: {
  title: string;
  difficulty: string;
  totalQuestions: number;
  durationMinutes: number;
  /** Attempt/answer counts — only passed for admins; hidden when omitted. */
  usersCompleted?: number;
  questionsPracticed?: number;
  bestScore: number | null;
  progressPercent?: number | null;
  href: string;
  ctaLabel: string;
  isPro?: boolean;
}) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-border/60 bg-card p-5 shadow-soft transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-[15px] leading-snug font-bold tracking-tight">{title}</h3>
        <div className="flex shrink-0 items-center gap-1.5">
          {isPro && (
            <Badge variant="outline" className="border-amber-400/50 text-amber-500">
              <Crown className="size-3" /> Pro
            </Badge>
          )}
          <Badge className={DIFFICULTY_VARIANT[difficulty] ?? ""} variant="secondary">
            {DIFFICULTY_LABEL_VI[difficulty] ?? difficulty}
          </Badge>
        </div>
      </div>

      <div className="mt-3 mb-5 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <ListChecks className="size-3.5" /> {totalQuestions} câu
        </span>
        <span className="flex items-center gap-1">
          <Clock className="size-3.5" /> {durationMinutes} phút
        </span>
        {usersCompleted !== undefined && (
          <span className="flex items-center gap-1">
            <Users className="size-3.5" /> {usersCompleted.toLocaleString("vi-VN")} lượt làm
          </span>
        )}
        {!!questionsPracticed && (
          <span className="flex items-center gap-1">
            <Flame className="size-3.5" /> {questionsPracticed.toLocaleString("vi-VN")} câu đã luyện
          </span>
        )}
        {bestScore !== null && (
          <span className="flex items-center gap-1">
            <Trophy className="size-3.5" /> Điểm cao nhất {bestScore}
          </span>
        )}
      </div>

      {typeof progressPercent === "number" && progressPercent > 0 && (
        <div className="-mt-1.5 mb-5">
          <div className="mb-1 flex justify-between text-[11px] text-muted-foreground">
            <span>Tiến độ</span>
            <span>{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-1.5" />
        </div>
      )}

      <Button asChild variant="secondary" className="mt-auto rounded-full group-hover:bg-primary group-hover:text-primary-foreground">
        <Link href={href}>{ctaLabel}</Link>
      </Button>
    </div>
  );
}
