import { cn } from "@/lib/utils";

const TONE: Record<string, string> = {
  n: "bg-info/15 text-info ring-info/30",
  v: "bg-destructive/12 text-destructive ring-destructive/30",
  "phr v": "bg-destructive/12 text-destructive ring-destructive/30",
  adj: "bg-success/15 text-success ring-success/30",
  adv: "bg-warning/15 text-warning ring-warning/35",
};

const LABEL: Record<string, string> = { n: "N", v: "V", adj: "Adj", adv: "Adv", "phr v": "Phr V" };

/** Word-type pills like a vocab spreadsheet's colour-coded Type column —
 * N blue, V red, Adj green, Adv amber, anything else neutral. Takes the
 * comma-joined form stored on a word ("n, v"). */
export function PosBadges({ pos, className }: { pos: string | null | undefined; className?: string }) {
  const list = (pos ?? "")
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
  if (list.length === 0) return null;
  return (
    <span className={cn("inline-flex shrink-0 flex-wrap gap-1", className)}>
      {list.map((p) => (
        <span
          key={p}
          className={cn("rounded-md px-1.5 py-px text-[10px] leading-4 font-bold ring-1 ring-inset", TONE[p] ?? "bg-muted text-muted-foreground ring-border")}
        >
          {LABEL[p] ?? p.charAt(0).toUpperCase() + p.slice(1)}
        </span>
      ))}
    </span>
  );
}
