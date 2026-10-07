/** Google Analytics 4 property for the site. */
export const GA_MEASUREMENT_ID = "G-GDBZE58K1G";

/** Set in this browser once an admin account is seen, so the admin's own
 * page views are dropped from the very first hit of the next visit too. */
export const GA_EXCLUDE_STORAGE_KEY = "tm-ga-exclude";

/** GA's documented opt-out switch: while `window["ga-disable-<ID>"]` is
 * true, gtag sends nothing for that property. */
export const GA_DISABLE_FLAG = `ga-disable-${GA_MEASUREMENT_ID}`;

/** Admin screens (test editor, question bank, users…) never count. */
export function isExcludedPath(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}
