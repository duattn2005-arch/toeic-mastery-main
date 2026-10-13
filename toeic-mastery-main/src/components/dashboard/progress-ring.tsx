import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Circular progress ring that draws itself in on mount (.ring-draw in
 * globals.css). `value` is 0-100. Track and indicator colors come from
 * classes so the same ring works on the dark hero and on card surfaces.
 */
export function ProgressRing({
  value,
  size = 140,
  stroke = 12,
  trackClassName = "stroke-white/15",
  indicatorClassName = "stroke-primary",
  className,
  children,
}: {
  value: number;
  size?: number;
  stroke?: number;
  trackClassName?: string;
  indicatorClassName?: string;
  className?: string;
  children?: ReactNode;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, value));
  const offset = circumference * (1 - clamped / 100);

  return (
    <div className={cn("relative shrink-0", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={stroke} className={trackClassName} />
        {clamped > 0 && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={cn("ring-draw", indicatorClassName)}
            style={{ "--ring-from": circumference } as CSSProperties}
          />
        )}
      </svg>
      {children && <div className="absolute inset-0 flex flex-col items-center justify-center text-center">{children}</div>}
    </div>
  );
}
