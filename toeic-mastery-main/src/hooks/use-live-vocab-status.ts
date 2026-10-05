"use client";

import * as React from "react";
import type { ReviewRating, VocabStatus } from "@/lib/services/spaced-repetition";
import type { StudyItem } from "@/lib/services/study-game";

/** Keeps each item's Chưa học / Đang học / Đã thuộc badge current during a
 * session without a page reload, by the same rule as spaced-repetition.ts:
 * right with no miss -> Đã thuộc; any miss or "Khó" -> Đang học, and a word
 * missed in this session stays Đang học even if answered right later. */
export function useLiveVocabStatus(items: StudyItem[]) {
  const [overrides, setOverrides] = React.useState<Record<string, VocabStatus>>({});
  const missed = React.useRef(new Set<string>());

  const record = React.useCallback(
    (itemId: string, rating: ReviewRating) => {
      if (!items.some((i) => i.id === itemId && i.status)) return;
      if (rating === "AGAIN" || rating === "HARD") missed.current.add(itemId);
      const next: VocabStatus = missed.current.has(itemId) ? "learning" : "mastered";
      setOverrides((prev) => (prev[itemId] === next ? prev : { ...prev, [itemId]: next }));
    },
    [items]
  );

  const liveItems = React.useMemo(
    () => items.map((i) => (overrides[i.id] ? { ...i, status: overrides[i.id] } : i)),
    [items, overrides]
  );
  return [liveItems, record] as const;
}
