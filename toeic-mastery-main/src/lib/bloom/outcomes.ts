/**
 * MỤC TIÊU — CHUẨN ĐẦU RA — CHỈ BÁO của chương trình luyện TOEIC Mastery
 * (hàm thuần, không DB). Theo "Hướng dẫn về Chuẩn đầu ra" (LYDINC/PTIT 2024):
 *
 *  A/B. Mục tiêu chương trình (PEO): một mục tiêu chung + các mục tiêu cụ thể
 *       theo 4 trụ cột UNESCO — điều người học làm được SAU khóa học.
 *  C.   Chuẩn đầu ra (PLO/ELO): phát biểu theo cấu trúc A-B-C-D, đáp ứng
 *       S-M-A-R-T, MỘT động từ thang Bloom ở một miền + một bậc.
 *  D.   Chỉ báo (PI) = động từ Bloom + nội dung, kèm cách đánh giá; mỗi chỉ
 *       báo trỏ vào dữ liệu thật (ô nhãn × bậc của heatmap, hành vi ra quyết
 *       định, thang kỹ năng / thái độ, sản phẩm bậc Sáng tạo).
 *  E.   Rubric 5 mức (rubric.ts) cho từng chỉ báo và chuẩn đầu ra.
 *  F.   Checklist kiểm tra sự phù hợp — checkOutcome() chạy tự động.
 *
 * Nhóm chỉnh nội dung ở đây (giống config.ts); trang Đề cương, tab Chuẩn đầu
 * ra của trang Phân tích và trang quản trị đều đọc từ file này.
 */
import { BLOOM_BY_ID, EVALUATE_MAX_RIGHT_TO_WRONG_SHARE, MIN_ATTEMPTS_PER_CELL, type ScoredBloomLevel, type Tier } from "./config";
import {
  AFFECTIVE_LEVELS,
  COGNITIVE_LEVELS,
  DOMAIN_LEVELS,
  PSYCHOMOTOR_LEVELS,
  affectiveLadder,
  createCriteria,
  psychomotorLadder,
  type AffectiveSignals,
  type CreateCriterion,
  type CreateSignals,
  type Domain,
  type LadderResult,
  type PacingStats,
} from "./domains";
import type { BloomProfile, CellResult } from "./engine";
import { RUBRIC_PASS_LEVEL, rubricFromLadder, rubricLevelOf, rubricTrend, type RubricLevel, type RubricTrend } from "./rubric";

export type OutcomeTier = Exclude<Tier, "OUTPUT">;

export const TIER_NAME: Record<OutcomeTier, string> = { B: "Nền tảng (Beginner)", I: "Trung cấp (Intermediate)", A: "Nâng cao (Advanced)" };

// ---------------------------------------------------------------------------
// A/B. Mục tiêu chương trình (PEO) — 4 trụ cột UNESCO
// ---------------------------------------------------------------------------

export type Pillar = "know" | "be" | "live" | "do";

export const PILLAR_LABEL: Record<Pillar, { nameVi: string; nameEn: string }> = {
  know: { nameVi: "Học để biết", nameEn: "Learning to know" },
  be: { nameVi: "Học để trưởng thành", nameEn: "Learning to be" },
  live: { nameVi: "Học để chung sống", nameEn: "Learning to live together" },
  do: { nameVi: "Học để làm", nameEn: "Learning to do" },
};

/** Mục tiêu chung (50–100 từ): điều người học đạt được trong 1–3 năm sau khóa học. */
export const PROGRAM_GOAL =
  "Chương trình TOEIC Mastery chuẩn bị cho người học năng lực tiếng Anh Nghe – Đọc trong môi trường làm việc quốc tế, " +
  "đạt điểm TOEIC phù hợp yêu cầu tốt nghiệp và tuyển dụng, đồng thời hình thành phương pháp tự học có kế hoạch, " +
  "thói quen học đều đặn và trung thực, để sau khóa học người học tiếp tục sử dụng tiếng Anh hiệu quả khi đọc tài liệu, " +
  "trao đổi công việc và học tập suốt đời.";

export interface ProgramObjective {
  code: string;
  pillar: Pillar;
  statement: string;
}

export const PROGRAM_OBJECTIVES: readonly ProgramObjective[] = [
  { code: "PO1", pillar: "know", statement: "Có nền tảng từ vựng và ngữ pháp tiếng Anh thương mại vững chắc để tiếp tục tự học, đọc hiểu tài liệu chuyên môn trong suốt quá trình làm việc." },
  { code: "PO2", pillar: "do", statement: "Sử dụng được tiếng Anh Nghe – Đọc để hoàn thành công việc văn phòng quốc tế: đọc email, thông báo, hợp đồng, nghe họp và trao đổi qua điện thoại; đạt mức điểm TOEIC theo yêu cầu đầu ra và tuyển dụng." },
  { code: "PO3", pillar: "be", statement: "Tự chủ trong học tập: tự đánh giá năng lực, tự lập và điều chỉnh kế hoạch ôn luyện, ra quyết định dựa trên bằng chứng." },
  { code: "PO4", pillar: "live", statement: "Có thái độ học tập tích cực, đều đặn và trung thực; tôn trọng chuẩn mực giao tiếp trong môi trường làm việc đa văn hóa." },
];

/**
 * Checklist kiểm tra sự phù hợp của mục tiêu (mục F.1, theo Thông tư 17/2021).
 * Đây là phán đoán của nhóm thiết kế, ghi kèm bằng chứng trong chương trình.
 */
