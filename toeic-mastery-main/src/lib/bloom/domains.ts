/**
 * BA MIỀN CỦA THANG BLOOM — hàm thuần (không DB, không UI).
 *
 *  - Miền nhận thức (Cognitive, Anderson & Krathwohl 2001): 6 bậc, đã chấm
 *    bằng engine.ts. File này chỉ bổ sung bộ động từ đầy đủ để viết chuẩn đầu ra.
 *  - Miền kỹ năng (Psychomotor, Dave 1975): 5 bậc. Với TOEIC Nghe – Đọc, kỹ
 *    năng thao tác là KỸ NĂNG LÀM BÀI: làm theo mẫu → làm có giờ → làm đúng
 *    nhịp ít sai → phối hợp Nghe + Đọc trong đề đầy đủ → làm bài ổn định như
 *    phản xạ. Đo từ thời gian làm câu và chế độ làm bài đã lưu.
 *  - Miền thái độ (Affective, Krathwohl 1964): 5 bậc, đo từ hành vi học tập
 *    đã lưu (xem giải thích, đều đặn, làm lại lỗi sai, theo lộ trình, chuỗi
 *    ngày học và tính trung thực khi làm bài).
 *
 * Mỗi bậc của miền kỹ năng / thái độ là một tiêu chí đạt–chưa đạt; bậc đạt
 * được là bậc cao nhất mà mọi bậc dưới nó cũng đạt (thang tích lũy).
 */
import { MOCK_STABILITY_MAX_SPREAD, PART_STANDARD_SECONDS } from "./config";
import { filterNoise, type BloomAttempt, type EvaluateBehavior, type NoiseReason } from "./engine";

export type Domain = "cognitive" | "psychomotor" | "affective";

export const DOMAIN_LABEL: Record<Domain, { nameVi: string; nameEn: string; source: string }> = {
  cognitive: { nameVi: "Miền nhận thức", nameEn: "Cognitive domain", source: "Bloom (1956), Anderson & Krathwohl (2001)" },
  psychomotor: { nameVi: "Miền kỹ năng", nameEn: "Psychomotor domain", source: "Dave (1975)" },
  affective: { nameVi: "Miền thái độ", nameEn: "Affective domain", source: "Krathwohl (1964)" },
};

export interface DomainLevelInfo {
  /** Mã bậc: C1…C6, P1…P5, A1…A5. */
  code: string;
  level: number;
  nameVi: string;
  nameEn: string;
  description: string;
  /** Động từ điển hình (tiếng Việt) — dùng để viết chuẩn đầu ra / chỉ báo. */
  verbs: string[];
  verbsEn: string[];
}

export const COGNITIVE_LEVELS: readonly DomainLevelInfo[] = [
  { code: "C1", level: 1, nameVi: "Nhớ", nameEn: "Remember", description: "Ghi nhớ và nhận diện thông tin, nhắc lại kiến thức đã học.", verbs: ["liệt kê", "gọi tên", "định danh", "xác định", "nhận biết", "nhớ lại", "nhận ra", "chỉ ra"], verbsEn: ["recall", "identify", "define", "recite", "repeat", "select", "label", "list", "name", "state"] },
  { code: "C2", level: 2, nameVi: "Hiểu", nameEn: "Understand", description: "Diễn giải, giải thích, suy diễn theo ý hiểu của mình.", verbs: ["diễn giải", "giải thích", "tóm tắt", "phân loại", "mô tả", "so sánh", "trình bày lại", "lấy ví dụ", "nắm được"], verbsEn: ["interpret", "exemplify", "classify", "summarize", "infer", "compare", "explain", "describe", "indicate", "translate"] },
  { code: "C3", level: 3, nameVi: "Vận dụng", nameEn: "Apply", description: "Dùng kiến thức đã học trong tình huống mới.", verbs: ["vận dụng", "áp dụng", "giải quyết", "tính toán", "thực hiện", "sử dụng", "hoàn thành", "minh họa"], verbsEn: ["apply", "calculate", "demonstrate", "estimate", "illustrate", "solve", "use", "execute"] },
  { code: "C4", level: 4, nameVi: "Phân tích", nameEn: "Analyze", description: "Phân nhỏ thông tin thành các phần, nhận ra quan hệ và cấu trúc.", verbs: ["phân tích", "phân biệt", "đối chiếu", "suy luận", "tổ chức", "liên hệ", "chỉ ra sự khác biệt"], verbsEn: ["differentiate", "organize", "attribute", "examine", "compare", "diagram", "test"] },
  { code: "C5", level: 5, nameVi: "Đánh giá", nameEn: "Evaluate", description: "Phán xét giá trị theo tiêu chí, bảo vệ lựa chọn bằng lập luận.", verbs: ["đánh giá", "phán đoán", "biện luận", "kết luận", "lựa chọn", "bảo vệ", "phê bình", "xếp loại"], verbsEn: ["assess", "check", "critique", "argue", "defend", "judge", "rate", "recommend", "appraise"] },
  { code: "C6", level: 6, nameVi: "Sáng tạo", nameEn: "Create", description: "Tạo ra cái mới từ những gì đã có: kế hoạch, giải pháp, hệ tiêu chí.", verbs: ["thiết kế", "xây dựng", "lập kế hoạch", "đề xuất", "thiết lập", "tổng hợp", "lập"], verbsEn: ["generate", "plan", "produce", "develop", "construct", "design", "devise", "formulate", "propose"] },
];

