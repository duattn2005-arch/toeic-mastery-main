/**
 * Cấp A "nhãn chiến lược" (StrategicLabel) taxonomy — see docs/ai-mentor-
 * architecture.md section 11.2 điểm 2. Proposed from the spec's own worked
 * examples (inference, author's purpose, NOT stated, three-speaker
 * conversation, double/triple passage synthesis, phonetic-distractor
 * intent questions...), mapped onto the Parts that actually carry each
 * question style in a real TOEIC test. Deliberately about DECISION
 * STRATEGY, not grammar/vocabulary knowledge — that's what GrammarTopic
 * already covers (a Part 5/6/7 question can carry both a grammarTopicSlug
 * AND one or more of these, since Question.strategicLabelSlugs is a
 * separate array field).
 *
 * Every question in the bank is tagged with these automatically by the
 * rule-based labeller (src/lib/services/tagging) — on every deploy, daily,
 * and whenever an admin saves a question — so every Part carries at least
 * one question-type label. The "question type" labels at the end of the
 * list (photo-action, wh-question, detail-reading…) give Part 1/2 and plain
 * detail questions a label too, so the competency map covers the whole
 * test, not just the inference-style questions. Labels an admin sets by
 * hand are never overwritten.
 */
export interface StrategicLabelSeed {
  slug: string;
  title: string;
  category: string;
  appliesToParts: ("PART1" | "PART2" | "PART3" | "PART4" | "PART5" | "PART6" | "PART7")[];
}

