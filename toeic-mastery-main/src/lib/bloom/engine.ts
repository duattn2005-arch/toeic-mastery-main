/**
 * ĐỘNG CƠ CHƯNG CẤT THEO BLOOM — hàm thuần (không DB, không UI).
 *
 * Đầu vào là danh sách lần trả lời đã chuẩn hóa (BloomAttempt, xem
 * evidence.ts cho cách nạp từ 4 nguồn: bài làm, bài kiểm tra Mentor, bài
 * luyện nhanh, flashcard). Đầu ra trả lời câu hỏi: người học đang VỮNG hay
 * HỔNG ở bậc tư duy nào, của nhãn kiến thức nào.
 *
 * Hai nguyên tắc cốt lõi:
 *  - MASTERY LEARNING: một ô / một bậc chỉ “vững” khi đạt ≥ MASTERY_THRESHOLD
 *    trên đủ MIN_ATTEMPTS_PER_CELL câu khác nhau.
 *  - NGUYÊN TẮC TẦNG: trong mỗi nhãn, bậc được phép luyện là bậc thấp nhất
 *    chưa vững (frontierLevel) — không đẩy lên bậc cao khi bậc dưới còn hổng.
 *
 * Các chỗ chặn kẽ hở dữ liệu:
 *  - câu bỏ trống không tính; câu xem đáp án TRƯỚC khi chọn bị loại; xem
 *    đáp án sau khi chọn thì chấm theo lựa chọn đầu tiên (lần làm thật);
 *  - câu Đọc quá nhanh/quá lâu bị loại (đoán mò / mất tập trung) và đếm riêng;
 *  - câu đúng nhờ gợi ý chỉ được HINT_CREDIT; làm lại câu đã từng đúng chỉ
 *    được REPEAT_CORRECT_CREDIT; mỗi câu chỉ là MỘT điểm dữ liệu trong ô;
 *  - từ bậc 3, ô chỉ Xanh khi có đủ câu làm có giờ (Vận dụng đúng thời gian);
 *  - tín hiệu không đo được (thời gian, gợi ý) = null → luật liên quan tự bỏ qua.
 */
import {
  CELL_RECENT_WINDOW,
  EVALUATE_MAX_RIGHT_TO_WRONG_SHARE,
  HINT_CREDIT,
  INFER_FROM_HIGHER_MIN_ATTEMPTS,
  LEVEL_TO_TIER,
  MASTERY_STALE_DAYS,
  MASTERY_THRESHOLD,
  MIN_ATTEMPTS_PER_CELL,
  MIN_TIMED_SHARE,
  MOCK_STABILITY_MAX_SPREAD,
  MOCK_STABILITY_MIN_TESTS,
  NOISE_MAX_SECONDS,
  NOISE_MIN_SECONDS,
  NOISE_TIMED_SKILLS,
  PART_STANDARD_SECONDS,
  REPEAT_CORRECT_CREDIT,
  SCORED_LEVELS,
  SPEED_BONUS_MAX,
  TIER_LEVELS,
  TIMED_EVIDENCE_FROM_LEVEL,
  TRAP_PENALTY,
  TRAP_PENALTY_MAX,
  statusForScore,
  type CellStatus,
  type ScoredBloomLevel,
  type Tier,
  type TrapType,
} from "./config";
import type { KnowledgeLabel, QuestionPart } from "./classify";

export type AttemptMode = "practice" | "timed" | "mock" | "placement" | "gate";
export type AttemptSource = "attempt" | "mentor_test" | "practice" | "flashcard";

/** Một lần trả lời, đã chuẩn hóa từ mọi nguồn. */
export interface BloomAttempt {
  questionId: string;
  /** null cho hoạt động không phải câu hỏi (flashcard). */
  part: QuestionPart | null;
  knowledgeLabel: KnowledgeLabel;
  bloomLevel: ScoredBloomLevel;
  /** null = bỏ trống / chưa trả lời → không tính. */
  isCorrect: boolean | null;
  selectedAnswer: string | null;
  firstAnswer: string | null;
  answerChanged: boolean;
  changedFromCorrectToWrong: boolean;
  /** null = không đo được thời gian. */
  timeSpentSec: number | null;
  /** null = không đo được gợi ý. */
  hintUsedCount: number | null;
  trapTypeHit: TrapType | null;
  /** Đã xem đáp án/giải thích TRƯỚC khi chọn lần đầu (null = không biết). */
  revealedBeforeAnswer: boolean | null;
  /** Đã xem giải thích của câu (tín hiệu phụ bậc 2, không tính vào độ chính xác). */
  explanationViewed: boolean;
  mode: AttemptMode;
  /** epoch ms */
  timestamp: number;
  source: AttemptSource;
  /** Lần làm này thuộc bài nào (để tính độ ổn định Mock test). */
  sessionId?: string | null;
}

