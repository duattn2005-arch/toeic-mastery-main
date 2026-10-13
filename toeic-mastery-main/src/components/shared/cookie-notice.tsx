"use client";

import * as React from "react";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "toeic-mastery:cookie-notice-accepted";

let listeners: (() => void)[] = [];

function subscribe(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getSnapshot(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

/** Notice only — it doesn't gate GA4, which grants consent itself in the root
 * layout. Server snapshot is "accepted" so the banner never flashes in SSR HTML. */
export function CookieNotice() {
  const accepted = React.useSyncExternalStore(subscribe, getSnapshot, () => true);
  if (accepted) return null;

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // localStorage unavailable — hide it for this page view anyway.
    }
    for (const listener of listeners) listener();
  }

  return (
    // Above the mobile bottom nav (h-16) and clear of the lg sidebar (w-64).
    // right-24 keeps the mascot column (right-4, 64px) free; the short mobile
    // copy keeps it low enough to stay under the mascot's speech bubble.
    <div
      role="region"
      aria-label="Thông báo cookie"
      className="fixed bottom-20 left-4 right-24 z-50 mx-auto flex max-w-xl items-center gap-2 rounded-2xl border border-border bg-card p-3 shadow-soft sm:gap-3 sm:p-4 lg:bottom-5 lg:left-[17rem] lg:right-20"
    >
      <Cookie className="hidden size-5 shrink-0 text-primary sm:block" aria-hidden />
      <p className="flex-1 text-xs text-muted-foreground sm:text-sm">
        TOEIC Mastery dùng cookie
        <span className="hidden sm:inline"> để ghi nhớ đăng nhập và đo lượt truy cập, giúp cải thiện trải nghiệm học của bạn</span>.
      </p>
      <Button size="sm" onClick={accept}>
        Đồng ý
      </Button>
    </div>
  );
}