export const PSYCHOMOTOR_LEVELS: readonly DomainLevelInfo[] = [
  { code: "P1", level: 1, nameVi: "Bắt chước", nameEn: "Imitation", description: "Làm bài theo mẫu, theo gợi ý và lời giải có sẵn.", verbs: ["bắt chước", "làm theo", "lặp lại", "thực hành", "tái tạo"], verbsEn: ["copy", "follow", "mimic", "repeat", "replicate", "reproduce"] },
  { code: "P2", level: 2, nameVi: "Vận dụng", nameEn: "Manipulation", description: "Tự làm bài theo quy trình đã học, trong điều kiện có giờ.", verbs: ["thực hiện", "sử dụng", "hoàn tất", "tạo ra"], verbsEn: ["act", "build", "execute", "perform"] },
  { code: "P3", level: 3, nameVi: "Chính xác", nameEn: "Precision", description: "Tự làm đúng nhịp thời gian chuẩn, chỉ mắc vài sai sót nhỏ.", verbs: ["cân chỉnh", "tinh chỉnh", "hoàn thiện", "chứng minh"], verbsEn: ["calibrate", "demonstrate", "master"] },
  { code: "P4", level: 4, nameVi: "Thành thạo", nameEn: "Articulation", description: "Phối hợp nhuần nhuyễn hai kỹ năng Nghe và Đọc trong một đề đầy đủ.", verbs: ["phối hợp", "thích ứng", "thực hiện thuần thục", "kết hợp"], verbsEn: ["adapt", "combine", "coordinate", "customize", "formulate"] },
  { code: "P5", level: 5, nameVi: "Kỹ xảo", nameEn: "Naturalization", description: "Làm bài như phản xạ: nhanh, đều và ổn định qua nhiều đề.", verbs: ["làm chủ", "thực hiện tự động", "quản lý"], verbsEn: ["create", "design", "develop", "manage", "naturally"] },
];

export const AFFECTIVE_LEVELS: readonly DomainLevelInfo[] = [
  { code: "A1", level: 1, nameVi: "Tiếp nhận", nameEn: "Receiving", description: "Sẵn sàng tiếp nhận: chú ý xem giải thích khi làm sai.", verbs: ["lắng nghe", "chú ý", "tiếp nhận", "lĩnh hội"], verbsEn: ["listen", "acknowledge", "attend", "follow"] },
  { code: "A2", level: 2, nameVi: "Hồi đáp", nameEn: "Responding", description: "Sẵn lòng tham gia: học đều đặn nhiều ngày trong tháng.", verbs: ["tham gia", "tuân theo", "thực hành", "hưởng ứng"], verbsEn: ["answer", "assist", "comply", "conform", "participate", "perform"] },
  { code: "A3", level: 3, nameVi: "Tỏ thái độ", nameEn: "Valuing", description: "Coi trọng việc sửa sai: chủ động làm lại câu đã sai.", verbs: ["coi trọng", "cam kết", "chủ động", "theo đuổi"], verbsEn: ["value", "commit", "initiate", "justify"] },
  { code: "A4", level: 4, nameVi: "Tổ chức", nameEn: "Organization", description: "Biết sắp xếp ưu tiên: theo một lộ trình học và hoàn thành các ngày học.", verbs: ["sắp xếp", "tổ chức", "cân bằng", "tích hợp"], verbsEn: ["arrange", "organize", "balance", "integrate"] },
  { code: "A5", level: 5, nameVi: "Tính cách", nameEn: "Characterization", description: "Thói quen học tự giác và trung thực đã thành nếp: chuỗi ngày học dài, không đoán mò, không xem đáp án trước.", verbs: ["duy trì nếp", "thể hiện nhất quán", "tự giác"], verbsEn: ["act", "display", "practice", "serve", "verify"] },
];

