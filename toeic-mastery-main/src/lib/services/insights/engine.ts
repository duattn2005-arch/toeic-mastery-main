import "server-only";
import { db } from "@/lib/db";
import { MENTOR_LEVEL_LABEL_VI, PART_META, TEST_PARTS } from "@/lib/constants/toeic";
import { GATE_PASS_THRESHOLD, HONG_LABEL_THRESHOLD, isEligibleForLevelGate } from "@/lib/services/mentor/level-gate";
import { computeStaminaCurve, type StaminaBlock } from "@/lib/services/mentor/advanced-readiness";
import type { Difficulty, MentorLevel, TestPart } from "@/generated/prisma/enums";

/**
 * The learning-insights pipeline behind /analytics — the "chưng cất dữ liệu"
 * flow of the B/I/A mentor docs (docs/ai-mentor-architecture.md), run on
 * every answer a learner has submitted:
 *
 *  1. Gom nhóm — group answers by Part, grammar topic (nhãn kiến thức) and
 *     strategic label (nhãn chiến lược), plus difficulty and single questions.
 *  2. Lọc nhiễu — Reading answers under 8 s (đoán mò) or over 2.5 min (ngâm
 *     câu / bỏ máy) are left out of a label's score, counted separately.
 *  3. Chấm điểm — per label: accuracy on its most recent clean answers,
 *     + a small speed bonus − a penalty for switching away from right
 *     answers (same formula as the mentor's competency heatmap), and a
 *     status: Đạt ≥70% / Cận đạt 50–69% / Hổng <50%, judged only once
 *     there are LABEL_MIN_SAMPLE answers.
 *  4. Phân luồng — read the whole map against the docs' thresholds and pick
 *     a branch (đang thu thập / sẵn sàng / tinh chỉnh / tái cấu trúc) with a
 *     concrete step-by-step plan, each step a practice set this app can
 *     generate (actions/weakness-practice.ts) or a lesson/test to open.
 *
 * Only questions actually answered count toward accuracy; skipped ones are
 * reported on their own (they used to drag every Part down to a few %).
 */

/** Accuracy a learner should reach on a skill before calling it solid. */
export const TARGET_ACCURACY = GATE_PASS_THRESHOLD;
/** "Đạt" bar for one label (Cấp B mục 4). */
export const LABEL_PASS = 0.7;
/** Fewer answers than this is too little to flag a weakness at all. */
export const MIN_SAMPLE = 5;
/** A label's status is only judged with this many answers (Cấp B mục 4). */
export const LABEL_MIN_SAMPLE = 10;
/** "Độ chính xác gần nhất": a label is scored on its latest answers. */
const RECENT_WINDOW = 20;
/** Reading answers faster than this look like guesses (đoán mò). */
const RUSH_SEC = 8;
/** Reading answers slower than this lost focus or got stuck. */
const STUCK_SEC = 150;
/** Roughly what one more right answer is worth on the 10–990 scale. */
const POINTS_PER_QUESTION = 5;
const MAX_SPEED_BONUS = 0.05;
const MAX_TRAP_PENALTY = 0.15;
/** Below this many answers there's nothing to route on yet. */
const ROUTING_MIN_ANSWERS = 40;

export type Band = "weak" | "fair" | "strong";
export type LabelStatus = "pass" | "near" | "gap" | "unknown";
export type DimensionKind = "part" | "grammar" | "strategy";

export interface SkillStat {
  kind: DimensionKind;
  key: string;
  title: string;
  /** For grammar/strategy: the Part(s) these questions come from. */
  parts: TestPart[];
  attempted: number;
  correct: number;
  /** Accuracy over every clean (noise-filtered) answer. */
  accuracy: number;
  /** Accuracy over the latest RECENT_WINDOW clean answers. */
  recentAccuracy: number;
  /** Weighted competency 0–1: recent accuracy + speed bonus − switch penalty. */
  score: number;
  band: Band;
  status: LabelStatus;
  /** Answers left out as guesses / stuck. */
  noise: number;
  /** Times the first pick was right and the final one wrong. */
  flips: number;
}

export interface PartInsight extends SkillStat {
  part: TestPart;
  skill: "LISTENING" | "READING";
  skipped: number;
  skipRate: number;
  /** Average seconds per clean Reading answer (null for Listening). */
  avgSec: number | null;
  targetSec: number;
  pace: "fast" | "ok" | "slow" | null;
  /** Last answers vs the ones before them, when there are enough of both. */
  trend: { recent: number; before: number; delta: number } | null;
}

export interface Weakness extends SkillStat {
  id: string;
  /** One-line diagnosis. */
  headline: string;
  /** What the data shows, sentence by sentence. */
  findings: string[];
  /** What to do about it. */
  advice: string[];
  /** TOEIC points within reach if this skill reached TARGET_ACCURACY. */
  pointsGain: number;
  /** Enough answers for the docs' per-label bar — otherwise an early signal. */
  confident: boolean;
}

export interface MistakeQuestion {
  questionId: string;
  part: TestPart;
  prompt: string;
  testTitle: string | null;
  wrongCount: number;
  lastAttemptId: string;
  lastPicked: string | null;
  correctLabel: string;
}

