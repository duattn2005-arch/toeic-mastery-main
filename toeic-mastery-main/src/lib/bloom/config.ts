/**
 * CẤU HÌNH TẬP TRUNG — Thang Bloom bản sửa đổi (Anderson & Krathwohl, 2001)
 * làm nền cho toàn bộ việc phân tích người học.
 *
 * Mọi con số dùng để chấm, lọc, phân tầng và phân luồng đều nằm ở đây.
 * Nhóm có thể chỉnh trực tiếp các giá trị bên dưới; không file nào khác
 * được khai báo lại ngưỡng riêng (insights/engine.ts, competency-heatmap.ts,
 * level-gate.ts, skill-mastery.ts đều import từ file này).
 *
 * File thuần (không import server/DB) — dùng được ở cả server, client và
 * trong kiểm thử.
 */

// ---------------------------------------------------------------------------
// 1. Sáu bậc tư duy
// ---------------------------------------------------------------------------

export type BloomLevelId = 1 | 2 | 3 | 4 | 5 | 6;
/** Bậc được chấm điểm (bậc 6 "Sáng tạo" là đầu ra, không chấm). */
export type ScoredBloomLevel = 1 | 2 | 3 | 4 | 5;
export type BloomCode = "remember" | "understand" | "apply" | "analyze" | "evaluate" | "create";
export type Tier = "B" | "I" | "A" | "OUTPUT";

export interface BloomLevelInfo {
  id: BloomLevelId;
  code: BloomCode;
  nameVi: string;
  nameEn: string;
  /** Màu nhận diện bậc (dùng cho nhãn, thanh tiến độ). */
  color: string;
  /** Mô tả ngắn: bậc này đo hành vi TOEIC nào. */
  description: string;
  /** Động từ hành động đặc trưng của bậc (theo Anderson & Krathwohl). */
  verbs: string[];
  /** Dữ liệu trên web dùng để đo bậc này. */
  sources: string;
}

export const BLOOM_LEVELS: readonly BloomLevelInfo[] = [
  {
    id: 1,
    code: "remember",
    nameVi: "Nhớ",
    nameEn: "Remember",
    color: "#64748b",
    description: "Nhớ nghĩa từ, nhận ra từ vựng và cụm từ quen thuộc.",
    verbs: ["nhận ra", "nhớ lại", "gọi tên", "liệt kê"],
    sources: "Flashcard SM-2, tra từ, lưu từ, câu Part 5 chọn nghĩa từ",
  },
  {
    id: 2,
    code: "understand",
    nameVi: "Hiểu",
    nameEn: "Understand",
    color: "#0ea5e9",
    description: "Nhận diện điểm ngữ pháp, hiểu vì sao đáp án đúng, nắm thông tin nói/viết trực tiếp.",
    verbs: ["giải thích", "phân loại", "diễn giải", "tóm tắt"],
    sources: "Câu hỏi nhãn đơn (Part 1, 2, Part 5 ngữ pháp cơ bản, câu chi tiết dễ), xem giải thích",
  },
  {
    id: 3,
    code: "apply",
    nameVi: "Vận dụng",
    nameEn: "Apply",
    color: "#10b981",
    description: "Dùng quy tắc để giải câu mới trong ngữ cảnh, đúng nhịp thời gian.",
    verbs: ["áp dụng", "thực hiện", "giải", "sử dụng"],
    sources: "Làm đề theo Part có tính giờ, Part 5 có ngữ cảnh, Part 6 liên kết câu",
  },
  {
    id: 4,
    code: "analyze",
    nameVi: "Phân tích",
    nameEn: "Analyze",
    color: "#f59e0b",
    description: "Tách thông tin trong đoạn kép/ba, phân biệt đáp án nhiễu, suy luận.",
    verbs: ["phân biệt", "so sánh", "suy luận", "tổ chức"],
    sources: "Part 6–7, câu suy luận, NOT true, đoạn kép/ba, mã bẫy",
  },
  {
    id: 5,
    code: "evaluate",
    nameVi: "Đánh giá",
    nameEn: "Evaluate",
    color: "#ef4444",
    description: "Chọn giữa các đáp án “nghe đều đúng” dựa trên bằng chứng; giữ quyết định khi đã có căn cứ.",
    verbs: ["đánh giá", "phán đoán", "biện luận", "chọn lọc"],
    sources: "Câu hàm ý người nói, Mock test, tỷ lệ đổi đáp án, độ ổn định điểm",
  },
  {
    id: 6,
    code: "create",
    nameVi: "Sáng tạo",
    nameEn: "Create",
    color: "#8b5cf6",
    description: "Tự xây chiến thuật và lộ trình riêng — là đầu ra, không chấm điểm.",
    verbs: ["thiết kế", "lập kế hoạch", "xây dựng"],
    sources: "Hồ sơ chiến lược, lộ trình tự chọn, bộ câu tự lưu",
  },
];

export const SCORED_LEVELS: readonly ScoredBloomLevel[] = [1, 2, 3, 4, 5];

export const BLOOM_BY_ID = new Map(BLOOM_LEVELS.map((l) => [l.id, l]));

