/**
 * Rule-based question labeller — the "gắn nhãn" half of the insights
 * pipeline (see insights/engine.ts for the "chưng cất" half). Pure functions
 * over what a question already carries (Part, prompt, options, the right
 * answer, the Vietnamese explanation, transcript, passage layout), so it
 * runs over the whole bank in seconds with no LLM quota, and is testable
 * against the hand-labelled seed questions.
 *
 * Produces:
 *  - grammarTopicSlug (Part 5/6 grammar questions) — from the shape of the
 *    four options first (same word family → word form by the right answer's
 *    suffix, all prepositions, all pronouns, relative words, comparison
 *    forms, verb forms…), then the explanation's own terminology;
 *  - strategicLabelSlugs — the question type / decision strategy (Wh- vs
 *    Yes/No in Part 2, implied meaning or graphic in Part 3/4, NOT-stated or
 *    inference in Part 7, sentence insertion in Part 6…);
 *  - vocabularyFocus — the key words to review;
 *  - a rule-based difficulty, used only until real answers calibrate it
 *    (see calibrateDifficulty).
 */

export type Part = "PART1" | "PART2" | "PART3" | "PART4" | "PART5" | "PART6" | "PART7";
export type Level = "EASY" | "MEDIUM" | "HARD";

export interface TagInput {
  part: Part;
  prompt: string;
  options: { label: string; content: string }[];
  correctLabel: string;
  explanationVi: string;
  /** The question's own transcript, or its passage's (Part 1–4). */
  transcript: string | null;
  passageLayout: "SINGLE" | "DOUBLE" | "TRIPLE" | null;
  /** 0-based position of this question inside its passage group. */
  groupIndex: number;
}

export interface TagResult {
  grammarTopicSlug: string | null;
  strategicLabelSlugs: string[];
  vocabularyFocus: string[];
  difficulty: Level;
  /** Why each label was given — shown in the admin coverage page. */
  reasons: string[];
}

// --- word lists ---------------------------------------------------------------
const PREPOSITIONS = new Set(
  "at by in on for from to with within without during until till since before after about above below under over between among through throughout toward towards across along around beside besides near into onto upon of off out past via per against despite regarding concerning including following prior opposite behind beyond inside outside except like unlike amid".split(" ")
);
const CONJUNCTIONS = new Set(
  "although though because since unless while whereas if whether once as so but and or nor yet however therefore moreover furthermore nevertheless nonetheless otherwise meanwhile consequently thus hence instead accordingly besides still then also even".split(" ")
);
const CONNECTOR_PHRASES = [
  "even though", "even if", "so that", "in order that", "as soon as", "as long as", "provided that", "in case", "now that", "because of", "due to", "owing to",
  "in spite of", "regardless of", "as a result", "in addition", "for example", "for instance", "on the other hand", "in contrast", "as well as", "in fact", "after all",
  "by contrast", "in other words", "at the same time", "as a matter of fact", "rather than", "not only", "either", "neither", "both", "so as", "in order", "in spite", "regardless", "now", "whenever", "wherever",
];
const PRONOUNS = new Set(
  "i me my mine myself you your yours yourself yourselves he him his himself she her hers herself it its itself we us our ours ourselves they them their theirs themselves one oneself someone anyone everyone no-one nobody each other another others whoever".split(" ")
);
const RELATIVES = new Set("who whom whose which that where when what whoever whichever whatever why how".split(" "));
const MODALS = new Set("can could may might must shall should will would".split(" "));
const STOP = new Set(
  "the a an and or but of to in on at by for from with as is are was were be been being has have had do does did will would can could may might must shall should this that these those it its they them their there here what which who whom whose when where why how not no yes than then so such very more most much many some any all each every other another into about over after before also just only even still your you our we us his her he she i me my mine one ones mentioned indicated suggested stated according following purpose information probably likely implied included listed regarding concerning speaker speakers woman man people please would".split(" ")
);