export type PracticeTarget =
  | { kind: DimensionKind; key: string; foundation?: boolean }
  | { kind: "mix"; foundation?: boolean }
  | { kind: "mistakes" };

export type PlanAction = { type: "practice"; target: PracticeTarget; label: string } | { type: "link"; href: string; label: string };

export interface PlanStep {
  title: string;
  detail: string;
  action: PlanAction | null;
}

export type RoutingBranch = "collecting" | "ready" | "refine" | "rebuild";

export interface Alert {
  tone: "warn" | "info" | "good";
  title: string;
  detail: string;
}

export interface Routing {
  level: MentorLevel;
  levelLabel: string;
  branch: RoutingBranch;
  title: string;
  description: string;
  /** Requirements for the next level (or for the real exam, at Cấp A). */
  checklist: { label: string; ok: boolean; detail: string }[];
  /** Share of the checklist met, 0–1. */
  readiness: number;
  plan: PlanStep[];
}

export interface LearningInsights {
  answered: number;
  correct: number;
  /** Accuracy over clean answers (what the routing reads). */
  accuracy: number;
  rawAccuracy: number;
  skipped: number;
  noise: { guessed: number; stuck: number };
  parts: PartInsight[];
  grammar: SkillStat[];
  strategies: SkillStat[];
  difficulty: { level: Difficulty; attempted: number; accuracy: number }[];
  behaviors: {
    rightToWrong: number;
    wrongToRight: number;
    /** Answers whose final pick differs from the first one. */
    changed: number;
    rushedWrong: number;
    stuck: number;
    readingAnswered: number;
  };
  /** Latest full test, cut into 30-minute blocks (null without one). */
  stamina: { attemptId: string; testTitle: string; blocks: StaminaBlock[]; dropRatio: number | null; hasCliff: boolean } | null;
  weaknesses: Weakness[];
  strengths: SkillStat[];
  /** Questions whose latest answer is still wrong, worst first. */
  openMistakes: MistakeQuestion[];
  /** Vocabulary that keeps showing up in the questions they miss. */
  focusVocabulary: { word: string; misses: number }[];
  alerts: Alert[];
  routing: Routing;
  /** One-paragraph overall reading. */
  summary: string;
}

export function bandOf(accuracy: number): Band {
  if (accuracy < HONG_LABEL_THRESHOLD) return "weak";
  if (accuracy < LABEL_PASS) return "fair";
  return "strong";
}

function statusOf(attempted: number, score: number): LabelStatus {
  if (attempted < LABEL_MIN_SAMPLE) return "unknown";
  if (score < HONG_LABEL_THRESHOLD) return "gap";
  if (score < LABEL_PASS) return "near";
  return "pass";
}

export const STATUS_LABEL: Record<LabelStatus, string> = { pass: "Đạt", near: "Cận đạt", gap: "Hổng", unknown: "Chưa đủ dữ liệu" };

const pct = (x: number) => `${Math.round(x * 100)}%`;
const PART_ADVICE: Record<TestPart, string[]> = {
  PART1: ["Trước khi nghe, nhìn tranh và tự gọi tên người, vật, hành động chính.", "Cẩn thận đáp án nghe giống âm nhưng sai nghĩa và câu mô tả trạng thái (đang được làm / đã được đặt)."],
  PART2: ["Tập trung nghe 1–2 từ đầu câu hỏi (Who/When/Where/Why/How) — đó là chìa khóa chọn đáp án.", "Loại ngay đáp án lặp lại từ trong câu hỏi; câu trả lời gián tiếp thường là đáp án đúng."],
  PART3: ["Đọc trước 3 câu hỏi và gạch từ khóa trong lúc đoạn hội thoại trước đang đọc câu hỏi.", "Đáp án thường được diễn đạt lại (paraphrase), không lặp nguyên văn — nghe ý, đừng bắt từ."],
  PART4: ["Đọc trước câu hỏi, đoán loại bài nói (thông báo, quảng cáo, tin nhắn) để biết thông tin sẽ xuất hiện theo thứ tự nào.", "Chú ý các câu hỏi về mục đích ở đầu bài và yêu cầu/hành động tiếp theo ở cuối bài."],
  PART5: ["Xác định nhanh câu hỏi về ngữ pháp (từ loại, thì, giới từ) hay từ vựng trước khi đọc cả câu.", "Ôn lại các chủ điểm ngữ pháp sai nhiều nhất bên dưới, mỗi chủ điểm có bài luyện riêng."],
  PART6: ["Đọc câu trước và sau chỗ trống — Part 6 kiểm tra mạch văn, không chỉ một câu.", "Với câu chèn câu, tìm từ nối và đại từ trỏ ngược lại ý trước đó."],
  PART7: ["Đọc câu hỏi trước, rồi quét (scan) đoạn văn tìm từ khóa thay vì đọc hết từ đầu.", "Câu hỏi suy luận (NOT true, implied) để cuối; phân bổ khoảng 1 phút mỗi câu."],
};

