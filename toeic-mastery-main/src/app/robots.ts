import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

/** Crawlers may read the public pages (landing, Luyện đề, auth); everything
 * behind the login wall only redirects to /login anyway, and the API and
 * admin are never meant for search results. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/admin", "/auth/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