export const STRATEGIC_LABELS: StrategicLabelSeed[] = [
  {
    slug: "indirect-response",
    title: "Câu trả lời gián tiếp (không lặp từ khóa câu hỏi)",
    category: "Listening — suy luận",
    appliesToParts: ["PART2", "PART3"],
  },
  {
    slug: "phonetic-distractor-intent",
    title: "Câu hỏi ý định người nói với đáp án nhiễu cùng âm/từ",
    category: "Listening — suy luận",
    appliesToParts: ["PART3", "PART4"],
  },
  {
    slug: "three-speaker-role",
    title: "Hội thoại ba người — phân biệt vai trò/quan điểm từng người nói",
    category: "Listening — suy luận",
    appliesToParts: ["PART3"],
  },
  {
    slug: "implied-meaning",
    title: "Suy luận hàm ý câu nói (what does the speaker imply/mean)",
    category: "Listening — suy luận",
    appliesToParts: ["PART3", "PART4"],
  },
  {
    slug: "speaker-purpose",
    title: "Mục đích người nói/đoạn thông báo (purpose of the talk)",
    category: "Listening — suy luận",
    appliesToParts: ["PART4"],
  },
  {
    slug: "graphic-info-synthesis",
    title: "Kết hợp lời thoại với thông tin đồ họa kèm theo (graphic prompt)",
    category: "Listening — suy luận",
    appliesToParts: ["PART3", "PART4"],
  },
  {
    slug: "word-form-distractor",
    title: "Đáp án nhiễu cùng họ từ (word family) khác từ loại cần điền",
    category: "Reading — loại suy đáp án nhiễu",
    appliesToParts: ["PART5"],
  },
  {
    slug: "collocation-trap",
    title: "Đáp án nhiễu đúng ngữ pháp nhưng sai collocation/ngữ cảnh",
    category: "Reading — loại suy đáp án nhiễu",
    appliesToParts: ["PART5", "PART6"],
  },
  {
    slug: "sentence-insertion-logic",
    title: "Chọn câu điền vào chỗ trống dựa trên mạch logic đoạn văn",
    category: "Reading — mạch logic đoạn văn",
    appliesToParts: ["PART6", "PART7"],
  },
  {
    slug: "connector-logic",
    title: "Từ nối chuyển ý giữa các câu (liên từ, trạng từ liên kết)",
    category: "Reading — mạch logic đoạn văn",
    appliesToParts: ["PART6"],
  },
  {
    slug: "inference",
    title: "Suy luận (inference) — kết luận không nêu trực tiếp trong văn bản",
    category: "Reading — suy luận",
    appliesToParts: ["PART7"],
  },
  {
    slug: "not-stated",
    title: "NOT/TRUE stated — loại đáp án không được văn bản xác nhận",
    category: "Reading — suy luận",
    appliesToParts: ["PART7"],
  },
  {
    slug: "authors-purpose",
    title: "Mục đích tác giả (why was this written/mentioned)",
    category: "Reading — suy luận",
    appliesToParts: ["PART7"],
  },
  {
    slug: "cross-paragraph-cause-effect",
    title: "Quan hệ nhân quả giữa hai đoạn/hai câu cách xa nhau",
    category: "Reading — suy luận",
    appliesToParts: ["PART7"],
  },
  {
    slug: "vocabulary-in-context",
    title: "Nghĩa của từ trong ngữ cảnh (the word 'X' means)",
    category: "Reading — suy luận",
    appliesToParts: ["PART7"],
  },
  {
    slug: "double-triple-passage-synthesis",
    title: "Tổng hợp thông tin từ 2-3 văn bản để trả lời 1 câu hỏi",
    category: "Reading — suy luận",
    appliesToParts: ["PART7"],
  },
  // --- Question types (every remaining question gets one of these) ---------
  { slug: "photo-action", title: "Tranh có người — mô tả hành động đang làm", category: "Listening — dạng câu hỏi", appliesToParts: ["PART1"] },
  { slug: "photo-state-location", title: "Tranh đồ vật — trạng thái/vị trí (bị động, there is…)", category: "Listening — dạng câu hỏi", appliesToParts: ["PART1"] },
  { slug: "wh-question", title: "Câu hỏi Wh- (Who/What/When/Where/Why/How)", category: "Listening — dạng câu hỏi", appliesToParts: ["PART2"] },
  { slug: "yes-no-question", title: "Câu hỏi Yes/No, câu hỏi đuôi, câu hỏi phủ định", category: "Listening — dạng câu hỏi", appliesToParts: ["PART2"] },
  { slug: "choice-question", title: "Câu hỏi lựa chọn (… or …)", category: "Listening — dạng câu hỏi", appliesToParts: ["PART2"] },
  { slug: "request-suggestion", title: "Lời yêu cầu, đề nghị, gợi ý (Could you…, Why don't…)", category: "Listening — dạng câu hỏi", appliesToParts: ["PART2"] },
  { slug: "statement-response", title: "Câu trần thuật — chọn phản hồi phù hợp", category: "Listening — dạng câu hỏi", appliesToParts: ["PART2"] },
  { slug: "main-topic-listening", title: "Chủ đề / vấn đề chính của hội thoại", category: "Listening — dạng câu hỏi", appliesToParts: ["PART3"] },
  { slug: "speaker-setting", title: "Người nói là ai, làm ở đâu, bối cảnh", category: "Listening — dạng câu hỏi", appliesToParts: ["PART3", "PART4"] },
  { slug: "next-action-request", title: "Hành động tiếp theo, yêu cầu, đề nghị của người nói", category: "Listening — dạng câu hỏi", appliesToParts: ["PART3", "PART4"] },
  { slug: "detail-listening", title: "Thông tin chi tiết trong bài nghe (thời gian, số liệu, lý do…)", category: "Listening — dạng câu hỏi", appliesToParts: ["PART3", "PART4"] },
  { slug: "detail-reading", title: "Thông tin chi tiết — dò tìm dữ kiện trong văn bản", category: "Reading — dạng câu hỏi", appliesToParts: ["PART7"] },
  { slug: "grammar-structure", title: "Ngữ pháp — chọn dạng/cấu trúc đúng (thì, giới từ, liên từ, đại từ…)", category: "Reading — dạng câu hỏi", appliesToParts: ["PART5", "PART6"] },
];