interface AnswerRow {
  questionId: string;
  attemptId: string;
  selectedLabel: string | null;
  initialSelectedLabel: string | null;
  isCorrect: boolean | null;
  timeSpentSec: number;
  question: {
    part: TestPart;
    prompt: string;
    correctLabel: string;
    difficulty: Difficulty;
    grammarTopicSlug: string | null;
    strategicLabelSlugs: string[];
    vocabularyFocus: string[];
    test: { title: string } | null;
  };
}

const isReading = (r: AnswerRow) => PART_META[r.question.part].skill === "READING";
const isGuess = (r: AnswerRow) => isReading(r) && r.timeSpentSec > 0 && r.timeSpentSec < RUSH_SEC;
const isStuck = (r: AnswerRow) => isReading(r) && r.timeSpentSec > STUCK_SEC;
const isNoise = (r: AnswerRow) => isGuess(r) || isStuck(r);
const flipped = (r: AnswerRow) => r.initialSelectedLabel === r.question.correctLabel && r.selectedLabel !== r.question.correctLabel;
const accOf = (list: AnswerRow[]) => (list.length ? list.filter((r) => r.isCorrect).length / list.length : 0);

function stat(kind: DimensionKind, key: string, title: string, parts: TestPart[], rows: AnswerRow[]): SkillStat {
  const clean = rows.filter((r) => !isNoise(r));
  // A label made only of noise still gets judged on what there is.
  const base = clean.length >= MIN_SAMPLE ? clean : rows;
  const correct = base.filter((r) => r.isCorrect).length;
  const accuracy = base.length ? correct / base.length : 0;
  const recentAccuracy = accOf(base.slice(-RECENT_WINDOW));

  let speedBonus = 0;
  if (kind === "part" && PART_META[key as TestPart].skill === "READING") {
    const timed = clean.filter((r) => r.timeSpentSec > 0);
    if (timed.length >= MIN_SAMPLE) {
      const target = PART_META[key as TestPart].targetSeconds;
      const avg = timed.reduce((s, r) => s + r.timeSpentSec, 0) / timed.length;
      if (avg <= target) speedBonus = Math.min(MAX_SPEED_BONUS, ((target - avg) / target) * MAX_SPEED_BONUS);
    }
  }
  // Same trap penalty as the mentor's competency heatmap: right→wrong
  // switches as a share of every answer on the label.
  const flips = rows.filter(flipped).length;
  const trapPenalty = rows.length ? Math.min(MAX_TRAP_PENALTY, (flips / rows.length) * 0.5) : 0;
  const score = Math.max(0, Math.min(1, recentAccuracy + speedBonus - trapPenalty));

  return {
    kind,
    key,
    title,
    parts,
    attempted: rows.length,
    correct,
    accuracy,
    recentAccuracy,
    score,
    band: bandOf(score),
    status: statusOf(rows.length, score),
    noise: rows.length - clean.length,
    flips,
  };
}

/** Latest submitted full test (whole test, enough answers for a curve). */
async function latestFullTest(userId: string) {
  const attempts = await db.attempt.findMany({
    where: { userId, status: "SUBMITTED", questionIds: { isEmpty: true }, parts: { isEmpty: true } },
    orderBy: { submittedAt: "desc" },
    take: 5,
    select: { id: true, correctCount: true, wrongCount: true, test: { select: { title: true } } },
  });
  return attempts.find((a) => (a.correctCount ?? 0) + (a.wrongCount ?? 0) >= 60) ?? null;
}

