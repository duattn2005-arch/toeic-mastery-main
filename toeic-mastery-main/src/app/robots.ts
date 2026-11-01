import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

/** Crawlers may read the public pages (landing, Luyện đề, auth); everything
 * behind the login wall only redirects to /login anyway, and the API and
 * admin are never meant for search results. AI-training and bulk-scraping
 * crawlers get nothing; the crawlers behind AI search answers (OAI-SearchBot,
 * ChatGPT-User, PerplexityBot) stay allowed since they send visitors. Polite
 * crawlers obey this, the rest are handled in proxy-session.ts and Nginx. */
const BLOCKED_BOTS = ["GPTBot", "CCBot", "ClaudeBot", "anthropic-ai", "Google-Extended", "Bytespider", "Amazonbot", "Meta-ExternalAgent", "Diffbot", "Omgilibot", "ImagesiftBot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/admin", "/auth/"] },
      { userAgent: BLOCKED_BOTS, disallow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
