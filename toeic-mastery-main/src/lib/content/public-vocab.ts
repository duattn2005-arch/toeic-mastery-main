import { THPT_COLLECTION, topicDaySizes } from "@/lib/content/vocab-collections";
import type { IigTopic } from "@/lib/content/iig-vocab/types";

/** The public (crawlable) side of the THPT word lists: one page per topic at
 * /tu-vung/<slug>. Only THPT is published — the IIG / ETS lists stay behind
 * the login. */
export interface PublicVocabPage {
  /** URL segment, e.g. "tieng-anh-11-unit-1" / "tieng-anh-11-unit-1-mo-rong". */
  slug: string;
  grade: 9 | 11;
  unit: number;
  isExtension: boolean;
  topic: IigTopic;
  /** Path of this topic in the logged-in app (the CTA target). */
  appHref: string;
  dayCount: number;
}

const TOPIC_SLUG = /^lop-(9|11)-unit-0*(\d+)(-mo-rong)?$/;

export const PUBLIC_VOCAB_PAGES: PublicVocabPage[] = THPT_COLLECTION.topics.flatMap((topic) => {
  const match = TOPIC_SLUG.exec(topic.slug);
  if (!match) return [];
  const grade = Number(match[1]) as 9 | 11;
  const unit = Number(match[2]);
  const isExtension = Boolean(match[3]);
  return [
    {
      slug: `tieng-anh-${grade}-unit-${unit}${isExtension ? "-mo-rong" : ""}`,
      grade,
      unit,
      isExtension,
      topic,
      appHref: `/vocabulary/${THPT_COLLECTION.key}/${topic.slug}`,
      dayCount: topicDaySizes(THPT_COLLECTION, topic).length,
    },
  ];
});

export const PUBLIC_VOCAB_GRADES: { grade: 9 | 11; label: string; pages: PublicVocabPage[] }[] = ([11, 9] as const).map((grade) => ({
  grade,
  label: `Tiếng Anh ${grade}`,
  pages: PUBLIC_VOCAB_PAGES.filter((p) => p.grade === grade),
}));

export function getPublicVocabPage(slug: string) {
  const index = PUBLIC_VOCAB_PAGES.findIndex((p) => p.slug === slug);
  if (index === -1) return null;
  const page = PUBLIC_VOCAB_PAGES[index];
  const sameGrade = PUBLIC_VOCAB_PAGES.filter((p) => p.grade === page.grade);
  const position = sameGrade.findIndex((p) => p.slug === slug);
  return { page, prev: sameGrade[position - 1] ?? null, next: sameGrade[position + 1] ?? null, sameGrade };
}

/** "A Long & Healthy Life" out of "Unit 1: A Long & Healthy Life · Mở rộng". */
export function unitName(page: PublicVocabPage) {
  return page.topic.title.replace(/^Unit \d+:\s*/, "").replace(/\s*·\s*Mở rộng$/, "");
}

export function wordsPerDayLabel(page: PublicVocabPage) {
  return page.topic.dayWordRange ? `${page.topic.dayWordRange[0]}–${page.topic.dayWordRange[1]}` : "15";
}
