import "server-only";
import { db } from "@/lib/db";
import { PART_META } from "@/lib/constants/toeic";

export const REPORT_REASON_LABEL: Record<string, string> = {
  wrong_answer: "Đáp án không chính xác",
  unclear_question: "Câu hỏi không rõ ràng",
  audio_issue: "Lỗi audio",
  typo: "Lỗi chính tả / nội dung",
  other: "Khác",
};

/** Part 1-2 directions text that sometimes ends up stored as a question's
 * prompt instead of the real question. */
const DIRECTIONS_PATTERN = /for each question in this part|look at the picture|you will hear|select the one statement|mark your answer/i;

export interface ReportContext {
  id: string;
  reason: string;
  reasonLabel: string;
  message: string | null;
  reporter: string;
  createdAt: Date;
  question: {
    id: string;
    partLabel: string;
    prompt: string;
    correctLabel: string;
    options: { label: string; content: string; isCorrect: boolean }[];
  };
  /** Where the question lives: test title + its number in that test. */
  location: { testId: string; testTitle: string; number: number } | { grammarTopic: string } | null;
  /** Admin page to fix it (group editor for passage-based questions). */
  editHref: string;
  /** Concrete things to check, from the report reason and the question data. */
  suggestions: string[];
}

function buildSuggestions(
  reason: string,
  message: string | null,
  q: {
    part: keyof typeof PART_META;
    prompt: string;
    imageUrl: string | null;
    audioUrl: string | null;
    transcript: string | null;
    correctLabel: string;
    explanationVi: string;
    passageId: string | null;
    passageAudioUrl: string | null;
    options: { label: string; content: string; isCorrect: boolean }[];
  }
): string[] {
  const out: string[] = [];
  const meta = PART_META[q.part];
  const listening = meta.skill === "LISTENING";
  const flagged = q.options.filter((o) => o.isCorrect);
  const audio = q.audioUrl ?? q.passageAudioUrl;
  const text = `${reason} ${message ?? ""}`.toLowerCase();

  // Data problems worth fixing whatever the learner chose as the reason.
  if (flagged.length !== 1) {
    out.push(`Có ${flagged.length} lựa chọn được đánh dấu đúng. Mỗi câu phải có đúng một đáp án đúng.`);
  } else if (flagged[0].label !== q.correctLabel) {
    out.push(`Đáp án đúng không khớp: trường correctLabel là ${q.correctLabel} nhưng lựa chọn được tick đúng là ${flagged[0].label}.`);
  }
  if (DIRECTIONS_PATTERN.test(q.prompt)) {
    out.push("Nội dung câu hỏi đang là lời hướng dẫn chung của Part, không phải câu hỏi. Thay bằng câu hỏi thật hoặc để trống nếu Part này chỉ có tranh/audio.");
  }
  if (q.part === "PART1" && !q.imageUrl) out.push("Part 1 nhưng chưa có ảnh: tải ảnh lên cho câu này.");
  if (listening && !audio) out.push("Câu Listening chưa có audio (cả ở câu lẫn đoạn hội thoại): tải file audio lên.");
  if (listening && !q.transcript) out.push("Chưa có transcript: thêm transcript để học viên xem lại khi chấm.");
  // "." or "-" placeholders count as empty: there is nothing to read.
  const emptyOptions = q.options.filter((o) => !/[\p{L}\p{N}]/u.test(o.content));
  if (emptyOptions.length > 0 && (q.part === "PART1" || q.part === "PART2")) {
    out.push(
      `Lựa chọn ${emptyOptions.map((o) => o.label).join(", ")} không có chữ. Part 1-2 thi thật chỉ nghe, nhưng khi xem lại học viên không thấy đáp án: nên điền nội dung lựa chọn (lấy từ transcript).`
    );
  } else if (emptyOptions.length > 0) {
    out.push(`Lựa chọn ${emptyOptions.map((o) => o.label).join(", ")} đang trống: điền nội dung.`);
  }
  if (!q.explanationVi.trim()) out.push("Chưa có giải thích tiếng Việt: thêm giải thích vì sao chọn đáp án đúng.");

  // What to check for the reason the learner gave.
  if (reason === "wrong_answer") {
    out.push(`Đối chiếu đáp án đúng hiện tại (${q.correctLabel}) với đáp án gốc của đề${q.transcript ? " và transcript" : ""}; sửa ở trường đáp án đúng nếu sai.`);
  } else if (reason === "audio_issue") {
    out.push(audio ? "Mở file audio kiểm tra: có phát được không, đúng đoạn của câu này không, có bị cắt không." : "Tải audio lên cho câu này.");
  } else if (reason === "unclear_question") {
    out.push("Đọc lại câu hỏi và các lựa chọn, sửa câu chữ mơ hồ hoặc thêm ngữ cảnh/giải thích.");
  } else if (reason === "typo") {
    out.push("Soát chính tả câu hỏi, các lựa chọn và phần giải thích.");
  }
  if (/đáp án|dap an|answer/.test(text) && /(không|ko|k) (thấy|thay|hiện|hien)/.test(text)) {
    out.push("Học viên nói không thấy đáp án: kiểm tra các lựa chọn có nội dung và câu có đúng một đáp án đúng.");
  }
  return [...new Set(out)];
}