export const DOMAIN_LEVELS: Record<Domain, readonly DomainLevelInfo[]> = {
  cognitive: COGNITIVE_LEVELS,
  psychomotor: PSYCHOMOTOR_LEVELS,
  affective: AFFECTIVE_LEVELS,
};

// ---------------------------------------------------------------------------
// Đánh giá một thang có bậc (tích lũy)
// ---------------------------------------------------------------------------

export interface LadderStep {
  code: string;
  level: number;
  nameVi: string;
  met: boolean;
  /** Bằng chứng đo được, viết cho người học. */
  evidence: string;
  /** Tiêu chí của bậc. */
  criterion: string;
}

export interface LadderResult {
  /** Bậc cao nhất đạt liên tục từ bậc 1 (0 = chưa đạt bậc nào). */
  reached: number;
  steps: LadderStep[];
  /** Chưa đủ dữ liệu để đánh giá (quá ít hoạt động). */
  insufficient: boolean;
}

function ladder(levels: readonly DomainLevelInfo[], checks: { met: boolean; evidence: string; criterion: string }[], insufficient: boolean): LadderResult {
  const steps = levels.map((l, i) => ({ code: l.code, level: l.level, nameVi: l.nameVi, ...checks[i] }));
  let reached = 0;
  for (const s of steps) {
    if (!s.met) break;
    reached = s.level;
  }
  return { reached, steps, insufficient };
}

const pct = (x: number) => `${Math.round(x * 100)}%`;

// ---------------------------------------------------------------------------
// Miền kỹ năng — kỹ năng làm bài (Dave)
// ---------------------------------------------------------------------------

/** Ngưỡng của từng bậc kỹ năng làm bài (nhóm có thể chỉnh). */
export const PSYCHOMOTOR_RULES = {
  /** P1: số câu luyện tối thiểu (làm theo mẫu / gợi ý). */
  imitationMinAnswers: 20,
  /** P2: số câu làm trong điều kiện có giờ. */
  manipulationMinTimed: 20,
  /** P3: số câu Đọc có giờ đo được thời gian để xét nhịp. */
  precisionMinReading: 30,
  /** P3: tỷ lệ câu Đọc xong trong thời gian chuẩn của Part. */
  precisionOnPaceShare: 0.7,
  /** P3: tỷ lệ đoán mò (< 8 giây) tối đa. */
  precisionMaxGuessShare: 0.05,
  /** P4: một đề đầy đủ được tính khi có ít nhất chừng này câu, đủ cả Nghe và Đọc. */
  fullTestMinAnswers: 100,
  /** P5: số đề đầy đủ tối thiểu. */
  naturalizationMinTests: 2,
  /** P5: tỷ lệ câu Đọc đúng nhịp. */
  naturalizationOnPaceShare: 0.85,
} as const;

export interface PacingStats {
  practiceAnswers: number;
  timedAnswers: number;
  readingTimed: number;
  readingOnPace: number;
  onPaceShare: number;
  guessShare: number;
  /** Số đề đầy đủ (Mock) có cả Nghe và Đọc. */
  fullTests: number;
}

const READING = new Set(["PART5", "PART6", "PART7"]);

export function pacingStats(attempts: BloomAttempt[]): PacingStats {
  const questions = attempts.filter((a) => a.source !== "flashcard" && a.isCorrect !== null);
  const { kept, counts } = filterNoise(questions);
  const timed = kept.filter((a) => a.mode !== "practice");
  const reading = timed.filter((a) => a.part && READING.has(a.part) && a.timeSpentSec !== null && a.timeSpentSec > 0);
  const onPace = reading.filter((a) => {
    const std = PART_STANDARD_SECONDS[a.part!];
    return std !== null && a.timeSpentSec! <= std;
  }).length;

  const sessions = new Map<string, { n: number; listening: boolean; reading: boolean }>();
  for (const a of questions) {
    if (a.mode !== "mock" || !a.sessionId || !a.part) continue;
    const s = sessions.get(a.sessionId) ?? { n: 0, listening: false, reading: false };
    s.n++;
    if (READING.has(a.part)) s.reading = true;
    else s.listening = true;
    sessions.set(a.sessionId, s);
  }
  const fullTests = [...sessions.values()].filter((s) => s.n >= PSYCHOMOTOR_RULES.fullTestMinAnswers && s.listening && s.reading).length;
  const readingAll = questions.filter((a) => a.part && READING.has(a.part) && a.timeSpentSec !== null && a.timeSpentSec > 0).length;

  return {
    practiceAnswers: kept.filter((a) => a.mode === "practice").length,
    timedAnswers: timed.length,
    readingTimed: reading.length,
    readingOnPace: onPace,
    onPaceShare: reading.length ? onPace / reading.length : 0,
    guessShare: readingAll ? counts.guess / readingAll : 0,
    fullTests,
  };
}

