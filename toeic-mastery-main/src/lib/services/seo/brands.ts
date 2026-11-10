import "server-only";
import { db } from "@/lib/db";
import { SITE_URL } from "@/lib/site-url";
import { normalize } from "./llm";

/** Other learning brands that must never be named on the blog, besides the
 * ones taken from the competitor URLs. Written the way `normalize` leaves them. */
const KNOWN_BRANDS = ["english mastery", "study4", "prep vn", "dethitoeic", "hochay", "toeichanquoc", "ms hoa", "mshoa", "zim", "ielts fighter", "tienganh123", "elsa speak", "duolingo"];

/** "study4.com" -> "study4", "hocmai.edu.vn" -> "hocmai": the part of the hostname
 * a brand goes by. Short names keep their domain ("prep.vn" -> "prep vn"), since
 * "prep" alone is also the dictionary label for a preposition. */
function brandOf(url: string) {
  try {
    const labels = new URL(url).hostname.replace(/^www\./, "").split(".");
    const name = labels.length > 1 ? labels.slice(0, -1).join(" ").replace(/\b(com|edu|net|org)$/, "").trim() : labels[0];
    return name.length < 5 ? labels.join(" ") : name;
  } catch {
    return "";
  }
}

/** Brand names of this site's competitors, from the analysed URLs plus a fixed list. */
export async function competitorBrands() {
  const own = brandOf(SITE_URL);
  const rows = await db.seoCompetitorPage.findMany({ select: { url: true } });
  const brands = new Set(KNOWN_BRANDS);
  for (const row of rows) {
    const brand = normalize(brandOf(row.url));
    if (brand && brand !== normalize(own)) brands.add(brand);
  }
  return [...brands];
}

/** The first brand named in `text`, or null. Matched on whole words, and also
 * with the spaces removed ("English Mastery" vs "englishmastery") for names
 * long enough not to hit ordinary words. */
export function mentionedBrand(text: string, brands: readonly string[]) {
  const words = ` ${normalize(text)} `;
  const joined = words.replace(/ /g, "");
  for (const brand of brands) {
    if (words.includes(` ${brand} `)) return brand;
    const compact = brand.replace(/ /g, "");
    if (compact.length >= 8 && joined.includes(compact)) return brand;
  }
  return null;
}
