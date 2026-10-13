import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function SectionHeader({
  icon: Icon,
  title,
  action,
}: {
  icon: LucideIcon;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="flex size-7 items-center justify-center rounded-lg bg-accent text-accent-foreground">
          <Icon className="size-4" strokeWidth={1.75} />
        </span>
        <h2 className="text-base font-bold tracking-tight text-foreground">{title}</h2>
      </div>
      {action}
    </div>
  );
}