export function psychomotorLadder(stats: PacingStats, behavior: Pick<EvaluateBehavior, "mockSpread">): LadderResult {
  const R = PSYCHOMOTOR_RULES;
  const total = stats.practiceAnswers + stats.timedAnswers;
  return ladder(
    PSYCHOMOTOR_LEVELS,
    [
      { met: total >= R.imitationMinAnswers, criterion: `Làm ít nhất ${R.imitationMinAnswers} câu luyện theo mẫu`, evidence: `${total} câu đã làm` },
      { met: stats.timedAnswers >= R.manipulationMinTimed, criterion: `Làm ít nhất ${R.manipulationMinTimed} câu có tính giờ (đề theo Part, Mock, Gate)`, evidence: `${stats.timedAnswers} câu có giờ` },
      {
        met: stats.readingTimed >= R.precisionMinReading && stats.onPaceShare >= R.precisionOnPaceShare && stats.guessShare <= R.precisionMaxGuessShare,
        criterion: `Ít nhất ${pct(R.precisionOnPaceShare)} câu Đọc xong trong thời gian chuẩn (trên ≥ ${R.precisionMinReading} câu), đoán mò ≤ ${pct(R.precisionMaxGuessShare)}`,
        evidence: `${stats.readingTimed} câu Đọc có giờ · ${pct(stats.onPaceShare)} đúng nhịp · ${pct(stats.guessShare)} đoán mò`,
      },
      { met: stats.fullTests >= 1, criterion: "Hoàn thành ít nhất 1 đề đầy đủ phối hợp Nghe + Đọc", evidence: `${stats.fullTests} đề đầy đủ` },
      {
        met: stats.fullTests >= R.naturalizationMinTests && behavior.mockSpread !== null && behavior.mockSpread <= MOCK_STABILITY_MAX_SPREAD && stats.onPaceShare >= R.naturalizationOnPaceShare,
        criterion: `≥ ${R.naturalizationMinTests} đề đầy đủ, điểm chênh ≤ ${pct(MOCK_STABILITY_MAX_SPREAD)}, ≥ ${pct(R.naturalizationOnPaceShare)} câu Đọc đúng nhịp`,
        evidence: behavior.mockSpread === null ? "Chưa đủ đề để xét độ ổn định" : `Điểm các đề chênh ${pct(behavior.mockSpread)} · ${pct(stats.onPaceShare)} đúng nhịp`,
      },
    ],
    total < R.imitationMinAnswers,
  );
}

// ---------------------------------------------------------------------------
// Miền thái độ (Krathwohl)
// ---------------------------------------------------------------------------

export const AFFECTIVE_RULES = {
  /** Số câu đã làm tối thiểu trước khi đánh giá thái độ. */
  minAnswered: 20,
  /** A1: tỷ lệ câu sai có mở xem giải thích. */
  receivingExplanationShare: 0.3,
  /** A2: số ngày có học trong 30 ngày gần nhất. */
  respondingActiveDays: 8,
  /** A3: số câu làm lại lỗi sai (Ôn lỗi sai)… */
  valuingMistakeDrills: 20,
  /** …hoặc tỷ lệ so với số câu sai. */
  valuingDrillShare: 0.3,
  /** A4: số ngày lộ trình (Mentor hoặc từ vựng) đã hoàn thành. */
  organizationPathDays: 5,
  /** A5: chuỗi ngày học dài nhất. */
  characterizationStreak: 14,
  /** A5: tỷ lệ tối đa câu đoán mò + xem đáp án trước. */
  characterizationMaxDishonestShare: 0.05,
} as const;

/** Tín hiệu hành vi đọc từ DB (evidence.ts → loadDomainSignals). */
export interface AffectiveSignals {
  activeDays30d: number;
  longestStreak: number;
  currentStreak: number;
  mistakeDrills: number;
  pathDaysCompleted: number;
}

export interface AnswerSummary {
  answered: number;
  wrong: number;
  explanationViews: number;
  noise: Record<NoiseReason, number>;
}

