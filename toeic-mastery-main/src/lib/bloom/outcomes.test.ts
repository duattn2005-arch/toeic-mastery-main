import { test } from "node:test";
import assert from "node:assert/strict";
import { buildBloomProfile, type BloomAttempt } from "./engine";
import { affectiveLadder, createCriteria, pacingStats, psychomotorLadder, type AffectiveSignals, type CreateSignals } from "./domains";
import {
  LEARNING_OUTCOMES,
  PROGRAM_OBJECTIVES,
  assessOutcomes,
  checkOutcome,
  decisionRubric,
  matchesLabel,
  outcomeStatement,
  verbMatchesLevel,
  weakestIndicators,
  type LearningOutcome,
} from "./outcomes";
import { rubricFromLadder, rubricLevelOf, rubricTrend } from "./rubric";

const NOW = Date.UTC(2026, 10, 13);
let seq = 0;

function att(over: Partial<BloomAttempt>): BloomAttempt {
  seq++;
  return {
    questionId: `q${seq}`,
    part: "PART5",
    knowledgeLabel: "grammar:nouns",
    bloomLevel: 2,
    isCorrect: true,
    selectedAnswer: "A",
    firstAnswer: "A",
    answerChanged: false,
    changedFromCorrectToWrong: false,
    timeSpentSec: 20,
    hintUsedCount: 0,
    trapTypeHit: null,
    revealedBeforeAnswer: false,
    explanationViewed: false,
    mode: "timed",
    timestamp: NOW - 86_400_000 + seq,
    source: "attempt",
    ...over,
  };
}
const many = (n: number, over: Partial<BloomAttempt> = {}, wrong = 0) => Array.from({ length: n }, (_, i) => att({ ...over, isCorrect: i >= wrong }));

const NO_AFFECT: AffectiveSignals = { activeDays30d: 0, longestStreak: 0, currentStreak: 0, mistakeDrills: 0, pathDaysCompleted: 0 };
const NO_CREATE: CreateSignals = { hasLearningPath: false, hasExamDate: false, hasStudyPreference: false, bookmarkedQuestions: 0, notedBookmarks: 0 };

// ---------------------------------------------------------------------------
// Rubric
// ---------------------------------------------------------------------------

test("rubric 5 mức khớp ngưỡng Mastery Learning: <50% = 1, ≥80% = 4, ≥90% = 5", () => {
  assert.equal(rubricLevelOf(0.3), 1);
  assert.equal(rubricLevelOf(0.5), 2);
  assert.equal(rubricLevelOf(0.7), 3);
  assert.equal(rubricLevelOf(0.8), 4);
  assert.equal(rubricLevelOf(0.95), 5);
});

test("rubric thang bậc so với bậc yêu cầu; xu hướng tiến bộ", () => {
  assert.equal(rubricFromLadder(0, 3), 1);
  assert.equal(rubricFromLadder(1, 3), 2);
  assert.equal(rubricFromLadder(2, 3), 3);
  assert.equal(rubricFromLadder(3, 3), 4);
  assert.equal(rubricFromLadder(4, 3), 5);
  assert.equal(rubricTrend(4, 3), "up");
  assert.equal(rubricTrend(2, 3), "down");
  assert.equal(rubricTrend(3, null), null);
});

// ---------------------------------------------------------------------------
// Checklist chuẩn đầu ra
// ---------------------------------------------------------------------------

test("mọi chuẩn đầu ra đã khai báo đều đạt checklist (trừ tính khả thi, xét ở trang quản trị)", () => {
  for (const o of LEARNING_OUTCOMES) {
    const failed = checkOutcome(o).filter((c) => !c.met);
    assert.deepEqual(failed, [], `${o.code}: ${failed.map((f) => f.criterion).join("; ")}`);
  }
});

test("mã chuẩn đầu ra / chỉ báo không trùng và mọi CĐR trỏ tới mục tiêu có thật", () => {
  const codes = LEARNING_OUTCOMES.flatMap((o) => [o.code, ...o.indicators.map((i) => i.code)]);
  assert.equal(new Set(codes).size, codes.length);
  const po = new Set(PROGRAM_OBJECTIVES.map((p) => p.code));
  for (const o of LEARNING_OUTCOMES) for (const c of o.objectives) assert.ok(po.has(c), `${o.code} → ${c}`);
  // Mỗi mục tiêu được ít nhất một chuẩn đầu ra đóng góp.
  for (const p of PROGRAM_OBJECTIVES) assert.ok(LEARNING_OUTCOMES.some((o) => o.objectives.includes(p.code)), p.code);
});

