"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { GA_DISABLE_FLAG, GA_EXCLUDE_STORAGE_KEY, isExcludedPath } from "@/lib/analytics";

function readExcludedUser() {
  try {
    return localStorage.getItem(GA_EXCLUDE_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

/** Keeps Google Analytics off admin pages and off admin accounts' browsing,
 * re-checked on every client-side navigation (GA's own SPA page_view hits
 * respect the flag at send time). Mounted once in the root layout. */
export function AnalyticsGuard() {
  const pathname = usePathname();
  React.useEffect(() => {
    (window as unknown as Record<string, boolean>)[GA_DISABLE_FLAG] = isExcludedPath(pathname) || readExcludedUser();
  }, [pathname]);
  return null;
}

/** Rendered by the signed-in layouts: remembers in this browser whether the
 * signed-in account is an admin (excluded from GA) or a learner (counted). */
export function AnalyticsUserFlag({ exclude }: { exclude: boolean }) {
  React.useEffect(() => {
    try {
      if (exclude) localStorage.setItem(GA_EXCLUDE_STORAGE_KEY, "1");
      else localStorage.removeItem(GA_EXCLUDE_STORAGE_KEY);
    } catch {
      // Storage blocked: the path check still keeps /admin out.
    }
    if (exclude) (window as unknown as Record<string, boolean>)[GA_DISABLE_FLAG] = true;
  }, [exclude]);
  return null;
}
