import { CACH_TINH_DIEM } from "./cach-tinh-diem";
import { CAU_TRUC_DE_THI } from "./cau-truc-de-thi";
import { HOC_TU_VUNG } from "./hoc-tu-vung";
import { LO_TRINH } from "./lo-trinh";
import { MEO_LISTENING } from "./meo-listening";
import { MEO_READING } from "./meo-reading";
import { NGU_PHAP_PART_5 } from "./ngu-phap-part-5";
import type { Guide, GuideBlock } from "./types";

export type { Guide, GuideBlock, GuideSection } from "./types";

/** In the order they appear on /huong-dan. */
export const GUIDES: Guide[] = [CAU_TRUC_DE_THI, CACH_TINH_DIEM, LO_TRINH, HOC_TU_VUNG, MEO_LISTENING, MEO_READING, NGU_PHAP_PART_5];

export function getGuide(slug: string) {
  return GUIDES.find((g) => g.slug === slug) ?? null;
}

function blockText(block: GuideBlock): string {
  switch (block.type) {
    case "p":
    case "tip":
      return block.text;
    case "ul":
    case "ol":
      return block.items.join(" ");
    case "table":
      return [...block.head, ...block.rows.flat()].join(" ");
    case "example":
      return `${block.question} ${(block.options ?? []).join(" ")} ${block.answer} ${block.explain}`;
  }
}

/** Reading time at ~200 words a minute, at least 1. */
export function readingMinutes(guide: Guide) {
  const words = guide.sections.flatMap((s) => s.blocks).map(blockText).join(" ").split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
