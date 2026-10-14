"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { useReportWebVitals } from "next/web-vitals";
import { setAnalyticsUser, trackEvent } from "@/lib/analytics";

const SCROLL_STEPS = [25, 50, 75, 100];
const MAX_ERRORS_PER_PAGE = 5;

/** Short, PII-safe label for whatever was clicked: an explicit
 * data-track, else aria-label / title, else the visible text. Anything that
 * looks like an email is dropped — header menus can show the account's own. */
function labelOf(el: HTMLElement) {
  const raw = el.dataset.track || el.getAttribute("aria-label") || el.getAttribute("title") || el.textContent || "";
  const text = raw.replace(/\s+/g, " ").trim();
  if (!text || text.includes("@")) return undefined;
  return text.length > 60 ? `${text.slice(0, 57)}...` : text;
}

/** Everything GA4 can't know on its own, sent for every visitor without each
 * component having to opt in:
 *  - ui_click: any button, link, tab or menu item that's clicked
 *  - scroll_depth: 25 / 50 / 75 / 100 % of each page
 *  - js_error: uncaught errors and rejected promises
 *  - web_vitals: LCP, INP, CLS, FCP, TTFB per page view
 * Mounted once in the root layout. */
export function AnalyticsTracker() {
  const pathname = usePathname();

  React.useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const el = target?.closest<HTMLElement>("a, button, [role='button'], [role='tab'], [role='menuitem'], summary");
      if (!el || el.closest("[data-ga-ignore]")) return;
      const params: Record<string, unknown> = {
        element_type: el.tagName.toLowerCase(),
        element_text: labelOf(el),
        page_path: window.location.pathname,
      };
      if (el instanceof HTMLAnchorElement && el.href) {
        try {
          const url = new URL(el.href, window.location.href);
          params.is_external = url.origin !== window.location.origin;
          params.link_target = params.is_external ? url.hostname : `${url.pathname}${url.hash}`;
        } catch {
          // Malformed href — leave the link fields out.
        }
      }
      trackEvent("ui_click", params);
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  React.useEffect(() => {
    const sent = new Set<number>();
    let ticking = false;
    function check() {
      ticking = false;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      // Pages that fit on one screen have nothing to scroll.
      const percent = scrollable <= 0 ? 0 : ((window.scrollY + window.innerHeight) / doc.scrollHeight) * 100;
      for (const step of SCROLL_STEPS) {
        if (percent >= step && scrollable > 0 && !sent.has(step)) {
          sent.add(step);
          trackEvent("scroll_depth", { percent: step, page_path: pathname });
        }
      }
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(check);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  React.useEffect(() => {
    let sent = 0;
    function report(message: string, source?: string) {
      if (sent >= MAX_ERRORS_PER_PAGE) return;
      sent += 1;
      trackEvent("js_error", { error_message: message, error_source: source, page_path: window.location.pathname });
    }
    function onError(e: ErrorEvent) {
      report(e.message || "error", e.filename ? e.filename.split("/").pop() : undefined);
    }
    function onRejection(e: PromiseRejectionEvent) {
      const reason = e.reason;
      report(reason instanceof Error ? reason.message : typeof reason === "string" ? reason : "unhandled rejection", "promise");
    }
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  return null;
}

/** Core Web Vitals as GA4 events. Kept at module level: Next calls the
 * callback again if its identity changes, which would duplicate reports. */
function reportWebVital(metric: { name: string; value: number; rating?: string; id: string }) {
  trackEvent("web_vitals", {
    metric_name: metric.name,
    // CLS is a tiny fraction; scale it so GA4's integer-ish reporting keeps it.
    metric_value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
    metric_rating: metric.rating,
    metric_id: metric.id,
    page_path: window.location.pathname,
  });
}

export function WebVitalsReporter() {
  useReportWebVitals(reportWebVital);
  return null;
}

/** Rendered by the signed-in layouts: attaches the account to this visit. */
export function AnalyticsIdentity({ userId, plan, role }: { userId: string; plan: string; role: string }) {
  React.useEffect(() => {
    setAnalyticsUser({ id: userId, plan, role });
  }, [userId, plan, role]);
  return null;
}
