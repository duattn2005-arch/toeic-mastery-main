/** One line of a fill-in-the-blank listening transcript. Blanks are runs of
 * underscores ("______") inside `text`, one word each. */
export interface TranscriptLine {
  /** Part 3 speaker tag, e.g. "W", "M1". */
  speaker?: string;
  /** Answer-choice label for Part 1/2, e.g. "(A)". */
  label?: string;
  text: string;
}

/** A question (Part 1/2) or a conversation/talk (Part 3/4). */
export interface TranscriptGroup {
  id: string;
  title: string;
  lines: TranscriptLine[];
}

export interface TranscriptPart {
  part: number;
  groups: TranscriptGroup[];
}

export interface TranscriptTest {
  number: number;
  parts: TranscriptPart[];
}

export interface TranscriptSet {
  /** URL segment and TranscriptAudio.setKey. */
  key: string;
  title: string;
  author: string;
  description: string;
  tests: TranscriptTest[];
}

export const BLANK_PATTERN = /_{3,}/g;
