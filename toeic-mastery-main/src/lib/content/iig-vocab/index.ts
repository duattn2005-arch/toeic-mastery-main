import { OFFICES } from "./offices";
import { GENERAL_BUSINESS } from "./general-business";
import { PERSONNEL } from "./personnel";
import { MANUFACTURING } from "./manufacturing";
import { PURCHASING } from "./purchasing";
import { TECHNOLOGY } from "./technology";
import { TRAVEL } from "./travel";
import { diningOut } from "./dining-out";
import { entertainment } from "./entertainment";
import type { IigTopic } from "./types";

export type { IigTopic, IigWord } from "./types";

/** Words per day in each IIG topic's daily path (see vocab-collection-sync.ts). */
export const IIG_WORDS_PER_DAY = 10;

/** All IIG vocabulary topics in display order. */
export const IIG_TOPICS: IigTopic[] = [
  OFFICES,
  GENERAL_BUSINESS,
  PERSONNEL,
  MANUFACTURING,
  PURCHASING,
  TECHNOLOGY,
  TRAVEL,
  diningOut,
  entertainment,
];
