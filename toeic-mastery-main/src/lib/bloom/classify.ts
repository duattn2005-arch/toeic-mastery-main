/**
 * Gắn bậc Bloom, nhãn chính và mã bẫy cho một câu hỏi — luật mặc định của
 * TOEIC Mastery (module thuần, không đụng DB; bộ gắn nhãn tự động
 * services/tagging/run.ts gọi các hàm này rồi ghi kết quả vào câu hỏi).
 *
 * Luật bậc (nhóm có thể chỉnh LABEL_LEVEL / PART_DEFAULT_LEVEL bên dưới):
 *  - Part 1, Part 2 dạng Wh/Yes-No/lựa chọn/đề nghị cơ bản → 2
 *  - Part 2 câu trả lời gián tiếp (phải suy ra ý) → 4
 *  - Part 5 câu từ vựng thuần nghĩa → 1; ngữ pháp → 2 nếu câu dễ, 3 nếu có
 *    ngữ cảnh / độ khó trung bình trở lên
 *  - Part 6 điền từ/ngữ pháp trong đoạn, từ nối → 3; chèn câu phù hợp ngữ cảnh → 4
 *  - Part 3, 4, 7 hỏi chi tiết → 2 (dễ) hoặc 3; ý chính → 3; suy luận, mục
 *    đích tác giả, NOT true, đoạn kép/ba, đọc biểu đồ, hội thoại 3 người → 4;
 *    “what does the speaker mean when…”, câu có ≥2 đáp án nhiễu cùng trường
 *    nghĩa với bài → 5
 *  - Một câu mang nhiều nhãn thì lấy bậc CAO NHẤT (câu đòi hỏi bậc tư duy đó).
 */
import type { ScoredBloomLevel, TrapType } from "./config";

export type QuestionPart = "PART1" | "PART2" | "PART3" | "PART4" | "PART5" | "PART6" | "PART7";

export interface BloomQuestionInput {
  part: QuestionPart;
  prompt: string;
  options: { label: string; content: string }[];
  correctLabel: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  grammarTopicSlug: string | null;
  strategicLabelSlugs: string[];
  passageLayout: "SINGLE" | "DOUBLE" | "TRIPLE" | null;
  /** Bài nghe (Part 1–4) hoặc nội dung đoạn văn (Part 6–7), nếu có. */
  sourceText: string | null;
}

/** Bậc của từng nhãn chiến lược (bậc tối thiểu câu mang nhãn đó đòi hỏi). */
export const LABEL_LEVEL: Record<string, ScoredBloomLevel | "detail"> = {
  // Part 1–2
  "photo-action": 2,
  "photo-state-location": 2,
  "wh-question": 2,
  "yes-no-question": 2,
  "choice-question": 2,
  "request-suggestion": 2,
  "statement-response": 2,
  "indirect-response": 4,
  // Part 3–4
  "detail-listening": "detail",
  "speaker-setting": "detail",
  "next-action-request": "detail",
  "main-topic-listening": 3,
  "speaker-purpose": 3,
  "graphic-info-synthesis": 4,
  "three-speaker-role": 4,
  "implied-meaning": 5,
  "phonetic-distractor-intent": 5,
  // Part 5–6
  "word-form-distractor": "detail",
  "grammar-structure": "detail",
  "collocation-trap": 1,
  "connector-logic": 3,
  "sentence-insertion-logic": 4,
  // Part 7
  "detail-reading": "detail",
  "vocabulary-in-context": 3,
  "authors-purpose": 4,
  inference: 4,
  "not-stated": 4,
  "cross-paragraph-cause-effect": 4,
  "double-triple-passage-synthesis": 4,
};

/** Bậc mặc định khi câu chưa có nhãn nào. */
export const PART_DEFAULT_LEVEL: Record<QuestionPart, ScoredBloomLevel> = { PART1: 2, PART2: 2, PART3: 3, PART4: 3, PART5: 2, PART6: 3, PART7: 3 };

/** Khóa nhãn chính dùng cho heatmap: "grammar:<slug>" | "strategy:<slug>" | "vocab" | "part:<PART>". */
export type KnowledgeLabel = string;

export const VOCAB_LABEL: KnowledgeLabel = "vocab";
export const partLabel = (part: string): KnowledgeLabel => `part:${part}`;
export const grammarLabel = (slug: string): KnowledgeLabel => `grammar:${slug}`;
export const strategyLabel = (slug: string): KnowledgeLabel => `strategy:${slug}`;

export function parseKnowledgeLabel(label: KnowledgeLabel): { kind: "grammar" | "strategy" | "vocab" | "part"; key: string } {
  if (label === VOCAB_LABEL) return { kind: "vocab", key: "vocab" };
  const i = label.indexOf(":");
  const kind = label.slice(0, i) as "grammar" | "strategy" | "part";
  return { kind, key: label.slice(i + 1) };
}