const words = (s: string) => s.toLowerCase().replace(/[^a-z'\- ]+/g, " ").split(/\s+/).filter(Boolean);
const clean = (s: string) => s.replace(/\s+/g, " ").trim();
const optionTexts = (q: TagInput) => q.options.map((o) => clean(o.content)).filter((t) => t && !/^\(?[a-d]\)?\.?$/i.test(t));
const correctText = (q: TagInput) => clean(q.options.find((o) => o.label === q.correctLabel)?.content ?? "");

/** Rough stem: strips the usual derivational/inflectional endings. */
function stem(w: string): string {
  let s = w.toLowerCase().replace(/[^a-z]/g, "");
  for (const suf of ["ization", "isation", "ically", "fulness", "iveness", "ations", "ation", "ments", "ment", "ness", "ities", "ity", "ances", "ance", "ences", "ence", "ingly", "edly", "ively", "ives", "ive", "ists", "ist", "ism", "able", "ible", "ably", "ibly", "ally", "ful", "ous", "less", "ical", "ial", "ic", "al", "ers", "er", "ors", "or", "ies", "ied", "ying", "ing", "ed", "ly", "es", "s", "e", "y"]) {
    if (s.length - suf.length >= 4 && s.endsWith(suf)) {
      s = s.slice(0, -suf.length);
      break;
    }
  }
  return s.slice(0, 6);
}

// --- grammar topic (Part 5/6) -------------------------------------------------
const EXPLANATION_TOPICS: [RegExp, string][] = [
  [/mệnh đề quan hệ|relative clause|đại từ quan hệ/i, "relative-clause"],
  [/câu điều kiện|conditional/i, "conditionals"],
  [/bị động|passive/i, "passive-voice"],
  [/so sánh|comparative|superlative/i, "comparatives"],
  [/hòa hợp|chủ ngữ số (ít|nhiều)|chia (động từ )?theo chủ ngữ|subject[- ]verb/i, "subject-verb-agreement"],
  [/phân từ|participle/i, "participles"],
  [/danh động từ|gerund/i, "gerund"],
  [/to[- ]?infinitive|to \+ ?v|nguyên mẫu|infinitive/i, "infinitive"],
  [/\bthì\b|tense|hiện tại (đơn|hoàn thành|tiếp diễn)|quá khứ (đơn|hoàn thành)|tương lai/i, "verb-tense"],
  [/liên từ|conjunction|từ nối/i, "conjunctions"],
  [/giới từ|preposition/i, "prepositions"],
  [/đại từ|pronoun|tân ngữ|sở hữu|phản thân/i, "pronouns"],
  [/trạng từ|adverb/i, "adverbs"],
  [/tính từ|adjective/i, "adjectives"],
  [/danh từ|noun/i, "nouns"],
];

const VERB_TOPICS = new Set(["verb-tense", "passive-voice", "gerund", "infinitive", "participles", "conditionals", "subject-verb-agreement"]);

/** What the explanation says the blank needs ("cần danh từ", "cần V-ing"...) — the strongest single signal. */
function targetFromExplanation(ex: string): string | null {
  const t = ex.toLowerCase();
  const pairs: [RegExp, string][] = [
    [/câu điều kiện|conditional/, "conditionals"],
    [/mệnh đề quan hệ|đại từ quan hệ|relative/, "relative-clause"],
    [/so sánh (hơn|nhất|bằng|kép)|comparative|superlative|as\s?\.\.\.\s?as/, "comparatives"],
    [/hòa hợp|chủ ngữ (là )?(danh từ )?(số ít|số nhiều)|động từ số (ít|nhiều)|chia (động từ )?theo chủ ngữ|subject[- ]verb/, "subject-verb-agreement"],
    [/phân từ|participle/, "participles"],
    [/bị động|passive/, "passive-voice"],
  ];
  for (const [re, slug] of pairs) if (re.test(t)) return slug;
  const need = "(cần|dùng|phải là|phải dùng|chọn|đi với|theo sau (bởi|là)|\\+)\\s*(một |1 )?(dạng )?";
  const after = (word: string) => new RegExp(need + "(" + word + ")").test(t);
  if (after("v-ing|ving|danh động từ|gerund")) return "gerund";
  if (after("to[- ]?v\\b|to[- ]infinitive|to \\+ ?v|động từ nguyên mẫu có to|nguyên mẫu có to|to-v")) return "infinitive";
  if (after("phân từ|participle|quá khứ phân từ|hiện tại phân từ")) return "participles";
  if (after("trạng từ|adverb")) return "adverbs";
  if (after("tính từ sở hữu|đại từ|pronoun|tân ngữ")) return "pronouns";
  if (after("tính từ|adjective")) return "adjectives";
  if (after("danh từ|noun")) return "nouns";
  if (after("giới từ|preposition")) return "prepositions";
  if (after("liên từ|conjunction")) return "conjunctions";
  if (/danh động từ|gerund/.test(t)) return "gerund";
  if (/to[- ]infinitive|nguyên mẫu có to/.test(t)) return "infinitive";
  if (/phân từ|participle/.test(t)) return "participles";
  if (/\bthì\b|tense|hiện tại (đơn|hoàn thành|tiếp diễn)|quá khứ (đơn|hoàn thành|tiếp diễn)|tương lai (đơn|gần|hoàn thành)|đã xảy ra|kế hoạch .*tương lai/.test(t)) return "verb-tense";
  return null;
}

const NOT_ADVERBS = new Set(["supply", "apply", "reply", "family", "only", "assembly", "comply", "multiply", "rely", "ally", "fly", "italy", "jelly", "belly", "bully", "rally", "tally"]);
const ADJ_SUFFIX = /(ive|ful|ous|able|ible|ic|less|ary|ory|ent|ant|ish|ile|ial|ical)$/;
const NOUN_SUFFIX = /(tion|sion|ment|ness|ity|ance|ence|ism|ship|hood|ure|age|ery|cy|ist|ee|th|er|or|ar|ian|ency|ancy|ion|ty|al)$/;

function grammarFromOptions(q: TagInput, reasons: string[]): { topic: string | null; kind: "word-form" | "grammar" | "vocabulary" | null } {
  const opts = optionTexts(q);
  if (opts.length < 3) return { topic: null, kind: null };
  const lower = opts.map((o) => o.toLowerCase().replace(/[.,]$/, ""));
  const single = lower.every((o) => !o.includes(" "));
  const right = correctText(q).toLowerCase().replace(/[.,]$/, "");
  const ex = targetFromExplanation(q.explanationVi);

  // Closed-class options: prepositions / connectors / pronouns / relative words.
  const PREP_PHRASES = ["because of", "due to", "in spite of", "prior to", "according to", "instead of", "in front of", "next to", "owing to", "regardless of", "as of", "on behalf of", "in addition to", "along with", "except for", "thanks to"];
  const isPrep = (o: string) => PREPOSITIONS.has(o) || PREP_PHRASES.includes(o);
  const isConj = (o: string) => CONJUNCTIONS.has(o) || CONNECTOR_PHRASES.includes(o);
  if (lower.every((o) => isPrep(o) || isConj(o))) {
    if (ex === "gerund") {
      reasons.push("lời giải: sau giới từ cần V-ing");
      return { topic: "gerund", kind: "grammar" };
    }
    // "despite / although / because / since" is the conjunction lesson; a
    // mostly-preposition set with a preposition answer is the preposition one.
    const prepCount = lower.filter((o) => isPrep(o) && !(isConj(o) && !["since", "before", "after", "until", "as", "for"].includes(o))).length;
    const allPrep = prepCount === lower.length;
    const prepRight = isPrep(right) && (!isConj(right) || ["since", "before", "after", "until", "as", "for"].includes(right));
    if (allPrep || (prepRight && prepCount >= 3 && ex !== "conjunctions")) {
      reasons.push(allPrep ? "4 đáp án đều là giới từ" : "đáp án đúng là giới từ (trước cụm danh từ)");
      return { topic: "prepositions", kind: "grammar" };
    }
    reasons.push("đáp án đúng là liên từ nối mệnh đề");
    return { topic: "conjunctions", kind: "grammar" };
  }
  if (lower.filter((o) => RELATIVES.has(o)).length >= 3 && !lower.some((o) => PRONOUNS.has(o) && !RELATIVES.has(o))) {
    reasons.push("đáp án là đại từ/trạng từ quan hệ");
    return { topic: "relative-clause", kind: "grammar" };
  }
  const PRONOUNISH = (o: string) => PRONOUNS.has(o) || ["that", "those", "these", "this", "one", "ones", "such"].includes(o);
  if (lower.filter(PRONOUNISH).length >= 3 && PRONOUNISH(right)) {
    reasons.push("đáp án là các đại từ (nhân xưng/chỉ định/bất định)");
    return { topic: "pronouns", kind: "grammar" };
  }
  const QUANT = new Set(["more", "most", "less", "least", "fewer", "fewest", "few", "much", "many", "the more", "the most", "much more", "the less", "the least", "further", "farther"]);
  if (lower.filter((o) => QUANT.has(o)).length >= 3) {
    reasons.push("đáp án là các dạng so sánh more/less/fewer");
    return { topic: "comparatives", kind: "grammar" };
  }
  // is / are / was / were... with an explanation about singular vs plural.
  const BE_HAVE = new Set(["is", "are", "was", "were", "has", "have", "be", "been"]);
  if (lower.filter((o) => BE_HAVE.has(o.split(" ")[0])).length >= 3 && /số ít|số nhiều|danh từ tập hợp|chủ ngữ (chính|thực|số)/.test(q.explanationVi.toLowerCase())) {
    reasons.push("đáp án khác nhau ở số ít/số nhiều của động từ");
    return { topic: "subject-verb-agreement", kind: "grammar" };
  }

  const AUXW = new Set(["to", "be", "been", "being", "is", "are", "was", "were", "has", "have", "had", "will", "would", "having", "not", "does", "do", "did", "shall", "should", "can", "could", "may", "might", "must", "more", "most", "less", "least", "the", "as"]);
  const heads = lower.map((o) => o.split(" ").filter((w) => !AUXW.has(w)).pop() ?? o);
  const family = new Set(heads.map(stem)).size === 1 || new Set(heads.map((h) => h.slice(0, 5))).size === 1;
  if (family) {
    // "more/most X", or X+er/est where plain X (or X-y → X-ier) is another option.
    const comparisonForm = (o: string) =>
      /^(more|most|less|least|the most|as) /.test(o) ||
      lower.some((x) => x !== o && (o === x + "er" || o === x + "r" || o === x + "est" || o === x + "st" || (x.endsWith("y") && (o === x.slice(0, -1) + "ier" || o === x.slice(0, -1) + "iest"))));
    if (comparisonForm(right) && ex !== "nouns" && ex !== "adverbs") {
      reasons.push("các dạng so sánh của cùng một từ");
      return { topic: "comparatives", kind: "grammar" };
    }
    // Conditional clauses: options are would/will/had forms and the sentence has "if/unless/had...".
    if (lower.some((o) => /\bwould\b|\bhad\b/.test(o)) && /\bif\b|\bunless\b|^had\b|\bprovided\b|\bshould you\b|\bwere .* to\b/i.test(q.prompt)) {
      reasons.push("câu có mệnh đề điều kiện, đáp án là các dạng would/had");
      return { topic: "conditionals", kind: "grammar" };
    }
    if (ex === "conditionals") {
      reasons.push("lời giải: câu điều kiện");
      return { topic: "conditionals", kind: "grammar" };
    }
    const multi = lower.some((o) => o.includes(" "));
    if (single) {
      const r = right;
      const base = [...lower].sort((a, b) => a.length - b.length)[0];
      const verbLike = (o: string) => /(ing|ed)$/.test(o) || o === base || o === base + "s" || o === base + "es";
      const kindOf = (): string => {
        if (/ly$/.test(r) && !NOT_ADVERBS.has(r)) return "adverbs";
        if (/(ing|ed)$/.test(r)) {
          const afterBe = /\b(is|are|was|were|be|been|being)\s+(\w+\s+)?-{2,}/i.test(q.prompt);
          if (ex === "passive-voice") return afterBe ? "passive-voice" : "participles";
          if (ex && ["gerund", "participles", "verb-tense", "adjectives", "subject-verb-agreement"].includes(ex)) return ex;
          return "participles";
        }
        if (ex && VERB_TOPICS.has(ex) && verbLike(r)) return ex;
        const sing = r.replace(/ies$/, "y").replace(/s$/, "");
        if (/(ment|tion|sion|ness|ity|ance|ence|ism|ship|hood)$/.test(sing)) return "nouns";
        if (ADJ_SUFFIX.test(r) && ex !== "nouns") return "adjectives";
        if (NOUN_SUFFIX.test(sing) || NOUN_SUFFIX.test(r) || ex === "nouns") return "nouns";
        if (ex === "adjectives") return "adjectives";
        if (!verbLike(r)) return "nouns";
        return "verb-tense";
      };
      const topic = kindOf();
      const posKinds = new Set(lower.map((o) => (/ly$/.test(o) ? "adv" : verbLike(o) ? "verb" : "other")));
      reasons.push(`cùng họ từ → đáp án đúng thuộc chủ điểm ${topic}`);
      return { topic, kind: posKinds.size >= 2 ? "word-form" : "grammar" };
    }
    if (multi || lower.some((o) => ["is", "are", "was", "were", "has", "have"].includes(o))) {
      const numberPair = (a: string, b: string) => lower.some((o) => new RegExp("^" + a + "\\b").test(o)) && lower.some((o) => new RegExp("^" + b + "\\b").test(o));
      if (/số ít|số nhiều|danh từ tập hợp/.test(q.explanationVi.toLowerCase()) && (numberPair("is", "are") || numberPair("was", "were") || numberPair("has", "have"))) {
        reasons.push("đáp án khác nhau ở số ít/số nhiều của động từ");
        return { topic: "subject-verb-agreement", kind: "grammar" };
      }
      if (ex && VERB_TOPICS.has(ex)) {
        reasons.push(`các dạng của cùng động từ, lời giải: ${ex}`);
        return { topic: ex, kind: "grammar" };
      }
      if (/\b(be|been|being|is|are|was|were)\b \w+(ed|en|wn|t)$/.test(right)) {
        reasons.push("các dạng của cùng động từ, đáp án ở thể bị động");
        return { topic: "passive-voice", kind: "grammar" };
      }
      if (/^to /.test(right)) {
        reasons.push("đáp án đúng là to + V");
        return { topic: "infinitive", kind: "grammar" };
      }
      reasons.push("các dạng thì/chia của cùng một động từ");
      return { topic: "verb-tense", kind: "grammar" };
    }
  }
  if (lower.every((o) => MODALS.has(o.split(" ")[0]))) return { topic: null, kind: "vocabulary" };
  // A word family whose spelling changes (grow/growth, vary/variety,
  // receive/reception): three options sharing a 4-letter start.
  const prefixShare = Math.max(...lower.map((o) => lower.filter((x) => x.slice(0, 4) === o.slice(0, 4)).length));
  if (single && prefixShare >= 3) {
    const topic = ex ?? grammarFromExplanation(q.explanationVi) ?? (/ly$/.test(right) && !NOT_ADVERBS.has(right) ? "adverbs" : null);
    if (topic) {
      reasons.push(`cùng họ từ (biến đổi gốc) → ${topic}`);
      return { topic, kind: "word-form" };
    }
  }
  if (ex && (VERB_TOPICS.has(ex) || ["comparatives", "relative-clause", "conjunctions", "prepositions", "pronouns"].includes(ex))) {
    reasons.push(`lời giải xác định chủ điểm ${ex}`);
    return { topic: ex, kind: "grammar" };
  }
  // Four unrelated words of the same kind → a vocabulary (meaning) question.
  if (single || lower.every((o) => o.split(" ").length <= 3)) {
    reasons.push("4 đáp án khác nghĩa, cùng từ loại — câu từ vựng");
    return { topic: null, kind: "vocabulary" };
  }
  return { topic: null, kind: null };
}

function grammarFromExplanation(text: string): string | null {
  for (const [re, slug] of EXPLANATION_TOPICS) if (re.test(text)) return slug;
  return null;
}

// --- strategic labels ---------------------------------------------------------
const isSentenceOptions = (opts: string[]) => opts.length >= 3 && opts.every((o) => o.split(" ").length >= 6);
const WH = /^(who|whom|whose|what|which|when|where|why|how)\b/i;
const AUX = /^(do|does|did|don't|doesn't|didn't|is|are|was|were|isn't|aren't|wasn't|weren't|have|has|had|haven't|hasn't|can|can't|could|couldn't|will|won't|would|wouldn't|should|shouldn't|may|might|must|shall)\b/i;
const REQUEST = /^(could you|would you|can you|will you|would you like|why don't|why not|how about|what about|let's|shall we|would you mind|do you want|do you mind|please|i'd like you|you should)\b/i;
const INDIRECT = /^(i'm not sure|i don't know|i have no idea|let me|ask|check|actually|it depends|didn't|haven't|hasn't|isn't|aren't|wasn't|probably|we'll see|someone|nobody|i'll|i think|i thought|maybe|perhaps|that's|the|it's been|i haven't|i didn't|i wasn't|no one|not yet|you'll have to|you can|you should|why|what|how|who|when|where)\b/i;

function part2Labels(q: TagInput, reasons: string[]): string[] {
  const question = clean(q.transcript?.split(/\n/)[0] || q.prompt).replace(/^(q|question|m|w|man|woman)\s*[:.-]\s*/i, "");
  if (!question || question.length < 4) return [];
  const labels: string[] = [];
  const lower = question.toLowerCase();
  const isQuestion = question.includes("?");
  if (isQuestion && / or /.test(lower) && !WH.test(lower)) labels.push("choice-question");
  else if (REQUEST.test(lower)) labels.push("request-suggestion");
  else if (WH.test(lower) || /^(do|did|can|could|would) you (know|remember|tell me|have any idea|happen to know) (who|what|when|where|why|how|which)\b/.test(lower)) labels.push("wh-question");
  else if (isQuestion && (AUX.test(lower) || /, (isn't|aren't|don't|doesn't|didn't|won't|haven't|hasn't|right|correct) [a-z]+\?$/.test(lower) || /\b(right|correct)\?$/.test(lower))) labels.push("yes-no-question");
  else if (!isQuestion) labels.push("statement-response");
  else labels.push("yes-no-question");
  reasons.push(`Part 2: ${labels[0]}`);

  const right = correctText(q);
  if (right && (right.endsWith("?") || INDIRECT.test(right.toLowerCase()))) {
    // A direct Wh- answer often starts with a wh-word too ("Where..." rarely); only call
    // it indirect when it doesn't simply answer with the expected kind of fact.
    const direct = labels[0] === "wh-question" && /^(at|in|on|by|from|to|about|around|for|mr|ms|mrs|the (one|man|woman)|yes|no|sure|of course|certainly)\b/i.test(right);
    if (!direct) {
      labels.push("indirect-response");
      reasons.push("đáp án đúng trả lời gián tiếp");
    }
  }
  return labels;
}

function part1Labels(q: TagInput, reasons: string[]): string[] {
  const right = correctText(q) || clean(q.transcript ?? "");
  if (!right) return [];
  const l = right.toLowerCase();
  const person = /^(a |an |the |some |two |several |one of the )?(man|men|woman|women|people|person|worker|workers|customer|customers|he|she|they|some people|a group|passengers?|shoppers?|diners?|cyclists?|pedestrians?|employees?|travelers?|chefs?|musicians?|vendors?|students?)\b/.test(l);
  const passiveState = /\b(is|are) being\b|\b(has|have) been\b|\b(is|are) (placed|located|stacked|arranged|displayed|parked|lined|hanging|mounted|positioned|piled|set|left|covered|filled|lying|leaning|propped)\b|^there (is|are)\b/.test(l);
  if (person && !/\b(has|have) been\b/.test(l)) {
    reasons.push("Part 1: mô tả hành động của người");
    return ["photo-action"];
  }
  if (passiveState || !person) {
    reasons.push("Part 1: mô tả trạng thái/vị trí đồ vật");
    return ["photo-state-location"];
  }
  return ["photo-action"];
}

function part34Labels(q: TagInput, reasons: string[]): string[] {
  const p = clean(q.prompt).toLowerCase();
  if (!p) return [];
  const labels: string[] = [];
  if (/look at the graphic|refer to the graphic|graphic/.test(p)) labels.push("graphic-info-synthesis");
  if (/imply|mean when|why does the (man|woman|speaker)( \d)? say|what does the (man|woman|speaker)( \d)? mean|suggest when|indicate when/.test(p)) labels.push("implied-meaning");
  if (q.part === "PART3" && (/the (men|women)\b|\b(man|woman) \d\b/.test(p) || /\b(m|w|man|woman)\s?[12]\s*:/i.test(q.transcript ?? ""))) labels.push("three-speaker-role");
  if (labels.length === 0 || labels.every((l) => l === "three-speaker-role")) {
    if (/mainly (discussing|about)|main (topic|purpose)|purpose of the (call|talk|message|announcement|broadcast|speech|meeting)|what is the (talk|announcement|message|broadcast|report|speech|conversation) (mainly )?about|why is the speaker calling|why are the speakers|what are the speakers discussing|what (problem|issue) (are|is|does)/.test(p))
      labels.push(q.part === "PART4" ? "speaker-purpose" : "main-topic-listening");
    else if (/^who (is|are|most likely)|who is the speaker|where (do|does|is|are|most likely)|what (is|are) the (speaker|speakers|man|woman|listeners)'?s? (job|profession|occupation)|what (industry|kind of business|type of business|department)|where .* (work|take place|being made)|who (are|is) the (listeners|audience)/.test(p))
      labels.push("speaker-setting");
    else if (/do next|will (the )?(man|woman|speaker|speakers|listeners)( \d)? (probably |most likely )?do|ask(s|ed)? .* to do|suggest|recommend|offer(s)? to|request|what will happen|plan to do|instructed to|encourage/.test(p))
      labels.push("next-action-request");
    else labels.push("detail-listening");
  }
  reasons.push(`Part ${q.part.slice(-1)}: ${labels.join(", ")}`);
  return labels;
}

function part7Labels(q: TagInput, reasons: string[]): string[] {
  const raw = clean(q.prompt);
  const p = raw.toLowerCase();
  if (!p) return [];
  const labels: string[] = [];
  if (/\bNOT\b/.test(raw) || /not (true|mentioned|stated|indicated|included|listed|suggested|offered|required)/.test(p)) labels.push("not-stated");
  if (/closest in meaning|the word ["“']|the phrase ["“']|is closest to/.test(p)) labels.push("vocabulary-in-context");
  if (/\[\d\]|best belongs|position(s)? marked|following sentence/.test(p)) labels.push("sentence-insertion-logic");
  if (/purpose of|why (was|is|did|has) .* (written|sent|posted|published|issued|created)|mainly (about|discuss|involve)|main (topic|idea)|why .* (write|writing|send|sending)|what is being (advertised|announced|offered|promoted|described|proposed)|what is the (memo|email|e-mail|letter|notice|article|advertisement|announcement|report|message) (proposing|announcing|mainly|about|for)|what does the (memo|email|letter|notice|article) (announce|propose|describe)/.test(p)) labels.push("authors-purpose");
  else if (/most likely|suggested|implied|imply|infer|can be concluded|probably|indicate(d)? about|what is true|what is suggested|what is indicated|mean when (s?he|they|[a-z]+) (writes|says)|meant by/.test(p)) {
    if (!labels.includes("not-stated")) labels.push("inference");
  } else if (/^why\b|reason|because|result of|due to/.test(p) && !labels.length) labels.push("cross-paragraph-cause-effect");
  // Cross-document questions: explicit ("based on both...") or the 3rd/4th
  // question of a double/triple set, where TOEIC usually places them.
  const multi = q.passageLayout === "DOUBLE" || q.passageLayout === "TRIPLE";
  const explicitCross = /\bboth\b|three documents|two (emails|documents|letters|texts)|according to the (documents|information)|stated in the (job posting|advertisement|schedule|form|email|letter)|based on the (information|emails?|letters?|schedule|form|documents)|according to the (second|third|schedule|form|invoice|table)|in the (first|second|third) (email|letter|document|passage)/.test(p);
  const typicalSlot = (q.groupIndex === 2 || q.groupIndex === 3) && !labels.some((l) => ["vocabulary-in-context", "sentence-insertion-logic", "authors-purpose"].includes(l));
  if (multi && (explicitCross || typicalSlot)) labels.push("double-triple-passage-synthesis");
  if (/how did .* (respond|react)|in response to|as a result of|what (led|caused)/.test(p)) labels.push("cross-paragraph-cause-effect");
  if (labels.length === 0) labels.push("detail-reading");
  reasons.push(`Part 7: ${labels.join(", ")}`);
  return labels;
}

// --- vocabulary focus ---------------------------------------------------------
function lemma(w: string): string[] {
  const out = [w];
  if (w.endsWith("ies")) out.push(w.slice(0, -3) + "y");
  if (w.endsWith("es")) out.push(w.slice(0, -2));
  if (w.endsWith("s")) out.push(w.slice(0, -1));
  if (w.endsWith("ed")) out.push(w.slice(0, -2), w.slice(0, -1));
  if (w.endsWith("ing")) out.push(w.slice(0, -3), w.slice(0, -3) + "e");
  return out;
}

function vocabularyFor(q: TagInput, known: Set<string>, kind: string | null): string[] {
  const right = correctText(q);
  const pool = q.part === "PART5" || q.part === "PART6" ? `${right} ${q.prompt}` : `${q.prompt} ${right}`;
  const found: string[] = [];
  const seen = new Set<string>();
  const consider = (w: string) => {
    if (w.length < 5 || STOP.has(w) || PREPOSITIONS.has(w) || PRONOUNS.has(w)) return;
    const hit = lemma(w).find((l) => known.has(l));
    const word = hit ?? (known.size < 300 && w.length >= 8 ? w : null);
    if (word && !seen.has(word)) {
      seen.add(word);
      found.push(word);
    }
  };
  if (kind === "vocabulary" && right && !right.includes(" ")) consider(right.toLowerCase());
  for (const w of words(pool)) consider(w.replace(/^'+|'+$/g, ""));
  return found.sort((a, b) => (a === right.toLowerCase() ? -1 : b === right.toLowerCase() ? 1 : b.length - a.length)).slice(0, 4);
}

// --- difficulty -----------------------------------------------------------------
const HARD_LABELS = new Set(["inference", "not-stated", "implied-meaning", "graphic-info-synthesis", "double-triple-passage-synthesis", "three-speaker-role", "sentence-insertion-logic", "cross-paragraph-cause-effect", "indirect-response", "collocation-trap"]);
const EASY_LABELS = new Set(["photo-action", "wh-question", "detail-listening", "detail-reading", "speaker-setting"]);

function ruleDifficulty(q: TagInput, labels: string[], topic: string | null): Level {
  let score = q.part === "PART1" ? -1 : q.part === "PART7" ? 0.5 : 0;
  for (const l of labels) score += HARD_LABELS.has(l) ? 1 : EASY_LABELS.has(l) ? -0.5 : 0;
  if (topic && ["conditionals", "participles", "subject-verb-agreement", "relative-clause"].includes(topic)) score += 0.5;
  if (topic && ["prepositions", "pronouns", "nouns", "adverbs", "adjectives"].includes(topic)) score -= 0.5;
  if (words(q.prompt).length > 28) score += 0.5;
  if (q.passageLayout === "TRIPLE") score += 0.5;
  return score <= -0.75 ? "EASY" : score >= 1.25 ? "HARD" : "MEDIUM";
}

/**
 * Real answers outrank rules: with enough answers, a question is as hard as
 * learners actually found it (Bayesian-smoothed toward 60% right so a few
 * lucky guesses don't swing it).
 */
export const CALIBRATION_MIN_ANSWERS = 12;
export function calibrateDifficulty(answered: number, correct: number): Level | null {
  if (answered < CALIBRATION_MIN_ANSWERS) return null;
  const p = (correct + 0.6 * 6) / (answered + 6);
  return p >= 0.75 ? "EASY" : p < 0.45 ? "HARD" : "MEDIUM";
}

// --- entry point ------------------------------------------------------------------
export function tagQuestion(q: TagInput, knownWords: Set<string> = new Set()): TagResult {
  const reasons: string[] = [];
  let grammarTopicSlug: string | null = null;
  let labels: string[] = [];
  let kind: string | null = null;

  if (q.part === "PART5" || q.part === "PART6") {
    const opts = optionTexts(q);
    if (q.part === "PART6" && isSentenceOptions(opts)) {
      labels.push("sentence-insertion-logic");
      reasons.push("đáp án là cả câu — chọn câu điền vào đoạn");
    } else {
      const fromOptions = grammarFromOptions(q, reasons);
      kind = fromOptions.kind;
      const fromExplanation = grammarFromExplanation(q.explanationVi);
      grammarTopicSlug = fromOptions.topic ?? (kind === "vocabulary" ? null : fromExplanation);
      if (!fromOptions.topic && grammarTopicSlug) reasons.push(`lời giải nhắc tới chủ điểm ${grammarTopicSlug}`);
      if (kind === "word-form") labels.push("word-form-distractor");
      if (kind === "vocabulary") labels.push("collocation-trap");
      const lower = opts.map((o) => o.toLowerCase());
      if (q.part === "PART6" && lower.some((o) => CONNECTOR_PHRASES.includes(o) || ["however", "therefore", "moreover", "furthermore", "nevertheless", "meanwhile", "consequently", "otherwise", "instead", "additionally", "similarly", "likewise", "thus"].includes(o.replace(/,$/, "")))) {
        labels.push("connector-logic");
        grammarTopicSlug ??= "conjunctions";
        reasons.push("đáp án là từ nối giữa các câu");
      }
      // A plain grammar question (tense, preposition, pronoun…) has no trap
      // label of its own — give it the question-type one.
      if (labels.length === 0 && grammarTopicSlug) {
        labels.push("grammar-structure");
        reasons.push("câu ngữ pháp — chọn dạng/cấu trúc đúng");
      }
    }
  } else if (q.part === "PART1") labels = part1Labels(q, reasons);
  else if (q.part === "PART2") labels = part2Labels(q, reasons);
  else if (q.part === "PART3" || q.part === "PART4") labels = part34Labels(q, reasons);
  else labels = part7Labels(q, reasons);

  labels = [...new Set(labels)];
  return {
    grammarTopicSlug,
    strategicLabelSlugs: labels,
    vocabularyFocus: vocabularyFor(q, knownWords, kind),
    difficulty: ruleDifficulty(q, labels, grammarTopicSlug),
    reasons,
  };
}
