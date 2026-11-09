import { answerInsight, type AnsweredQuestion } from "@/lib/services/attempt-analysis";
import { SCORED_LEVELS, type ScoredBloomLevel } from "./config";
import type { KnowledgeLabel, QuestionPart } from "./classify";
import type { BloomAttempt } from "./engine";

const RECENT_DAYS = 30;
/** Questions listed per Bloom level; their full text is only loaded for these. */
export const MISTAKES_PER_LEVEL = 15;
/** Questions listed in the overall summary. */
export const MISTAKES_OVERALL = 5;

export interface ErrorTypeStat {
  label: string;
  tip: string;
  /** Wrong answers of this type: a question missed twice counts twice. */
  count: number;
  /** Of those, how many fell in the last RECENT_DAYS days. */
  recent: number;
}

export interface MistakeQuestionStat {
  questionId: string;
  part: QuestionPart;
  knowledgeLabel: KnowledgeLabel;
  bloomLevel: ScoredBloomLevel;
  tries: number;
  wrongCount: number;
  /** The latest answer to this question is still wrong. */
  stillWrong: boolean;
  lastWrongAt: number;
  lastPicked: string | null;
  correctAnswer: string | null;
  /** Wrong options picked, with how often: the same one again and again points to a misunderstanding. */
  picks: { label: string; count: number }[];
  /** Why the latest wrong answer was lost. */
  errorLabel: string;
  errorTip: string;
  lastTimeSec: number | null;
  targetSec: number | null;
  /** Latest attempt with a review page, when the question came from a test or a Part practice. */
  reviewAttemptId: string | null;
}

export interface MistakeScope {
  wrongAnswers: number;
  wrongQuestions: number;
  stillWrong: number;
  fixed: number;
  /** Questions missed at least twice. */
  repeated: number;
  skipped: number;
  types: ErrorTypeStat[];
  /** Still-wrong first, then the most often missed, then the most recent. */
  questions: MistakeQuestionStat[];
  /** Most frequent error of each knowledge label. */
  topErrorByLabel: Record<KnowledgeLabel, ErrorTypeStat>;
}

export interface MistakeReport extends MistakeScope {
  byLevel: Record<ScoredBloomLevel, MistakeScope>;
}

const countOf = <K,>(map: Map<K, number>, key: K) => map.set(key, (map.get(key) ?? 0) + 1);

/** The pick that was graded: with the explanation opened mid-test, it's the first answer, not the corrected one. */
function gradedPick(a: BloomAttempt) {
  return a.correctAnswer && a.selectedAnswer === a.correctAnswer ? a.firstAnswer : a.selectedAnswer;
}

function insightOf(a: BloomAttempt) {
  const answered: AnsweredQuestion = {
    part: a.part as AnsweredQuestion["part"],
    selectedLabel: a.isCorrect === null ? null : gradedPick(a),
    correctLabel: a.correctAnswer ?? "",
    isCorrect: false,
    isFlagged: false,
    initialSelectedLabel: a.firstAnswer,
    hintUsedCount: a.hintUsedCount ?? 0,
    timeSpentSec: a.timeSpentSec ?? 0,
    trapTypeHit: a.trapTypeHit,
    grammarTopicSlug: null,
    bloomLevel: a.bloomLevel,
  };
  return answerInsight(answered);
}

function addType(map: Map<string, ErrorTypeStat>, label: string, tip: string, recent: boolean) {
  const stat = map.get(label) ?? { label, tip, count: 0, recent: 0 };
  stat.count++;
  if (recent) stat.recent++;
  map.set(label, stat);
}

const byCount = (x: ErrorTypeStat, y: ErrorTypeStat) => y.count - x.count;

function summarize(attempts: BloomAttempt[], now: number): MistakeScope {
  const since = now - RECENT_DAYS * 86_400_000;
  const types = new Map<string, ErrorTypeStat>();
  const labelTypes = new Map<KnowledgeLabel, Map<string, ErrorTypeStat>>();
  const history = new Map<string, BloomAttempt[]>();
  let wrongAnswers = 0;
  let skipped = 0;

  for (const a of attempts) {
    const insight = a.isCorrect === true ? null : insightOf(a);
    if (insight?.label && insight.tip) {
      addType(types, insight.label, insight.tip, a.timestamp >= since);
      // "Most frequent error" names a wrong pick: a left-blank answer isn't one.
      if (a.isCorrect === false) {
        const forLabel = labelTypes.get(a.knowledgeLabel) ?? new Map<string, ErrorTypeStat>();
        addType(forLabel, insight.label, insight.tip, a.timestamp >= since);
        labelTypes.set(a.knowledgeLabel, forLabel);
      }
    }
    if (a.isCorrect === null) {
      skipped++;
      continue;
    }
    if (a.isCorrect === false) wrongAnswers++;
    history.set(a.questionId, [...(history.get(a.questionId) ?? []), a]);
  }

  const questions: MistakeQuestionStat[] = [];
  for (const [questionId, list] of history) {
    const wrong = list.filter((a) => a.isCorrect === false);
    const lastWrong = wrong[wrong.length - 1];
    if (!lastWrong) continue;
    const picks = new Map<string, number>();
    for (const a of wrong) {
      const pick = gradedPick(a);
      if (pick) countOf(picks, pick);
    }
    const insight = insightOf(lastWrong);
    questions.push({
      questionId,
      part: lastWrong.part!,
      knowledgeLabel: lastWrong.knowledgeLabel,
      bloomLevel: lastWrong.bloomLevel,
      tries: list.length,
      wrongCount: wrong.length,
      stillWrong: list[list.length - 1].isCorrect === false,
      lastWrongAt: lastWrong.timestamp,
      lastPicked: gradedPick(lastWrong),
      correctAnswer: lastWrong.correctAnswer ?? null,
      picks: [...picks].map(([label, count]) => ({ label, count })).sort((x, y) => y.count - x.count),
      errorLabel: insight.label ?? "",
      errorTip: insight.tip ?? "",
      lastTimeSec: lastWrong.timeSpentSec,
      targetSec: insight.targetSec,
      reviewAttemptId: [...wrong].reverse().find((a) => a.source === "attempt")?.sessionId ?? null,
    });
  }
  questions.sort((x, y) => Number(y.stillWrong) - Number(x.stillWrong) || y.wrongCount - x.wrongCount || y.lastWrongAt - x.lastWrongAt);

  const topErrorByLabel: MistakeScope["topErrorByLabel"] = {};
  for (const [label, map] of labelTypes) topErrorByLabel[label] = [...map.values()].sort(byCount)[0];

  const stillWrong = questions.filter((q) => q.stillWrong).length;
  return {
    wrongAnswers,
    wrongQuestions: questions.length,
    stillWrong,
    fixed: questions.length - stillWrong,
    repeated: questions.filter((q) => q.wrongCount >= 2).length,
    skipped,
    types: [...types.values()].sort(byCount),
    questions,
    topErrorByLabel,
  };
}

/** Every question the learner lost, how, and how often: overall and per Bloom level. */
export function buildMistakeReport(attempts: BloomAttempt[], now: number = Date.now()): MistakeReport {
  // Flashcards aren't questions, and an answer picked after seeing the key says nothing about the learner.
  const real = attempts.filter((a) => a.part !== null && a.revealedBeforeAnswer !== true).sort((a, b) => a.timestamp - b.timestamp);
  const byLevel = {} as MistakeReport["byLevel"];
  for (const level of SCORED_LEVELS) byLevel[level] = summarize(real.filter((a) => a.bloomLevel === level), now);
  return { ...summarize(real, now), byLevel };
}
