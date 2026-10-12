import { LOP_11 } from "./lop-11";
import { LOP_9 } from "./lop-9";
import type { IigTopic } from "@/lib/content/iig-vocab/types";

/** THPT vocabulary (Global Success textbooks) — Lớp 11 then Lớp 9, one topic per Unit. */
export const THPT_TOPICS: IigTopic[] = [...LOP_11, ...LOP_9];