// ---------------------------------------------------------------------------
// Lượt trả lời có được tính không, tính bao nhiêu
// ---------------------------------------------------------------------------

export type NoiseReason = "guess" | "stuck" | "revealed" | "skipped";

const isReadingPart = (part: QuestionPart | null) => part === "PART5" || part === "PART6" || part === "PART7";
const skillOf = (part: QuestionPart | null) => (part === null ? null : isReadingPart(part) ? "READING" : "LISTENING");
const hasTime = (a: BloomAttempt) => a.timeSpentSec !== null && a.timeSpentSec > 0;

/** Lý do loại một lượt khỏi điểm năng lực (null = giữ). */
export function noiseReasonOf(a: BloomAttempt): NoiseReason | null {
  if (a.isCorrect === null) return "skipped";
  if (a.revealedBeforeAnswer === true) return "revealed";
  const skill = skillOf(a.part);
  if (skill && (NOISE_TIMED_SKILLS as readonly string[]).includes(skill) && hasTime(a)) {
    if (a.timeSpentSec! < NOISE_MIN_SECONDS) return "guess";
    if (a.timeSpentSec! > NOISE_MAX_SECONDS) return "stuck";
  }
  return null;
}

/** Phần điểm một lượt đã giữ lại đóng góp (0–1), chưa tính làm lại. */
export function creditOf(a: BloomAttempt): number {
  if (!a.isCorrect) return 0;
  return a.hintUsedCount !== null && a.hintUsedCount > 0 ? HINT_CREDIT : 1;
}

export interface NoiseResult {
  kept: BloomAttempt[];
  removed: { attempt: BloomAttempt; reason: NoiseReason }[];
  counts: Record<NoiseReason, number>;
}

/** Loại lượt bỏ trống, xem đáp án trước, đoán mò, ngâm câu — trả kèm số lượng theo lý do (đây cũng là tín hiệu hành vi). */
export function filterNoise(attempts: BloomAttempt[]): NoiseResult {
  const kept: BloomAttempt[] = [];
  const removed: NoiseResult["removed"] = [];
  const counts: Record<NoiseReason, number> = { guess: 0, stuck: 0, revealed: 0, skipped: 0 };
  for (const a of attempts) {
    const reason = noiseReasonOf(a);
    if (reason) {
      removed.push({ attempt: a, reason });
      counts[reason]++;
    } else kept.push(a);
  }
  return { kept, removed, counts };
}

// ---------------------------------------------------------------------------
// Gom nhóm
// ---------------------------------------------------------------------------

export type GroupedAttempts = Record<KnowledgeLabel, Partial<Record<ScoredBloomLevel, BloomAttempt[]>>>;

/** Gom theo ô (nhãn chính × bậc Bloom), giữ thứ tự thời gian. */
export function groupAttempts(attempts: BloomAttempt[]): GroupedAttempts {
  const out: GroupedAttempts = {};
  const sorted = [...attempts].sort((a, b) => a.timestamp - b.timestamp);
  for (const a of sorted) {
    const row = (out[a.knowledgeLabel] ??= {});
    (row[a.bloomLevel] ??= []).push(a);
  }
  return out;
}

// ---------------------------------------------------------------------------
// Chấm một ô
// ---------------------------------------------------------------------------