/** Bậc → cấp học (B/I/A); bậc 6 là đầu ra. */
export const LEVEL_TO_TIER: Record<BloomLevelId, Tier> = { 1: "B", 2: "B", 3: "I", 4: "A", 5: "A", 6: "OUTPUT" };

/** Các bậc mỗi cấp phải vững để coi là xong cấp đó. */
export const TIER_LEVELS: Record<Exclude<Tier, "OUTPUT">, ScoredBloomLevel[]> = { B: [1, 2], I: [3], A: [4, 5] };

// ---------------------------------------------------------------------------
// 2. Ngưỡng vững / hổng (Mastery Learning của Bloom)
// ---------------------------------------------------------------------------

/** Đạt từ mức này trở lên ở một ô/bậc mới được coi là VỮNG (Xanh). */
export const MASTERY_THRESHOLD = 0.8;
/** Dưới mức này là HỔNG (Đỏ). Ở giữa hai ngưỡng là Vàng (đang hình thành). */
export const WEAK_THRESHOLD = 0.5;

// ---------------------------------------------------------------------------
// 3. Lọc nhiễu
// ---------------------------------------------------------------------------

/** Câu Đọc làm nhanh hơn mức này coi như đoán mò → loại khỏi điểm. */
export const NOISE_MIN_SECONDS = 8;
/** Câu Đọc làm lâu hơn mức này coi như mất tập trung / ngâm câu → loại. */
export const NOISE_MAX_SECONDS = 150;
/**
 * Chỉ lọc nhiễu theo thời gian ở phần Đọc: thời gian một câu Nghe do audio
 * quyết định, không phản ánh việc đoán hay ngâm câu.
 */
export const NOISE_TIMED_SKILLS: readonly ("LISTENING" | "READING")[] = ["READING"];

// ---------------------------------------------------------------------------
// 4. Đủ dữ liệu
// ---------------------------------------------------------------------------

/** Ô (nhãn × bậc) có ít câu (khác nhau) hơn mức này → Xám "chưa đủ dữ liệu". */
export const MIN_ATTEMPTS_PER_CELL = 15;
/** Tổng số câu đã làm tối thiểu trước khi AI phân luồng / xếp lộ trình. */
export const MIN_TOTAL_ATTEMPTS_FOR_ROUTING = 100;
/** Một ô được chấm trên chừng này câu gần nhất (năng lực hiện tại, không phải trung bình cả đời). */
export const CELL_RECENT_WINDOW = 20;
/** Ô xanh mà lâu không làm lại quá số ngày này → cần xác nhận lại (tránh “vững ảo”). */
export const MASTERY_STALE_DAYS = 30;

// ---------------------------------------------------------------------------
// 5. Công thức điểm năng lực của một ô
//    điểm = độ chính xác (có trọng số) + thưởng tốc độ − phạt dính bẫy, kẹp 0–1
// ---------------------------------------------------------------------------

/** Thưởng tốc độ tối đa khi làm nhanh hơn thời gian chuẩn của Part (chỉ phần Đọc). */
export const SPEED_BONUS_MAX = 0.05;
/** Mỗi lần dính bẫy (chọn đáp án nhiễu đã gắn mã, hoặc đổi từ đúng sang sai) trừ chừng này × tỷ lệ. */
export const TRAP_PENALTY = 0.5;
/** Phạt dính bẫy tối đa. */
export const TRAP_PENALTY_MAX = 0.15;
/** Câu đúng nhưng đã dùng gợi ý chỉ được tính chừng này phần điểm. */
export const HINT_CREDIT = 0.5;
/** Câu đúng mà trước đó đã từng làm đúng (dễ là nhớ đáp án) chỉ được tính chừng này. */
export const REPEAT_CORRECT_CREDIT = 0.8;

/**
 * Thời gian chuẩn mỗi câu (giây) theo Part — dùng cho thưởng tốc độ và nhịp
 * làm bài. Part 1–4 là Nghe: thời gian do audio, không chấm tốc độ (null).
 */
export const PART_STANDARD_SECONDS: Record<"PART1" | "PART2" | "PART3" | "PART4" | "PART5" | "PART6" | "PART7", number | null> = {
  PART1: null,
  PART2: null,
  PART3: null,
  PART4: null,
  PART5: 25,
  PART6: 35,
  PART7: 60,
};

// ---------------------------------------------------------------------------
// 6. Bằng chứng theo bậc
// ---------------------------------------------------------------------------

/**
 * Từ bậc này trở lên, một ô chỉ được Xanh khi có đủ câu làm trong điều kiện
 * có giờ (đề theo Part, Mock test, Gate test) — “Vận dụng đúng thời gian”.
 */
export const TIMED_EVIDENCE_FROM_LEVEL: ScoredBloomLevel = 3;
/** Tỷ lệ tối thiểu câu làm có giờ trong ô để được công nhận vững. */
export const MIN_TIMED_SHARE = 0.3;

/**
 * Bằng chứng ngược: ô bậc cao Xanh với ít nhất chừng này câu thì các ô bậc
 * thấp hơn CÙNG NHÃN còn thiếu dữ liệu được ghi là “vững (suy ra)” —
 * Anderson & Krathwohl nới lỏng tính tích lũy tuyệt đối của thang.
 */
