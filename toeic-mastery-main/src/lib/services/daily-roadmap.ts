import type { TestPart } from "@/generated/prisma/enums";
import { MASTERY_THRESHOLD, MIN_SAMPLE_FOR_WEAKNESS } from "@/lib/bloom/config";
import { PART_META } from "@/lib/constants/toeic";
import type { PartAccuracy } from "@/lib/services/recommendation";

/**
 * Today's study route on the dashboard: an ordered list of stops built from
 * what the learner actually has on record (due words, weakest Parts, the
 * test in progress, today's minutes). Rule-based and pure — no DB, no LLM —
 * so it can be unit-tested and reasoned about.
 */

export type RoadmapStepKind = "diagnostic" | "vocab" | "part" | "test" | "time" | "finish";
export type RoadmapIcon = "compass" | "layers" | "headphones" | "book" | "list" | "timer" | "flag";
export type RoadmapStatus = "done" | "current" | "next";

export interface RoadmapStep {
  id: string;
  kind: RoadmapStepKind;
  icon: RoadmapIcon;
  /** Short name shown under the stop, e.g. "Part 4 · Nghe". */
  label: string;
  /** Full sentence for the "current stop" banner. */
  title: string;
  /** Why this stop is on today's route. */
  reason: string;
  /** e.g. "3/10 câu". */
  progressLabel: string;
  /** 0-100 */
  progress: number;
  status: RoadmapStatus;
  href: string;
  cta: string;
  /** Rough time left for this stop, in minutes (0 when done). */
  minutes: number;
}

export interface RoadmapInput {
  pro: boolean;
  /** Empty for free accounts (per-Part analysis is Pro-only). */
  partAccuracies: PartAccuracy[];
  /** Questions answered today, per Part. */
  todayPartAnswers: Partial<Record<TestPart, number>>;
  /** Submitted attempts, all time / today. */
  attemptsCompleted: number;
  attemptsToday: number;
  dueVocab: number;
  vocabularyLearned: number;
  continueAttempt: { id: string; title: string; currentQuestionIndex: number; totalQuestions: number } | null;
  todayMinutes: number;
  dailyGoalMinutes: number;
  streakCount: number;
}

export interface DailyRoadmap {
  steps: RoadmapStep[];
  /** Stops excluding the finish line. */
  total: number;
  doneCount: number;
  /** Minutes of work left across the open stops. */
  minutesLeft: number;
  current: RoadmapStep | null;
  allDone: boolean;
}

/** Questions of one Part that count as "practised it today". */
export const DAILY_PART_QUESTIONS = 10;
const MAX_PART_STEPS = 2;

type Draft = Omit<RoadmapStep, "status"> & { done: boolean };

const pct = (value: number) => Math.round(value * 100);
const clamp = (value: number) => Math.max(0, Math.min(100, value));

function partHref(part: TestPart): string {
  const meta = PART_META[part];
  return meta.skill === "LISTENING" ? `/listening/${meta.slug}` : `/reading/${meta.slug}`;
}

/** Which Parts to practise today, weakest first. Falls back to a Part with
 * too little data to judge, then to the lowest-scoring one for upkeep. */
function pickParts(partAccuracies: PartAccuracy[]): { entry: PartAccuracy; why: "weak" | "unknown" | "upkeep" }[] {
  const weak = partAccuracies
    .filter((p) => p.attempted >= MIN_SAMPLE_FOR_WEAKNESS && p.accuracy < MASTERY_THRESHOLD)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, MAX_PART_STEPS)
    .map((entry) => ({ entry, why: "weak" as const }));
  if (weak.length === MAX_PART_STEPS) return weak;

  const unknown = partAccuracies.find((p) => p.attempted < MIN_SAMPLE_FOR_WEAKNESS);
  if (unknown) return [...weak, { entry: unknown, why: "unknown" as const }];
  if (weak.length > 0) return weak;

  const lowest = [...partAccuracies].sort((a, b) => a.accuracy - b.accuracy)[0];
  return lowest ? [{ entry: lowest, why: "upkeep" as const }] : [];
}