export interface CellResult {
  /** Điểm năng lực 0–1 (độ chính xác có trọng số + thưởng tốc độ − phạt bẫy). */
  score: number;
  /** Độ chính xác có trọng số trên các câu gần nhất (trước thưởng/phạt). */
  accuracy: number;
  status: CellStatus;
  /** Ô thiếu dữ liệu nhưng bậc cao hơn của cùng nhãn đã vững → coi như vững. */
  inferred: boolean;
  /** Số câu KHÁC NHAU được tính. */
  attempts: number;
  /** Tổng số lượt trả lời (kể cả bị loại). */
  answered: number;
  noiseRemoved: number;
  noise: Record<NoiseReason, number>;
  hinted: number;
  trapHits: number;
  flips: number;
  /** Tỷ lệ câu làm trong điều kiện có giờ (timed/mock/gate/placement). */
  timedShare: number;
  speedBonus: number;
  trapPenalty: number;
  explanationViews: number;
  lastAt: number | null;
  /** Xanh nhưng đã lâu không làm lại → cần xác nhận lại. */
  stale: boolean;
  /** Lý do ô bị giữ ở Vàng dù điểm đủ Xanh (vd. chưa có bằng chứng có giờ). */
  cappedReason: string | null;
}

const TIMED_MODES: ReadonlySet<AttemptMode> = new Set(["timed", "mock", "gate", "placement"]);

export function scoreCell(attempts: BloomAttempt[], now: number = Date.now()): CellResult {
  const sorted = [...attempts].sort((a, b) => a.timestamp - b.timestamp);
  const { kept, counts } = filterNoise(sorted);
  const level = sorted[0]?.bloomLevel ?? 1;

  // One data point per question: its latest kept answer. A correct answer on
  // a question already answered correctly before is partly memory.
  const latest = new Map<string, { a: BloomAttempt; repeatCorrect: boolean }>();
  const rightBefore = new Set<string>();
  for (const a of kept) {
    latest.set(a.questionId, { a, repeatCorrect: a.isCorrect === true && rightBefore.has(a.questionId) });
    if (a.isCorrect) rightBefore.add(a.questionId);
  }
  const points = [...latest.values()].sort((x, y) => x.a.timestamp - y.a.timestamp);
  const window = points.slice(-CELL_RECENT_WINDOW);

  const creditSum = window.reduce((s, p) => s + creditOf(p.a) * (p.repeatCorrect ? REPEAT_CORRECT_CREDIT : 1), 0);
  const accuracy = window.length ? creditSum / window.length : 0;

  // Speed bonus: Reading only, measured time, correct answers without hints.
  let speedBonus = 0;
  const fastPool = window.filter((p) => p.a.isCorrect && hasTime(p.a) && isReadingPart(p.a.part) && !(p.a.hintUsedCount && p.a.hintUsedCount > 0));
  if (fastPool.length >= Math.min(5, Math.ceil(window.length / 2))) {
    const ratios = fastPool.map((p) => {
      const std = PART_STANDARD_SECONDS[p.a.part!];
      return std ? Math.max(0, (std - p.a.timeSpentSec!) / std) : 0;
    });
    speedBonus = Math.min(SPEED_BONUS_MAX, (ratios.reduce((s, r) => s + r, 0) / ratios.length) * SPEED_BONUS_MAX);
  }

  // Trap penalty: picked a tagged distractor, or switched away from the right answer.
  const trapHits = window.filter((p) => p.a.trapTypeHit !== null && !p.a.isCorrect).length;
  const flips = window.filter((p) => p.a.changedFromCorrectToWrong).length;
  const trapPenalty = window.length ? Math.min(TRAP_PENALTY_MAX, ((trapHits + flips) / window.length) * TRAP_PENALTY) : 0;

  const score = Math.max(0, Math.min(1, accuracy + speedBonus - trapPenalty));
  const timedShare = points.length ? points.filter((p) => TIMED_MODES.has(p.a.mode)).length / points.length : 0;
  const lastAt = sorted.length ? sorted[sorted.length - 1].timestamp : null;

  let status: CellStatus = points.length < MIN_ATTEMPTS_PER_CELL ? "insufficient" : statusForScore(score);
  let cappedReason: string | null = null;
  if (status === "green" && level >= TIMED_EVIDENCE_FROM_LEVEL && timedShare < MIN_TIMED_SHARE) {
    status = "yellow";
    cappedReason = `Cần ít nhất ${Math.round(MIN_TIMED_SHARE * 100)}% câu làm có tính giờ để công nhận vững ở bậc này`;
  }
  const stale = status === "green" && lastAt !== null && now - lastAt > MASTERY_STALE_DAYS * 86_400_000;

  return {
    score,
    accuracy,
    status,
    inferred: false,
    attempts: points.length,
    answered: sorted.length,
    noiseRemoved: counts.guess + counts.stuck + counts.revealed,
    noise: counts,
    hinted: kept.filter((a) => a.hintUsedCount !== null && a.hintUsedCount > 0).length,
    trapHits,
    flips,
    timedShare,
    speedBonus,
    trapPenalty,
    explanationViews: sorted.filter((a) => a.explanationViewed).length,
    lastAt,
    stale,
    cappedReason,
  };
}

