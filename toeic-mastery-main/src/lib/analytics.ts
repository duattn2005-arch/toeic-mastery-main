/** Google Analytics 4 property for the site. */
export const GA_MEASUREMENT_ID = "G-GDBZE58K1G";

/** GA's documented opt-out switch: while `window["ga-disable-<ID>"]` is
 * true, gtag sends nothing for that property. */
export const GA_DISABLE_FLAG = `ga-disable-${GA_MEASUREMENT_ID}`;

/** Admin screens (test editor, question bank, users…) never count. Every
 * other page counts for every account, admins included. */
export function isExcludedPath(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}