export const OBJECTIVE_CHECKLIST: readonly { criterion: string; evidence: string; met: boolean }[] = [
  { criterion: "Nêu rõ kỳ vọng về năng lực và triển vọng nghề nghiệp của người học sau chương trình", evidence: "PO2 nêu công việc văn phòng quốc tế và mức điểm cho tuyển dụng; mục tiêu chung nêu môi trường làm việc quốc tế.", met: true },
  { criterion: "Thể hiện định hướng đào tạo (ứng dụng / nghề nghiệp), đáp ứng nhu cầu nhà tuyển dụng và các bên liên quan", evidence: "Định hướng ứng dụng: luyện theo đúng cấu trúc đề TOEIC Nghe – Đọc mà doanh nghiệp và trường đại học dùng làm chuẩn đầu ra ngoại ngữ.", met: true },
  { criterion: "Phù hợp, gắn kết với sứ mạng, tầm nhìn của đơn vị và nhu cầu xã hội", evidence: "Sứ mạng: giúp người học Việt Nam đạt chuẩn tiếng Anh nghề nghiệp bằng phân tích năng lực theo thang Bloom.", met: true },
  { criterion: "Phù hợp mục tiêu giáo dục và mô tả trình độ theo Khung trình độ quốc gia / Khung năng lực ngoại ngữ", evidence: "Ba cấp B – I – A tương ứng các dải điểm TOEIC và bậc năng lực ngoại ngữ 6 bậc dùng cho Việt Nam (bậc 2 – 4).", met: true },
];

// ---------------------------------------------------------------------------
// C/D. Chuẩn đầu ra + chỉ báo
// ---------------------------------------------------------------------------

/** Cách một chỉ báo được đo từ dữ liệu. */
export type IndicatorMeasure =
  /** Điểm các ô nhãn × bậc của heatmap Bloom. Nhãn kết thúc bằng ":" là tiền tố (vd. "grammar:" = mọi chủ điểm ngữ pháp). */
  | { kind: "cells"; level: ScoredBloomLevel; labels: string[] }
  /** Bậc 5: tỷ lệ đổi đáp án từ đúng sang sai ở câu bậc 4–5. */
  | { kind: "decision" }
  /** Thang kỹ năng làm bài (Dave) — bậc yêu cầu. */
  | { kind: "psychomotor"; target: number }
  /** Thang thái độ (Krathwohl) — bậc yêu cầu. */
  | { kind: "affective"; target: number }
  /** Bậc 6 — sản phẩm kế hoạch tự xây, chấm bằng rubric tiêu chí. */
  | { kind: "create" };

export interface Indicator {
  code: string;
  /** Động từ Bloom (một động từ). */
  verb: string;
  /** Nội dung (danh từ / ngữ cảnh). */
  content: string;
  /** Cách đánh giá chỉ báo. */
  assessment: string;
  measure: IndicatorMeasure;
}

export interface LearningOutcome {
  code: string;
  tier: OutcomeTier;
  domain: Domain;
  /** Bậc trong miền (nhận thức 1–6, kỹ năng 1–5, thái độ 1–5). */
  level: number;
  /** A — đối tượng. */
  audience: string;
  /** B — một động từ hành vi thuộc miền + bậc trên. */
  verb: string;
  /** C — nội dung. */
  content: string;
  /** D — mức độ (có tiêu chí đo được). */
  degree: string;
  /** T — mốc thời gian hoàn thành (S-M-A-R-T). */
  timeBound: string;
  /** Mục tiêu chương trình mà chuẩn đầu ra này đóng góp. */
  objectives: string[];
  indicators: Indicator[];
}

const LEARNER = "người học";
const AFTER: Record<OutcomeTier, string> = {
  B: "Sau khi hoàn thành cấp Nền tảng (khoảng 4–6 tuần)",
  I: "Sau khi hoàn thành cấp Trung cấp (khoảng 6–8 tuần)",
  A: "Sau khi hoàn thành cấp Nâng cao (khoảng 8–10 tuần)",
};
const PASS = "với độ chính xác từ 80% trở lên";
const CELL_ASSESS = (what: string) => `Bộ câu ${what} trong ngân hàng (≥ ${MIN_ATTEMPTS_PER_CELL} câu khác nhau, chấm trên 20 câu gần nhất, đã lọc đoán mò / xem đáp án trước)`;