// ---------------------------------------------------------------------------
// Heatmap nhãn × bậc
// ---------------------------------------------------------------------------

export type BloomHeatmap = Record<KnowledgeLabel, Partial<Record<ScoredBloomLevel, CellResult>>>;

/** Một ô có được coi là đã vững để đi tiếp lên bậc trên không. */
export const isMastered = (c: CellResult | undefined) => !!c && (c.status === "green" || c.inferred);

/**
 * Ma trận { nhãn: { bậc: ô } }. Áp luôn bằng chứng ngược: ô thiếu dữ liệu
 * mà một bậc cao hơn của cùng nhãn đã Xanh (đủ câu) thì được ghi “vững
 * (suy ra)”. Ô Đỏ/Vàng thì GIỮ NGUYÊN — dữ liệu thật thắng suy luận.
 */
export function buildBloomHeatmap(attempts: BloomAttempt[], now: number = Date.now()): BloomHeatmap {
  const grouped = groupAttempts(attempts);
  const out: BloomHeatmap = {};
  for (const [label, row] of Object.entries(grouped)) {
    const cells: Partial<Record<ScoredBloomLevel, CellResult>> = {};
    for (const level of SCORED_LEVELS) {
      const list = row[level];
      if (list?.length) cells[level] = scoreCell(list, now);
    }
    for (const level of SCORED_LEVELS) {
      const c = cells[level];
      if (!c || c.status !== "insufficient") continue;
      const higherGreen = SCORED_LEVELS.some((h) => h > level && cells[h]?.status === "green" && cells[h]!.attempts >= INFER_FROM_HIGHER_MIN_ATTEMPTS);
      if (higherGreen) c.inferred = true;
    }
    out[label] = cells;
  }
  return out;
}

// ---------------------------------------------------------------------------
// Điểm từng bậc trên mọi nhãn
// ---------------------------------------------------------------------------

export interface LevelMastery {
  level: ScoredBloomLevel;
  tier: Tier;
  /** Trung bình có trọng số (theo số câu) của các ô đủ dữ liệu; null khi chưa có ô nào đủ. */
  score: number | null;
  /** Ước lượng gộp mọi câu của bậc (kể cả ô chưa đủ) — để hiển thị khi score còn null. */
  pooledAccuracy: number | null;
  attempts: number;
  cells: { green: number; yellow: number; red: number; insufficient: number; inferred: number };
  status: CellStatus;
  /** Vững bậc này: điểm ≥ ngưỡng, có ít nhất một ô đủ dữ liệu và không còn ô Đỏ nào. */
  mastered: boolean;
  /** Vì sao chưa vững (để hiển thị). */
  blockers: string[];
}

export function levelMastery(heatmap: BloomHeatmap): Record<ScoredBloomLevel, LevelMastery> {
  const out = {} as Record<ScoredBloomLevel, LevelMastery>;
  for (const level of SCORED_LEVELS) {
    const cells = Object.values(heatmap)
      .map((row) => row[level])
      .filter((c): c is CellResult => !!c);
    const sufficient = cells.filter((c) => c.status !== "insufficient");
    const weight = sufficient.reduce((s, c) => s + c.attempts, 0);
    const score = weight ? sufficient.reduce((s, c) => s + c.score * c.attempts, 0) / weight : null;
    const all = cells.reduce((s, c) => s + c.attempts, 0);
    const pooledAccuracy = all ? cells.reduce((s, c) => s + c.accuracy * c.attempts, 0) / all : null;
    const count = {
      green: cells.filter((c) => c.status === "green").length,
      yellow: cells.filter((c) => c.status === "yellow").length,
      red: cells.filter((c) => c.status === "red").length,
      insufficient: cells.filter((c) => c.status === "insufficient" && !c.inferred).length,
      inferred: cells.filter((c) => c.inferred).length,
    };
    const blockers: string[] = [];
    if (score === null) blockers.push(`Chưa có nhãn nào đủ ${MIN_ATTEMPTS_PER_CELL} câu ở bậc này`);
    else if (score < MASTERY_THRESHOLD) blockers.push(`Điểm bậc ${Math.round(score * 100)}% < ${Math.round(MASTERY_THRESHOLD * 100)}%`);
    if (count.red) blockers.push(`${count.red} nhãn đang hổng ở bậc này`);
    let status: CellStatus = score === null ? "insufficient" : statusForScore(score);
    if (status === "green" && count.red) status = "yellow";
    out[level] = { level, tier: LEVEL_TO_TIER[level], score, pooledAccuracy, attempts: all, cells: count, status, mastered: blockers.length === 0, blockers };
  }
  return out;
}

