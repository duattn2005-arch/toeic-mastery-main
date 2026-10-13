/** Public origin of the site, without a trailing slash — the same
 * NEXT_PUBLIC_SITE_URL the root layout's metadataBase uses. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://toeicmastery.click").replace(/\/$/, "");

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Last time the public content pages (guides, word lists) were edited —
 * the sitemap's <lastmod> and the guides' dateModified. Bump it when that
 * content changes so crawlers know to come back. */
export const PUBLIC_CONTENT_UPDATED = "2026-10-13";