export const LEARNING_OUTCOMES: readonly LearningOutcome[] = [
  // ---- Cấp B --------------------------------------------------------------
  {
    code: "CĐR1", tier: "B", domain: "cognitive", level: 1, audience: LEARNER, verb: "nhận biết",
    content: "nghĩa và cách kết hợp của từ vựng TOEIC cốt lõi", degree: PASS, timeBound: AFTER.B, objectives: ["PO1"],
    indicators: [
      { code: "CĐR1.1", verb: "nhớ lại", content: "nghĩa của từ trong thẻ ôn tập ngắt quãng", assessment: "Flashcard SM-2: tỷ lệ nhớ đúng khi ôn", measure: { kind: "cells", level: 1, labels: ["vocab"] } },
      { code: "CĐR1.2", verb: "nhận ra", content: "cụm từ kết hợp (collocation) đúng trong câu Part 5", assessment: CELL_ASSESS("Part 5 nhãn collocation"), measure: { kind: "cells", level: 1, labels: ["strategy:collocation-trap", "part:PART5"] } },
    ],
  },
  {
    code: "CĐR2", tier: "B", domain: "cognitive", level: 2, audience: LEARNER, verb: "giải thích",
    content: "điểm ngữ pháp được kiểm tra trong câu Part 5 cơ bản", degree: PASS, timeBound: AFTER.B, objectives: ["PO1"],
    indicators: [
      { code: "CĐR2.1", verb: "phân loại", content: "từ loại và cấu trúc câu cần điền", assessment: CELL_ASSESS("ngữ pháp bậc Hiểu"), measure: { kind: "cells", level: 2, labels: ["grammar:", "strategy:word-form-distractor", "strategy:grammar-structure"] } },
    ],
  },
  {
    code: "CĐR3", tier: "B", domain: "cognitive", level: 2, audience: LEARNER, verb: "diễn giải",
    content: "thông tin nghe trực tiếp trong mô tả tranh và hỏi – đáp ngắn (Part 1–2)", degree: PASS, timeBound: AFTER.B, objectives: ["PO2"],
    indicators: [
      { code: "CĐR3.1", verb: "mô tả", content: "hành động và trạng thái trong tranh Part 1", assessment: CELL_ASSESS("Part 1"), measure: { kind: "cells", level: 2, labels: ["strategy:photo-action", "strategy:photo-state-location", "part:PART1"] } },
      { code: "CĐR3.2", verb: "xác định", content: "câu đáp phù hợp cho câu hỏi Wh-, Yes/No, lựa chọn, đề nghị ở Part 2", assessment: CELL_ASSESS("Part 2 dạng cơ bản"), measure: { kind: "cells", level: 2, labels: ["strategy:wh-question", "strategy:yes-no-question", "strategy:choice-question", "strategy:request-suggestion", "strategy:statement-response", "part:PART2"] } },
    ],
  },
  {
    code: "CĐR4", tier: "B", domain: "affective", level: 2, audience: LEARNER, verb: "tham gia",
    content: "việc học đều đặn và xem lại giải thích khi làm sai", degree: "ở ít nhất 8 ngày trong 30 ngày gần nhất", timeBound: AFTER.B, objectives: ["PO4"],
    indicators: [
      { code: "CĐR4.1", verb: "tham gia", content: "học tập đều đặn và chú ý giải thích (bậc Hồi đáp của miền thái độ)", assessment: "Lượt xem giải thích trên câu sai; số ngày có phiên học trong 30 ngày", measure: { kind: "affective", target: 2 } },
    ],
  },
  {
    code: "CĐR5", tier: "B", domain: "psychomotor", level: 2, audience: LEARNER, verb: "thực hiện",
    content: "quy trình làm bài theo từng Part trong điều kiện có tính giờ", degree: "trên ít nhất 20 câu có giờ", timeBound: AFTER.B, objectives: ["PO2"],
    indicators: [
      { code: "CĐR5.1", verb: "thực hiện", content: "bài luyện theo Part có tính giờ (bậc Vận dụng của miền kỹ năng)", assessment: "Quan sát chế độ làm bài và thời gian từng câu", measure: { kind: "psychomotor", target: 2 } },
    ],
  },

  // ---- Cấp I --------------------------------------------------------------
  {
    code: "CĐR6", tier: "I", domain: "cognitive", level: 3, audience: LEARNER, verb: "vận dụng",
    content: "quy tắc ngữ pháp và từ nối để hoàn thành câu, đoạn văn có ngữ cảnh (Part 5–6)", degree: `${PASS}, trong đó ít nhất 30% câu làm có tính giờ`, timeBound: AFTER.I, objectives: ["PO1", "PO2"],
    indicators: [
      { code: "CĐR6.1", verb: "áp dụng", content: "quy tắc ngữ pháp vào câu Part 5 có ngữ cảnh", assessment: CELL_ASSESS("ngữ pháp bậc Vận dụng"), measure: { kind: "cells", level: 3, labels: ["grammar:", "strategy:grammar-structure", "strategy:word-form-distractor", "part:PART5"] } },
      { code: "CĐR6.2", verb: "sử dụng", content: "từ nối và quan hệ logic giữa các câu trong đoạn Part 6", assessment: CELL_ASSESS("Part 6 từ nối"), measure: { kind: "cells", level: 3, labels: ["strategy:connector-logic", "part:PART6"] } },
    ],
  },
  {
    code: "CĐR7", tier: "I", domain: "cognitive", level: 3, audience: LEARNER, verb: "vận dụng",
    content: "kỹ năng nghe ý chính và mục đích người nói trong hội thoại, bài nói (Part 3–4)", degree: PASS, timeBound: AFTER.I, objectives: ["PO2"],
    indicators: [
      { code: "CĐR7.1", verb: "xác định", content: "chủ đề và mục đích của hội thoại / bài nói", assessment: CELL_ASSESS("Part 3–4 ý chính"), measure: { kind: "cells", level: 3, labels: ["strategy:main-topic-listening", "strategy:speaker-purpose", "part:PART3", "part:PART4"] } },
      { code: "CĐR7.2", verb: "giải quyết", content: "câu hỏi chi tiết, địa điểm, hành động tiếp theo ở Part 3–4", assessment: CELL_ASSESS("Part 3–4 chi tiết"), measure: { kind: "cells", level: 3, labels: ["strategy:detail-listening", "strategy:speaker-setting", "strategy:next-action-request"] } },
    ],
  },
  {
    code: "CĐR8", tier: "I", domain: "cognitive", level: 3, audience: LEARNER, verb: "vận dụng",
    content: "từ vựng theo ngữ cảnh và kỹ năng tìm thông tin chi tiết trong bài đọc đơn (Part 7)", degree: PASS, timeBound: AFTER.I, objectives: ["PO1", "PO2"],
    indicators: [
      { code: "CĐR8.1", verb: "sử dụng", content: "ngữ cảnh để chọn nghĩa đúng của từ trong bài đọc", assessment: CELL_ASSESS("Part 7 từ trong ngữ cảnh"), measure: { kind: "cells", level: 3, labels: ["strategy:vocabulary-in-context"] } },
      { code: "CĐR8.2", verb: "giải quyết", content: "câu hỏi chi tiết trong email, thông báo, quảng cáo", assessment: CELL_ASSESS("Part 7 chi tiết"), measure: { kind: "cells", level: 3, labels: ["strategy:detail-reading", "part:PART7"] } },
    ],
  },
  {
    code: "CĐR9", tier: "I", domain: "affective", level: 3, audience: LEARNER, verb: "chủ động",
    content: "làm lại các câu đã sai để sửa lỗi", degree: "với ít nhất 20 câu (hoặc 30% số câu sai)", timeBound: AFTER.I, objectives: ["PO3", "PO4"],
    indicators: [
      { code: "CĐR9.1", verb: "coi trọng", content: "việc sửa lỗi sai qua Ôn lỗi sai (bậc Tỏ thái độ)", assessment: "Số câu làm lại trong Ôn lỗi sai so với số câu sai", measure: { kind: "affective", target: 3 } },
    ],
  },
  {
    code: "CĐR10", tier: "I", domain: "psychomotor", level: 3, audience: LEARNER, verb: "tinh chỉnh",
    content: "nhịp làm bài phần Đọc theo thời gian chuẩn của từng Part", degree: "với ít nhất 70% câu xong đúng nhịp và đoán mò không quá 5%", timeBound: AFTER.I, objectives: ["PO2"],
    indicators: [
      { code: "CĐR10.1", verb: "hoàn thiện", content: "nhịp làm câu Đọc (Part 5: 25 giây, Part 6: 35 giây, Part 7: 60 giây)", assessment: "Thời gian làm từng câu Đọc có tính giờ", measure: { kind: "psychomotor", target: 3 } },
    ],
  },

  // ---- Cấp A --------------------------------------------------------------
  {
    code: "CĐR11", tier: "A", domain: "cognitive", level: 4, audience: LEARNER, verb: "phân tích",
    content: "thông tin xuyên đoạn trong bài đọc đơn, kép và ba để suy luận, loại trừ (Part 6–7)", degree: PASS, timeBound: AFTER.A, objectives: ["PO2", "PO3"],
    indicators: [
      { code: "CĐR11.1", verb: "suy luận", content: "ý ngầm, mục đích tác giả và thông tin không được nêu (NOT true)", assessment: CELL_ASSESS("Part 7 suy luận"), measure: { kind: "cells", level: 4, labels: ["strategy:inference", "strategy:authors-purpose", "strategy:not-stated", "strategy:cross-paragraph-cause-effect"] } },
      { code: "CĐR11.2", verb: "đối chiếu", content: "thông tin giữa các văn bản trong đoạn kép / ba", assessment: CELL_ASSESS("đoạn kép / ba"), measure: { kind: "cells", level: 4, labels: ["strategy:double-triple-passage-synthesis", "part:PART7"] } },
      { code: "CĐR11.3", verb: "tổ chức", content: "mạch logic của đoạn văn để chèn câu đúng vị trí (Part 6)", assessment: CELL_ASSESS("Part 6 chèn câu"), measure: { kind: "cells", level: 4, labels: ["strategy:sentence-insertion-logic", "part:PART6"] } },
    ],
  },
  {
    code: "CĐR12", tier: "A", domain: "cognitive", level: 4, audience: LEARNER, verb: "phân biệt",
    content: "câu trả lời gián tiếp, thông tin biểu đồ và vai người nói trong phần Nghe (Part 2–4)", degree: PASS, timeBound: AFTER.A, objectives: ["PO2"],
    indicators: [
      { code: "CĐR12.1", verb: "phân biệt", content: "câu trả lời gián tiếp với đáp án nhiễu ở Part 2", assessment: CELL_ASSESS("Part 2 trả lời gián tiếp"), measure: { kind: "cells", level: 4, labels: ["strategy:indirect-response"] } },
      { code: "CĐR12.2", verb: "liên hệ", content: "lời nói với biểu đồ / bảng và với vai của từng người trong hội thoại 3 người", assessment: CELL_ASSESS("Part 3–4 biểu đồ, 3 người"), measure: { kind: "cells", level: 4, labels: ["strategy:graphic-info-synthesis", "strategy:three-speaker-role", "part:PART3", "part:PART4"] } },
    ],
  },
  {
    code: "CĐR13", tier: "A", domain: "cognitive", level: 5, audience: LEARNER, verb: "đánh giá",
    content: "các đáp án “nghe đều đúng” dựa trên bằng chứng trong bài để chọn đáp án và giữ quyết định", degree: `${PASS}, đổi đáp án từ đúng sang sai không quá ${Math.round(EVALUATE_MAX_RIGHT_TO_WRONG_SHARE * 100)}%`, timeBound: AFTER.A, objectives: ["PO2", "PO3"],
    indicators: [
      { code: "CĐR13.1", verb: "phán đoán", content: "hàm ý người nói (“What does the speaker mean…”) và đáp án nhiễu cùng trường nghĩa", assessment: CELL_ASSESS("hàm ý người nói"), measure: { kind: "cells", level: 5, labels: ["strategy:implied-meaning", "strategy:phonetic-distractor-intent"] } },
      { code: "CĐR13.2", verb: "bảo vệ", content: "lựa chọn đã có căn cứ, không đổi từ đáp án đúng sang sai ở câu bậc 4–5", assessment: "Tỷ lệ câu bậc 4–5 bị đổi đúng → sai (đáp án đầu tiên so với đáp án nộp)", measure: { kind: "decision" } },
    ],
  },
  {
    code: "CĐR14", tier: "A", domain: "cognitive", level: 6, audience: LEARNER, verb: "lập kế hoạch",
    content: "ôn luyện cá nhân gồm mục tiêu điểm, mốc thời gian, bộ câu tự lưu và ghi chú chiến thuật", degree: "đáp ứng ít nhất 4 trên 5 tiêu chí của rubric sản phẩm", timeBound: AFTER.A, objectives: ["PO3"],
    indicators: [
      { code: "CĐR14.1", verb: "thiết kế", content: "kế hoạch ôn luyện tự xây (rubric 5 tiêu chí)", assessment: "Rubric sản phẩm: lộ trình, ngày thi, tùy chọn học, bộ câu tự lưu, ghi chú chiến thuật", measure: { kind: "create" } },
    ],
  },
  {
    code: "CĐR15", tier: "A", domain: "psychomotor", level: 4, audience: LEARNER, verb: "phối hợp",
    content: "kỹ năng Nghe và Đọc khi làm trọn một đề TOEIC đầy đủ trong thời gian chuẩn 120 phút", degree: "trên ít nhất 1 đề đầy đủ", timeBound: AFTER.A, objectives: ["PO2"],
    indicators: [
      { code: "CĐR15.1", verb: "phối hợp", content: "Nghe + Đọc trong đề Mock đầy đủ (bậc Thành thạo của miền kỹ năng)", assessment: "Đề Mock đã nộp có đủ cả Nghe và Đọc", measure: { kind: "psychomotor", target: 4 } },
    ],
  },
  {
    code: "CĐR16", tier: "A", domain: "affective", level: 4, audience: LEARNER, verb: "tổ chức",
    content: "việc học theo một lộ trình có ưu tiên và hoàn thành các ngày học đã lên kế hoạch", degree: "với ít nhất 5 ngày lộ trình hoàn thành", timeBound: AFTER.A, objectives: ["PO3", "PO4"],
    indicators: [
      { code: "CĐR16.1", verb: "sắp xếp", content: "các ngày học theo lộ trình Mentor / lộ trình từ vựng (bậc Tổ chức)", assessment: "Số ngày lộ trình có trạng thái hoàn thành", measure: { kind: "affective", target: 4 } },
    ],
  },
];