export async function buildLearningInsights(userId: string): Promise<LearningInsights> {
  const [rows, topics, labels, profile, fullTest, vocabTotal, vocabLearned] = await Promise.all([
    db.attemptAnswer.findMany({
      where: { attempt: { userId, status: "SUBMITTED" } },
      select: {
        questionId: true,
        attemptId: true,
        selectedLabel: true,
        initialSelectedLabel: true,
        isCorrect: true,
        timeSpentSec: true,
        question: {
          select: {
            part: true,
            prompt: true,
            correctLabel: true,
            difficulty: true,
            grammarTopicSlug: true,
            strategicLabelSlugs: true,
            vocabularyFocus: true,
            test: { select: { title: true } },
          },
        },
      },
      orderBy: { updatedAt: "asc" },
    }) as Promise<AnswerRow[]>,
    db.grammarTopic.findMany({ select: { slug: true, title: true } }),
    db.strategicLabel.findMany({ select: { slug: true, title: true } }),
    db.profile.findUnique({ where: { id: userId }, select: { mentorLevel: true, targetScore: true } }),
    latestFullTest(userId),
    db.userVocabulary.count({ where: { userId } }),
    db.userVocabulary.count({ where: { userId, isLearned: true } }),
  ]);
  const answered = rows.filter((r) => r.selectedLabel !== null);
  const skippedRows = rows.filter((r) => r.selectedLabel === null);
  const clean = answered.filter((r) => !isNoise(r));
  const topicTitle = new Map(topics.map((t) => [t.slug, t.title]));
  const labelTitle = new Map(labels.map((l) => [l.slug, l.title]));

  // --- 1–3. Parts ------------------------------------------------------------
  const parts: PartInsight[] = TEST_PARTS.map((part) => {
    const meta = PART_META[part];
    const mine = answered.filter((r) => r.question.part === part);
    const skipped = skippedRows.filter((r) => r.question.part === part).length;
    const base = stat("part", part, meta.label, [part], mine);
    const timed = mine.filter((r) => r.timeSpentSec > 0 && !isNoise(r));
    const avgSec = meta.skill === "READING" && timed.length >= MIN_SAMPLE ? timed.reduce((s, r) => s + r.timeSpentSec, 0) / timed.length : null;
    const pace = avgSec === null ? null : avgSec > meta.targetSeconds * 1.3 ? "slow" : avgSec < meta.targetSeconds * 0.5 ? "fast" : "ok";
    let trend: PartInsight["trend"] = null;
    if (mine.length >= 30) {
      const window = Math.min(30, Math.floor(mine.length / 2));
      const recent = accOf(mine.slice(-window));
      const before = accOf(mine.slice(-2 * window, -window));
      trend = { recent, before, delta: recent - before };
    }
    return {
      ...base,
      part,
      skill: meta.skill,
      skipped,
      skipRate: skipped + mine.length ? skipped / (skipped + mine.length) : 0,
      avgSec: avgSec === null ? null : Math.round(avgSec),
      targetSec: meta.targetSeconds,
      pace,
      trend,
    };
  });

  // --- 1–3. Skills inside Parts ---------------------------------------------
  const groupBy = (keyOf: (r: AnswerRow) => string[]) => {
    const map = new Map<string, AnswerRow[]>();
    for (const r of answered) for (const k of keyOf(r)) map.set(k, [...(map.get(k) ?? []), r]);
    return map;
  };
  const partsOf = (list: AnswerRow[]) => [...new Set(list.map((r) => r.question.part))].sort();
  const byScore = (a: SkillStat, b: SkillStat) => a.score - b.score || b.attempted - a.attempted;
  const grammar = [...groupBy((r) => (r.question.grammarTopicSlug ? [r.question.grammarTopicSlug] : [])).entries()]
    .map(([slug, list]) => stat("grammar", slug, topicTitle.get(slug) ?? slug, partsOf(list), list))
    .sort(byScore);
  const strategies = [...groupBy((r) => r.question.strategicLabelSlugs).entries()]
    .map(([slug, list]) => stat("strategy", slug, labelTitle.get(slug) ?? slug, partsOf(list), list))
    .sort(byScore);
  const difficulty = (["EASY", "MEDIUM", "HARD"] as Difficulty[]).map((level) => {
    const list = clean.filter((r) => r.question.difficulty === level);
    return { level, attempted: list.length, accuracy: accOf(list) };
  });

  // --- How they answer -------------------------------------------------------
  const reading = answered.filter(isReading);
  const behaviors = {
    rightToWrong: answered.filter(flipped).length,
    wrongToRight: answered.filter((r) => r.initialSelectedLabel && r.initialSelectedLabel !== r.question.correctLabel && r.isCorrect).length,
    changed: answered.filter((r) => r.initialSelectedLabel && r.initialSelectedLabel !== r.selectedLabel).length,
    rushedWrong: reading.filter((r) => !r.isCorrect && isGuess(r)).length,
    stuck: reading.filter(isStuck).length,
    readingAnswered: reading.length,
  };
  const noise = { guessed: answered.filter(isGuess).length, stuck: answered.filter(isStuck).length };

  // --- Stamina curve of the latest full test --------------------------------
  let stamina: LearningInsights["stamina"] = null;
  if (fullTest) {
    const curve = await computeStaminaCurve(fullTest.id);
    if (curve && curve.blocks.length >= 2) {
      stamina = { attemptId: fullTest.id, testTitle: fullTest.test?.title ?? "Full Test", blocks: curve.blocks, dropRatio: curve.cliffDropRatio, hasCliff: curve.hasPerformanceCliff };
    }
  }

  // --- Single questions still wrong -----------------------------------------
  const byQuestion = new Map<string, AnswerRow[]>();
  for (const r of rows) byQuestion.set(r.questionId, [...(byQuestion.get(r.questionId) ?? []), r]);
  const openMistakes: MistakeQuestion[] = [];
  for (const [questionId, list] of byQuestion) {
    const last = list[list.length - 1];
    if (last.isCorrect) continue;
    openMistakes.push({
      questionId,
      part: last.question.part,
      prompt: last.question.prompt.replace(/\s+/g, " ").trim(),
      testTitle: last.question.test?.title ?? null,
      wrongCount: list.filter((r) => !r.isCorrect).length,
      lastAttemptId: last.attemptId,
      lastPicked: last.selectedLabel,
      correctLabel: last.question.correctLabel,
    });
  }
  openMistakes.sort((a, b) => b.wrongCount - a.wrongCount || (a.lastPicked === null ? 1 : 0) - (b.lastPicked === null ? 1 : 0));

  const vocabMisses = new Map<string, number>();
  for (const r of answered) if (!r.isCorrect) for (const w of r.question.vocabularyFocus) vocabMisses.set(w, (vocabMisses.get(w) ?? 0) + 1);
  const focusVocabulary = [...vocabMisses.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 16)
    .map(([word, misses]) => ({ word, misses }));

  // --- Weaknesses, ranked by what they cost ----------------------------------
  const candidates: SkillStat[] = [...parts, ...grammar, ...strategies].filter((s) => s.attempted >= MIN_SAMPLE && s.score < LABEL_PASS);
  const weight = (s: SkillStat) => (s.kind === "part" ? PART_META[s.key as TestPart].questionCount / 30 : 0.9);
  const ranked = candidates
    .map((s) => ({ s, cost: (TARGET_ACCURACY - s.score) * Math.log(1 + s.attempted) * weight(s) }))
    .sort((a, b) => b.cost - a.cost)
    .map(({ s }) => s);
  const weaknesses: Weakness[] = ranked.slice(0, 6).map((s) => describeWeakness(s, parts, answered));

  const strengths = [...parts, ...grammar, ...strategies]
    .filter((s) => s.attempted >= MIN_SAMPLE && s.score >= LABEL_PASS)
    .sort((a, b) => b.score - a.score || b.attempted - a.attempted)
    .slice(0, 5);

  const correct = answered.filter((r) => r.isCorrect).length;
  const accuracy = accOf(clean.length ? clean : answered);
  const rawAccuracy = accOf(answered);

  const alerts = buildAlerts(parts, behaviors, noise, stamina, answered.length);

  // --- 4. Phân luồng ---------------------------------------------------------
  const level = profile?.mentorLevel ?? "BEGINNER";
  const routing = await buildRouting({
    userId,
    level,
    answered: answered.length,
    accuracy,
    parts,
    grammar,
    strategies,
    weaknesses,
    behaviors,
    stamina,
    vocabRate: vocabTotal > 0 ? vocabLearned / vocabTotal : null,
    openMistakes: openMistakes.length,
    focusVocabulary: focusVocabulary.length,
  });

  return {
    answered: answered.length,
    correct,
    accuracy,
    rawAccuracy,
    skipped: skippedRows.length,
    noise,
    parts,
    grammar,
    strategies,
    difficulty,
    behaviors,
    stamina,
    weaknesses,
    strengths,
    openMistakes: openMistakes.slice(0, 40),
    focusVocabulary,
    alerts,
    routing,
    summary: summarize(answered.length, accuracy, weaknesses, strengths, behaviors, routing),
  };
}

