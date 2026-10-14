/** GA4 custom events (gtag.js is loaded in the root layout). Safe to call
 * anywhere on the client: before gtag.js has loaded the command is queued on
 * dataLayer exactly like gtag() itself would, and it's a no-op on the server. */
export function gtagCommand(...args: unknown[]) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...a: unknown[]) => void; dataLayer?: unknown[] };
  if (typeof w.gtag === "function") {
    w.gtag(...args);
    return;
  }
  const dataLayer = (w.dataLayer = w.dataLayer || []);
  // gtag() queues its own `arguments` object — a plain array isn't read as a command.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (function queue(..._args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    dataLayer.push(arguments);
  })(...args);
}

/** GA4 limits: names ≤ 40 chars, parameter values ≤ 100 chars. */
function clip(value: unknown) {
  return typeof value === "string" && value.length > 100 ? value.slice(0, 100) : value;
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  const clean: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(params)) if (value !== undefined) clean[key] = clip(value);
  gtagCommand("event", name, clean);
}

/** Ties the visit to the signed-in account (user_id is the opaque profile id —
 * never an email or name) so GA4 counts a person once across devices, and adds
 * user properties to segment reports by plan and role. */
export function setAnalyticsUser(user: { id: string; plan: string; role: string }) {
  gtagCommand("set", { user_id: user.id });
  gtagCommand("set", "user_properties", { plan: user.plan, user_role: user.role });
}

/** Sign-up / login happen server-side (server action or OAuth callback) and
 * end in a redirect, so the server leaves `<event>:<method>` in this short-
 * lived cookie and AuthEventTracker sends it from the page it lands on. */
export const AUTH_EVENT_COOKIE = "ga_auth_event";
export const authEventCookieOptions = { path: "/", sameSite: "lax" as const, secure: true, maxAge: 300, httpOnly: false };