export const OUTCOME_BY_CODE = new Map(LEARNING_OUTCOMES.map((o) => [o.code, o]));

/** Phát biểu đầy đủ theo cấu trúc A-B-C-D. */
export function outcomeStatement(o: Pick<LearningOutcome, "timeBound" | "audience" | "verb" | "content" | "degree">): string {
  return `${o.timeBound}, ${o.audience} có khả năng ${o.verb} ${o.content} ${o.degree}.`;
}

export const indicatorStatement = (i: Pick<Indicator, "verb" | "content">) => `Người học có thể ${i.verb} ${i.content}.`;

export function domainLevelInfo(domain: Domain, level: number) {
  return DOMAIN_LEVELS[domain].find((l) => l.level === level) ?? null;
}

// ---------------------------------------------------------------------------
// Bản đang dùng = mặc định trong file này + phần admin sửa trên web
// ---------------------------------------------------------------------------

export interface OutcomeCatalog {
  goal: string;
  objectives: readonly ProgramObjective[];
  outcomes: readonly LearningOutcome[];
}

export const DEFAULT_CATALOG: OutcomeCatalog = { goal: PROGRAM_GOAL, objectives: PROGRAM_OBJECTIVES, outcomes: LEARNING_OUTCOMES };

/** Các trường admin được sửa. Chỉ báo (cách đo bằng dữ liệu) vẫn khai báo trong code. */
export const EDITABLE_OUTCOME_FIELDS = ["audience", "verb", "content", "degree", "timeBound", "objectives"] as const;
export type OutcomeEdit = Partial<Pick<LearningOutcome, (typeof EDITABLE_OUTCOME_FIELDS)[number]>>;

