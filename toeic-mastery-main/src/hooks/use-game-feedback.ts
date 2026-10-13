"use client";

import * as React from "react";
import { pronounce } from "@/lib/pronounce";
import { playWrongSound } from "@/lib/sfx";
import { useStudyPreferences } from "@/hooks/use-study-preferences";

/** Sound feedback shared by every study game and the quiz: a right answer
 * reads the English word aloud, a wrong one plays a short buzz. Both follow
 * the learner's saved settings (GameSoundControls). */
export function useGameFeedback() {
  const [prefs] = useStudyPreferences();

  const correct = React.useCallback(
    (word: { term: string; audioUrl?: string | null } | undefined) => {
      if (prefs.gameSpeak && word) pronounce(word.term, word.audioUrl);
    },
    [prefs.gameSpeak]
  );

  const wrong = React.useCallback(() => {
    if (prefs.gameSfx) playWrongSound();
  }, [prefs.gameSfx]);

  return { correct, wrong };
}
