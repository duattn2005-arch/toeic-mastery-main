/**
 * Gợi ý trong lúc luyện tập — đọc từ chính câu hỏi (dạng câu, chủ điểm,
 * bài nghe/đoạn văn), không bao giờ nêu đáp án. Hai bước:
 *   1. Nhận diện dạng câu và cách tiếp cận (bậc Hiểu).
 *   2. Chỉ chỗ cần đọc/nghe: câu bằng chứng trong script, hoặc ngữ cảnh
 *      quanh chỗ trống (Part 5–6).
 * Mỗi bước mở thêm làm tăng hintUsedCount; câu đúng nhờ gợi ý chỉ được
 * HINT_CREDIT phần điểm (config.ts).
 */
import { classifyBloom, parseKnowledgeLabel, type BloomQuestionInput } from "./classify";
import { BLOOM_BY_ID, type BloomLevelId } from "./config";

export const HINT_STEPS = 2;

const GRAMMAR_TIP: Record<string, string> = {
  nouns: "Chỗ trống thường đứng sau mạo từ / tính từ / giới từ, hoặc làm chủ ngữ — xác định vị trí trước khi nhìn đáp án.",
  pronouns: "Xác định chỗ trống đóng vai chủ ngữ, tân ngữ hay sở hữu, rồi tìm danh từ mà đại từ thay thế.",
  adjectives: "Tính từ đứng trước danh từ hoặc sau động từ liên kết (be, become, seem…).",
  adverbs: "Trạng từ bổ nghĩa cho động từ, tính từ hoặc cả câu — xem từ ngay cạnh chỗ trống là loại từ gì.",
  prepositions: "Sau giới từ là danh từ / V-ing; trước một mệnh đề đầy đủ thì cần liên từ.",
  conjunctions: "Đếm số mệnh đề: nối hai mệnh đề cần liên từ; xét quan hệ ý (tương phản, nguyên nhân, điều kiện).",
  "verb-tense": "Tìm dấu hiệu thời gian (since, by the time, next week, already…) và chủ ngữ số ít/nhiều.",
  "passive-voice": "Chủ ngữ tự làm hành động hay bị tác động? Có tân ngữ theo sau động từ không?",
  gerund: "Một số động từ/giới từ bắt buộc theo sau là V-ing — xem từ đứng ngay trước chỗ trống.",
  infinitive: "Một số động từ/tính từ đi với to V; chỉ mục đích cũng dùng to V.",
  "relative-clause": "Xác định danh từ được bổ nghĩa là người hay vật, và đại từ quan hệ làm chủ ngữ hay tân ngữ.",
  conditionals: "Nhận diện loại câu điều kiện qua thì của mệnh đề if hoặc dạng đảo (Should/Had/Were…).",
  comparatives: "Có “than”, “the … of”, “as … as” không? Đó là dấu hiệu chọn dạng so sánh.",
  "subject-verb-agreement": "Tìm chủ ngữ THẬT (bỏ qua cụm giới từ chen giữa) rồi chia động từ theo nó.",
  participles: "V-ing mang nghĩa chủ động, V3/V-ed mang nghĩa bị động hoặc đã hoàn thành.",
};

