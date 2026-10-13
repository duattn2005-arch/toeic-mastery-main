/** Public origin of the site, without a trailing slash — the same
 * NEXT_PUBLIC_SITE_URL the root layout's metadataBase uses. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://toeicmastery.click").replace(/\/$/, "");
