import "server-only";
import { db } from "@/lib/db";
import { TRAP_TYPE_CODES, type ScoredBloomLevel, type TrapType } from "./config";
import { VOCAB_LABEL, type QuestionPart } from "./classify";
import { bloomOfQuestion } from "./from-question";
import type { AttemptMode, BloomAttempt } from "./engine";

/**
 * Nạp mọi bằng chứng học tập của một người học thành BloomAttempt[] cho
 * engine.ts — bốn nguồn:
 *   1. attempt_answers  (đề thi / luyện theo Part / luyện điểm yếu)
 *   2. mentor_test_questions  (Placement, Gate, học bù, bài kiểm tra Mentor)
 *   3. practice_answers  (Ôn lỗi sai, Quick Study, quiz ngữ pháp)
 *   4. vocabulary_reviews  (flashcard SM-2 → bậc 1, nhãn Từ vựng)
 *
 * Quy tắc bậc của một lần trả lời: câu admin đã duyệt bậc tay → bậc của câu
 * (sự thật hiện tại); ngược lại ảnh chụp lúc chấm → bậc đang lưu của câu →
 * suy ra bằng luật (dữ liệu cũ không làm vỡ thống kê).
 * Tín hiệu không đo được để null — engine tự bỏ qua luật liên quan.
 */

const QUESTION_SELECT = {
  part: true,
  prompt: true,
  correctLabel: true,
  difficulty: true,
  grammarTopicSlug: true,
  strategicLabelSlugs: true,
  bloomLevel: true,
  bloomSource: true,
  passage: { select: { layout: true } },
} as const;

type QuestionRow = {
  part: string;
  prompt: string;
  correctLabel: string;
  difficulty: string;
  grammarTopicSlug: string | null;
  strategicLabelSlugs: string[];
  bloomLevel: number | null;
  bloomSource: string | null;
  passage: { layout: string } | null;
};

const asLevel = (n: number | null | undefined): ScoredBloomLevel | null => (n === 1 || n === 2 || n === 3 || n === 4 || n === 5 ? n : null);
const asTrap = (t: string | null | undefined): TrapType | null => (t && (TRAP_TYPE_CODES as string[]).includes(t) ? (t as TrapType) : null);

/** Nhãn chính + bậc của câu, có nhớ tạm theo câu (một người làm lại cùng câu nhiều lần). */
function makeResolver() {
  const cache = new Map<string, { level: ScoredBloomLevel; knowledgeLabel: string }>();
  return (questionId: string, q: QuestionRow, snapshot: number | null) => {
    let base = cache.get(questionId);
    if (!base) {
      base = bloomOfQuestion(q);
      cache.set(questionId, base);
    }
    const manual = q.bloomSource === "manual" ? asLevel(q.bloomLevel) : null;
    return { knowledgeLabel: base.knowledgeLabel, level: manual ?? asLevel(snapshot) ?? base.level };
  };
}

function decision(q: QuestionRow, initial: string | null, selected: string | null) {
  return {
    firstAnswer: initial,
    answerChanged: !!initial && !!selected && initial !== selected,
    changedFromCorrectToWrong: initial === q.correctLabel && selected !== null && selected !== q.correctLabel,
  };
}

