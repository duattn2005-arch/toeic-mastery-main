import type { IigWord } from "@/lib/content/iig-vocab/types";
import { ETS_2026_IPA } from "./ipa";

/** ETS lists only give term + Vietnamese meaning — no part of speech or
 * example, so those stay empty; IPA comes from the generated ETS_2026_IPA. */
export function etsWords(rows: [word: string, meaning: string][]): IigWord[] {
  return rows.map(([word, meaning]) => [word, "", ETS_2026_IPA[word] ? `/${ETS_2026_IPA[word]}/` : "", meaning, ""]);
}