function describeWeakness(s: SkillStat, parts: PartInsight[], answered: AnswerRow[]): Weakness {
  const findings: string[] = [
    s.recentAccuracy !== s.accuracy && s.attempted > RECENT_WINDOW
      ? `${RECENT_WINDOW} câu gần nhất đúng ${pct(s.recentAccuracy)} (cả quá trình ${pct(s.accuracy)}) — mốc cần đạt là ${pct(LABEL_PASS)}, vững là ${pct(TARGET_ACCURACY)}.`
      : `Đúng ${s.correct}/${s.attempted - s.noise} câu (${pct(s.accuracy)}) — mốc cần đạt là ${pct(LABEL_PASS)}, vững là ${pct(TARGET_ACCURACY)}.`,
  ];
  if (s.noise >= 3) findings.push(`${s.noise} câu bị loại khỏi phép tính vì làm quá nhanh (đoán) hoặc quá lâu (ngâm câu).`);
  const advice: string[] = [];
  let pointsGain: number;
  let headline: string;

  if (s.kind === "part") {
    const p = parts.find((x) => x.part === s.key)!;
    const meta = PART_META[p.part];
    headline = `${meta.shortLabel} đang là chỗ mất điểm lớn`;
    if (p.trend && Math.abs(p.trend.delta) >= 0.08) {
      findings.push(
        p.trend.delta > 0
          ? `Đang tiến bộ: các câu gần đây đúng ${pct(p.trend.recent)}, trước đó ${pct(p.trend.before)}.`
          : `Đang đi xuống: các câu gần đây chỉ đúng ${pct(p.trend.recent)}, trước đó ${pct(p.trend.before)}.`
      );
    }
    if (p.skipRate >= 0.15) findings.push(`Bỏ trống ${p.skipped} câu (${pct(p.skipRate)}) — thường do hết giờ hoặc chưa kịp nghe/đọc.`);
    if (p.pace === "slow" && p.avgSec) {
      findings.push(`Trung bình ${p.avgSec} giây/câu, chậm hơn nhịp chuẩn ${p.targetSec} giây.`);
      advice.push(`Luyện bấm giờ: đặt mục tiêu ${p.targetSec} giây mỗi câu, câu khó thì đánh dấu và quay lại sau.`);
    }
    if (p.pace === "fast" && p.avgSec) findings.push(`Trung bình chỉ ${p.avgSec} giây/câu — nhanh hơn nhiều so với nhịp ${p.targetSec} giây, dễ đọc sót.`);
    const easyWrong = answered.filter((r) => r.question.part === p.part && !r.isCorrect && r.question.difficulty === "EASY").length;
    if (easyWrong >= 3) findings.push(`Sai cả ${easyWrong} câu mức Dễ — có lỗ hổng nền tảng, không chỉ ở câu khó.`);
    advice.push(...PART_ADVICE[p.part]);
    pointsGain = Math.round(Math.max(0, TARGET_ACCURACY - s.score) * meta.questionCount) * POINTS_PER_QUESTION;
  } else {
    const where = s.parts.map((p) => PART_META[p].shortLabel).join(", ");
    headline = s.kind === "grammar" ? `Ngữ pháp: ${s.title}` : `Dạng câu: ${s.title}`;
    findings.push(`Xuất hiện ở ${where}.`);
    if (s.flips >= 2) findings.push(`${s.flips} lần đã chọn đúng rồi lại đổi sang sai ở dạng này.`);
    advice.push(
      s.kind === "grammar"
        ? `Xem lại lý thuyết “${s.title}” rồi làm bộ câu luyện riêng chủ điểm này cho đến khi đạt trên ${pct(TARGET_ACCURACY)}.`
        : `Với dạng “${s.title}”, tìm câu bằng chứng trong bài và loại ít nhất 2 đáp án nhiễu trước khi chọn — đáp án đúng thường được diễn đạt lại.`
    );
    // A test has roughly a question or two of any one skill per Part it spans.
    pointsGain = Math.round(Math.max(0, TARGET_ACCURACY - s.score) * Math.min(8, s.parts.length * 3)) * POINTS_PER_QUESTION;
  }

  return { ...s, id: `${s.kind}:${s.key}`, headline, findings, advice, pointsGain, confident: s.attempted >= LABEL_MIN_SAMPLE };
}