export interface CatalogOverrides {
  goal?: string;
  objectives?: Record<string, string>;
  outcomes?: Record<string, OutcomeEdit>;
}

const str = (v: unknown, max = 1000) => (typeof v === "string" && v.trim() ? v.trim().slice(0, max) : undefined);

/** Đọc JSON đã lưu một cách an toàn: bỏ qua mọi trường lạ / sai kiểu / mã không tồn tại. */
export function parseOverrides(raw: unknown): CatalogOverrides {
  const out: CatalogOverrides = {};
  if (!raw || typeof raw !== "object") return out;
  const r = raw as Record<string, unknown>;
  const goal = str(r.goal, 2000);
  if (goal) out.goal = goal;
  if (r.objectives && typeof r.objectives === "object") {
    const objs: Record<string, string> = {};
    for (const p of PROGRAM_OBJECTIVES) {
      const v = str((r.objectives as Record<string, unknown>)[p.code]);
      if (v) objs[p.code] = v;
    }
    if (Object.keys(objs).length) out.objectives = objs;
  }
  if (r.outcomes && typeof r.outcomes === "object") {
    const outs: Record<string, OutcomeEdit> = {};
    for (const o of LEARNING_OUTCOMES) {
      const e = (r.outcomes as Record<string, unknown>)[o.code];
      if (!e || typeof e !== "object") continue;
      const x = e as Record<string, unknown>;
      const edit: OutcomeEdit = {};
      for (const f of ["audience", "verb", "content", "degree", "timeBound"] as const) {
        const v = str(x[f]);
        if (v) edit[f] = v;
      }
      if (Array.isArray(x.objectives)) {
        const codes = x.objectives.filter((c): c is string => typeof c === "string" && PROGRAM_OBJECTIVES.some((p) => p.code === c));
        if (codes.length) edit.objectives = [...new Set(codes)];
      }
      if (Object.keys(edit).length) outs[o.code] = edit;
    }
    if (Object.keys(outs).length) out.outcomes = outs;
  }
  return out;
}

