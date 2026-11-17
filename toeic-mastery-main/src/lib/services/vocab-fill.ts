import "server-only";
import { db } from "@/lib/db";
import { aiIpaAndType } from "@/lib/services/vocab-ai";

export interface VocabFillRow {
  term: string;
  definition: string;
  ipa: string;
  partOfSpeech: string;
  note: string;
}

/**
 * Fills only the *empty* IPA / type cells — anything the learner typed or
 * pasted is kept as is. AI first (it picks the type matching the given
 * meaning), then the dictionary cache for an IPA the AI didn't give. Never
 * throws: an AI outage (quota, no key, timeout) just leaves cells empty
 * and reports `aiFailed`, so saving a word list never depends on it.
 */
export async function fillMissingVocabDetails(rows: VocabFillRow[]): Promise<{ rows: VocabFillRow[]; filled: number; aiFailed: boolean }> {
  const missing = rows.filter((r) => !r.ipa || !r.partOfSpeech);
  if (missing.length === 0) return { rows, filled: 0, aiFailed: false };

  let ai = new Map<string, { ipa: string; partOfSpeech: string }>();
  let aiFailed = false;
  try {
    ai = await aiIpaAndType(missing.map((r) => ({ term: r.term, definition: r.definition })));
  } catch (err) {
    aiFailed = true;
    console.error("vocab AI fill failed", err);
  }

  const stillNoIpa = missing.filter((r) => !r.ipa && !ai.get(r.term.toLowerCase())?.ipa).map((r) => r.term.toLowerCase());
  const dict =
    stillNoIpa.length > 0
      ? new Map(
          (await db.dictionaryEntry.findMany({ where: { word: { in: stillNoIpa } }, select: { word: true, ipa: true } })).map((e) => [e.word, e.ipa])
        )
      : new Map<string, string | null>();

  let filled = 0;
  const out = rows.map((r) => {
    if (r.ipa && r.partOfSpeech) return r;
    const key = r.term.toLowerCase();
    const hit = ai.get(key);
    const dictIpa = dict.get(key);
    const ipa = r.ipa || hit?.ipa || (dictIpa ? `/${dictIpa.replace(/^\/|\/$/g, "")}/` : "");
    const partOfSpeech = r.partOfSpeech || hit?.partOfSpeech || "";
    if (ipa !== r.ipa || partOfSpeech !== r.partOfSpeech) filled++;
    return { ...r, ipa, partOfSpeech };
  });
  return { rows: out, filled, aiFailed };
}