// --- word helpers ---------------------------------------------------------------
const STOP = new Set(
  "the a an and or but of to in on at by for from with as is are was were be been being has have had do does did will would can could may might must shall should this that these those it its they them their there here what which who whom whose when where why how not no yes than then so such very more most much many some any all each every other another into about over after before also just only even still your you our we us his her he she i me my one ones please would let lets get got going go".split(" ")
);
const contentWords = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z'\- ]+/g, " ")
    .split(/\s+/)
    .map((w) => w.replace(/^'+|'+$/g, ""))
    .filter((w) => w.length >= 3 && !STOP.has(w));

function stem(w: string): string {
  let s = w.toLowerCase().replace(/[^a-z]/g, "");
  for (const suf of ["ations", "ation", "ments", "ment", "ness", "ities", "ity", "ance", "ence", "ingly", "ively", "ive", "able", "ible", "ally", "ful", "ous", "less", "ical", "ers", "er", "ors", "or", "ies", "ied", "ing", "ed", "ly", "es", "s", "e", "y"]) {
    if (s.length - suf.length >= 4 && s.endsWith(suf)) {
      s = s.slice(0, -suf.length);
      break;
    }
  }
  return s.slice(0, 6);
}

const stems = (s: string) => new Set(contentWords(s).map(stem));
/** Share of the option's content words that also appear in the source. */
function overlap(option: string, source: Set<string>): { ratio: number; hits: number } {
  const ws = [...stems(option)];
  if (ws.length === 0) return { ratio: 0, hits: 0 };
  const hits = ws.filter((w) => source.has(w)).length;
  return { ratio: hits / ws.length, hits };
}

const isSingleWords = (opts: string[]) => opts.every((o) => o.trim().split(/\s+/).length <= 3);
/** decide/decision, produce/product — but not contract/control. */
const sameFamily = (a: string, b: string) => {
  const x = a.toLowerCase().replace(/[^a-z ]/g, "").split(" ").pop() ?? "";
  const y = b.toLowerCase().replace(/[^a-z ]/g, "").split(" ").pop() ?? "";
  if (x.length < 4 || y.length < 4) return false;
  if (stem(x) === stem(y)) return true;
  let common = 0;
  while (common < Math.min(x.length, y.length) && x[common] === y[common]) common++;
  return common >= Math.min(5, Math.min(x.length, y.length) - 2);
};

// --- trap typing -----------------------------------------------------------------

/**
 * Mã bẫy cho từng đáp án SAI (đáp án đúng luôn null). Chỉ dựa trên văn bản
 * của câu — không đoán khi không đủ căn cứ (trả null).
 */
export function classifyTraps(q: BloomQuestionInput): Record<string, TrapType | null> {
  const out: Record<string, TrapType | null> = {};
  const opts = q.options.filter((o) => o.content.trim() && !/^\(?[a-d]\)?\.?$/i.test(o.content.trim()));
  for (const o of q.options) out[o.label] = null;
  const right = opts.find((o) => o.label === q.correctLabel);
  if (!right || opts.length < 3) return out;
  const wrong = opts.filter((o) => o.label !== q.correctLabel);

  if (q.part === "PART5" || (q.part === "PART6" && isSingleWords(opts.map((o) => o.content)))) {
    for (const o of wrong) out[o.label] = sameFamily(o.content, right.content) ? "grammatically_plausible" : isSingleWords([o.content]) ? "similar_meaning" : null;
    return out;
  }

  if (q.part === "PART1") {
    // A wrong description naming the same things as the right one, with the wrong action/state.
    const rightStems = stems(right.content);
    for (const o of wrong) if (overlap(o.content, rightStems).hits >= 1) out[o.label] = "same_word_trap";
    return out;
  }

  if (q.part === "PART2") {
    const question = (q.sourceText?.split(/\n/)[0] || q.prompt).replace(/^(q|question|m|w|man|woman)\s*[:.-]\s*/i, "");
    const qStems = stems(question);
    const qWords = contentWords(question);
    for (const o of wrong) {
      if (overlap(o.content, qStems).hits >= 1) out[o.label] = "same_word_trap";
      else if (contentWords(o.content).some((w) => qWords.some((x) => x !== w && x.length >= 4 && w.length >= 4 && x.slice(0, 3) === w.slice(0, 3) && stem(x) !== stem(w))))
        out[o.label] = "sound_alike";
    }
    return out;
  }

  // Part 3, 4, 6 (sentence options), 7: against the conversation/passage.
  if (!q.sourceText) return out;
  if (/\bNOT\b/.test(q.prompt)) return out; // wrong options of a NOT question are, by design, stated
  const src = stems(q.sourceText);
  const rightOverlap = overlap(right.content, src).ratio;
  for (const o of wrong) {
    const { ratio, hits } = overlap(o.content, src);
    if (hits === 0) out[o.label] = "not_stated";
    else if (ratio >= 0.6 && rightOverlap < 0.35) out[o.label] = "paraphrase_miss";
    else if (hits >= 1 && ratio >= rightOverlap) out[o.label] = "same_word_trap";
  }
  return out;
}