/** Open question reports with everything an admin needs to find and fix
 * the question: test and question number, edit link and fix suggestions. */
export async function getOpenReportContexts(take = 30): Promise<ReportContext[]> {
  const reports = await db.questionReport.findMany({
    where: { status: "OPEN" },
    orderBy: { createdAt: "desc" },
    take,
    include: {
      user: { select: { email: true } },
      question: {
        include: {
          options: { orderBy: { label: "asc" } },
          test: { select: { id: true, title: true } },
          passage: { select: { audioUrl: true } },
          grammarTopic: { select: { title: true } },
        },
      },
    },
  });

  // A test lists its questions by orderIndex (ties by createdAt, id), so a
  // question's number is its position in that order.
  const testIds = [...new Set(reports.map((r) => r.question.testId).filter((id): id is string => !!id))];
  const orderByTest = new Map<string, string[]>();
  await Promise.all(
    testIds.map(async (testId) => {
      const rows = await db.question.findMany({
        where: { testId },
        orderBy: [{ orderIndex: "asc" }, { createdAt: "asc" }, { id: "asc" }],
        select: { id: true },
      });
      orderByTest.set(testId, rows.map((r) => r.id));
    })
  );

  return reports.map((r) => {
    const q = r.question;
    const number = q.testId ? (orderByTest.get(q.testId)?.indexOf(q.id) ?? -1) + 1 : 0;
    return {
      id: r.id,
      reason: r.reason,
      reasonLabel: REPORT_REASON_LABEL[r.reason] ?? r.reason,
      message: r.message,
      reporter: r.user.email,
      createdAt: r.createdAt,
      question: {
        id: q.id,
        partLabel: PART_META[q.part].label,
        prompt: q.prompt,
        correctLabel: q.correctLabel,
        options: q.options.map((o) => ({ label: o.label, content: o.content, isCorrect: o.isCorrect })),
      },
      location:
        q.test && number > 0
          ? { testId: q.test.id, testTitle: q.test.title, number }
          : q.grammarTopic
            ? { grammarTopic: q.grammarTopic.title }
            : null,
      editHref: q.passageId ? `/admin/questions/groups/${q.passageId}/edit` : `/admin/questions/${q.id}`,
      suggestions: buildSuggestions(r.reason, r.message, {
        part: q.part,
        prompt: q.prompt,
        imageUrl: q.imageUrl,
        audioUrl: q.audioUrl,
        transcript: q.transcript,
        correctLabel: q.correctLabel,
        explanationVi: q.explanationVi,
        passageId: q.passageId,
        passageAudioUrl: q.passage?.audioUrl ?? null,
        options: q.options,
      }),
    };
  });
}
