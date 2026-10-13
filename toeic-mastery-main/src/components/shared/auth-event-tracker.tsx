"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { AUTH_EVENT_COOKIE, trackEvent } from "@/lib/analytics";

/** Sends the sign_up / login event the server left in AUTH_EVENT_COOKIE (see
 * lib/analytics.ts), once, on the page the auth redirect lands on — checked
 * on every navigation since a server-action redirect is a client-side one. */
export function AuthEventTracker() {
  const pathname = usePathname();
  React.useEffect(() => {
    const match = document.cookie.match(new RegExp(`(?:^|; )${AUTH_EVENT_COOKIE}=([^;]*)`));
    if (!match) return;
    document.cookie = `${AUTH_EVENT_COOKIE}=; path=/; max-age=0`;
    const [event, method] = decodeURIComponent(match[1]).split(":");
    if (event === "sign_up" || event === "login") trackEvent(event, { method });
  }, [pathname]);
  return null;
}