// --- Bloom level -----------------------------------------------------------------

export interface BloomClassification {
  level: ScoredBloomLevel;
  /** Nhãn chính — mỗi câu chỉ được đếm vào đúng một ô của heatmap. */
  knowledgeLabel: KnowledgeLabel;
  reasons: string[];
}

const isVocabularyQuestion = (q: BloomQuestionInput) =>
  (q.part === "PART5" || q.part === "PART6") && !q.grammarTopicSlug && q.strategicLabelSlugs.includes("collocation-trap");

export function classifyBloom(q: BloomQuestionInput, traps?: Record<string, TrapType | null>): BloomClassification {
  const reasons: string[] = [];
  const detailLevel: ScoredBloomLevel = q.difficulty === "EASY" ? 2 : 3;
  const levelOf = (slug: string): ScoredBloomLevel | null => {
    const v = LABEL_LEVEL[slug];
    if (v === undefined) return null;
    return v === "detail" ? detailLevel : v;
  };

  // Part 5 / 6 blanks: vocabulary vs grammar.
  if (q.part === "PART5" || q.part === "PART6") {
    const labelLevels = q.strategicLabelSlugs.map((s) => ({ s, l: levelOf(s) })).filter((x): x is { s: string; l: ScoredBloomLevel } => x.l !== null);
    const sentenceOrConnector = labelLevels.filter((x) => x.s === "sentence-insertion-logic" || x.s === "connector-logic").sort((a, b) => b.l - a.l)[0];
    if (sentenceOrConnector) {
      reasons.push(sentenceOrConnector.s === "sentence-insertion-logic" ? "chèn câu phù hợp ngữ cảnh → 4" : "liên kết câu bằng từ nối → 3");
      return { level: sentenceOrConnector.l, knowledgeLabel: strategyLabel(sentenceOrConnector.s), reasons };
    }
    if (isVocabularyQuestion(q)) {
      const level: ScoredBloomLevel = q.part === "PART6" ? 3 : 1;
      reasons.push(q.part === "PART6" ? "chọn từ theo ngữ cảnh đoạn văn → 3" : "câu từ vựng thuần nghĩa → 1");
      return { level, knowledgeLabel: VOCAB_LABEL, reasons };
    }
    if (q.grammarTopicSlug) {
      const level: ScoredBloomLevel = q.part === "PART6" ? 3 : detailLevel;
      reasons.push(q.part === "PART6" ? "ngữ pháp trong đoạn văn → 3" : level === 2 ? "ngữ pháp, câu dễ → 2" : "ngữ pháp có ngữ cảnh / độ khó trung bình trở lên → 3");
      return { level, knowledgeLabel: grammarLabel(q.grammarTopicSlug), reasons };
    }
  }

  let best: { slug: string; level: ScoredBloomLevel } | null = null;
  for (const slug of q.strategicLabelSlugs) {
    const l = levelOf(slug);
    if (l !== null && (!best || l > best.level)) best = { slug, level: l };
  }
  let level: ScoredBloomLevel = best?.level ?? PART_DEFAULT_LEVEL[q.part];
  if (best) reasons.push(`nhãn ${best.slug} → ${best.level}`);
  else reasons.push(`mặc định ${q.part} → ${level}`);

  if (q.part === "PART7" && (q.passageLayout === "DOUBLE" || q.passageLayout === "TRIPLE") && level < 4) {
    level = 4;
    reasons.push("đoạn kép/ba → 4");
  }

  // ≥2 distractors lifted from the same text (same semantic field) on a
  // question that already needs main-idea/inference thinking → Evaluate.
  if ((q.part === "PART3" || q.part === "PART4" || q.part === "PART7") && level >= 3 && level < 5 && traps) {
    const plausible = Object.values(traps).filter((t) => t === "same_word_trap" || t === "paraphrase_miss").length;
    if (plausible >= 2) {
      level = 5;
      reasons.push(`${plausible} đáp án nhiễu cùng trường nghĩa với bài → 5`);
    }
  }

  const knowledgeLabel = best ? strategyLabel(best.slug) : q.strategicLabelSlugs[0] ? strategyLabel(q.strategicLabelSlugs[0]) : partLabel(q.part);
  return { level, knowledgeLabel, reasons };
}

/**
 * Nhãn chính của một câu khi chỉ cần nhãn (không cần bậc) — cùng thứ tự ưu
 * tiên với classifyBloom: chủ điểm ngữ pháp (Part 5/6) > từ vựng > nhãn
 * chiến lược quyết định bậc > Part.
 */
export function knowledgeLabelOf(q: BloomQuestionInput): KnowledgeLabel {
  return classifyBloom(q).knowledgeLabel;
}