test("chương trình phủ cả ba miền Bloom và đủ 6 bậc nhận thức", () => {
  const domains = new Set(LEARNING_OUTCOMES.map((o) => o.domain));
  assert.deepEqual([...domains].sort(), ["affective", "cognitive", "psychomotor"]);
  const cognitive = new Set(LEARNING_OUTCOMES.filter((o) => o.domain === "cognitive").map((o) => o.level));
  for (const l of [1, 2, 3, 4, 5, 6]) assert.ok(cognitive.has(l), `thiếu bậc ${l}`);
});

test("checklist bắt lỗi động từ mơ hồ, nhiều động từ, sai bậc, thiếu thời gian", () => {
  const bad: LearningOutcome = { ...LEARNING_OUTCOMES[0], verb: "hiểu", timeBound: "" };
  const failed = new Set(checkOutcome(bad).filter((c) => !c.met).map((c) => c.key));
  assert.ok(failed.has("no-vague"));
  assert.ok(failed.has("verb-level"));
  assert.ok(failed.has("time-bound"));
  const two: LearningOutcome = { ...LEARNING_OUTCOMES[0], verb: "nhận biết và phân tích" };
  assert.ok(checkOutcome(two).some((c) => c.key === "single-verb" && !c.met));
  const process: LearningOutcome = { ...LEARNING_OUTCOMES[0], verb: "duy trì" };
  assert.ok(checkOutcome(process).some((c) => c.key === "no-process" && !c.met));
});

test("checklist khả thi: chỉ báo thiếu câu ngân hàng bị đánh dấu", () => {
  const o = LEARNING_OUTCOMES.find((x) => x.code === "CĐR11")!;
  const counts = new Map(o.indicators.map((i) => [i.code, 100]));
  assert.ok(checkOutcome(o, { questionsPerIndicator: counts }).find((c) => c.key === "attainable")!.met);
  counts.set("CĐR11.2", 3);
  assert.ok(!checkOutcome(o, { questionsPerIndicator: counts }).find((c) => c.key === "attainable")!.met);
});

test("phát biểu đúng cấu trúc A-B-C-D", () => {
  const s = outcomeStatement(LEARNING_OUTCOMES[0]);
  assert.match(s, /^Sau khi hoàn thành cấp Nền tảng .*, người học có khả năng nhận biết .* 80% trở lên\.$/);
  assert.ok(verbMatchesLevel("phân tích", "cognitive", 4));
  assert.ok(!verbMatchesLevel("phân tích", "cognitive", 1));
});

test("mẫu nhãn: tiền tố kết thúc bằng ':'", () => {
  assert.ok(matchesLabel("grammar:nouns", ["grammar:"]));
  assert.ok(!matchesLabel("strategy:inference", ["grammar:"]));
  assert.ok(matchesLabel("vocab", ["vocab"]));
});

// ---------------------------------------------------------------------------
// Chấm chỉ báo
// ---------------------------------------------------------------------------

test("chỉ báo nhận thức: đủ câu → rubric theo điểm; thiếu câu → chưa đủ dữ liệu", () => {
  const strong = many(20, { knowledgeLabel: "grammar:nouns", bloomLevel: 2 });
  const profile = buildBloomProfile(strong, NOW);
  const r = assessOutcomes({ profile, pastProfile: null, pacing: pacingStats(strong), affective: NO_AFFECT, create: NO_CREATE });
  const cdr2 = r.outcomes.find((o) => o.code === "CĐR2")!;
  assert.equal(cdr2.indicators[0].rubric, 5);
  assert.ok(cdr2.achieved);
  const cdr11 = r.outcomes.find((o) => o.code === "CĐR11")!;
  assert.equal(cdr11.rubric, null);
  assert.ok(!cdr11.achieved);
});

