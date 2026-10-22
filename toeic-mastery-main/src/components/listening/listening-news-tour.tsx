"use client";

import { CircleCheck, Headphones, Keyboard, Languages, Lightbulb } from "lucide-react";
import { useSequentialTour } from "@/hooks/use-tour-driver";
import { TOUR_IDS } from "@/lib/constants/tour";

const FEATURES = [
  { icon: Headphones, text: "Nghe lại riêng từng câu, tự lặp lại" },
  { icon: Lightbulb, text: "Gợi ý hiện dần từng chữ cái" },
  { icon: CircleCheck, text: "Chấm ngay từng câu khi làm xong" },
  { icon: Languages, text: "Dịch song ngữ & đáp án mỗi câu" },
  { icon: Keyboard, text: "Phím tắt — luyện không cần chuột" },
];

/** "Có gì mới" on /listening: spotlights the Transcript Mastery ETS 2026
 * banner once per account from its launch — existing learners too, which
 * the regular first-visits-only tours would never reach. A brand-new
 * learner gets the basic Listening tour first; this one waits for it. */
export function ListeningNewsTour({ userId }: { userId: string }) {
  useSequentialTour(
    TOUR_IDS.LISTENING_NEWS_TRANSCRIPT,
    [
      {
        element: '[data-tour="transcript-banner"]',
        title: "✨ Mới: Transcript Mastery ETS 2026",
        description:
          "Luyện nghe chép độc quyền 10 đề ETS 2026: nghe lại từng câu, gợi ý chữ cái, chấm ngay từng câu, dịch song ngữ & đáp án, phím tắt. Bấm vào banner để bắt đầu.",
        descriptionNode: (
          <div className="flex flex-col gap-2.5">
            <p className="text-sm">Luyện nghe chép độc quyền 10 đề ETS 2026, nay có thêm:</p>
            <ul className="flex flex-col gap-1.5">
              {FEATURES.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2 text-sm">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary">
                    <Icon className="size-3.5" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground">Bấm vào banner để bắt đầu — lần đầu vào sẽ có hướng dẫn từng bước.</p>
          </div>
        ),
        nextBtnText: "Đã hiểu",
        noProgress: true,
        side: "bottom",
        align: "start",
      },
    ],
    { userId, announcement: true, after: TOUR_IDS.LISTENING }
  );

  return null;
}