export function applyOverrides(raw: unknown): OutcomeCatalog {
  const ov = parseOverrides(raw);
  return {
    goal: ov.goal ?? PROGRAM_GOAL,
    objectives: PROGRAM_OBJECTIVES.map((p) => (ov.objectives?.[p.code] ? { ...p, statement: ov.objectives[p.code] } : p)),
    outcomes: LEARNING_OUTCOMES.map((o) => (ov.outcomes?.[o.code] ? { ...o, ...ov.outcomes[o.code] } : o)),
  };
}

/** Lỗi checklist của một bản sửa (bỏ qua tính khả thi — phụ thuộc ngân hàng câu, không phụ thuộc câu chữ). */
export function catalogErrors(catalog: OutcomeCatalog): { code: string; errors: string[] }[] {
  return catalog.outcomes
    .map((o) => ({ code: o.code, errors: checkOutcome(o, { objectives: catalog.objectives }).filter((c) => !c.met && c.key !== "attainable").map((c) => c.criterion) }))
    .filter((x) => x.errors.length > 0);
}

// ---------------------------------------------------------------------------
// F.2. Checklist kiểm tra chuẩn đầu ra (tự động)
// ---------------------------------------------------------------------------

/** Động từ mơ hồ — dễ nhầm chuẩn đầu ra với mục tiêu (mục C.3). */
export const VAGUE_VERBS = ["biết", "hiểu", "học", "làm quen", "được tiếp xúc", "nhận thức được", "có", "know", "understand", "learn", "be familiar with", "be aware of", "have"];
/** Động từ chỉ tiến trình — không đánh giá được tại một thời điểm (mục C.3). */
export const PROCESS_VERBS = ["duy trì", "tiếp tục", "mở rộng", "tăng cường", "tối đa hóa", "maintain", "continue", "enlarge", "strengthen", "maximize"];

export interface ChecklistItem {
  key: string;
  criterion: string;
  met: boolean;
  note: string;
}

const norm = (s: string) => s.trim().toLowerCase();

/** Động từ có nằm trong bộ động từ của đúng miền + bậc không. */
export function verbMatchesLevel(verb: string, domain: Domain, level: number): boolean {
  const info = domainLevelInfo(domain, level);
  return !!info && info.verbs.map(norm).includes(norm(verb));
}

export interface CheckContext {
  /** Số câu đang xuất bản của mỗi chỉ báo dạng "cells" (để xét tính khả thi). Bỏ trống = không xét. */
  questionsPerIndicator?: Map<string, number>;
  /** Mục tiêu chương trình đang dùng (mặc định: PROGRAM_OBJECTIVES). */
  objectives?: readonly ProgramObjective[];
}

export function checkOutcome(o: LearningOutcome, ctx: CheckContext = {}): ChecklistItem[] {
  const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
  const verb = norm(o.verb);
  const singleVerb = !/[,;/]| và | hoặc /.test(o.verb);
  const pos = ctx.objectives ?? PROGRAM_OBJECTIVES;
  const objectivesKnown = o.objectives.length > 0 && o.objectives.every((c) => pos.some((p) => p.code === c));
  const badIndicatorVerbs = o.indicators.filter((i) => [...VAGUE_VERBS, ...PROCESS_VERBS].includes(norm(i.verb)));
  const cellIndicators = o.indicators.filter((i) => i.measure.kind === "cells");
  const thin = ctx.questionsPerIndicator ? cellIndicators.filter((i) => (ctx.questionsPerIndicator!.get(i.code) ?? 0) < MIN_ATTEMPTS_PER_CELL) : [];

  const items: ChecklistItem[] = [
    { key: "abcd", criterion: "Cấu trúc A-B-C-D: đối tượng, hành vi (động từ), nội dung, mức độ", met: !!o.audience && !!o.verb && words(o.content) >= 3 && !!o.degree, note: `A: ${o.audience} · B: ${o.verb} · C: ${o.content} · D: ${o.degree}` },
    { key: "verb-level", criterion: "Động từ thuộc đúng miền và bậc của thang Bloom", met: verbMatchesLevel(o.verb, o.domain, o.level), note: `${o.verb} — ${domainLevelInfo(o.domain, o.level)?.code ?? "?"} ${domainLevelInfo(o.domain, o.level)?.nameVi ?? ""}` },
    { key: "single-verb", criterion: "Chỉ dùng một động từ cho một chuẩn đầu ra", met: singleVerb, note: singleVerb ? "Một động từ" : "Có nhiều động từ trong phần hành vi" },
    { key: "no-vague", criterion: "Không dùng động từ mơ hồ (biết, hiểu, học, làm quen…)", met: !VAGUE_VERBS.includes(verb), note: VAGUE_VERBS.includes(verb) ? `"${o.verb}" là động từ mơ hồ` : "Đạt" },
    { key: "no-process", criterion: "Không dùng động từ chỉ tiến trình (duy trì, tiếp tục, mở rộng…)", met: !PROCESS_VERBS.includes(verb), note: PROCESS_VERBS.includes(verb) ? `"${o.verb}" chỉ tiến trình` : "Đạt" },
    { key: "specific", criterion: "S — Rõ ràng, cụ thể (nội dung gắn với Part / dạng câu TOEIC)", met: words(o.content) >= 5, note: `${words(o.content)} từ nội dung` },
    { key: "measurable", criterion: "M — Đo lường được: có chỉ báo, mỗi chỉ báo có cách đánh giá, mức độ có tiêu chí định lượng", met: o.indicators.length > 0 && o.indicators.every((i) => !!i.assessment) && /\d/.test(o.degree), note: `${o.indicators.length} chỉ báo` },
    { key: "attainable", criterion: "A — Khả thi: ngân hàng có đủ câu để đánh giá từng chỉ báo", met: thin.length === 0, note: ctx.questionsPerIndicator ? (thin.length ? `Thiếu câu: ${thin.map((i) => i.code).join(", ")}` : "Đủ câu") : "Kiểm tra ở trang quản trị" },
    { key: "relevant", criterion: "R — Gắn kết: đóng góp cho mục tiêu chương trình", met: objectivesKnown, note: o.objectives.join(", ") },
    { key: "time-bound", criterion: "T — Xác định thời gian hoàn thành", met: !!o.timeBound, note: o.timeBound },
    { key: "indicators", criterion: "Được cụ thể hóa thành chỉ báo dùng động từ Bloom + nội dung", met: o.indicators.length > 0 && badIndicatorVerbs.length === 0, note: badIndicatorVerbs.length ? `Chỉ báo dùng động từ không hợp lệ: ${badIndicatorVerbs.map((i) => i.code).join(", ")}` : "Đạt" },
  ];
  return items;
}

