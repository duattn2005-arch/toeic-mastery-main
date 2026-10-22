"use client";

import { CircleCheck, Headphones, Lightbulb, PencilLine, Settings } from "lucide-react";
import { useSequentialTour } from "@/hooks/use-tour-driver";
import { TOUR_IDS } from "@/lib/constants/tour";

const STEPS = [
  { icon: Headphones, text: "Nghe từng câu — bật lặp lại để nghe đi nghe lại" },
  { icon: PencilLine, text: "Gõ từ còn thiếu vào mỗi ô trống" },
  { icon: Lightbulb, text: "Bí thì bấm Gợi ý để hiện dần từng chữ cái" },
  { icon: CircleCheck, text: "Kiểm tra từng câu, rồi xem Dịch & đáp án" },
];

function Welcome() {
  return (
    <div className="flex flex-col gap-3">
      <p>Luyện nghe chép chính tả 10 đề ETS 2026 — cách nhanh nhất để nghe ra từng từ trong bài thi thật.</p>
      <ol className="flex flex-col gap-2">
        {STEPS.map(({ icon: Icon, text }, i) => (
          <li key={i} className="flex items-center gap-2.5">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Icon className="size-4" />
            </span>
            <span className="text-sm">{text}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px] font-semibold">{children}</kbd>;
}

/** First-visit guide for a Transcript Mastery test page: a welcome, then
 * the Part tabs, the audio card, one question's tools, the first blank and
 * the settings/shortcuts. Shown once per account (see use-tour-step.ts),
 * also to existing learners; "Bỏ qua" turns it off for good. The `data-tour` anchors live in
 * transcript-practice.tsx. */
export function TranscriptTour({ userId }: { userId?: string }) {
  useSequentialTour(
    TOUR_IDS.TRANSCRIPT,
    [
    {
      title: "🎧 Chào mừng đến Transcript Mastery ETS 2026!",
      description: "Luyện nghe chép chính tả 10 đề ETS 2026: nghe từng câu, điền từ còn thiếu, kiểm tra và xem dịch & đáp án.",
      descriptionNode: <Welcome />,
      nextBtnText: "Bắt đầu hướng dẫn",
      noProgress: true,
    },
    {
      element: '[data-tour="transcript-parts"]',
      title: "📑 Chọn Part",
      description: "Mỗi đề có 4 Part. Bấm để chuyển Part — số đúng/tổng của lần chấm gần nhất hiện ngay trên từng Part.",
      nextBtnText: "Tiếp tục",
      side: "bottom",
      align: "start",
    },
    {
      element: '[data-tour="transcript-audio"]',
      title: "🔊 File nghe",
      description: "Trình nghe của cả Part: chỉnh tốc độ 0.75×–1.25×, tua lại 5 giây. Thanh tiến độ cho biết bạn đã điền được bao nhiêu ô.",
      nextBtnText: "Tiếp tục",
      side: "right",
      align: "start",
    },
    {
      element: '[data-tour="transcript-first-group"]',
      title: "🎯 Học từng câu một",
      description:
        "“Nghe câu” chỉ phát đúng câu này, nút 🔁 để lặp lại. “Gợi ý” hiện dần chữ cái, “Kiểm tra” chấm riêng câu này, “Dịch & đáp án” xem bản dịch song ngữ và đáp án đúng.",
      nextBtnText: "Tiếp tục",
      side: "bottom",
      align: "start",
    },
    {
      element: '[data-tour="transcript-first-group"] [data-transcript-blank]',
      title: "✍️ Gõ từ bạn nghe được",
      description: "Mỗi ô là một từ. Enter để sang ô tiếp theo — Enter ở ô cuối của câu sẽ kiểm tra luôn câu đó, sai thì con trỏ quay về ô sai.",
      nextBtnText: "Tiếp tục",
      side: "bottom",
      align: "start",
    },
    {
      element: '[data-tour="transcript-settings"]',
      title: "⌨️ Phím tắt & Cài đặt",
      description: "Học không cần chuột: nhấn riêng phím Ctrl để nghe lại câu, phím ` để tạm dừng. Đổi phím, số lần tự lặp, hiện sẵn chữ cái đầu trong Cài đặt.",
      descriptionNode: (
        <div className="flex flex-col gap-2 text-sm">
          <p>Học không cần chuột:</p>
          <ul className="flex flex-col gap-1.5">
            <li className="flex items-center justify-between gap-3">
              Nghe lại câu <Kbd>Ctrl</Kbd>
            </li>
            <li className="flex items-center justify-between gap-3">
              Phát / tạm dừng <Kbd>`</Kbd>
            </li>
            <li className="flex items-center justify-between gap-3">
              Gợi ý ô đang gõ <Kbd>Alt + H</Kbd>
            </li>
            <li className="flex items-center justify-between gap-3">
              Kiểm tra câu <Kbd>Alt + C</Kbd>
            </li>
          </ul>
          <p className="text-muted-foreground">
            Đổi phím, số lần tự lặp lại, hiện sẵn chữ cái đầu… trong <Settings className="inline size-3.5" /> Cài đặt.
          </p>
        </div>
      ),
      nextBtnText: "Bắt đầu luyện",
      // Right of the settings, bottom-aligned so it grows upwards: they sit
      // low in the sticky sidebar, and a top-aligned popover ran off the
      // bottom of the screen (above them, it covered them).
      side: "right",
      align: "end",
    },
    ],
    // A launch guide: every account sees it once from now on, including
    // learners past the first-visits cap of the regular onboarding tours.
    { userId, announcement: true }
  );

  return null;
}
