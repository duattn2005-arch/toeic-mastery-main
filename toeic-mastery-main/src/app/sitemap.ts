import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

/** Only the pages a logged-out visitor (and so a crawler) can actually see —
 * see PUBLIC_ROUTES in lib/auth/proxy-session.ts. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/practice`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/register`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/login`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
  ];
}
