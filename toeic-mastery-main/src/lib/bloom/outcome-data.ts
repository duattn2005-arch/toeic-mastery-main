import "server-only";
import { db } from "@/lib/db";
import { getLearnerBloom, type LearnerBloom } from "./bank";
import type { AffectiveSignals, CreateSignals } from "./domains";
import { bloomOfQuestion } from "./from-question";
import { LEARNING_OUTCOMES, applyOverrides, assessOutcomes, checkOutcome, matchesLabel, type ChecklistItem, type LearnerOutcomes, type OutcomeCatalog } from "./outcomes";
import type { RubricLevel } from "./rubric";

/**
 * Nạp dữ liệu cho tầng Chuẩn đầu ra (outcomes.ts): tín hiệu miền thái độ và
 * sản phẩm bậc Sáng tạo của một người học; số câu ngân hàng theo chỉ báo; và
 * báo cáo mức đạt chuẩn đầu ra của nhóm người học cho trang quản trị.
 */

const DAY = 86_400_000;

// ---------------------------------------------------------------------------
// Bản chuẩn đầu ra đang áp dụng (mặc định + phần admin sửa)
// ---------------------------------------------------------------------------

const CATALOG_TTL_MS = 60_000;
let catalogCache: { at: number; catalog: OutcomeCatalog } | null = null;

export async function getOutcomeCatalog(): Promise<OutcomeCatalog> {
  if (catalogCache && Date.now() - catalogCache.at < CATALOG_TTL_MS) return catalogCache.catalog;
  // Before the migration runs (or if the read fails) the site keeps working on the code defaults.
  const row = await db.outcomeSettings.findUnique({ where: { id: "default" } }).catch(() => null);
  const catalog = applyOverrides(row?.data);
  catalogCache = { at: Date.now(), catalog };
  return catalog;
}

/** Gọi sau khi admin lưu, để trang hiện ngay bản mới. */
export function invalidateOutcomeCaches() {
  catalogCache = null;
  cohortCache = null;
}

export async function loadDomainSignals(userId: string): Promise<{ affective: AffectiveSignals; create: CreateSignals }> {
  const since = new Date(Date.now() - 30 * DAY);
  const [profile, sessions, mistakeDrills, mentorDays, vocabDays, path, pref, bookmarks, noted] = await Promise.all([
    db.profile.findUnique({ where: { id: userId }, select: { streakCount: true, longestStreak: true } }),
    db.studySession.findMany({ where: { userId, startedAt: { gte: since } }, select: { startedAt: true } }),
    db.practiceAnswer.count({ where: { userId, source: "mistake_drill" } }),
    db.learningPathDay.count({ where: { path: { userId }, status: "COMPLETED" } }),
    db.userVocabularyPathDayProgress.count({ where: { userId, completedAt: { not: null } } }),
    db.learningPath.findFirst({ where: { userId }, orderBy: { createdAt: "desc" }, select: { examDate: true } }),
    db.studyPreference.findUnique({ where: { userId }, select: { userId: true } }),
    db.bookmark.count({ where: { userId, type: "QUESTION" } }),
    db.bookmark.count({ where: { userId, note: { not: null }, NOT: { note: "" } } }),
  ]);
  // Calendar days in Vietnam time, so a late-night session counts for the right day.
  const days = new Set(sessions.map((s) => new Date(s.startedAt.getTime() + 7 * 3_600_000).toISOString().slice(0, 10)));
  return {
    affective: {
      activeDays30d: days.size,
      longestStreak: Math.max(profile?.longestStreak ?? 0, profile?.streakCount ?? 0),
      currentStreak: profile?.streakCount ?? 0,
      mistakeDrills,
      pathDaysCompleted: mentorDays + vocabDays,
    },
    create: {
      hasLearningPath: !!path,
      hasExamDate: !!path?.examDate,
      hasStudyPreference: !!pref,
      bookmarkedQuestions: bookmarks,
      notedBookmarks: noted,
    },
  };
}

/** Chuẩn đầu ra của một người học. Truyền `bloom` khi đã có (trang Phân tích) để không nạp lại bài làm. */
export async function getLearnerOutcomes(userId: string, bloom?: LearnerBloom, catalog?: OutcomeCatalog): Promise<LearnerOutcomes> {
  const [b, signals, cat] = await Promise.all([bloom ?? getLearnerBloom(userId), loadDomainSignals(userId), catalog ?? getOutcomeCatalog()]);
  return assessOutcomes({ profile: b.profile, pastProfile: b.pastProfile, pacing: b.pacing, affective: signals.affective, create: signals.create }, cat.outcomes);
}

// ---------------------------------------------------------------------------
// Ngân hàng câu theo chỉ báo — ma trận đối chiếu chuẩn đầu ra ↔ câu hỏi
// ---------------------------------------------------------------------------

const TTL_MS = 10 * 60_000;
let bankCache: { at: number; counts: Map<string, number> } | null = null;

