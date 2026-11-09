import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

/** The one heading style across the analytics tabs. */
export function PanelHeader({ icon: Icon, title, subtitle, action }: { icon: LucideIcon; title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--primary),color-mix(in_srgb,var(--primary)_65%,var(--success)))] text-primary-foreground shadow-soft">
          <Icon className="size-5" />
        </span>
        <div className="min-w-0">
          <h2 className="text-xl leading-tight font-extrabold tracking-tight">{title}</h2>
          {subtitle && <p className="mt-0.5 max-w-[68ch] text-sm leading-snug text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}
