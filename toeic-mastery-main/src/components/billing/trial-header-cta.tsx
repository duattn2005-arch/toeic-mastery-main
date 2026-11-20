"use client";

import * as React from "react";
import Link from "next/link";
import { Hourglass } from "lucide-react";
import { StartTrialButton } from "@/components/billing/start-trial-button";
import { PRO_TRIAL_DAYS } from "@/lib/constants/billing";
import { cn } from "@/lib/utils";
import type { ProTrialState } from "@/lib/services/pro-trial"; // type-only: erased at build time

function remainingLabel(ms: number): string {
  const totalMinutes = Math.max(0, Math.floor(ms / 60_000));
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  if (days > 0) return `${days} ngày ${hours} giờ`;
  if (hours > 0) return `${hours} giờ ${minutes} phút`;
  return `${minutes} phút`;
}

/** Header slot for the free trial: a one-click "try Pro" button while it's
 * unclaimed, then a live countdown pill while it runs — always in view, so
 * the end of the trial never comes as a surprise and the way to keep Pro
 * (the pricing page, still at the welcome discount) is one tap away. */
export function TrialHeaderCta({ trial }: { trial: ProTrialState }) {
  const endsAtMs = trial.endsAt ? new Date(trial.endsAt).getTime() : 0;
  const [now, setNow] = React.useState(() => Date.now());

  React.useEffect(() => {
    if (!trial.active) return;
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, [trial.active]);

  if (trial.eligible) {
    return (
      <StartTrialButton
        source="header"
        size="sm"
        label={`Dùng thử PRO ${PRO_TRIAL_DAYS} ngày`}
        className="rounded-full border-0 bg-gradient-to-r from-amber-400 to-orange-500 px-3 text-white shadow-sm hover:opacity-90 max-sm:text-xs"
      />
    );
  }

  const remainingMs = endsAtMs - now;
  if (!trial.active || remainingMs <= 0) return null;
  const urgent = remainingMs < 24 * 60 * 60 * 1000;

  return (
    <Link
      href="/pricing"
      title="Nâng cấp để giữ PRO sau khi hết dùng thử"
      className={cn(
        "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors",
        urgent
          ? "border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/15"
          : "border-amber-400/50 bg-amber-400/10 text-amber-600 hover:bg-amber-400/20 dark:text-amber-300"
      )}
    >
      <Hourglass className="size-3.5" />
      <span className="hidden sm:inline">PRO dùng thử · còn</span>
      <span className="tabular-nums">{remainingLabel(remainingMs)}</span>
    </Link>
  );
}