function buildAlerts(
  parts: PartInsight[],
  behaviors: LearningInsights["behaviors"],
  noise: LearningInsights["noise"],
  stamina: LearningInsights["stamina"],
  answered: number
): Alert[] {
  const alerts: Alert[] = [];
  for (const p of parts) {
    if (p.pace === "slow" && p.avgSec)
      alerts.push({
        tone: "warn",
        title: `${PART_META[p.part].shortLabel}: ${p.avgSec} giây/câu`,
        detail: `Nhịp chuẩn là ${p.targetSec} giây. Với 200 câu trong 120 phút, cần đưa về gần mốc này để còn thời gian cho Part 7.`,
      });
  }
  if (behaviors.changed >= 6 && behaviors.rightToWrong > behaviors.wrongToRight)
    alerts.push({
      tone: "warn",
      title: "Đổi đáp án đang làm bạn mất điểm",
      detail: `${behaviors.rightToWrong} lần đổi từ đúng sang sai, chỉ ${behaviors.wrongToRight} lần đổi từ sai sang đúng. Dấu hiệu “ảo giác tự tin”: chốt đáp án đầu khi đã có bằng chứng, chỉ đổi khi tìm ra căn cứ mới.`,
    });
  if (behaviors.readingAnswered >= 20 && noise.guessed / behaviors.readingAnswered >= 0.15)
    alerts.push({
      tone: "warn",
      title: "Nhiều câu Reading làm dưới 8 giây",
      detail: `${noise.guessed} câu (${pct(noise.guessed / behaviors.readingAnswered)}) gần như là đoán. Những câu này không được tính vào điểm năng lực — hãy đọc hết câu trước khi chọn.`,
    });
  if (noise.stuck >= 5)
    alerts.push({
      tone: "info",
      title: `${noise.stuck} câu bị “ngâm” quá 2,5 phút`,
      detail: "Câu nào quá 90 giây thì chọn đáp án tốt nhất hiện có, đánh dấu và chuyển tiếp — quay lại nếu còn giờ.",
    });
  if (stamina?.hasCliff && stamina.dropRatio !== null)
    alerts.push({
      tone: "warn",
      title: `Sụt sức bền ${pct(stamina.dropRatio)} cuối bài`,
      detail: `Trong “${stamina.testTitle}”, khối 30 phút cuối đúng ít hơn hẳn khối đầu. Luyện thêm đề Full Test liền mạch và giữ nhịp đều cho Part 7.`,
    });
  const improving = parts.filter((p) => p.trend && p.trend.delta >= 0.1);
  if (answered >= 60 && improving.length)
    alerts.push({
      tone: "good",
      title: "Đang tiến bộ rõ",
      detail: `${improving.map((p) => `${PART_META[p.part].shortLabel} +${Math.round(p.trend!.delta * 100)}%`).join(", ")} so với giai đoạn trước.`,
    });
  return alerts;
}

const labelName = (s: SkillStat) => (s.kind === "part" ? PART_META[s.key as TestPart].shortLabel : s.title);

