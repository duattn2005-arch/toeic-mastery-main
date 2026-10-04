/** A DB question needs at least this many words to be matched by content. */
const MIN_WORDS = 4;
/** A web question stored under a different Part than the file's question
 * is only matched to it on near-identical text. */
const CROSS_PART_MIN = 0.6;

export interface MatchableQuestion {
  part: number;
  prompt: string;
  options: { content: string }[];
}

export interface MatchableKey {
  part: number;
  textEn: string;
}

export interface SectionMatch {
  /** key index -> DB index, how it was matched and its 0–1 score. */
  assigned: Map<number, { dbIndex: number; score: number | null; method: "content" | "order" }>;
  /** DB indexes no file question was matched to (e.g. a stray Reading
   * question stored under a Listening part). */
  extras: number[];
  /** Key indexes whose Part has no DB question left at all — the question
   * simply isn't on the web (e.g. a whole Part 3 group never entered). */
  missing: number[];
  /** Blocking problems, one per Part that can't be matched safely. */
  errors: string[];
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

export function questionText(q: { prompt: string; options: { content: string }[] }) {
  return [q.prompt, ...q.options.map((o) => o.content)].join(" ");
}

/** Matches a section's DB questions (in exam order) to the key file's
 * questions.
 *
 * 1. Content: every DB question with distinct text is compared with every
 *    file question, best pairs first — so a reordered Part, one padded with
 *    a stray question, or a question saved under the wrong Part (only on
 *    near-identical text) still lands on the right file question. Text
 *    shared by several questions of a Part (Part 1–2's printed directions
 *    with "." options) never counts.
 * 2. Order: within each Part, file questions still unplaced take the
 *    remaining DB questions of that Part in exam order. Leftover DB
 *    questions are extras. File questions with no DB question left in
 *    their Part are `missing`; fewer left than needed is an error (which
 *    one is absent can't be told). */
export function matchSection(db: MatchableQuestion[], keys: MatchableKey[], minScore = 0): SectionMatch {
  const assigned: SectionMatch["assigned"] = new Map();
  const dbWords = db.map((q) => words(questionText(q)));
  const keyWords = keys.map((k) => words(k.textEn));

  const signatures = dbWords.map((w, d) => `${db[d].part}|${[...w].sort().join(" ")}`);
  const seen = new Map<string, number>();
  for (const sig of signatures) seen.set(sig, (seen.get(sig) ?? 0) + 1);
  const matchable = dbWords.map((w, d) => w.size >= MIN_WORDS && seen.get(signatures[d]) === 1);

  const usedDb = new Set<number>();
  const pairs: { k: number; d: number; s: number }[] = [];
  keyWords.forEach((kw, k) =>
    dbWords.forEach((dw, d) => {
      if (!matchable[d]) return;
      const s = similarity(kw, dw);
      const samePart = db[d].part === keys[k].part;
      if (samePart ? s > 0 && s >= minScore : s >= CROSS_PART_MIN) pairs.push({ k, d, s });
    })
  );
  pairs.sort((a, b) => b.s - a.s);
  for (const { k, d, s } of pairs) {
    if (assigned.has(k) || usedDb.has(d)) continue;
    assigned.set(k, { dbIndex: d, score: s, method: "content" });
    usedDb.add(d);
  }

  const extras: number[] = [];
  const missing: number[] = [];
  const errors: string[] = [];
  const bestScore = (d: number) => Math.max(0, ...keyWords.map((kw) => similarity(kw, dbWords[d])));
  for (const part of [...new Set(keys.map((k) => k.part))]) {
    const keyLeft = keys.map((_, k) => k).filter((k) => keys[k].part === part && !assigned.has(k));
    const dbLeft = db.map((_, d) => d).filter((d) => db[d].part === part && !usedDb.has(d));
    // Too few web questions left, and each one left has its own text yet
    // matched nothing: those are strays, and the unplaced file questions are
    // absent on the web (not ambiguous) — they can be created from the file.
    if (dbLeft.length < keyLeft.length && dbLeft.every((d) => matchable[d])) {
      extras.push(...dbLeft);
      missing.push(...keyLeft);
      continue;
    }
    if (dbLeft.length < keyLeft.length) {
      const dbCount = db.filter((q) => q.part === part).length;
      const keyCount = keys.filter((k) => k.part === part).length;
      errors.push(`Part ${part}: đề trên web có ${dbCount} câu, file có ${keyCount} câu — còn ${keyLeft.length - dbLeft.length} câu trong file không tìm thấy trên web.`);
      continue;
    }
    // Extra DB questions are the unmatched ones with the weakest best score —
    // they must not soak up a file question by position.
    const extra = new Set(
      dbLeft
        .slice()
        .sort((a, b) => bestScore(a) - bestScore(b))
        .slice(0, dbLeft.length - keyLeft.length)
    );
    extras.push(...extra);
    const free = dbLeft.filter((d) => !extra.has(d));
    keyLeft.forEach((k, i) => assigned.set(k, { dbIndex: free[i], score: null, method: "order" }));
  }
  // DB questions under a Part the file doesn't have are extras too.
  db.forEach((q, d) => {
    if (!usedDb.has(d) && !keys.some((k) => k.part === q.part)) extras.push(d);
  });
  return { assigned, extras: extras.sort((a, b) => a - b), missing, errors };
}
