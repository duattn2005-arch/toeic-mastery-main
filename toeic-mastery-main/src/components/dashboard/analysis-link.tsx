"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Radar, Sparkles, X } from "lucide-react";
import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const SEEN_KEY = "analysis_intro_seen";

/**
 * The "Xem phân tích chi tiết" button on the dashboard, styled as a pill
 * that stands out from the panel, plus a one-time popup introducing what
 * the analysis page offers. The popup waits until the dashboard tour (a
 * driver.js overlay) is not on screen, and never shows again once closed.
 */
/** `block` stretches it full width (the narrow card puts it under the chart). */
export function AnalysisLink({ block = false }: { block?: boolean }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(SEEN_KEY) === "1";
    } catch {
      seen = true;
    }
    if (seen) return;
    const id = setInterval(() => {
      if (document.querySelector(".driver-popover, .driver-overlay")) return;
      clearInterval(id);
      setOpen(true);
    }, 1500);
    const stop = setTimeout(() => clearInterval(id), 60_000);
    return () => {
      clearInterval(id);
      clearTimeout(stop);
    };
  }, []);

  function close() {
    setOpen(false);
    try {
      localStorage.setItem(SEEN_KEY, "1");
    } catch {
      // private mode: the popup may show again next time, that's fine
    }
  }

  return (
    <Popover open={open} onOpenChange={(next) => (next ? setOpen(true) : close())}>
      <PopoverAnchor asChild>
        <Link
          href="/analytics"
          onClick={close}
          data-track="dashboard_analysis_cta"
          className={cn(
            "group relative inline-flex items-center justify-center gap-1.5 rounded-full",
            "bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-300 hover:bg-[var(--primary-hover)] hover:shadow-md",
            block && "w-full py-2.5"
          )}
        >
          <span className="absolute -top-1 -right-1 flex size-3">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex size-3 rounded-full border-2 border-card bg-primary" />
          </span>
          Xem phân tích chi tiết
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </PopoverAnchor>
      <PopoverContent align="end" sideOffset={10} className="w-80 rounded-2xl p-5">
        <button type="button" onClick={close} aria-label="Đóng" className="absolute top-3 right-3 rounded-full p-1 text-muted-foreground hover:bg-muted">
          <X className="size-4" />
        </button>
        <p className="flex items-center gap-2 text-sm font-bold">
          <span className="flex size-8 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Radar className="size-4" />
          </span>
          Phân tích năng lực chi tiết
        </p>
        <ul className="mt-3 flex flex-col gap-1.5 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <Sparkles className="mt-0.5 size-3.5 shrink-0 text-primary" /> Độ chính xác từng Part và từng dạng câu hỏi
          </li>
          <li className="flex gap-2">
            <Sparkles className="mt-0.5 size-3.5 shrink-0 text-primary" /> Chủ điểm ngữ pháp, từ vựng bạn hay sai
          </li>
          <li className="flex gap-2">
            <Sparkles className="mt-0.5 size-3.5 shrink-0 text-primary" /> Gợi ý nên luyện gì tiếp để tăng điểm nhanh nhất
          </li>
        </ul>
        <div className="mt-4 flex items-center justify-end gap-2">
          <button type="button" onClick={close} className="rounded-full px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted">
            Để sau
          </button>
          <Link
            href="/analytics"
            onClick={close}
            className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground hover:bg-[var(--primary-hover)]"
          >
            Xem ngay <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
