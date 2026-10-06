import Link from "next/link";
import { ChevronRight, FolderOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function TestFolderCard({
  name,
  href,
  total,
  completed,
  attempts,
  questionsPracticed = 0,
}: {
  name: string;
  href: string;
  total: number;
  completed: number;
  /** Only passed for admins; the counts are hidden when omitted. */
  attempts?: number;
  questionsPracticed?: number;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition-colors hover:border-primary/40"
    >
      <div className="flex items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <FolderOpen className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-semibold">{name}</p>
          <p className="text-xs text-muted-foreground">
            {total} đề
            {attempts !== undefined && <> · {attempts.toLocaleString("vi-VN")} lượt làm</>}
            {attempts !== undefined && questionsPracticed > 0 && <> · {questionsPracticed.toLocaleString("vi-VN")} câu đã luyện</>}
          </p>
        </div>
        <ChevronRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
      </div>
      <div>
        <div className="mb-1.5 flex justify-between text-xs text-muted-foreground">
          <span>Đã hoàn thành</span>
          <span className="font-medium text-foreground">
            {completed}/{total}
          </span>
        </div>
        <Progress value={total ? (completed / total) * 100 : 0} className="h-1.5" />
      </div>
    </Link>
  );
}