test("tiến bộ: so với hồ sơ 30 ngày trước", () => {
  const old = many(20, { knowledgeLabel: "grammar:nouns", bloomLevel: 2, timestamp: NOW - 40 * 86_400_000 }, 6); // 70% → mức 3
  const recent = many(20, { knowledgeLabel: "grammar:nouns", bloomLevel: 2 });
  const all = [...old, ...recent];
  const pastAt = NOW - 30 * 86_400_000;
  const r = assessOutcomes({
    profile: buildBloomProfile(all, NOW),
    pastProfile: buildBloomProfile(old, pastAt),
    pacing: pacingStats(all),
    affective: NO_AFFECT,
    create: NO_CREATE,
  });
  const ind = r.outcomes.find((o) => o.code === "CĐR2")!.indicators[0];
  assert.equal(ind.previous, 3);
  assert.equal(ind.trend, "up");
});

test("bậc 5 — giữ quyết định", () => {
  assert.equal(decisionRubric(0), 5);
  assert.equal(decisionRubric(0.05), 4);
  assert.equal(decisionRubric(0.08), 3);
  assert.equal(decisionRubric(0.5), 1);
});

// ---------------------------------------------------------------------------
// Miền kỹ năng / thái độ / sáng tạo
// ---------------------------------------------------------------------------

test("miền kỹ năng: đủ câu có giờ đúng nhịp → P3; thêm đề đầy đủ → P4", () => {
  const timed = many(40, { part: "PART5", timeSpentSec: 20, mode: "timed" });
  const s = pacingStats(timed);
  assert.equal(s.onPaceShare, 1);
  assert.equal(psychomotorLadder(s, { mockSpread: null }).reached, 3);

  const mock = [
    ...many(60, { part: "PART2", timeSpentSec: null, mode: "mock", sessionId: "m1", knowledgeLabel: "part:PART2" }),
    ...many(60, { part: "PART7", timeSpentSec: 50, mode: "mock", sessionId: "m1", knowledgeLabel: "part:PART7" }),
  ];
  assert.equal(psychomotorLadder(pacingStats([...timed, ...mock]), { mockSpread: null }).reached, 4);
});

test("miền kỹ năng: làm chậm hơn thời gian chuẩn thì dừng ở P2", () => {
  const slow = many(40, { part: "PART7", timeSpentSec: 100, mode: "timed" });
  assert.equal(psychomotorLadder(pacingStats(slow), { mockSpread: null }).reached, 2);
});

test("miền thái độ là thang tích lũy: thiếu bậc 2 thì không lên bậc 3 dù đã làm lại lỗi sai", () => {
  const a = { answered: 100, wrong: 20, explanationViews: 10, noise: { guess: 0, stuck: 0, revealed: 0, skipped: 0 } };
  assert.equal(affectiveLadder({ ...NO_AFFECT, activeDays30d: 3, mistakeDrills: 50 }, a).reached, 1);
  assert.equal(affectiveLadder({ ...NO_AFFECT, activeDays30d: 10, mistakeDrills: 50 }, a).reached, 3);
  assert.equal(affectiveLadder({ activeDays30d: 10, mistakeDrills: 50, pathDaysCompleted: 6, longestStreak: 20, currentStreak: 3 }, a).reached, 5);
  // Đoán mò nhiều → không đạt bậc Tính cách.
  assert.equal(affectiveLadder({ activeDays30d: 10, mistakeDrills: 50, pathDaysCompleted: 6, longestStreak: 20, currentStreak: 3 }, { ...a, noise: { ...a.noise, guess: 20 } }).reached, 4);
});

test("bậc Sáng tạo: rubric theo số tiêu chí sản phẩm", () => {
  const full: CreateSignals = { hasLearningPath: true, hasExamDate: true, hasStudyPreference: true, bookmarkedQuestions: 12, notedBookmarks: 4 };
  assert.equal(createCriteria(full).filter((c) => c.met).length, 5);
  const r = assessOutcomes({ profile: buildBloomProfile([], NOW), pastProfile: null, pacing: pacingStats([]), affective: NO_AFFECT, create: full });
  assert.equal(r.domains.create.rubric, 5);
  assert.ok(r.outcomes.find((o) => o.code === "CĐR14")!.achieved);
});

// ---------------------------------------------------------------------------
// Phần admin sửa trên web
// ---------------------------------------------------------------------------

