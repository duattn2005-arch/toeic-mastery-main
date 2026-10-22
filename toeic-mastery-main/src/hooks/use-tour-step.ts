"use client";

import * as React from "react";
import type { TourId } from "@/lib/constants/tour";

interface TourStepState {
  step: number;
  done: boolean;
}

export interface UseTourStepResult {
  /** Whether `step` is the next unseen step of this tour right now — false
   * before the localStorage read resolves, once the tour is done/skipped,
   * or when a different step is next. */
  isActive: (step: number) => boolean;
  /** Records that `toStep` is the next step to show (persisted so a reload
   * mid cross-page tour resumes instead of restarting). */
  advance: (toStep: number) => void;
  /** Marks the whole tour done — used both for the "Bỏ qua" button (skip
   * forever) and for the tour's real final step (finishing counts as done
   * too), matching how welcome-offer-modal.tsx treats its own flag. */
  skip: () => void;
}

const VISIT_COUNT_KEY = "tour_total_visits";
/** sessionStorage, not localStorage — reloading within the same browser
 * session must not inflate the visit count, only a genuinely new session
 * (new tab, or the previous one closed) counts as another visit. */
const SESSION_COUNTED_KEY = "tour_session_counted";
/** Onboarding tours (dashboard/listening/reading/...) only run for a
 * learner's first FREE_TOUR_VISITS visits to any page that has one, shared
 * across all tourIds — from the next visit on, every tour reports itself
 * done without ever having run, rather than nagging a returning user who
 * never finished a specific tour. */
const FREE_TOUR_VISITS = 2;

function countVisitAndCheckAllowed(): boolean {
  try {
    if (sessionStorage.getItem(SESSION_COUNTED_KEY) !== "true") {
      const current = Number(localStorage.getItem(VISIT_COUNT_KEY) ?? "0");
      localStorage.setItem(VISIT_COUNT_KEY, String(current + 1));
      sessionStorage.setItem(SESSION_COUNTED_KEY, "true");
    }
    return Number(localStorage.getItem(VISIT_COUNT_KEY) ?? "0") <= FREE_TOUR_VISITS;
  } catch {
    return true; // storage unavailable — fail open, don't block the tour on it
  }
}

export interface TourStepOptions {
  /** Keep this tour's progress per account (two learners sharing a browser
   * each see it once). */
  userId?: string;
  /** "What's new" tours: shown once to everyone from launch day on, so the
   * first-visits-only cap (FREE_TOUR_VISITS) doesn't apply. */
  announcement?: boolean;
  /** Wait while this other tour can still run, so the two never overlap
   * (e.g. a brand-new learner gets the basic Listening tour first). */
  after?: TourId | string;
}

/** Ephemeral, write-once onboarding-tour progress. Same localStorage +
 * try/catch fail-open pattern as welcome-offer-modal.tsx's view counter —
 * this doesn't need zustand's cross-component sync since exactly one tour
 * component reads/writes a given tourId at a time. */
export function useTourStep(tourId: TourId | string, options?: TourStepOptions): UseTourStepResult {
  const scope = options?.userId ? `${tourId}_${options.userId}` : tourId;
  const stepKey = `tour_${scope}_step`;
  const doneKey = `tour_${scope}_done`;
  const announcement = options?.announcement ?? false;
  const after = options?.after;
  const [state, setState] = React.useState<TourStepState | null>(null);

  React.useEffect(() => {
    let next: TourStepState = { step: 0, done: false };
    try {
      const visitsAllowed = countVisitAndCheckAllowed();
      // The other tour can still show if it isn't done and is within its cap.
      const waiting = after ? localStorage.getItem(`tour_${after}_done`) !== "true" && visitsAllowed : false;
      const done = localStorage.getItem(doneKey) === "true" || (!announcement && !visitsAllowed) || waiting;
      const rawStep = Number(localStorage.getItem(stepKey));
      const step = Number.isFinite(rawStep) && rawStep >= 0 ? rawStep : 0;
      next = { step, done };
    } catch {
      // localStorage unavailable — fail open, same as welcome-offer-modal.tsx.
    }
    // One-time sync with the browser's localStorage, not app state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(next);
  }, [doneKey, stepKey, announcement, after]);

  const isActive = React.useCallback((step: number) => state !== null && !state.done && state.step === step, [state]);

  const advance = React.useCallback(
    (toStep: number) => {
      setState({ step: toStep, done: false });
      try {
        localStorage.setItem(stepKey, String(toStep));
      } catch {
        // Fail open — the tour just won't resume correctly after a reload.
      }
    },
    [stepKey]
  );

  const skip = React.useCallback(() => {
    setState((prev) => ({ step: prev?.step ?? 0, done: true }));
    try {
      localStorage.setItem(doneKey, "true");
    } catch {
      // Fail open — worst case the tour reappears once more.
    }
  }, [doneKey]);

  return { isActive, advance, skip };
}
