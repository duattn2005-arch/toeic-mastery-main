import { cn } from "@/lib/utils";

const WEEKDAY_VI = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

function intensityClass(minutes: number) {
  if (minutes <= 0) return "bg-black/10 dark:bg-white/10";
  if (minutes < 15) return "bg-primary/35 dark:bg-[#5eead4]/35";
  if (minutes < 30) return "bg-primary/60 dark:bg-[#5eead4]/60";
  if (minutes < 60) return "bg-primary/85 dark:bg-[#5eead4]/85";
  return "bg-primary dark:bg-[#5eead4]";
}

/** 14-day study-activity heatmap, styled for the dark hero surface. The last
 * cell is today and gets an outline so the eye finds it. */
export function StreakHeatmap({ data }: { data: { date: string; minutes: number }[] }) {
  return (
    <div className="grid grid-cols-[repeat(14,minmax(0,1fr))] gap-1">
      {data.map((d, i) => {
        const day = new Date(`${d.date}T00:00:00`);
        const label = `${WEEKDAY_VI[day.getDay()]} ${day.getDate()}/${day.getMonth() + 1}: ${d.minutes} phút`;
        return (
          <span
            key={d.date}
            title={label}
            className={cn(
              "aspect-square min-w-2.5 rounded-[3px] transition-transform duration-300 hover:scale-125",
              intensityClass(d.minutes),
              i === data.length - 1 && "ring-1 ring-foreground/50 ring-offset-1 ring-offset-white dark:ring-white/70 dark:ring-offset-black/40"
            )}
          />
        );
      })}
    </div>
  );
}