function partStep({ entry, why }: ReturnType<typeof pickParts>[number], todayAnswers: number): Draft {
  const meta = PART_META[entry.part];
  const listening = meta.skill === "LISTENING";
  const answered = Math.min(todayAnswers, DAILY_PART_QUESTIONS);
  const left = DAILY_PART_QUESTIONS - answered;
  const reason =
    why === "weak"
      ? `Bạn đang đúng ${pct(entry.accuracy)}% trên ${entry.attempted} câu, mức thạo là ${pct(MASTERY_THRESHOLD)}%. Đây là Part kéo điểm xuống nhiều nhất.`
      : why === "unknown"
        ? `Mới có ${entry.attempted} câu ở Part này, chưa đủ để biết bạn mạnh hay yếu.`
        : `Các Part đều đã qua mức thạo. Part này thấp nhất (${pct(entry.accuracy)}%), luyện để giữ phong độ.`;

  return {
    id: `part-${meta.slug}`,
    kind: "part",
    icon: listening ? "headphones" : "book",
    label: `${meta.shortLabel} · ${listening ? "Nghe" : "Đọc"}`,
    title: `Luyện ${DAILY_PART_QUESTIONS} câu ${meta.label}`,
    reason,
    progressLabel: `${answered}/${DAILY_PART_QUESTIONS} câu`,
    progress: clamp((answered / DAILY_PART_QUESTIONS) * 100),
    done: left === 0,
    href: partHref(entry.part),
    cta: `Luyện ${meta.shortLabel}`,
    // Listening is paced by the audio (~30s a question); Reading by the standard time.
    minutes: Math.max(1, Math.ceil((left * (listening ? 30 : meta.targetSeconds)) / 60)),
  };
}

