import Link from "next/link";
import { Check, ChevronRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Quest {
  icon: LucideIcon;
  title: string;
  /** Short progress text, e.g. "12/30 phút". */
  progressLabel: string;
  /** 0-100 */
  progress: number;
  done: boolean;
  href: string;
}

/** Today's three study tasks, derived from real data on the dashboard page. */
export function DailyQuests({ quests }: { quests: Quest[] }) {
  const doneCount = quests.filter((q) => q.done).length;

  return (
    <section className="flex h-full flex-col rounded-[2rem] border border-border/60 bg-card p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold tracking-tight">Nhiệm vụ hôm nay</h2>
        <span className="rounded-md bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground tabular-nums">
          {doneCount}/{quests.length}
        </span>
      </div>

      <ul className="mt-4 flex flex-1 flex-col gap-2">
        {quests.map((quest) => (
          <li key={quest.title}>
            <Link
              href={quest.href}
              className={cn(
                "group flex items-center gap-3 rounded-2xl px-3 py-3 transition-colors duration-300",
                quest.done ? "bg-primary/10" : "bg-muted/50 hover:bg-muted"
              )}
            >
              <span
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-xl",
                  quest.done ? "bg-primary text-primary-foreground" : "bg-card text-primary"
                )}
              >
                {quest.done ? <Check className="size-5" strokeWidth={3} /> : <quest.icon className="size-5" strokeWidth={1.75} />}
              </span>
              <span className="min-w-0 flex-1">
                <span className={cn("block truncate text-sm font-semibold", quest.done && "text-muted-foreground line-through")}>
                  {quest.title}
                </span>
                <span className="mt-1.5 flex items-center gap-2">
                  <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-background/60">
                    <span
                      className="absolute inset-y-0 left-0 origin-left rounded-full bg-primary"
                      style={{ width: `${Math.max(0, Math.min(100, quest.progress))}%` }}
                    />
                  </span>
                  <span className="shrink-0 text-[11px] font-medium text-muted-foreground tabular-nums">{quest.progressLabel}</span>
                </span>
              </span>
              <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
