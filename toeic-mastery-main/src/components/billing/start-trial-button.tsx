"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Gift, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ConfettiBurst } from "@/components/shared/confetti-burst";
import { startProTrialAction } from "@/lib/actions/billing";
import { PRO_TRIAL_DAYS } from "@/lib/constants/billing";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/** One click → Pro for PRO_TRIAL_DAYS days. No payment step, so nothing to
 * leave half-done: on success it refreshes the server-rendered shell so the
 * whole app flips to Pro immediately. */
export function StartTrialButton({
  source,
  className,
  size = "lg",
  label = `Dùng thử PRO miễn phí ${PRO_TRIAL_DAYS} ngày`,
  onStarted,
}: {
  /** Where it was clicked, for analytics (modal / pricing / header…). */
  source: string;
  className?: string;
  size?: "sm" | "default" | "lg";
  label?: string;
  onStarted?: () => void;
}) {
  const router = useRouter();
  const [pending, startTransition] = React.useTransition();
  const [celebrate, setCelebrate] = React.useState(false);

  function handleClick() {
    trackEvent("pro_trial_click", { source });
    startTransition(async () => {
      const result = await startProTrialAction();
      if (result.error) {
        toast.error(result.error);
        return;
      }
      trackEvent("pro_trial_start", { source, plan_days: PRO_TRIAL_DAYS });
      setCelebrate(true);
      const endsAt = result.endsAt ? new Date(result.endsAt).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" }) : null;
      toast.success(`Đã mở khóa PRO ${PRO_TRIAL_DAYS} ngày! 🎉`, {
        description: endsAt ? `Dùng thoải mái mọi tính năng PRO đến ${endsAt}. Không tự động trừ tiền.` : undefined,
      });
      onStarted?.();
      router.refresh();
    });
  }

  return (
    <>
      <Button type="button" size={size} disabled={pending} onClick={handleClick} className={cn("font-semibold", className)}>
        {pending ? <Loader2 className="size-4 animate-spin" /> : <Gift className="size-4" />}
        {label}
      </Button>
      {celebrate && <ConfettiBurst />}
    </>
  );
}
