import { MASTERY_THRESHOLD, TRAP_TYPES, type TrapType } from "./config";
import type { AnswerAnalysis } from "./engine";

const pct = (x: number) => `${Math.round(x * 100)}%`;

/** A habit must account for this share of wrong answers before it's called the priority. */
const MIN_SHARE_OF_WRONG = 0.1;

// Trap codes come from stored answers, so an old code must not crash the page.
const trapName = (trap: TrapType) => TRAP_TYPES[trap]?.nameVi ?? trap;

function trapInsight(a: AnswerAnalysis) {
  const [first, second] = a.traps;
  if (!first) {
    return a.unclassifiedWrong > 0
      ? `${a.unclassifiedWrong} câu sai chưa thuộc dạng bẫy nào đã gắn mã.`
      : "Bạn chưa dính bẫy nào trong các câu đã làm.";
  }
  const also = second ? ` Tiếp theo là ${trapName(second.trap)} (${second.count} lần).` : "";
  return `Gặp nhiều nhất: ${trapName(first.trap)} (${first.count} lần). ${TRAP_TYPES[first.trap]?.description ?? ""}${also}`;
}

function changeInsight(a: AnswerAnalysis) {
  const total = a.rightToWrong + a.wrongToRight + a.wrongToWrong;
  if (total === 0) return "Bạn chưa đổi đáp án ở câu nào.";
  const stillWrong = a.wrongToWrong > 0 ? `, ${a.wrongToWrong} lần vẫn sai` : "";
  const counts = `Đổi ${total} lần: ${a.wrongToRight} lần từ sai thành đúng, ${a.rightToWrong} lần từ đúng thành sai${stillWrong}.`;
  if (a.rightToWrong > a.wrongToRight) return `${counts} Việc đổi đáp án đang làm bạn mất điểm.`;
  if (a.wrongToRight > a.rightToWrong) return `${counts} Việc rà lại đang giúp bạn có thêm điểm.`;
  return `${counts} Việc đổi đáp án chưa giúp bạn có thêm điểm.`;
}

function timeInsight(a: AnswerAnalysis) {
  const { avgSecCorrect: right, avgSecWrong: wrong } = a;
  if (right === null || wrong === null) return "Cần có cả câu đúng và câu sai được tính giờ để so sánh.";
  if (wrong > right * 1.5) return "Câu sai tốn nhiều thời gian hơn hẳn câu đúng. Hãy đặt giới hạn cho câu khó rồi đi tiếp.";
  if (right > wrong * 1.5) return "Câu sai được làm nhanh hơn hẳn câu đúng. Có thể bạn đang chọn vội ở những câu này.";
  return "Thời gian cho câu đúng và câu sai gần như nhau.";
}

function hintInsight(a: AnswerAnalysis, hintsUsed: number) {
  if (hintsUsed === 0) return "Bạn chưa mở gợi ý nào khi làm bài.";
  return `Bạn đã mở ${hintsUsed} bước gợi ý. Câu đúng nhờ gợi ý chỉ được tính nửa điểm năng lực.`;
}

/** The priority goes to whatever cost the most questions, so a rare habit can't outrank a common one. */
function recommendation(a: AnswerAnalysis, currentLevel: number | null) {
  const wrong = a.answered - a.correct;
  const matters = (count: number) => wrong > 0 && count / wrong >= MIN_SHARE_OF_WRONG;
  const topTrap = a.traps[0];
  const flips = a.rightToWrong > a.wrongToRight && a.rightToWrong >= 2 && matters(a.rightToWrong) ? a.rightToWrong : 0;
  const trapHits = topTrap && topTrap.count >= 3 && matters(topTrap.count) ? topTrap.count : 0;

  if (trapHits > 0 && trapHits >= flips) {
    return `Tập trung khắc phục ${trapName(topTrap.trap)}: bạn dính ${trapHits} lần trong ${wrong} câu sai. ${TRAP_TYPES[topTrap.trap]?.description ?? ""}`;
  }
  if (flips > 0) {
    return `Bớt đổi đáp án khi chưa chắc: bạn đổi từ đúng thành sai ${a.rightToWrong} lần, nhiều hơn ${a.wrongToRight} lần từ sai thành đúng. Chỉ đổi khi tìm được bằng chứng rõ ràng trong bài.`;
  }
  if (a.avgSecWrong !== null && a.avgSecCorrect !== null && a.avgSecWrong > a.avgSecCorrect * 1.5 && a.avgSecWrong >= 40) {
    return `Dừng sớm hơn ở câu khó: mỗi câu sai của bạn tốn trung bình ${Math.round(a.avgSecWrong)} giây. Sau 35–40 giây chưa thấy manh mối, hãy loại trừ và chọn đáp án tốt nhất.`;
  }
  if (a.hintedCorrect > 0 && a.hintedCorrect >= a.correct * 0.3) {
    return `Giảm dựa vào gợi ý: ${a.hintedCorrect} trong ${a.correct} câu đúng có dùng gợi ý. Hãy tự gạch từ khóa và phân tích trước khi mở.`;
  }
  if (a.accuracy < MASTERY_THRESHOLD) {
    return `Củng cố kiến thức ở Bậc ${currentLevel ?? 1} để nâng tỷ lệ đúng từ ${pct(a.accuracy)} lên mức vững ${pct(MASTERY_THRESHOLD)}.`;
  }
  return `Tỷ lệ đúng đã đạt ${pct(a.accuracy)}. Hãy thử các bài có tính giờ ở bậc tư duy cao hơn.`;
}

export function answerInsights(a: AnswerAnalysis, hintsUsed: number, currentLevel: number | null) {
  return {
    recommendation: recommendation(a, currentLevel),
    trap: trapInsight(a),
    change: changeInsight(a),
    time: timeInsight(a),
    hint: hintInsight(a, hintsUsed),
  };
}