// ---------------------------------------------------------------------------
// Nguyên tắc tầng
// ---------------------------------------------------------------------------

export interface Frontier {
  /** Bậc thấp nhất chưa vững — bậc được phép (và nên) luyện; null khi mọi bậc có dữ liệu đều vững. */
  level: ScoredBloomLevel | null;
  /** Bậc cao nhất được phép ra đề cho nhãn này. */
  maxAllowed: ScoredBloomLevel;
  cell: CellResult | null;
}

/**
 * Bậc “rìa” của một nhãn: bậc thấp nhất (trong các bậc mà ngân hàng có câu
 * cho nhãn này — `available`) chưa vững. Không được ra đề cao hơn bậc này.
 */
export function frontierLevel(row: Partial<Record<ScoredBloomLevel, CellResult>> | undefined, available: readonly ScoredBloomLevel[] = SCORED_LEVELS): Frontier {
  const levels = [...available].sort((a, b) => a - b);
  for (const level of levels) {
    const c = row?.[level];
    if (!isMastered(c)) return { level, maxAllowed: level, cell: c ?? null };
  }
  const top = levels[levels.length - 1] ?? 5;
  return { level: null, maxAllowed: top, cell: null };
}

/** Bậc cao nhất được phép ra đề cho nhãn — gọn cho chỗ chỉ cần con số. */
export const allowedMaxLevel = (row: Partial<Record<ScoredBloomLevel, CellResult>> | undefined, available?: readonly ScoredBloomLevel[]) => frontierLevel(row, available).maxAllowed;

// ---------------------------------------------------------------------------
// Bậc 5 — hành vi đánh giá / ra quyết định
// ---------------------------------------------------------------------------

export interface EvaluateBehavior {
  /** Số câu bậc 4–5 đã trả lời (không tính nhiễu). */
  answered: number;
  rightToWrong: number;
  wrongToRight: number;
  rightToWrongShare: number;
  /** Độ chính xác các Mock test gần nhất (mới nhất sau cùng). */
  mockAccuracies: number[];
  /** Chênh lệch lớn nhất giữa các Mock gần nhất; null khi chưa đủ Mock. */
  mockSpread: number | null;
  decisionOk: boolean;
  stabilityOk: boolean | null;
}

export function evaluateBehavior(attempts: BloomAttempt[]): EvaluateBehavior {
  const { kept } = filterNoise(attempts);
  const high = kept.filter((a) => a.bloomLevel >= 4);
  const rightToWrong = high.filter((a) => a.changedFromCorrectToWrong).length;
  const wrongToRight = high.filter((a) => a.answerChanged && a.isCorrect && a.firstAnswer !== null && a.firstAnswer !== a.selectedAnswer).length;
  const rightToWrongShare = high.length ? rightToWrong / high.length : 0;

  const bySession = new Map<string, { at: number; right: number; total: number }>();
  for (const a of kept) {
    if (a.mode !== "mock" || !a.sessionId) continue;
    const s = bySession.get(a.sessionId) ?? { at: a.timestamp, right: 0, total: 0 };
    s.at = Math.max(s.at, a.timestamp);
    s.total++;
    if (a.isCorrect) s.right++;
    bySession.set(a.sessionId, s);
  }
  const mockAccuracies = [...bySession.values()]
    .filter((s) => s.total >= 20)
    .sort((x, y) => x.at - y.at)
    .slice(-3)
    .map((s) => s.right / s.total);
  const mockSpread = mockAccuracies.length >= MOCK_STABILITY_MIN_TESTS ? Math.max(...mockAccuracies) - Math.min(...mockAccuracies) : null;

  return {
    answered: high.length,
    rightToWrong,
    wrongToRight,
    rightToWrongShare,
    mockAccuracies,
    mockSpread,
    decisionOk: rightToWrongShare <= EVALUATE_MAX_RIGHT_TO_WRONG_SHARE,
    stabilityOk: mockSpread === null ? null : mockSpread <= MOCK_STABILITY_MAX_SPREAD,
  };
}

