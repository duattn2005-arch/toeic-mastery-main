"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { GA_DISABLE_FLAG, isExcludedPath } from "@/lib/analytics";

/** Keeps Google Analytics off admin pages only — re-checked on every
 * client-side navigation (GA's own SPA page_view hits respect the flag at
 * send time). Mounted once in the root layout. */
export function AnalyticsGuard() {
  const pathname = usePathname();
  React.useEffect(() => {
    (window as unknown as Record<string, boolean>)[GA_DISABLE_FLAG] = isExcludedPath(pathname);
  }, [pathname]);
  return null;
}
