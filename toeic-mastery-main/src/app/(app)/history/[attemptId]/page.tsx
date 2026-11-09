import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { RotateCcw, Sparkles, Target } from "lucide-react";
import { requireUser, isPro } from "@/lib/auth";
import { getAttemptResult } from "@/lib/data/history";
import { startAttemptAction, startMistakeRetryAction } from "@/lib/actions/attempts";
import { Button } from "@/components/ui/button";
import { ScoreResultHeader } from "@/components/history/score-result-header";
import { AnswerSheet } from "@/components/history/answer-sheet";
import { AnswerAnalysis } from "@/components/history/answer-analysis";
import { PANEL } from "@/components/analytics/insights-view";
import { QuestionReviewList } from "@/components/history/question-review-list";
import { ResultCelebration } from "@/components/history/result-celebration";
import { StudyMascot } from "@/components/mascot/study-mascot";
import { HistoryResultTour } from "@/components/history/history-result-tour";

export const metadata: Metadata = { title: "Kết quả bài thi" };

export default async function AttemptResultPage({ params }: { params: Promise<{ attemptId: string }> }) {
  const { attemptId } = await params;
  const profile = await requireUser();

  const { attempt, questionReviews, partBreakdown, analysis, timeUsedSec, xpEarned } = await getAttemptResult(attemptId, profile.id, isPro(profile));

  if (attempt.status === "IN_PROGRESS") redirect(`/exam/${attemptId}`);

  const correctCount = attempt.correctCount ?? 0;
  const wrongCount = attempt.wrongCount ?? 0;
  const skippedCount = attempt.skippedCount ?? 0;
  const accuracy = correctCount + wrongCount > 0 ? correctCount / (correctCount + wrongCount) : 0;
  const lostCount = wrongCount + skippedCount;
  const doingWell = correctCount >= (correctCount + lostCount) * 0.7;
  const achievedTarget =!!profile.targetScore && !!attempt.totalScore && attempt.totalScore >= profile.targetScore;

  return (
    <div className="flex flex-col gap-6">
      <ResultCelebration attemptId={attemptId} achievedTarget={achievedTarget} />

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{attempt.test.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Nộp bài lúc {attempt.submittedAt?.toLocaleString("vi-VN")} · Chế độ {attempt.mode === "EXAM" ? "Thi thử" : "Luyện tập"}
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-warning/15 px-3.5 py-1.5 text-sm font-semibold text-foreground">
          <Sparkles className="size-4 text-warning" />+{xpEarned} XP từ bài này
        </span>
      </div>

      <div data-tour="history-result-score" className={`${PANEL} flex flex-col gap-6`}>
        <ScoreResultHeader
          isEstimated
          totalScore={attempt.totalScore}
          listeningScore={attempt.listeningScore}
          readingScore={attempt.readingScore}
          correctCount={correctCount}
          wrongCount={wrongCount}
          skippedCount={skippedCount}
          accuracy={accuracy}
          timeUsedSec={timeUsedSec}
        />
        <AnswerSheet reviews={questionReviews} />
      </div>

      <AnswerAnalysis parts={partBreakdown} analysis={analysis} />

      <div className="flex flex-wrap items-center gap-3">
        {/* Both start a brand new real Attempt (same exam-runner UI as any
           other attempt, timer/navigator/groups included) rather than some
           separate lightweight review screen — "tất cả" reuses the exact
           same testId+parts scope via startAttemptAction, "câu sai" needs
           startMistakeRetryAction since no testId+parts combination can
           express "just these specific questions". */}
        {lostCount > 0 && (
          <form action={startMistakeRetryAction.bind(null, attemptId)}>
            <Button type="submit" size="lg">
              <Target className="size-4" />
              Luyện lại {lostCount} câu sai và bỏ qua
            </Button>
          </form>
        )}
        <form action={startAttemptAction.bind(null, attempt.testId, "PRACTICE", attempt.parts)}>
          <Button type="submit" size="lg" variant={lostCount > 0 ? "outline" : "default"}>
            <RotateCcw className="size-4" />
            Luyện lại tất cả
          </Button>
        </form>
      </div>

      <section data-tour="history-result-questions">
        <h2 className="mb-3 text-lg font-semibold">Xem lại đáp án</h2>
        <QuestionReviewList reviews={questionReviews} attemptId={attemptId} />
      </section>

      <StudyMascot
        state={doingWell ? "success" : "encouraging"}
        message={doingWell ? "Làm tốt lắm! Xem lại vài câu sai là chắc hơn nữa." : "Chưa như ý cũng không sao. Bắt đầu từ các câu sai nhé."}
        equippedShopItemId={profile.equippedShopItemId}
      />
      <HistoryResultTour />
    </div>
  );
}
