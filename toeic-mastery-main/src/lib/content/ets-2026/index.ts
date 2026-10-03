import { ETS_READING } from "./reading";
import { ETS_LISTENING } from "./listening";
import type { IigTopic } from "@/lib/content/iig-vocab/types";

/** ETS TOEIC 2026 Vol. 5 vocabulary — 10 Reading + 10 Listening tests, in display order. */
export const ETS_2026_TOPICS: IigTopic[] = [...ETS_READING, ...ETS_LISTENING];
