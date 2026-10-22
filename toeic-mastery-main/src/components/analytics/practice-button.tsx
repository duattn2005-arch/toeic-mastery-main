"use client";

import { useFormStatus } from "react-dom";
import { Loader2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { startWeaknessPracticeAction } from "@/lib/actions/weakness-practice";
import type { PracticeTarget } from "@/lib/services/insights/engine";
import { cn } from "@/lib/utils";

function Submit({ label, variant, size, className }: { label: string; variant: "default" | "outline" | "secondary"; size: "sm" | "default" | "lg"; className?: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant={variant} size={size} disabled={pending} className={cn("gap-1.5", className)}>
      {pending ? <Loader2 className="size-4 animate-spin" /> : <Zap className="size-4" />}
      {pending ? "Đang tạo đề…" : label}
    </Button>
  );
}

/**
 * Starts a practice set the insights engine picked (one weakness, the top
 * three mixed, or the questions still answered wrong) — the server action
 * builds the attempt and redirects into the exam runner.
 */
export function PracticeButton({
  target,
  label = "Luyện ngay",
  variant = "default",
  size = "sm",
  className,
}: {
  target: PracticeTarget;
  label?: string;
  variant?: "default" | "outline" | "secondary";
  size?: "sm" | "default" | "lg";
  className?: string;
}) {
  return (
    <form action={startWeaknessPracticeAction.bind(null, target)}>
      <Submit label={label} variant={variant} size={size} className={className} />
    </form>
  );
}
