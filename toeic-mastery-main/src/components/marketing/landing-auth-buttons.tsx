"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthDialog, type AuthDialogTab } from "@/components/auth/auth-dialog";

/** Skips the auto-popup below for a visitor who already dismissed it once
 * this browser session — showing it again on every internal navigation
 * back to "/" would turn a warm welcome into a nag. */
const AUTO_POPUP_DISMISSED_KEY = "toeic-mastery:landing-auth-popup-dismissed";
/** Small delay before the auto-popup appears — an instant popup on first
 * paint reads as aggressive; a beat after the hero renders feels more like
 * an invitation than an interruption. */
const AUTO_POPUP_DELAY_MS = 900;

/** Header nav's "Đăng nhập" / "Bắt đầu miễn phí" — opens the popup instead
 * of navigating to /login (see AuthDialog for why /login still exists).
 * Also auto-opens itself shortly after a logged-out visitor lands on the
 * page, once per browser session, so the login/register popup is the very
 * first thing they're invited into rather than something they have to go
 * looking for. */
export function HeaderAuthButtons() {
  const [open, setOpen] = React.useState(false);
  const [tab, setTab] = React.useState<AuthDialogTab>("login");

  function openWith(nextTab: AuthDialogTab) {
    setTab(nextTab);
    setOpen(true);
  }

  React.useEffect(() => {
    let alreadyDismissed = false;
    try {
      alreadyDismissed = sessionStorage.getItem(AUTO_POPUP_DISMISSED_KEY) === "1";
    } catch {
      // Private-mode/blocked storage — treat as "not dismissed yet" rather
      // than crash; worst case the popup shows every visit for this user.
    }
    if (alreadyDismissed) return;

    const timer = setTimeout(() => openWith("login"), AUTO_POPUP_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      try {
        sessionStorage.setItem(AUTO_POPUP_DISMISSED_KEY, "1");
      } catch {
        // Storage unavailable — nothing to persist, popup may just show
        // again next visit, which is an acceptable fallback.
      }
    }
  }

  return (
    <>
      <Button variant="ghost" className="hidden rounded-full px-4 hover:bg-white/5 sm:inline-flex" onClick={() => openWith("login")}>
        Đăng nhập
      </Button>
      {/* Island CTA: label + arrow nested in its own circle; a light sweep
          crosses the pill on hover. */}
      <button
        type="button"
        onClick={() => openWith("register")}
        className="group relative inline-flex h-10 items-center gap-2 overflow-hidden rounded-full bg-primary py-1 pr-1 pl-4 text-sm font-semibold whitespace-nowrap text-primary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_8px_24px_-8px_rgba(45,212,191,0.55)] transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] outline-none hover:bg-[var(--primary-hover)] focus-visible:ring-[3px] focus-visible:ring-ring/50 active:scale-[0.97]"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-[400%] motion-reduce:hidden"
        />
        <span className="relative sm:hidden">Bắt đầu</span>
        <span className="relative hidden sm:inline">Bắt đầu miễn phí</span>
        <span className="relative flex size-8 items-center justify-center rounded-full bg-black/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
          <ArrowUpRight className="size-4" strokeWidth={2.25} />
        </span>
      </button>
      <AuthDialog open={open} onOpenChange={handleOpenChange} tab={tab} onTabChange={setTab} />
    </>
  );
}

/**
 * Hero section's CTAs — real navigation into the app rather than opening the
 * auth dialog directly, so a logged-out visitor lands on the actual /practice
 * page (which shows an inline "log in to continue" prompt, see
 * login-required-gate.tsx) instead of a modal on top of the landing page.
 */
export function HeroAuthButtons() {
  return (
    <>
      <Button size="lg" asChild>
        <Link href="/practice">
          Bắt đầu luyện tập ngay <ArrowRight />
        </Link>
      </Button>
      <Button size="lg" variant="outline" asChild>
        <Link href="/practice/start">Làm bài test thử</Link>
      </Button>
    </>
  );
}