/** Ma trận chuẩn đầu ra × mục tiêu chương trình. */
export function objectiveMatrix(catalog: OutcomeCatalog = DEFAULT_CATALOG): { outcome: string; objectives: Record<string, boolean> }[] {
  return catalog.outcomes.map((o) => ({ outcome: o.code, objectives: Object.fromEntries(catalog.objectives.map((p) => [p.code, o.objectives.includes(p.code)])) }));
}

// ---------------------------------------------------------------------------
// Chấm chỉ báo và chuẩn đầu ra cho một người học
// ---------------------------------------------------------------------------

/** Nhãn có khớp mẫu không: mẫu kết thúc bằng ":" là tiền tố. */
export function matchesLabel(label: string, patterns: readonly string[]): boolean {
  return patterns.some((p) => (p.endsWith(":") ? label.startsWith(p) : label === p));
}

export interface IndicatorResult {
  code: string;
  statement: string;
  assessment: string;
  /** null = chưa đủ dữ liệu. */
  rubric: RubricLevel | null;
  /** Mức rubric 30 ngày trước (chỉ chỉ báo nhận thức). */
  previous: RubricLevel | null;
  trend: RubricTrend;
  /** 0–1 khi đo bằng điểm; null với thang bậc. */
  score: number | null;
  /** Số câu (chỉ báo nhận thức) hoặc bậc đã đạt (thang). */
  evidence: string;
  /** Công nhận nhờ bằng chứng ngược từ bậc cao hơn. */
  inferred: boolean;
}

export interface OutcomeResult {
  code: string;
  tier: OutcomeTier;
  domain: Domain;
  level: number;
  statement: string;
  indicators: IndicatorResult[];
  /** Trung bình (làm tròn xuống) của các chỉ báo đã đo; null khi chưa chỉ báo nào đủ dữ liệu. */
  rubric: RubricLevel | null;
  previous: RubricLevel | null;
  trend: RubricTrend;
  /** Đạt chuẩn đầu ra: mọi chỉ báo đều đã đo và ≥ RUBRIC_PASS_LEVEL. */
  achieved: boolean;
  measured: number;
}

export interface OutcomeInput {
  profile: BloomProfile;
  /** Hồ sơ Bloom tính trên dữ liệu đến 30 ngày trước (đo tiến bộ 2 → 3 → 4). */
  pastProfile: BloomProfile | null;
  pacing: PacingStats;
  affective: AffectiveSignals;
  create: CreateSignals;
}

export interface DomainSummary {
  psychomotor: LadderResult;
  affective: LadderResult;
  create: { criteria: CreateCriterion[]; rubric: RubricLevel };
}

export interface LearnerOutcomes {
  outcomes: OutcomeResult[];
  domains: DomainSummary;
  achieved: number;
  total: number;
}

function cellsScore(profile: BloomProfile, level: ScoredBloomLevel, labels: string[]) {
  const cells: CellResult[] = [];
  let inferred = false;
  for (const [label, row] of Object.entries(profile.heatmap)) {
    if (!matchesLabel(label, labels)) continue;
    const c = row[level];
    if (!c) continue;
    if (c.inferred) inferred = true;
    else cells.push(c);
  }
  const attempts = cells.reduce((s, c) => s + c.attempts, 0);
  const score = attempts ? cells.reduce((s, c) => s + c.score * c.attempts, 0) / attempts : null;
  return { attempts, score, inferred };
}

