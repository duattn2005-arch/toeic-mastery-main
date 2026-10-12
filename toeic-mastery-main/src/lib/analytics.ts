/** GA4 custom events (gtag.js is loaded in the root layout). Safe to call
 * anywhere on the client: before gtag.js has loaded the event is queued on
 * dataLayer exactly like gtag() itself would, and it's a no-op on the server. */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] };
  if (typeof w.gtag === "function") {
    w.gtag("event", name, params);
    return;
  }
  const dataLayer = (w.dataLayer = w.dataLayer || []);
  // gtag() queues its own `arguments` object — a plain array isn't read as a command.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (function queue(..._args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    dataLayer.push(arguments);
  })("event", name, params);
}

/** Sign-up / login happen server-side (server action or OAuth callback) and
 * end in a redirect, so the server leaves `<event>:<method>` in this short-
 * lived cookie and AuthEventTracker sends it from the page it lands on. */
export const AUTH_EVENT_COOKIE = "ga_auth_event";
export const authEventCookieOptions = { path: "/", sameSite: "lax" as const, secure: true, maxAge: 300, httpOnly: false };