export function buildDailyRoadmap(input: RoadmapInput): DailyRoadmap {
  const drafts: Draft[] = [];
  const firstTimer = input.attemptsCompleted === 0 && !input.continueAttempt;

  if (firstTimer) {
    drafts.push({
      id: "diagnostic",
      kind: "diagnostic",
      icon: "compass",
      label: "Bài đầu vào",
      title: "Làm bài test đầu tiên",
      reason: "Chưa có bài làm nào nên chưa biết bạn yếu ở đâu. Xong bài này, lộ trình sẽ bám theo đúng Part bạn cần luyện.",
      progressLabel: "0/1 bài",
      progress: 0,
      done: false,
      href: "/practice/start",
      cta: "Bắt đầu bài test",
      minutes: 20,
    });
  }

  if (input.dueVocab > 0) {
    drafts.push({
      id: "vocab",
      kind: "vocab",
      icon: "layers",
      label: "Ôn từ vựng",
      title: `Ôn ${input.dueVocab} từ đến hạn`,
      reason: "Các từ này đến lịch ôn hôm nay. Bỏ qua thì phải học lại từ đầu.",
      progressLabel: `còn ${input.dueVocab} từ`,
      progress: 0,
      done: false,
      href: "/vocabulary/review",
      cta: `Ôn ${input.dueVocab} từ`,
      minutes: Math.max(2, Math.min(15, Math.ceil(input.dueVocab / 4))),
    });
  } else if (input.vocabularyLearned === 0) {
    drafts.push({
      id: "vocab",
      kind: "vocab",
      icon: "layers",
      label: "Từ vựng mới",
      title: "Học bộ từ vựng đầu tiên",
      reason: "Bạn chưa học từ nào. Vốn từ là thứ quyết định Part 5, 6 và 7.",
      progressLabel: "0 từ",
      progress: 0,
      done: false,
      href: "/vocabulary",
      cta: "Chọn bộ từ",
      minutes: 8,
    });
  }

  if (!firstTimer) {
    if (input.pro && input.partAccuracies.length > 0) {
      for (const pick of pickParts(input.partAccuracies)) {
        drafts.push(partStep(pick, input.todayPartAnswers[pick.entry.part] ?? 0));
      }
    } else {
      const answered = Math.min(
        Object.values(input.todayPartAnswers).reduce<number>((sum, n) => sum + (n ?? 0), 0),
        DAILY_PART_QUESTIONS,
      );
      drafts.push({
        id: "part-any",
        kind: "part",
        icon: "book",
        label: "Luyện theo Part",
        title: `Luyện ${DAILY_PART_QUESTIONS} câu theo Part`,
        reason: "Chọn một Part bạn thấy khó nhất. Gói Pro sẽ chỉ ra chính xác Part nào đang kéo điểm xuống.",
        progressLabel: `${answered}/${DAILY_PART_QUESTIONS} câu`,
        progress: clamp((answered / DAILY_PART_QUESTIONS) * 100),
        done: answered >= DAILY_PART_QUESTIONS,
        href: "/practice",
        cta: "Chọn Part",
        minutes: Math.max(1, Math.ceil((DAILY_PART_QUESTIONS - answered) / 2)),
      });
    }

    const attempt = input.continueAttempt;
    if (attempt) {
      const left = Math.max(0, attempt.totalQuestions - attempt.currentQuestionIndex);
      // A full test barely started is hours of work, not a slice of today's
      // route — leave the estimate off rather than swamp the day's total.
      const minutes = Math.ceil((left * 36) / 60);
      drafts.push({
        id: "test",
        kind: "test",
        icon: "list",
        label: "Đề đang dở",
        title: `Làm tiếp: ${attempt.title}`,
        reason: `Bạn dừng ở câu ${attempt.currentQuestionIndex}/${attempt.totalQuestions}. Nộp bài thì mới có điểm và phân tích.`,
        progressLabel: `${attempt.currentQuestionIndex}/${attempt.totalQuestions} câu`,
        progress: attempt.totalQuestions > 0 ? clamp((attempt.currentQuestionIndex / attempt.totalQuestions) * 100) : 0,
        done: false,
        href: `/exam/${attempt.id}`,
        cta: "Làm tiếp",
        minutes: minutes <= 45 ? Math.max(1, minutes) : 0,
      });
    } else {
      const done = input.attemptsToday > 0;
      drafts.push({
        id: "test",
        kind: "test",
        icon: "list",
        label: "Luyện đề",
        title: "Làm 1 đề luyện tập",
        reason: "Làm đề để kiểm tra những gì vừa luyện và cập nhật điểm ước tính.",
        progressLabel: done ? "1/1 đề" : "0/1 đề",
        progress: done ? 100 : 0,
        done,
        href: "/practice",
        cta: "Chọn đề",
        minutes: done ? 0 : 20,
      });
    }
  }

  const goal = input.dailyGoalMinutes;
  if (goal > 0) {
    const studied = Math.min(input.todayMinutes, goal);
    drafts.push({
      id: "time",
      kind: "time",
      icon: "timer",
      label: `Đủ ${goal} phút`,
      title: `Học đủ ${goal} phút hôm nay`,
      reason: "Đây là mục tiêu mỗi ngày bạn tự đặt. Học thêm bằng Quick Study nếu còn thiếu.",
      progressLabel: `${studied}/${goal} phút`,
      progress: clamp((studied / goal) * 100),
      done: studied >= goal,
      href: "/quick-study",
      cta: "Mở Quick Study",
      minutes: 0, // already covered by the stops above
    });
  }

  const currentIndex = drafts.findIndex((d) => !d.done);
  const allDone = currentIndex === -1;
  const steps: RoadmapStep[] = drafts.map(({ done, ...step }, i) => ({
    ...step,
    minutes: done ? 0 : step.minutes,
    status: done ? "done" : i === currentIndex ? "current" : "next",
  }));

  const streakAfter = Math.max(1, input.streakCount);
  steps.push({
    id: "finish",
    kind: "finish",
    icon: "flag",
    label: "Về đích",
    title: "Xong lộ trình hôm nay",
    reason: `Bạn đã đi hết các chặng. Chuỗi học đang là ${streakAfter} ngày.`,
    progressLabel: allDone ? "Hoàn thành" : `còn ${drafts.filter((d) => !d.done).length} chặng`,
    progress: allDone ? 100 : 0,
    status: allDone ? "done" : "next",
    href: "/practice",
    cta: "Luyện thêm",
    minutes: 0,
  });

  return {
    steps,
    total: drafts.length,
    doneCount: drafts.filter((d) => d.done).length,
    minutesLeft: steps.reduce((sum, s) => sum + s.minutes, 0),
    current: allDone ? null : steps[currentIndex],
    allDone,
  };
}
