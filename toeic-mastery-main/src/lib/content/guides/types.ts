/** Public how-to articles (/huong-dan). Plain data so the pages stay static
 * and every sentence is easy to edit. Inline **bold** is supported in text. */
export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "tip"; text: string; title?: string }
  /** A worked question: the question line, optional options, then the answer + why. */
  | { type: "example"; question: string; options?: string[]; answer: string; explain: string };

export interface GuideSection {
  id: string;
  heading: string;
  blocks: GuideBlock[];
}

export interface Guide {
  slug: string;
  /** H1 / Article headline. */
  title: string;
  /** <title> text, kept to ~50 characters so search results don't cut it. */
  seoTitle: string;
  /** Meta description, ~150 characters. */
  description: string;
  /** One line for the index card. */
  summary: string;
  category: "Tổng quan" | "Học tập" | "Kỹ năng" | "Ngữ pháp";
  sections: GuideSection[];
  faqs: { q: string; a: string }[];
  /** Slugs of related guides, shown at the end. */
  related: string[];
}
