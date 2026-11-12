/**
 * Render thử các màn hình Chuẩn đầu ra bằng dữ liệu giả (không cần DB / đăng
 * nhập): bắt lỗi chạy thật của component — thuộc tính undefined, map trên
 * null… — mà typecheck không bắt được.
 */
import "./test-server-stub";
import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { buildBloomProfile, type BloomAttempt } from "@/lib/bloom/engine";
import { pacingStats } from "@/lib/bloom/domains";
import { DEFAULT_CATALOG, LEARNING_OUTCOMES, applyOverrides, assessOutcomes } from "@/lib/bloom/outcomes";
import { OutcomesPanel } from "@/components/analytics/outcomes-panel";
import { SyllabusView } from "@/components/syllabus/syllabus-view";
import { OutcomeEditor } from "@/components/admin/outcome-editor";

const NOW = Date.UTC(2026, 10, 13);
const att = (i: number, over: Partial<BloomAttempt>): BloomAttempt => ({
  questionId: `q${i}`, part: "PART5", knowledgeLabel: "grammar:nouns", bloomLevel: 2, isCorrect: i % 5 !== 0, selectedAnswer: "A", firstAnswer: "A",
  answerChanged: false, changedFromCorrectToWrong: false, timeSpentSec: 20, hintUsedCount: 0, trapTypeHit: null, revealedBeforeAnswer: false,
  explanationViewed: i % 2 === 0, mode: "timed", timestamp: NOW - i * 3_600_000, source: "attempt", ...over,
});

function learner(attempts: BloomAttempt[]) {
  return assessOutcomes({
    profile: buildBloomProfile(attempts, NOW),
    pastProfile: buildBloomProfile(attempts.slice(0, 10), NOW - 30 * 86_400_000),
    pacing: pacingStats(attempts),
    affective: { activeDays30d: 9, longestStreak: 5, currentStreak: 2, mistakeDrills: 25, pathDaysCompleted: 1 },
    create: { hasLearningPath: true, hasExamDate: false, hasStudyPreference: true, bookmarkedQuestions: 3, notedBookmarks: 0 },
  });
}

test("tab Chuẩn đầu ra render được cho người học mới (không có dữ liệu)", () => {
  const html = renderToStaticMarkup(<OutcomesPanel data={learner([])} />);
  assert.match(html, /Chuẩn đầu ra/);
  assert.match(html, /0\/16/);
  assert.match(html, /Chưa đủ dữ liệu/);
});

test("tab Chuẩn đầu ra render được cho người học có dữ liệu", () => {
  const attempts = Array.from({ length: 60 }, (_, i) => att(i, i < 30 ? {} : { knowledgeLabel: "strategy:inference", bloomLevel: 4, part: "PART7", timeSpentSec: 50 }));
  const html = renderToStaticMarkup(<OutcomesPanel data={learner(attempts)} />);
  for (const o of LEARNING_OUTCOMES) assert.ok(html.includes(o.code), o.code);
  assert.match(html, /\d\/5 · /);
  assert.match(html, /Kỹ năng làm bài/);
  assert.match(html, /Kế hoạch tự xây/);
});

test("trang Đề cương render được, dùng câu chữ đã sửa", () => {
  const html = renderToStaticMarkup(<SyllabusView catalog={applyOverrides({ goal: "MỤC TIÊU THỬ NGHIỆM" })} />);
  assert.match(html, /MỤC TIÊU THỬ NGHIỆM/);
  for (const o of LEARNING_OUTCOMES) assert.ok(html.includes(o.code), o.code);
  assert.match(html, /Vượt mức mong đợi/);
});

test("form chỉnh sửa của admin render được", () => {
  const html = renderToStaticMarkup(
    <OutcomeEditor
      goal={DEFAULT_CATALOG.goal}
      objectives={DEFAULT_CATALOG.objectives.map((p) => ({ code: p.code, pillar: p.pillar, statement: p.statement }))}
      outcomes={DEFAULT_CATALOG.outcomes.map((o) => ({ code: o.code, tierName: o.tier, levelLabel: "x", audience: o.audience, verb: o.verb, content: o.content, degree: o.degree, timeBound: o.timeBound, objectives: o.objectives, verbs: [o.verb], edited: false }))}
    />,
  );
  assert.match(html, /Lưu thay đổi/);
  assert.ok(html.includes(`name="CĐR16:verb"`));
});