async function buildRouting(input: {
  userId: string;
  level: MentorLevel;
  answered: number;
  accuracy: number;
  parts: PartInsight[];
  grammar: SkillStat[];
  strategies: SkillStat[];
  weaknesses: Weakness[];
  behaviors: LearningInsights["behaviors"];
  stamina: LearningInsights["stamina"];
  vocabRate: number | null;
  openMistakes: number;
  focusVocabulary: number;
}): Promise<Routing> {
  const { level, answered, accuracy, weaknesses } = input;
  const levelLabel = MENTOR_LEVEL_LABEL_VI[level] ?? level;
  const all = [...input.parts, ...input.grammar, ...input.strategies];
  const gaps = all.filter((s) => s.status === "gap");
  const judged = all.filter((s) => s.status !== "unknown");

  // Checklist for the next step up — the docs' "Đạt chuẩn" row.
  const checklist: Routing["checklist"] = [];
  if (level !== "ADVANCED") {
    const elig = await isEligibleForLevelGate(input.userId, level);
    checklist.push(
      { label: `Đã làm ${elig.totalRequired} câu`, ok: elig.totalAttempted >= elig.totalRequired, detail: `${Math.min(elig.totalAttempted, elig.totalRequired)}/${elig.totalRequired} câu` },
      {
        label: "Đủ dữ liệu ở mọi nhãn cốt lõi",
        ok: elig.labelsBelow.length === 0,
        detail: elig.labelsBelow.length === 0 ? "Đã đủ" : `Còn ${elig.labelsBelow.length} nhãn chưa đủ số câu`,
      }
    );
  } else {
    checklist.push({ label: "Đã làm 200 câu", ok: answered >= 200, detail: `${Math.min(answered, 200)}/200 câu` });
  }
  checklist.push(
    { label: "Độ chính xác từ 80%", ok: accuracy >= TARGET_ACCURACY, detail: `Hiện ${pct(accuracy)}` },
    { label: "Không còn nhãn “Hổng”", ok: judged.length > 0 && gaps.length === 0, detail: judged.length === 0 ? "Chưa đủ dữ liệu" : gaps.length ? `${gaps.length} nhãn dưới 50%` : "Không còn" },
    {
      label: "Từ vựng đã nhớ từ 70%",
      ok: (input.vocabRate ?? 0) >= 0.7,
      detail: input.vocabRate === null ? "Chưa lưu từ nào" : `Hiện ${pct(input.vocabRate)}`,
    }
  );
  if (level === "ADVANCED") {
    checklist.push(
      {
        label: "Sức bền ổn định cuối bài",
        ok: !!input.stamina && !input.stamina.hasCliff,
        detail: input.stamina ? (input.stamina.hasCliff ? `Sụt ${pct(input.stamina.dropRatio ?? 0)}` : "Ổn định") : "Cần 1 đề Full Test",
      },
      {
        label: "Ít đổi đáp án đúng sang sai",
        ok: input.behaviors.rightToWrong <= input.behaviors.wrongToRight,
        detail: `${input.behaviors.rightToWrong} lần đúng → sai`,
      }
    );
  }
  const readiness = checklist.filter((c) => c.ok).length / checklist.length;

  const practice = (target: PracticeTarget, label = "Luyện ngay"): PlanAction => ({ type: "practice", target, label });
  const lessonFor = (s: SkillStat): PlanStep | null =>
    s.kind === "grammar"
      ? { title: `Học lại: ${s.title}`, detail: "Đọc khúc lý thuyết và ví dụ của chủ điểm trước khi làm bài.", action: { type: "link", href: `/grammar/${s.key}`, label: "Mở bài học" } }
      : null;
  const vocabStep: PlanStep | null = input.focusVocabulary
    ? { title: "Ôn từ vựng liên quan", detail: "Các từ hay xuất hiện trong câu bạn sai — lưu và ôn bằng flashcard.", action: { type: "link", href: "/vocabulary", label: "Mở flashcard" } }
    : null;
  const retestStep: PlanStep | null = input.openMistakes
    ? {
        title: "Thi lại đúng các câu đang sai",
        detail: `${input.openMistakes} câu có lần làm gần nhất vẫn sai — làm lại để xác nhận đã xóa được vùng đỏ.`,
        action: practice({ kind: "mistakes" }, "Làm lại câu sai"),
      }
    : null;
  const nextGate: PlanStep =
    level === "ADVANCED"
      ? { title: "Mock Test như thi thật", detail: "200 câu, không tạm dừng, xem đường cong sức bền sau bài.", action: { type: "link", href: "/practice", label: "Chọn đề Full Test" } }
      : { title: "Kiểm tra lên cấp (Gate Test)", detail: "Khi đủ điều kiện, AI Mentor tạo bài kiểm tra cuối cấp để xét lên cấp tiếp theo.", action: { type: "link", href: "/mentor", label: "Mở AI Mentor" } };
  const compact = (steps: (PlanStep | null)[]) => steps.filter((s): s is PlanStep => s !== null);

  if (answered < ROUTING_MIN_ANSWERS) {
    return {
      level,
      levelLabel,
      branch: "collecting",
      title: "Đang thu thập dữ liệu",
      description: `Cần khoảng ${ROUTING_MIN_ANSWERS} câu đã làm để AI phân luồng chính xác — hiện có ${answered}. Mỗi bài làm thêm đều được chưng cất ngay.`,
      checklist,
      readiness,
      plan: [
        { title: "Làm bài kiểm tra xếp lớp", detail: "Bài ngắn để biết nên bắt đầu ở cấp nào.", action: { type: "link", href: "/mentor", label: "Mở AI Mentor" } },
        { title: "Luyện vài bài theo Part", detail: "Mỗi Part một ít, để bản đồ năng lực phủ đủ các nhãn.", action: { type: "link", href: "/practice", label: "Chọn bài luyện" } },
      ],
    };
  }

  // "Đa số các nhãn đều ở mức Hổng" (Cấp AI mục V) — or under 50% overall.
  const rebuild = accuracy < HONG_LABEL_THRESHOLD || (judged.length >= 4 && gaps.length / judged.length >= 0.5);
  if (rebuild) {
    // Costliest gaps first (the weakness ranking), then any other gap.
    const seen = new Set<string>();
    const targets = [...weaknesses.filter((w) => w.status !== "pass"), ...[...gaps].sort((a, b) => a.score - b.score)]
      .filter((s) => !seen.has(`${s.kind}:${s.key}`) && seen.add(`${s.kind}:${s.key}`))
      .slice(0, 3);
    return {
      level,
      levelLabel,
      branch: "rebuild",
      title: "Quay lại nền tảng",
      description: `Có ${gaps.length || "nhiều"} nhãn đang ở mức Hổng. Thay vì làm thêm đề khó, hãy học lại đúng các nhãn này với câu dễ hơn và không áp lực thời gian để xây lại móng — không phải học lại cả cấp.`,
      checklist,
      readiness,
      plan: compact([
        ...targets.flatMap((s) => [
          lessonFor(s),
          {
            title: `Luyện nền tảng: ${labelName(s)}`,
            detail: `Câu mức Dễ–Trung bình, thời gian rộng gấp đôi. Đang đạt ${pct(s.score)}.`,
            action: practice({ kind: s.kind, key: s.key, foundation: true }),
          },
        ]),
        vocabStep,
        retestStep,
      ]),
    };
  }

  const ready = accuracy >= TARGET_ACCURACY && gaps.length === 0;
  if (ready) {
    return {
      level,
      levelLabel,
      branch: "ready",
      title: level === "ADVANCED" ? "Sẵn sàng thi thật" : "Đạt chuẩn — sẵn sàng lên cấp",
      description:
        level === "ADVANCED"
          ? "Không còn nhãn nào dưới 50% và độ chính xác trên 80%. Giai đoạn này là giữ phong độ: Mock Test cách ngày và xem lại đường cong sức bền."
          : "Độ chính xác trên 80% và không còn nhãn Hổng. Hoàn tất các điều kiện còn lại rồi làm Gate Test để lên cấp tiếp theo.",
      checklist,
      readiness,
      plan: compact([nextGate, weaknesses[0] ? { title: `Giữ phong độ: ${labelName(weaknesses[0])}`, detail: "Nhãn thấp nhất còn lại, luyện thêm cho chắc.", action: practice({ kind: weaknesses[0].kind, key: weaknesses[0].key }) } : null, vocabStep]),
    };
  }

  const focus = weaknesses.slice(0, 3);
  return {
    level,
    levelLabel,
    branch: "refine",
    title: "Học bù có mục tiêu",
    description: focus.length
      ? `Nền tảng đã có, còn ${focus.length} chỗ hổng chính: ${focus.map(labelName).join(", ")}. Vá đúng các nhãn này rồi thi lại riêng chúng — không phải làm lại toàn bộ.`
      : "Nền tảng đã có. Tiếp tục luyện để đưa độ chính xác lên 80%.",
    checklist,
    readiness,
    plan: compact([
      ...focus.flatMap((s) => [
        lessonFor(s),
        { title: `Luyện: ${labelName(s)}`, detail: `Câu bạn từng sai được làm lại trước, rồi đến câu mới. Đang đạt ${pct(s.score)}.`, action: practice({ kind: s.kind, key: s.key }) },
      ]),
      vocabStep,
      retestStep,
      readiness >= 0.6 ? nextGate : null,
    ]),
  };
}