const STRATEGY_TIP: Record<string, string> = {
  "photo-action": "Tranh có người: chú ý hành động đang diễn ra (is/are + V-ing) và vật họ đang cầm/chạm.",
  "photo-state-location": "Tranh đồ vật: chú ý vị trí và trạng thái (is placed, has been stacked, there is…).",
  "wh-question": "Nghe thật rõ từ để hỏi đầu câu — đáp án phải trả lời đúng loại thông tin đó (ai, ở đâu, khi nào…).",
  "yes-no-question": "Câu hỏi Yes/No: đáp án đúng có thể không có Yes/No mà trả lời thẳng vào nội dung.",
  "choice-question": "Câu hỏi lựa chọn (A or B): đáp án thường chọn một bên, cả hai, hoặc một phương án khác.",
  "request-suggestion": "Lời đề nghị/yêu cầu: đáp án hợp lý thường là đồng ý, từ chối kèm lý do, hoặc hỏi lại.",
  "statement-response": "Câu trần thuật: chọn phản hồi tự nhiên nhất, không phải câu lặp lại từ.",
  "indirect-response": "Đáp án đúng có thể trả lời gián tiếp (“Let me check”, “It depends…”) — loại đáp án lặp từ.",
  "detail-listening": "Gạch từ khóa trong câu hỏi; thông tin thường được nói lại bằng từ khác.",
  "speaker-setting": "Nghe các từ chỉ nghề nghiệp, nơi chốn, sản phẩm ngay ở đầu bài.",
  "next-action-request": "Hành động tiếp theo / lời đề nghị thường nằm ở CUỐI bài.",
  "main-topic-listening": "Chủ đề chính thường được nêu trong 1–2 câu đầu.",
  "speaker-purpose": "Mục đích bài nói thường được nêu ngay đầu bài (I'm calling to…, This is a reminder…).",
  "graphic-info-synthesis": "Đối chiếu thông tin trong bài với bảng/biểu đồ: đáp án là thứ trên hình, không phải điều được nói ra.",
  "three-speaker-role": "Phân biệt rõ ai nói câu nào — câu hỏi nhắm vào một người cụ thể.",
  "implied-meaning": "Xét câu được trích trong NGỮ CẢNH: người nói muốn ám chỉ điều gì, không phải nghĩa đen.",
  "phonetic-distractor-intent": "Cẩn thận đáp án có từ nghe giống trong bài — hiểu ý người nói, đừng bắt âm.",
  "connector-logic": "Đọc câu trước và sau chỗ trống, xác định quan hệ ý (bổ sung, tương phản, kết quả…).",
  "sentence-insertion-logic": "Tìm từ nối, đại từ (this, these, they) trong câu cần chèn trỏ ngược về ý nào trước đó.",
  "collocation-trap": "Câu từ vựng: 4 đáp án cùng từ loại — chọn từ kết hợp tự nhiên với từ đứng cạnh chỗ trống.",
  "word-form-distractor": "Các đáp án cùng họ từ: xác định chỗ trống cần loại từ nào trước khi chọn.",
  "grammar-structure": "Xác định cấu trúc câu quanh chỗ trống trước khi xem nghĩa đáp án.",
  "detail-reading": "Quét đoạn văn tìm từ khóa của câu hỏi; đáp án đúng thường là diễn đạt lại.",
  "vocabulary-in-context": "Đọc cả câu chứa từ được hỏi — nghĩa đúng là nghĩa trong NGỮ CẢNH đó.",
  "authors-purpose": "Mục đích văn bản thường nằm ở đoạn mở đầu hoặc câu chủ đề.",
  inference: "Câu suy luận: đáp án không có nguyên văn — tìm đoạn liên quan rồi chọn ý được suy ra hợp lý nhất.",
  "not-stated": "Câu NOT: đối chiếu TỪNG đáp án với bài, loại những gì được nhắc tới.",
  "cross-paragraph-cause-effect": "Tìm nguyên nhân/kết quả có thể nằm ở đoạn khác với đoạn chứa từ khóa.",
  "double-triple-passage-synthesis": "Câu này cần ghép thông tin từ HAI văn bản — tìm điểm chung (tên, ngày, mã số) giữa chúng.",
};

const PART_TIP: Record<string, string> = {
  PART1: "Nhìn tranh trước, tự gọi tên người, vật và hành động chính.",
  PART2: "Nghe kỹ 2–3 từ đầu câu hỏi.",
  PART3: "Đọc trước câu hỏi và gạch từ khóa.",
  PART4: "Đoán loại bài nói (thông báo, tin nhắn, quảng cáo) để biết thông tin xuất hiện theo thứ tự nào.",
  PART5: "Xác định câu hỏi ngữ pháp hay từ vựng trước khi đọc nghĩa đáp án.",
  PART6: "Đọc câu trước và sau chỗ trống.",
  PART7: "Đọc câu hỏi trước, rồi quét đoạn văn tìm từ khóa.",
};