/** Bậc 5 chỉ vững khi người học còn ra quyết định ổn định (không đổi đúng → sai, điểm Mock không chập chờn). */
export function applyEvaluateBehavior(levels: Record<ScoredBloomLevel, LevelMastery>, behavior: EvaluateBehavior): Record<ScoredBloomLevel, LevelMastery> {
  const l5 = levels[5];
  const blockers = [...l5.blockers];
  if (!behavior.decisionOk) blockers.push(`${Math.round(behavior.rightToWrongShare * 100)}% câu bậc 4–5 bị đổi từ đúng sang sai`);
  if (behavior.stabilityOk === false) blockers.push(`Điểm các Mock test gần nhất chênh ${Math.round((behavior.mockSpread ?? 0) * 100)}%`);
  const status = blockers.length > l5.blockers.length && l5.status === "green" ? "yellow" : l5.status;
  return { ...levels, 5: { ...l5, blockers, status, mastered: blockers.length === 0 } };
}

// ---------------------------------------------------------------------------
// Cấp B / I / A theo bậc
// ---------------------------------------------------------------------------

export interface TierProgress {
  /** Cấp cao nhất đã vững trọn (mọi bậc của cấp và các cấp dưới). */
  reached: Exclude<Tier, "OUTPUT"> | null;
  /** Cấp đang học (cấp thấp nhất chưa vững trọn). */
  working: Exclude<Tier, "OUTPUT"> | null;
  /** Các bậc còn thiếu của cấp đang học. */
  missing: ScoredBloomLevel[];
  /** Bậc thấp nhất chưa vững trên toàn bộ người học. */
  frontier: ScoredBloomLevel | null;
}

export function tierProgress(levels: Record<ScoredBloomLevel, LevelMastery>): TierProgress {
  const order: Exclude<Tier, "OUTPUT">[] = ["B", "I", "A"];
  let reached: TierProgress["reached"] = null;
  for (const tier of order) {
    const missing = TIER_LEVELS[tier].filter((l) => !levels[l].mastered);
    if (missing.length) {
      const frontier = SCORED_LEVELS.find((l) => !levels[l].mastered) ?? null;
      return { reached, working: tier, missing, frontier };
    }
    reached = tier;
  }
  return { reached, working: null, missing: [], frontier: null };
}

// ---------------------------------------------------------------------------
// Gói kết quả
// ---------------------------------------------------------------------------

export interface BloomProfile {
  heatmap: BloomHeatmap;
  levels: Record<ScoredBloomLevel, LevelMastery>;
  tier: TierProgress;
  behavior: EvaluateBehavior;
  noise: Record<NoiseReason, number>;
  totalAnswered: number;
  /** Tín hiệu phụ bậc 2: số lần xem giải thích. */
  explanationViews: number;
  hintsUsed: number;
}

export function buildBloomProfile(attempts: BloomAttempt[], now: number = Date.now()): BloomProfile {
  const heatmap = buildBloomHeatmap(attempts, now);
  const behavior = evaluateBehavior(attempts);
  const levels = applyEvaluateBehavior(levelMastery(heatmap), behavior);
  const { counts } = filterNoise(attempts);
  return {
    heatmap,
    levels,
    tier: tierProgress(levels),
    behavior,
    noise: counts,
    totalAnswered: attempts.filter((a) => a.isCorrect !== null && a.source !== "flashcard").length,
    explanationViews: attempts.filter((a) => a.explanationViewed).length,
    hintsUsed: attempts.reduce((s, a) => s + (a.hintUsedCount ?? 0), 0),
  };
}