import { DEFAULT_CATALOG, applyOverrides, catalogErrors, parseOverrides } from "./outcomes";

test("bản sửa: đè đúng trường, giữ chỉ báo; bỏ qua mã lạ và kiểu sai", () => {
  const cat = applyOverrides({
    goal: "Mục tiêu mới",
    objectives: { PO1: "PO1 mới", PO9: "không tồn tại" },
    outcomes: { "CĐR1": { content: "nghĩa của từ vựng TOEIC trong email công việc", objectives: ["PO1", "PO2", "PO9"], indicators: [] }, "CĐR99": { verb: "x" }, "CĐR2": { verb: 123 } },
  });
  assert.equal(cat.goal, "Mục tiêu mới");
  assert.equal(cat.objectives.find((p) => p.code === "PO1")!.statement, "PO1 mới");
  assert.equal(cat.objectives.length, PROGRAM_OBJECTIVES.length);
  const c1 = cat.outcomes.find((o) => o.code === "CĐR1")!;
  assert.equal(c1.content, "nghĩa của từ vựng TOEIC trong email công việc");
  assert.deepEqual(c1.objectives, ["PO1", "PO2"]);
  assert.equal(c1.indicators.length, LEARNING_OUTCOMES[0].indicators.length);
  assert.equal(cat.outcomes.find((o) => o.code === "CĐR2")!.verb, LEARNING_OUTCOMES[1].verb);
  assert.equal(cat.outcomes.length, LEARNING_OUTCOMES.length);
});

test("bản sửa rỗng / hỏng = nội dung mặc định, và mặc định không có lỗi checklist", () => {
  assert.deepEqual(parseOverrides(null), {});
  assert.deepEqual(parseOverrides("rác"), {});
  assert.deepEqual(applyOverrides(undefined), { ...DEFAULT_CATALOG, objectives: [...PROGRAM_OBJECTIVES], outcomes: [...LEARNING_OUTCOMES] });
  assert.deepEqual(catalogErrors(DEFAULT_CATALOG), []);
});

test("bản sửa sai checklist bị phát hiện trước khi lưu", () => {
  const bad = applyOverrides({ outcomes: { "CĐR3": { verb: "hiểu" }, "CĐR6": { degree: "thật tốt", timeBound: "" } } });
  const errs = catalogErrors(bad);
  assert.deepEqual(errs.map((e) => e.code).sort(), ["CĐR3", "CĐR6"]);
  // timeBound rỗng bị bỏ qua (giữ mặc định), chỉ còn lỗi mức độ không có con số.
  assert.ok(errs.find((e) => e.code === "CĐR6")!.errors.some((x) => x.startsWith("M —")));
});

test("bảng đánh giá dùng câu chữ đã sửa", () => {
  const cat = applyOverrides({ outcomes: { "CĐR2": { content: "điểm ngữ pháp trong câu Part 5 về thì động từ" } } });
  const r = assessOutcomes({ profile: buildBloomProfile([], NOW), pastProfile: null, pacing: pacingStats([]), affective: NO_AFFECT, create: NO_CREATE }, cat.outcomes);
  assert.match(r.outcomes.find((o) => o.code === "CĐR2")!.statement, /thì động từ/);
});

test("AI Mentor: chỉ báo yếu nhất trước, bỏ chỉ báo đã đạt / chưa đo", () => {
  const weak = many(20, { knowledgeLabel: "grammar:nouns", bloomLevel: 2 }, 15); // 25% đúng → mức 1
  const r = assessOutcomes({ profile: buildBloomProfile(weak, NOW), pastProfile: null, pacing: pacingStats(weak), affective: NO_AFFECT, create: NO_CREATE });
  const lines = weakestIndicators(r);
  assert.ok(lines.length >= 1 && lines.length <= 3);
  assert.match(lines[0], /^CĐR2 · .*mức 1\/5$/);
  const strong = many(20, { knowledgeLabel: "grammar:nouns", bloomLevel: 2 });
  const ok = assessOutcomes({ profile: buildBloomProfile(strong, NOW), pastProfile: null, pacing: pacingStats(strong), affective: NO_AFFECT, create: NO_CREATE });
  assert.ok(!weakestIndicators(ok).some((l) => l.startsWith("CĐR2 ")));
});