export const INFER_FROM_HIGHER_MIN_ATTEMPTS = MIN_ATTEMPTS_PER_CELL;

// ---------------------------------------------------------------------------
// 7. Lên cấp (Gate test) và các ngưỡng phụ
// ---------------------------------------------------------------------------

/** Điểm Gate test để lên cấp — trùng ngưỡng vững. */
export const GATE_PASS_THRESHOLD = MASTERY_THRESHOLD;
/** Gate test dưới mức này → học lại từ nền (RESTART) thay vì học bù. */
export const GATE_RESTART_THRESHOLD = WEAK_THRESHOLD;
/** Số câu tối thiểu mỗi nhãn lõi trước khi được thi Gate. */
export const GATE_MIN_SAMPLE_PER_LABEL = { BEGINNER: 10, INTERMEDIATE: 15 } as const;
/** Tổng số câu tối thiểu trước khi được thi Gate. */
export const GATE_MIN_TOTAL_ATTEMPTED = { BEGINNER: MIN_TOTAL_ATTEMPTS_FOR_ROUTING, INTERMEDIATE: 200 } as const;
/** Trong bài Gate, mỗi bậc của cấp hiện tại có ít nhất chừng này câu thì phải đạt ngưỡng vững riêng. */
export const GATE_MIN_QUESTIONS_PER_LEVEL = 3;
/** Bậc Bloom tối đa của câu hỏi trong Gate test theo cấp đang thi (không ra đề vượt tầng). */
export const GATE_MAX_BLOOM_LEVEL = { BEGINNER: 3, INTERMEDIATE: 5 } as const;
/** “Từ vựng đã nhớ” tối thiểu để lên cấp. */
export const VOCAB_MASTERY_THRESHOLD = 0.7;
/** Placement test tối thiểu để lên cấp A. */
export const ADVANCED_PLACEMENT_THRESHOLD = MASTERY_THRESHOLD;

/**
 * Bậc 5 (Đánh giá) còn được đo bằng hành vi ra quyết định:
 * tỷ lệ câu bậc 4–5 bị đổi từ đúng sang sai không được vượt mức này…
 */
export const EVALUATE_MAX_RIGHT_TO_WRONG_SHARE = 0.05;
/** …và độ chênh độ chính xác giữa 3 Mock test gần nhất không vượt mức này (điểm ổn định). */
export const MOCK_STABILITY_MAX_SPREAD = 0.1;
/** Số Mock test tối thiểu để xét độ ổn định. */
export const MOCK_STABILITY_MIN_TESTS = 2;

/** Ít câu hơn mức này thì chưa xét một nhãn là điểm yếu. */
export const MIN_SAMPLE_FOR_WEAKNESS = 5;

// ---------------------------------------------------------------------------
// 8. Mã bẫy (loại đáp án nhiễu)
// ---------------------------------------------------------------------------

export type TrapType = "same_word_trap" | "sound_alike" | "grammatically_plausible" | "similar_meaning" | "paraphrase_miss" | "not_stated";

export const TRAP_TYPES: Record<TrapType, { nameVi: string; description: string }> = {
  same_word_trap: { nameVi: "Bẫy lặp từ", description: "Đáp án lặp lại từ trong câu hỏi/bài nghe/bài đọc nhưng sai ý." },
  sound_alike: { nameVi: "Bẫy âm gần giống", description: "Đáp án chứa từ phát âm gần giống từ trong bài nghe." },
  grammatically_plausible: { nameVi: "Bẫy hợp ngữ pháp", description: "Cùng họ từ / đúng cấu trúc nhưng sai từ loại hoặc sai thì." },
  similar_meaning: { nameVi: "Bẫy gần nghĩa", description: "Từ cùng trường nghĩa nhưng không hợp ngữ cảnh/kết hợp từ." },
  paraphrase_miss: { nameVi: "Bỏ lỡ diễn đạt lại", description: "Đáp án đúng được diễn đạt lại, đáp án nhiễu dùng nguyên văn." },
  not_stated: { nameVi: "Không được nhắc tới", description: "Đáp án hợp lý nhưng bài không hề nhắc tới." },
};

export const TRAP_TYPE_CODES = Object.keys(TRAP_TYPES) as TrapType[];

// ---------------------------------------------------------------------------
// 9. Trạng thái ô heatmap
// ---------------------------------------------------------------------------

export type CellStatus = "green" | "yellow" | "red" | "insufficient";

export const CELL_STATUS_LABEL: Record<CellStatus | "inferred", string> = {
  green: "Vững",
  yellow: "Đang hình thành",
  red: "Hổng",
  insufficient: "Chưa đủ dữ liệu",
  inferred: "Vững (suy ra từ bậc cao hơn)",
};

export function statusForScore(score: number): Exclude<CellStatus, "insufficient"> {
  if (score >= MASTERY_THRESHOLD) return "green";
  if (score >= WEAK_THRESHOLD) return "yellow";
  return "red";
}