export function affectiveLadder(s: AffectiveSignals, a: AnswerSummary): LadderResult {
  const R = AFFECTIVE_RULES;
  const explShare = a.wrong ? Math.min(1, a.explanationViews / a.wrong) : a.answered >= R.minAnswered ? 1 : 0;
  const drillShare = a.wrong ? s.mistakeDrills / a.wrong : 0;
  const dishonest = a.answered + a.noise.guess + a.noise.revealed ? (a.noise.guess + a.noise.revealed) / (a.answered + a.noise.guess + a.noise.revealed) : 0;
  return ladder(
    AFFECTIVE_LEVELS,
    [
      { met: a.answered >= R.minAnswered && explShare >= R.receivingExplanationShare, criterion: `Xem giải thích ở ít nhất ${pct(R.receivingExplanationShare)} số câu làm sai`, evidence: `${a.explanationViews} lượt xem giải thích / ${a.wrong} câu sai` },
      { met: s.activeDays30d >= R.respondingActiveDays, criterion: `Học ít nhất ${R.respondingActiveDays} ngày trong 30 ngày gần nhất`, evidence: `${s.activeDays30d} ngày có học` },
      {
        met: s.mistakeDrills >= R.valuingMistakeDrills || (a.wrong > 0 && drillShare >= R.valuingDrillShare),
        criterion: `Làm lại ít nhất ${R.valuingMistakeDrills} câu đã sai (hoặc ${pct(R.valuingDrillShare)} số câu sai)`,
        evidence: `${s.mistakeDrills} câu đã làm lại`,
      },
      { met: s.pathDaysCompleted >= R.organizationPathDays, criterion: `Hoàn thành ít nhất ${R.organizationPathDays} ngày của một lộ trình học`, evidence: `${s.pathDaysCompleted} ngày lộ trình đã xong` },
      {
        met: s.longestStreak >= R.characterizationStreak && dishonest <= R.characterizationMaxDishonestShare,
        criterion: `Chuỗi học ≥ ${R.characterizationStreak} ngày và đoán mò / xem đáp án trước ≤ ${pct(R.characterizationMaxDishonestShare)}`,
        evidence: `Chuỗi dài nhất ${s.longestStreak} ngày · ${pct(dishonest)} câu đoán mò / xem trước`,
      },
    ],
    a.answered < R.minAnswered && s.activeDays30d === 0,
  );
}

// ---------------------------------------------------------------------------
// Bậc 6 — Sáng tạo: chấm sản phẩm "kế hoạch ôn luyện tự xây" bằng rubric
// ---------------------------------------------------------------------------

/** Tín hiệu sản phẩm bậc 6 đọc từ DB. */
export interface CreateSignals {
  hasLearningPath: boolean;
  hasExamDate: boolean;
  hasStudyPreference: boolean;
  bookmarkedQuestions: number;
  notedBookmarks: number;
}

export const CREATE_RULES = { minBookmarks: 10, minNotes: 3 } as const;

export interface CreateCriterion {
  key: string;
  label: string;
  met: boolean;
  evidence: string;
}

/**
 * Rubric bậc Sáng tạo: mỗi tiêu chí sản phẩm đạt cộng một mức (0–1 tiêu chí
 * = mức 1 … đủ 5 tiêu chí = mức 5). Không vào điểm Bloom — chỉ để người học
 * thấy mình đã tự “thiết kế” việc học tới đâu.
 */
export function createCriteria(s: CreateSignals): CreateCriterion[] {
  return [
    { key: "goal", label: "Lập kế hoạch có mục tiêu điểm (tạo lộ trình học)", met: s.hasLearningPath, evidence: s.hasLearningPath ? "Đã có lộ trình" : "Chưa có lộ trình" },
    { key: "deadline", label: "Đặt mốc thời gian (ngày thi dự kiến)", met: s.hasExamDate, evidence: s.hasExamDate ? "Đã đặt ngày thi" : "Chưa đặt ngày thi" },
    { key: "prefs", label: "Tự chọn cách học (thiết lập tùy chọn học tập)", met: s.hasStudyPreference, evidence: s.hasStudyPreference ? "Đã thiết lập" : "Chưa thiết lập" },
    { key: "bank", label: `Xây bộ câu tự lưu (≥ ${CREATE_RULES.minBookmarks} câu)`, met: s.bookmarkedQuestions >= CREATE_RULES.minBookmarks, evidence: `${s.bookmarkedQuestions} câu đã lưu` },
    { key: "strategy", label: `Tự ghi chiến thuật cho câu đã lưu (≥ ${CREATE_RULES.minNotes} ghi chú)`, met: s.notedBookmarks >= CREATE_RULES.minNotes, evidence: `${s.notedBookmarks} ghi chú` },
  ];
}