const STOP = new Set("the a an and or but of to in on at by for from with as is are was were be been being has have had do does did will would can could may might must should this that these those it its they them their what which who whom whose when where why how not most likely according mentioned indicated stated suggested implied true about".split(" "));
const keyWords = (s: string) => new Set(s.toLowerCase().replace(/[^a-z' ]+/g, " ").split(/\s+/).filter((w) => w.length >= 4 && !STOP.has(w)));
const BLANK = /_{2,}|-{3,}|…{2,}|\(\s*\)|\[\s*\]/;

/** Câu trong bài nghe/đoạn văn gần với câu hỏi nhất. */
function bestSentence(source: string, prompt: string): string | null {
  const keys = keyWords(prompt);
  if (keys.size === 0) return null;
  const sentences = source
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+(?=[A-Z"“(])/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 12);
  let best: { s: string; hits: number } | null = null;
  for (const s of sentences) {
    const ws = keyWords(s);
    const hits = [...keys].filter((k) => ws.has(k)).length;
    if (hits > 0 && (!best || hits > best.hits)) best = { s, hits };
  }
  return best?.s ?? null;
}

/** Không đưa ra gợi ý chứa nguyên văn đáp án đúng. */
function leaksAnswer(text: string, q: BloomQuestionInput): boolean {
  const right = q.options.find((o) => o.label === q.correctLabel)?.content.trim().toLowerCase();
  if (!right || right.length < 3) return false;
  const t = text.toLowerCase();
  if (right.split(/\s+/).length <= 3) return new RegExp(`\\b${right.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(t);
  return t.includes(right);
}

export interface HintInput extends BloomQuestionInput {
  evidenceText: string | null;
  /** Bậc đã lưu (admin duyệt hoặc tự động); null → tự suy ra. */
  bloomLevel?: number | null;
  grammarTopicTitle?: string | null;
  strategyTitles?: Record<string, string>;
}

/** Nội dung gợi ý bước `step` (1-based). */
export function buildHint(q: HintInput, step: number): string {
  const classified = classifyBloom(q);
  const knowledgeLabel = classified.knowledgeLabel;
  const level = q.bloomLevel && q.bloomLevel >= 1 && q.bloomLevel <= 5 ? q.bloomLevel : classified.level;
  const { kind, key } = parseKnowledgeLabel(knowledgeLabel);

  if (step <= 1) {
    const bloom = BLOOM_BY_ID.get(level as BloomLevelId)!;
    let what: string;
    let tip: string;
    if (kind === "grammar") {
      what = `ngữ pháp — ${q.grammarTopicTitle ?? key}`;
      tip = GRAMMAR_TIP[key] ?? PART_TIP[q.part];
    } else if (kind === "vocab") {
      what = "từ vựng (chọn nghĩa / kết hợp từ)";
      tip = STRATEGY_TIP["collocation-trap"];
    } else if (kind === "strategy") {
      what = q.strategyTitles?.[key] ?? key;
      tip = STRATEGY_TIP[key] ?? PART_TIP[q.part];
    } else {
      what = q.part.replace("PART", "Part ");
      tip = PART_TIP[q.part];
    }
    return `Dạng câu: ${what} · bậc tư duy ${bloom.id} (${bloom.nameVi}). ${tip}`;
  }

  // Step 2 — point at the part of the script that matters.
  if (q.part === "PART5" || (q.part === "PART6" && !q.strategicLabelSlugs.includes("sentence-insertion-logic"))) {
    const text = q.prompt;
    const m = text.match(BLANK);
    if (m && m.index !== undefined) {
      const before = text.slice(0, m.index).trim().split(/\s+/).slice(-3).join(" ");
      const after = text.slice(m.index + m[0].length).trim().split(/\s+/).slice(0, 3).join(" ");
      return `Nhìn sát chỗ trống: “…${before} ____ ${after}…”. Từ ngay trước và ngay sau quyết định loại từ / cấu trúc cần điền.`;
    }
    return "Đọc lại cả câu, xác định chủ ngữ – động từ chính trước, rồi mới xét chỗ trống.";
  }

  if (q.part === "PART1") return "Loại ngay đáp án nhắc tới người/vật KHÔNG có trong tranh, và đáp án dùng sai hành động/trạng thái.";

  if (q.part === "PART2") {
    const line = (q.sourceText?.split(/\n/)[0] || q.prompt).replace(/^(q|question|m|w|man|woman)\s*[:.-]\s*/i, "").trim();
    const opener = line.split(/\s+/).slice(0, 3).join(" ");
    return opener ? `Câu hỏi bắt đầu bằng “${opener}…” — giữ đúng loại thông tin đó, loại đáp án chỉ lặp lại từ trong câu hỏi.` : PART_TIP.PART2;
  }

  const candidates = [q.evidenceText, q.sourceText ? bestSentence(q.sourceText, q.prompt) : null].filter((x): x is string => !!x && x.trim().length > 0);
  for (const c of candidates) {
    const snippet = c.trim().slice(0, 280);
    if (!leaksAnswer(snippet, q)) return `Thông tin nằm quanh đoạn: “${snippet}”. Đối chiếu từng đáp án với đoạn này — đáp án đúng thường được diễn đạt lại.`;
  }
  return `Tìm trong bài đoạn có từ khóa của câu hỏi (${[...keyWords(q.prompt)].slice(0, 4).join(", ") || "từ khóa chính"}) rồi đọc kỹ 1–2 câu quanh đó.`;
}
