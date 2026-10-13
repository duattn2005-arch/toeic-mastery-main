"use client";

import * as React from "react";
import { getStudyPreferencesAction, saveStudyPreferencesAction } from "@/lib/actions/study-preferences";
import { DEFAULT_STUDY_PREFERENCES, normalizeStudyPreferences, type StudyPreferences } from "@/lib/study-preferences";

const STORAGE_KEY = "study:preferences";
/** The old per-browser "Tự đọc" toggle, migrated into the new settings. */
const LEGACY_AUTO_SPEAK_KEY = "flashcard:auto-speak";
const SAVE_DELAY_MS = 600;

/** Module-level store shared by every component on the page (the
 * flashcard's settings button and the study flow's stage bar update
 * together). Local copy for instant use, account copy for other devices. */
let current: StudyPreferences = DEFAULT_STUDY_PREFERENCES;
let loadedLocal = false;
let syncedServer = false;
/** Set once the learner changes something this page load, so a slower
 * server response can never overwrite the newer choice. */
let changedLocally = false;
let saveTimer: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function readLocal() {
  if (loadedLocal || typeof window === "undefined") return;
  loadedLocal = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      current = normalizeStudyPreferences(JSON.parse(raw));
    } else if (window.localStorage.getItem(LEGACY_AUTO_SPEAK_KEY) === "off") {
      current = { ...current, autoSpeak: false };
    }
  } catch {
    // Storage unavailable or corrupt: keep defaults.
  }
}

function writeLocal(prefs: StudyPreferences) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // Ignore: the account copy still persists the choice.
  }
}

function syncFromServer() {
  if (syncedServer) return;
  syncedServer = true;
  void getStudyPreferencesAction()
    .then((saved) => {
      if (!saved || changedLocally) return;
      current = saved;
      writeLocal(saved);
      emit();
    })
    .catch(() => {
      // Offline or signed out: the local copy stays in charge.
    });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  readLocal();
  return current;
}

function getServerSnapshot() {
  return DEFAULT_STUDY_PREFERENCES;
}

export function useStudyPreferences() {
  const prefs = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  React.useEffect(() => {
    syncFromServer();
  }, []);

  const update = React.useCallback((patch: Partial<StudyPreferences>) => {
    changedLocally = true;
    current = normalizeStudyPreferences({ ...current, ...patch });
    writeLocal(current);
    emit();
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => void saveStudyPreferencesAction(current), SAVE_DELAY_MS);
  }, []);

  return [prefs, update] as const;
}