function cellRubric(profile: BloomProfile | null, level: ScoredBloomLevel, labels: string[]) {
  if (!profile) return { rubric: null, score: null, attempts: 0, inferred: false };
  const r = cellsScore(profile, level, labels);
  if (r.attempts >= MIN_ATTEMPTS_PER_CELL && r.score !== null) return { rubric: rubricLevelOf(r.score), score: r.score, attempts: r.attempts, inferred: false };
  if (r.inferred) return { rubric: RUBRIC_PASS_LEVEL, score: r.score, attempts: r.attempts, inferred: true };
  return { rubric: null, score: r.score, attempts: r.attempts, inferred: false };
}

/** Bậc 5 — giữ quyết định: tỷ lệ đổi đúng → sai càng thấp càng tốt. */
export function decisionRubric(share: number): RubricLevel {
  if (share <= 0.02) return 5;
  if (share <= EVALUATE_MAX_RIGHT_TO_WRONG_SHARE) return 4;
  if (share <= 0.1) return 3;
  if (share <= 0.2) return 2;
  return 1;
}

export function createRubric(criteria: CreateCriterion[]): RubricLevel {
  const met = criteria.filter((c) => c.met).length;
  return Math.max(1, met) as RubricLevel;
}

const pct = (x: number) => `${Math.round(x * 100)}%`;

export function assessOutcomes(input: OutcomeInput, catalogOutcomes: readonly LearningOutcome[] = LEARNING_OUTCOMES): LearnerOutcomes {
  const psychomotor = psychomotorLadder(input.pacing, input.profile.behavior);
  const answers = input.profile.answers;
  const affective = affectiveLadder(input.affective, {
    answered: answers.answered,
    wrong: answers.answered - answers.correct,
    explanationViews: input.profile.explanationViews,
    noise: input.profile.noise,
  });
  const criteria = createCriteria(input.create);
  const create = { criteria, rubric: createRubric(criteria) };

  const assessIndicator = (i: Indicator): IndicatorResult => {
    const base = { code: i.code, statement: indicatorStatement(i), assessment: i.assessment };
    const m = i.measure;
    switch (m.kind) {
      case "cells": {
        const now = cellRubric(input.profile, m.level, m.labels);
        const before = cellRubric(input.pastProfile, m.level, m.labels);
        return {
          ...base,
          rubric: now.rubric,
          previous: before.rubric,
          trend: rubricTrend(now.rubric, before.rubric),
          score: now.score,
          inferred: now.inferred,
          evidence: now.inferred
            ? `Vững (suy ra từ bậc cao hơn) · ${now.attempts} câu`
            : now.rubric === null
              ? `${now.attempts}/${MIN_ATTEMPTS_PER_CELL} câu — chưa đủ dữ liệu${now.score !== null ? ` (tạm ${pct(now.score)})` : ""}`
              : `${pct(now.score!)} trên ${now.attempts} câu`,
        };
      }
      case "decision": {
        const b = input.profile.behavior;
        const enough = b.answered >= MIN_ATTEMPTS_PER_CELL;
        const rubric = enough ? decisionRubric(b.rightToWrongShare) : null;
        return { ...base, rubric, previous: null, trend: null, score: null, inferred: false, evidence: enough ? `${pct(b.rightToWrongShare)} đổi đúng → sai trên ${b.answered} câu bậc 4–5` : `${b.answered}/${MIN_ATTEMPTS_PER_CELL} câu bậc 4–5 — chưa đủ dữ liệu` };
      }
      case "psychomotor":
      case "affective": {
        const lad = m.kind === "psychomotor" ? psychomotor : affective;
        const levels = m.kind === "psychomotor" ? PSYCHOMOTOR_LEVELS : AFFECTIVE_LEVELS;
        const rubric = lad.insufficient ? null : rubricFromLadder(lad.reached, m.target);
        const name = levels.find((l) => l.level === lad.reached)?.nameVi;
        return { ...base, rubric, previous: null, trend: null, score: null, inferred: false, evidence: lad.insufficient ? "Chưa đủ hoạt động để đánh giá" : `Đạt bậc ${lad.reached}/${levels.length}${name ? ` (${name})` : ""}, yêu cầu bậc ${m.target}` };
      }
      case "create":
        return { ...base, rubric: create.rubric, previous: null, trend: null, score: null, inferred: false, evidence: `${criteria.filter((c) => c.met).length}/${criteria.length} tiêu chí` };
    }
  };

  const outcomes: OutcomeResult[] = catalogOutcomes.map((o) => {
    const indicators = o.indicators.map(assessIndicator);
    const measured = indicators.filter((i) => i.rubric !== null);
    const avg = (xs: RubricLevel[]) => (xs.length ? (Math.floor(xs.reduce((s, x) => s + x, 0) / xs.length) as RubricLevel) : null);
    const rubric = avg(measured.map((i) => i.rubric!));
    const prevs = indicators.filter((i) => i.previous !== null).map((i) => i.previous!);
    const previous = prevs.length === indicators.length ? avg(prevs) : null;
    return {
      code: o.code,
      tier: o.tier,
      domain: o.domain,
      level: o.level,
      statement: outcomeStatement(o),
      indicators,
      rubric,
      previous,
      trend: rubricTrend(rubric, previous),
      achieved: measured.length === indicators.length && measured.every((i) => i.rubric! >= RUBRIC_PASS_LEVEL),
      measured: measured.length,
    };
  });

  return { outcomes, domains: { psychomotor, affective, create }, achieved: outcomes.filter((o) => o.achieved).length, total: outcomes.length };
}

/** Tên bậc Bloom nhận thức (dùng cho nhãn nhỏ trên UI). */
export const cognitiveName = (level: number) => (level === 6 ? COGNITIVE_LEVELS[5].nameVi : BLOOM_BY_ID.get(level as ScoredBloomLevel)?.nameVi ?? "");
