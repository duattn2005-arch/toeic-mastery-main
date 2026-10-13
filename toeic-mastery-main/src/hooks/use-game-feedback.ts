"use client";

import * as React from "react";
import { preloadPronunciations, pronounce } from "@/lib/pronounce";
import { playWrongSound } from "@/lib/sfx";
import { useStudyPreferences } from "@/hooks/use-study-preferences";

type Word = { term: string; audioUrl?: string | null };

/** Sound feedback shared by every study game and the quiz: a right answer
 * (or, in Nối từ, tapping an English tile) reads the English word aloud, a
 * wrong one plays a short buzz. Both follow the learner's saved study
 * settings. Pass the game's words to have their audio ready before the
 * first tap. */
export function useGameFeedback(words?: Word[]) {
  React.useEffect(() => {
    if (words) preloadPronunciations(words);
    // Only on mount: the word list of a game never changes mid-game.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [prefs] = useStudyPreferences();

  const correct = React.useCallback(
    (word: Word | undefined) => {
      if (prefs.gameSpeak && word) pronounce(word.term, word.audioUrl);
    },
    [prefs.gameSpeak]
  );

  const wrong = React.useCallback(() => {
    if (prefs.gameSfx) playWrongSound();
  }, [prefs.gameSfx]);

  return { correct, wrong };
}