function summarize(
  answered: number,
  accuracy: number,
  weaknesses: Weakness[],
  strengths: SkillStat[],
  behaviors: LearningInsights["behaviors"],
  routing: Routing
): string {
  if (answered < MIN_SAMPLE * 2) return "Bạn mới làm ít câu nên chưa đủ dữ liệu để phân tích sâu. Hãy làm thêm vài đề hoặc bài luyện theo Part — bản phân tích sẽ tự cập nhật sau mỗi bài.";
  const parts: string[] = [`Trên ${answered.toLocaleString("vi-VN")} câu đã làm (đã lọc câu đoán mò và câu ngâm quá lâu), bạn đúng ${pct(accuracy)}.`];
  if (weaknesses.length) {
    const top = weaknesses.slice(0, 2).map(labelName);
    const gain = weaknesses.slice(0, 3).reduce((s, w) => s + w.pointsGain, 0);
    parts.push(`Ưu tiên nhất: ${top.join(" và ")}${gain > 0 ? ` — vá 3 điểm yếu hàng đầu có thể thêm khoảng ${gain} điểm` : ""}.`);
  } else {
    parts.push("Không có kỹ năng nào dưới 70% — hãy tăng độ khó và luyện đề Full Test để giữ phong độ.");
  }
  if (strengths.length) parts.push(`Bạn làm tốt ${strengths.slice(0, 2).map(labelName).join(" và ")}.`);
  if (behaviors.rightToWrong >= 3) parts.push(`Có ${behaviors.rightToWrong} câu bạn đã chọn đúng rồi đổi sang sai — hãy tin lựa chọn đầu khi chưa có căn cứ rõ ràng.`);
  if (routing.branch !== "collecting") parts.push(`Lộ trình hiện tại: ${routing.title.toLowerCase()}.`);
  return parts.join(" ");
}
