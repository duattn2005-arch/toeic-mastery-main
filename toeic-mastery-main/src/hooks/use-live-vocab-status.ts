"use client";

import * as React from "react";
import type { ReviewRating, VocabStatus } from "@/lib/services/spaced-repetition";
import type { StudyItem } from "@/lib/services/study-game";

/** Keeps each item's Chưa học / Đang học / Đã thuộc badge current during a
 * session without a page reload: a miss (AGAIN) or "Khó" puts the word in
 * Đang học; a correct answer moves a new word into Đang học (mastery takes
 * recall on separate days, so it never flips to Đã thuộc mid-session). */
export function useLiveVocabStatus(items: StudyItem[]) {
  const [overrides, setOverrides] = React.useState<Record<string, VocabStatus>>({});

  const record = React.useCallback(
    (itemId: string, rating: ReviewRating) => {
      setOverrides((prev) => {
        const current = prev[itemId] ?? items.find((i) => i.id === itemId)?.status;
        if (current === undefined) return prev;
        const next: VocabStatus = rating === "AGAIN" || rating === "HARD" ? "learning" : current === "new" ? "learning" : current;
        return next === current ? prev : { ...prev, [itemId]: next };
      });
    },
    [items]
  );

  const liveItems = React.useMemo(
    () => items.map((i) => (overrides[i.id] ? { ...i, status: overrides[i.id] } : i)),
    [items, overrides]
  );
  return [liveItems, record] as const;
}