export async function loadBloomAttempts(userId: string): Promise<BloomAttempt[]> {
  const resolve = makeResolver();
  const [examAnswers, mentorAnswers, practiceAnswers, reviews] = await Promise.all([
    db.attemptAnswer.findMany({
      where: { attempt: { userId, status: "SUBMITTED" } },
      select: {
        questionId: true,
        selectedLabel: true,
        initialSelectedLabel: true,
        isCorrect: true,
        timeSpentSec: true,
        hintUsedCount: true,
        trapTypeHit: true,
        bloomLevel: true,
        explanationViewedAt: true,
        firstAnsweredAt: true,
        answeredAt: true,
        attempt: { select: { id: true, mode: true, parts: true, questionIds: true, submittedAt: true, test: { select: { isFullTest: true } } } },
        question: { select: QUESTION_SELECT },
      },
    }),
    db.mentorTestQuestion.findMany({
      where: { mentorTest: { userId }, isCorrect: { not: null } },
      select: {
        questionId: true,
        selectedLabel: true,
        initialSelectedLabel: true,
        isCorrect: true,
        timeSpentSec: true,
        hintUsedCount: true,
        trapTypeHit: true,
        bloomLevel: true,
        answeredAt: true,
        mentorTest: { select: { id: true, dimensionType: true, completedAt: true } },
        question: { select: QUESTION_SELECT },
      },
    }),
    db.practiceAnswer.findMany({
      where: { userId },
      select: { questionId: true, selectedLabel: true, isCorrect: true, timeSpentSec: true, hintUsedCount: true, trapTypeHit: true, bloomLevel: true, createdAt: true, question: { select: QUESTION_SELECT } },
    }),
    db.vocabularyReview.findMany({
      where: { userVocabulary: { userId } },
      select: { userVocabularyId: true, rating: true, reviewedAt: true },
    }),
  ]);

  const out: BloomAttempt[] = [];

  for (const a of examAnswers) {
    const q = a.question as QuestionRow;
    const { knowledgeLabel, level } = resolve(a.questionId, q, a.bloomLevel);
    const submittedAt = a.attempt.submittedAt?.getTime() ?? Date.now();
    const viewedAt = a.explanationViewedAt?.getTime() ?? null;
    // The explanation was opened while the attempt was still running:
    // before the first pick → the answer doesn't measure anything; after it
    // → the first pick is the honest attempt.
    const viewedDuring = viewedAt !== null && viewedAt < submittedAt;
    const firstAt = a.firstAnsweredAt?.getTime() ?? null;
    const revealedBeforeAnswer = a.selectedLabel === null ? null : viewedDuring && (firstAt === null || viewedAt! < firstAt);
    const honestCorrect = viewedDuring && !revealedBeforeAnswer && a.initialSelectedLabel ? a.initialSelectedLabel === q.correctLabel : a.isCorrect;
    const mode: AttemptMode =
      a.attempt.mode === "PRACTICE" ? "practice" : a.attempt.parts.length === 0 && a.attempt.questionIds.length === 0 && a.attempt.test.isFullTest ? "mock" : "timed";
    out.push({
      questionId: a.questionId,
      part: q.part as QuestionPart,
      knowledgeLabel,
      bloomLevel: level,
      isCorrect: a.selectedLabel === null ? null : honestCorrect === true,
      selectedAnswer: a.selectedLabel,
      ...decision(q, a.initialSelectedLabel, a.selectedLabel),
      timeSpentSec: a.timeSpentSec > 0 ? a.timeSpentSec : null,
      hintUsedCount: a.hintUsedCount,
      trapTypeHit: asTrap(a.trapTypeHit),
      revealedBeforeAnswer,
      explanationViewed: viewedAt !== null,
      mode,
      timestamp: (a.firstAnsweredAt ?? a.answeredAt ?? a.attempt.submittedAt ?? new Date()).getTime(),
      source: "attempt",
      sessionId: a.attempt.id,
    });
  }

  for (const a of mentorAnswers) {
    const q = a.question as QuestionRow;
    const { knowledgeLabel, level } = resolve(a.questionId, q, a.bloomLevel);
    const t = a.mentorTest.dimensionType;
    const mode: AttemptMode = t === "PLACEMENT" ? "placement" : t === "LEVEL_GATE" || t === "REMEDIATION" ? "gate" : "practice";
    out.push({
      questionId: a.questionId,
      part: q.part as QuestionPart,
      knowledgeLabel,
      bloomLevel: level,
      isCorrect: a.selectedLabel === null ? null : a.isCorrect === true,
      selectedAnswer: a.selectedLabel,
      ...decision(q, a.initialSelectedLabel, a.selectedLabel),
      timeSpentSec: a.timeSpentSec > 0 ? a.timeSpentSec : null,
      hintUsedCount: a.hintUsedCount,
      trapTypeHit: asTrap(a.trapTypeHit),
      revealedBeforeAnswer: false,
      explanationViewed: false,
      mode,
      timestamp: (a.answeredAt ?? a.mentorTest.completedAt ?? new Date()).getTime(),
      source: "mentor_test",
      sessionId: a.mentorTest.id,
    });
  }

  for (const a of practiceAnswers) {
    const q = a.question as QuestionRow;
    const { knowledgeLabel, level } = resolve(a.questionId, q, a.bloomLevel);
    out.push({
      questionId: a.questionId,
      part: q.part as QuestionPart,
      knowledgeLabel,
      bloomLevel: level,
      isCorrect: a.isCorrect,
      selectedAnswer: a.selectedLabel,
      firstAnswer: a.selectedLabel,
      answerChanged: false,
      changedFromCorrectToWrong: false,
      timeSpentSec: a.timeSpentSec !== null && a.timeSpentSec > 0 ? a.timeSpentSec : null,
      hintUsedCount: a.hintUsedCount,
      trapTypeHit: asTrap(a.trapTypeHit),
      revealedBeforeAnswer: false,
      explanationViewed: false,
      mode: "practice",
      timestamp: a.createdAt.getTime(),
      source: "practice",
      sessionId: null,
    });
  }

  // Flashcard SM-2: remembering a word is level 1 of the vocabulary row;
  // each word is one "question", AGAIN = not remembered.
  for (const r of reviews) {
    const ok = r.rating !== "AGAIN";
    out.push({
      questionId: `vocab:${r.userVocabularyId}`,
      part: null,
      knowledgeLabel: VOCAB_LABEL,
      bloomLevel: 1,
      isCorrect: ok,
      selectedAnswer: r.rating,
      firstAnswer: r.rating,
      answerChanged: false,
      changedFromCorrectToWrong: false,
      timeSpentSec: null,
      hintUsedCount: null,
      trapTypeHit: null,
      revealedBeforeAnswer: false,
      explanationViewed: false,
      mode: "practice",
      timestamp: r.reviewedAt.getTime(),
      source: "flashcard",
      sessionId: null,
    });
  }

  return out.sort((a, b) => a.timestamp - b.timestamp);
}

/** Tín hiệu hoạt động bậc 1 không có đúng/sai: tra từ, lưu từ (30 ngày gần nhất / tổng). */
export async function loadRememberSignals(userId: string): Promise<{ lookups30d: number; savedWords: number }> {
  const since = new Date(Date.now() - 30 * 86_400_000);
  const [lookups30d, savedWords] = await Promise.all([
    db.dictionaryHistory.count({ where: { userId, createdAt: { gte: since } } }),
    db.savedWord.count({ where: { userId } }),
  ]);
  return { lookups30d, savedWords };
}
