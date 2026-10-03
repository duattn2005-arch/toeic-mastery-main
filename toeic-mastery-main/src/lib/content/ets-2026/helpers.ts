import type { IigWord } from "@/lib/content/iig-vocab/types";

/** ETS lists only give term + Vietnamese meaning — no part of speech, IPA
 * or example — so those fields stay empty. */
export function etsWords(rows: [word: string, meaning: string][]): IigWord[] {
  return rows.map(([word, meaning]) => [word, "", "", meaning, ""]);
}