/** Số câu đang xuất bản đánh giá được mỗi chỉ báo dạng "cells" (nhãn khớp và đúng bậc). Chỉ báo Từ vựng đếm số từ. */
export async function getIndicatorBankCounts(): Promise<Map<string, number>> {
  if (bankCache && Date.now() - bankCache.at < TTL_MS) return bankCache.counts;
  const [rows, vocabWords] = await Promise.all([
    db.question.findMany({
      where: { status: "PUBLISHED" },
      select: { part: true, prompt: true, correctLabel: true, difficulty: true, grammarTopicSlug: true, strategicLabelSlugs: true, bloomLevel: true, passage: { select: { layout: true } } },
    }),
    db.vocabularyWord.count(),
  ]);
  const cells = new Map<string, number>();
  for (const q of rows) {
    const { knowledgeLabel, level } = bloomOfQuestion(q);
    const key = `${knowledgeLabel}|${level}`;
    cells.set(key, (cells.get(key) ?? 0) + 1);
  }
  const counts = new Map<string, number>();
  for (const o of LEARNING_OUTCOMES) {
    for (const i of o.indicators) {
      if (i.measure.kind !== "cells") continue;
      const { level, labels } = i.measure;
      let n = 0;
      for (const [key, c] of cells) {
        const [label, lv] = key.split("|");
        if (Number(lv) === level && matchesLabel(label, labels)) n += c;
      }
      if (labels.includes("vocab")) n += vocabWords;
      counts.set(i.code, n);
    }
  }
  bankCache = { at: Date.now(), counts };
  return counts;
}

export interface OutcomeAudit {
  code: string;
  checklist: ChecklistItem[];
  /** Số câu ngân hàng theo chỉ báo (null = chỉ báo không đo bằng câu hỏi). */
  bank: { code: string; questions: number | null }[];
}

export async function auditOutcomes(catalog?: OutcomeCatalog): Promise<OutcomeAudit[]> {
  const [counts, cat] = await Promise.all([getIndicatorBankCounts(), catalog ?? getOutcomeCatalog()]);
  return cat.outcomes.map((o) => ({
    code: o.code,
    checklist: checkOutcome(o, { questionsPerIndicator: counts, objectives: cat.objectives }),
    bank: o.indicators.map((i) => ({ code: i.code, questions: i.measure.kind === "cells" ? (counts.get(i.code) ?? 0) : null })),
  }));
}

// ---------------------------------------------------------------------------
// Báo cáo mức đạt chuẩn đầu ra của nhóm người học (đo lường CĐR kiểu ABET)
// ---------------------------------------------------------------------------

/** Số người học tối đa đưa vào báo cáo (người học gần đây nhất) — giới hạn chi phí tính. */
export const COHORT_MAX_LEARNERS = 60;
const COHORT_ACTIVE_DAYS = 30;
const COHORT_CONCURRENCY = 4;

export interface CohortOutcome {
  code: string;
  /** Số người học theo mức rubric 1–5. */
  distribution: Record<RubricLevel, number>;
  insufficient: number;
  achieved: number;
  measured: number;
}

export interface CohortReport {
  generatedAt: number;
  learners: number;
  activeDays: number;
  outcomes: CohortOutcome[];
}

let cohortCache: { at: number; report: CohortReport } | null = null;

export async function getCohortOutcomeReport(): Promise<CohortReport> {
  if (cohortCache && Date.now() - cohortCache.at < TTL_MS) return cohortCache.report;
  const learners = await db.profile.findMany({
    where: { lastStudyDate: { gte: new Date(Date.now() - COHORT_ACTIVE_DAYS * DAY) } },
    orderBy: { lastStudyDate: "desc" },
    take: COHORT_MAX_LEARNERS,
    select: { id: true },
  });

  const catalog = await getOutcomeCatalog();
  const results: LearnerOutcomes[] = [];
  for (let i = 0; i < learners.length; i += COHORT_CONCURRENCY) {
    const batch = await Promise.all(learners.slice(i, i + COHORT_CONCURRENCY).map((l) => getLearnerOutcomes(l.id, undefined, catalog)));
    results.push(...batch);
  }

  const outcomes: CohortOutcome[] = LEARNING_OUTCOMES.map((o) => {
    const distribution: Record<RubricLevel, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let insufficient = 0;
    let achieved = 0;
    for (const r of results) {
      const res = r.outcomes.find((x) => x.code === o.code)!;
      if (res.rubric === null) insufficient++;
      else distribution[res.rubric]++;
      if (res.achieved) achieved++;
    }
    return { code: o.code, distribution, insufficient, achieved, measured: results.length - insufficient };
  });

  const report = { generatedAt: Date.now(), learners: results.length, activeDays: COHORT_ACTIVE_DAYS, outcomes };
  cohortCache = { at: Date.now(), report };
  return report;
}
