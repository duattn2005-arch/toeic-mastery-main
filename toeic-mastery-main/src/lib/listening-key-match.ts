/** A DB question needs at least this many words to be matched by content. */
const MIN_WORDS = 4;

export interface MatchableQuestion {
  prompt: string;
  options: { content: string }[];
}

export interface PartMatch {
  /** key index -> DB index, how it was matched and its 0–1 score. */
  assigned: Map<number, { dbIndex: number; score: number | null; method: "content" | "order" }>;
  /** DB indexes no file question was matched to (e.g. a stray Reading
   * question stored under a Listening part). */
  extras: number[];
  /** Set when the Part can't be matched safely. */
  error: string | null;
}

export function words(text: string) {
  return new Set(
    text
      .toLowerCase()
      .replace(/^\s*\d+\s*\./, "")
      .replace(/\([a-d]\)/g, " ")
      .replace(/[^a-z0-9]+/g, " ")
      .split(" ")
      .filter((w) => w.length > 1)
  );
}

/** Dice overlap of two word sets, 0–1. */
export function similarity(a: Set<string>, b: Set<string>) {
  if (a.size === 0 || b.size === 0) return 0;
  let shared = 0;
  for (const w of a) if (b.has(w)) shared++;
  return (2 * shared) / (a.size + b.size);
}

export function questionText(q: MatchableQuestion) {
  return [q.prompt, ...q.options.map((o) => o.content)].join(" ");
}

/** Matches one Part's DB questions (in exam order) to the key file's
 * questions. With distinct question text on the web, matching is by
 * content, so a reordered or padded Part still lines up and leftover DB
 * questions are reported as extras. Parts without it (1–2: audio plus
 * shared directions) match by order and need equal counts. */
export function matchListeningPart(dbPart: MatchableQuestion[], keyTexts: string[], minScore = 0): PartMatch {
  const assigned: PartMatch["assigned"] = new Map();
  const dbWords = dbPart.map((q) => words(questionText(q)));
  const keyWords = keyTexts.map(words);
  // Only text that tells questions apart counts: Part 1–2 questions often
  // all carry the same printed directions ("Mark your answer…") with "."
  // options, and matching on that would shuffle them.
  const signatures = dbWords.map((w) => [...w].sort().join(" "));
  const seen = new Map<string, number>();
  for (const sig of signatures) seen.set(sig, (seen.get(sig) ?? 0) + 1);
  const matchable = dbWords.map((w, d) => w.size >= MIN_WORDS && seen.get(signatures[d]) === 1);
  const textual = matchable.filter(Boolean).length >= Math.ceil(dbPart.length / 2);

  if (dbPart.length < keyTexts.length || (!textual && dbPart.length !== keyTexts.length)) {
    return { assigned, extras: [], error: `đề trên web có ${dbPart.length} câu, file có ${keyTexts.length} câu.` };
  }

  const usedDb = new Set<number>();
  if (textual) {
    const pairs: { k: number; d: number; s: number }[] = [];
    keyWords.forEach((kw, k) => dbWords.forEach((dw, d) => matchable[d] && pairs.push({ k, d, s: similarity(kw, dw) })));
    pairs.sort((a, b) => b.s - a.s);
    for (const { k, d, s } of pairs) {
      if (assigned.has(k) || usedDb.has(d) || s <= 0 || s < minScore) continue;
      assigned.set(k, { dbIndex: d, score: s, method: "content" });
      usedDb.add(d);
    }
  }

  // Extra DB questions are the unmatched ones with the weakest best score —
  // they must not soak up a file question by position.
  const free = dbPart.map((_, d) => d).filter((d) => !usedDb.has(d));
  const missing = keyTexts.length - assigned.size;
  const bestScore = (d: number) => Math.max(0, ...keyWords.map((kw) => similarity(kw, dbWords[d])));
  const extras = free
    .slice()
    .sort((a, b) => bestScore(a) - bestScore(b))
    .slice(0, free.length - missing);
  const freeDb = free.filter((d) => !extras.includes(d));

  keyTexts.forEach((_, k) => {
    if (!assigned.has(k)) assigned.set(k, { dbIndex: freeDb.shift()!, score: null, method: "order" });
  });
  return { assigned, extras: extras.sort((a, b) => a - b), error: null };
}
