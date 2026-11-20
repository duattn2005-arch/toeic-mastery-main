"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, Sparkles, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { StartTrialButton } from "@/components/billing/start-trial-button";
import { NEW_MEMBER_OFFER_PERCENT, PRO_TRIAL_DAYS } from "@/lib/constants/billing";
import { trackEvent } from "@/lib/analytics";

const SESSION_SHOWN_KEY = "pro_trial_modal_shown_session_v1";
const DASHBOARD_TOUR_DONE_KEY = "tour_dashboard_done";
const WAIT_TIMEOUT_MS = 90_000;
const POLL_INTERVAL_MS = 800;

const HIGHLIGHTS = [
  "Không giới hạn Mock Test, Tra từ & Chữa câu tức thì",
  "Lời giải chi tiết + Transcript ETS song ngữ",
  "Radar kỹ năng & bài luyện vá điểm yếu",
  "Lộ trình cấp tốc theo ngày thi",
];

function readLocal(key: string): boolean {
  try {
    return localStorage.getItem(key) === "true";
  } catch {
    return true;
  }
}

function shownThisSession(): boolean {
  try {
    return sessionStorage.getItem(SESSION_SHOWN_KEY) === "true";
  } catch {
    return false;
  }
}

function markShown() {
  try {
    sessionStorage.setItem(SESSION_SHOWN_KEY, "true");
  } catch {
    // no storage — it just shows again next load
  }
}

/** The free-trial invitation, for any account that has never had Pro (see
 * getProTrialState). Takes the place of both WelcomeOfferModal and
 * UpgradeNudgeModal while the trial is still unclaimed — a free "try it"
 * converts far better than a price, so it goes first; the welcome discount
 * is still mentioned as the alternative. Once per browser session, never
 * over a timed exam, and after the dashboard tour (same rules as the other
 * two modals). */
export function TrialOfferModal({ hasWelcomeDiscount }: { hasWelcomeDiscount: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (shownThisSession() || pathname.startsWith("/exam/") || pathname.startsWith("/pricing")) return;

    function reveal() {
      markShown();
      trackEvent("pro_trial_modal_view");
      setOpen(true);
    }
    const clearToShow = () => pathname !== "/dashboard" || readLocal(DASHBOARD_TOUR_DONE_KEY);

    if (clearToShow()) {
      reveal();
      return;
    }
    const startedAt = Date.now();
    const id = setInterval(() => {
      if (clearToShow() || Date.now() - startedAt > WAIT_TIMEOUT_MS) {
        clearInterval(id);
        reveal();
      }
    }, POLL_INTERVAL_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent showCloseButton={false} className="max-w-md gap-0 overflow-hidden border-0 p-0 shadow-2xl">
        <div className="hero-ambient relative overflow-hidden px-6 pb-7 pt-6 text-white">
          <div className="hero-blob pointer-events-none absolute -top-16 -right-10 size-48 rounded-full bg-white/15 blur-3xl" aria-hidden />
          <div
            className="hero-blob pointer-events-none absolute -bottom-16 -left-8 size-40 rounded-full bg-[#f5a524]/25 blur-3xl"
            style={{ animationDelay: "-6s" }}
            aria-hidden
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Đóng"
            className="absolute right-3 top-3 z-10 rounded-full bg-black/15 p-1.5 transition-colors hover:bg-black/30"
          >
            <X className="size-4" />
          </button>

          <div className="relative flex flex-col items-center gap-4 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
              <span className="notify-dot size-1.5 rounded-full bg-emerald-300" />
              QUÀ TẶNG MIỄN PHÍ — KHÔNG CẦN THANH TOÁN
            </span>

            <div className="relative flex size-32 items-center justify-center">
              <div
                className="spin-slow absolute inset-0 rounded-full opacity-70"
                style={{ background: "conic-gradient(from 0deg, transparent, rgba(255,255,255,0.5), transparent 40%)" }}
                aria-hidden
              />
              <div className="absolute inset-2 rounded-full bg-white/10 backdrop-blur-sm" aria-hidden />
              <Sparkles className="absolute -left-1 top-2 size-4 text-white/70" aria-hidden />
              <Sparkles className="absolute -right-2 bottom-4 size-5 text-white/60" aria-hidden />
              <div className="relative flex flex-col items-center leading-none">
                <span className="text-5xl font-extrabold drop-shadow-sm">{PRO_TRIAL_DAYS}</span>
                <span className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-white/85">Ngày PRO</span>
              </div>
            </div>

            <DialogTitle className="text-xl font-bold leading-snug text-white">Trải nghiệm trọn bộ PRO miễn phí {PRO_TRIAL_DAYS} ngày 🎁</DialogTitle>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 px-6 py-6 text-center">
          <ul className="flex w-full flex-col gap-2 text-left text-sm">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <StartTrialButton source="modal" className="glow-pulse-primary w-full text-base" onStarted={() => setOpen(false)} />
          <p className="-mt-2 text-xs text-muted-foreground">Kích hoạt 1 chạm • Không tự động gia hạn • Không trừ tiền</p>

          <Link
            href="/pricing"
            onClick={() => setOpen(false)}
            className="text-xs font-medium text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
          >
            {hasWelcomeDiscount ? `Hoặc nâng cấp luôn với ưu đãi -${NEW_MEMBER_OFFER_PERCENT}% →` : "Hoặc xem các gói PRO →"}
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
