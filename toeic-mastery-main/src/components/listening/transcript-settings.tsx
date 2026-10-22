"use client";

import * as React from "react";
import { Settings } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

/** Keys a learner can pick for the two most used actions. "Lone" ones
 * (Ctrl, Shift) fire when that key is pressed and released on its own —
 * holding it with another key (Ctrl+C, Shift+letter) does nothing extra. */
export const KEY_CHOICES = {
  ctrl: "Ctrl (nhấn riêng)",
  shift: "Shift (nhấn riêng)",
  backtick: "` (backtick)",
  "alt-p": "Alt + P",
  "alt-k": "Alt + K",
  "ctrl-space": "Ctrl + Space",
  f2: "F2",
} as const;
export type KeyChoice = keyof typeof KEY_CHOICES;

/** Short label for buttons' shortcut tips. */
export const KEY_SHORT: Record<KeyChoice, string> = {
  ctrl: "Ctrl",
  shift: "Shift",
  backtick: "`",
  "alt-p": "Alt+P",
  "alt-k": "Alt+K",
  "ctrl-space": "Ctrl+Space",
  f2: "F2",
};

export interface TranscriptSettings {
  /** Replays the current question (or last line played) from its start. */
  replayKey: KeyChoice;
  /** Pauses / resumes wherever the player is. */
  playPauseKey: KeyChoice;
  /** Extra plays of each question/line after the first (-1 = endless). */
  autoReplay: number;
  /** Silence between those replays, seconds. */
  replayGap: number;
  /** Show every blank's first letter from the start. */
  firstLetters: boolean;
  /** Show shortcut keys on the buttons. */
  showKeyTips: boolean;
}

export const DEFAULT_SETTINGS: TranscriptSettings = {
  replayKey: "ctrl",
  playPauseKey: "backtick",
  autoReplay: 0,
  replayGap: 0.5,
  firstLetters: false,
  showKeyTips: true,
};

const STORAGE_KEY = "transcript-settings:v1";

/** This browser's settings (a per-device convenience, not account data). */
export function useTranscriptSettings() {
  const [settings, setSettings] = React.useState<TranscriptSettings>(DEFAULT_SETTINGS);
  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrating from browser storage
      if (raw) setSettings({ ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<TranscriptSettings>) });
    } catch {
      // Defaults then.
    }
  }, []);
  const update = React.useCallback((patch: Partial<TranscriptSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Not saved for next time, still applies now.
      }
      return next;
    });
  }, []);
  return { settings, update };
}

/** Whether a keydown is one of the combo choices (lone keys are handled on
 * keyup, see useLoneKey). */
export function matchesCombo(choice: KeyChoice, e: KeyboardEvent) {
  switch (choice) {
    case "backtick":
      return e.code === "Backquote" && !e.ctrlKey && !e.altKey && !e.metaKey;
    case "alt-p":
      return e.code === "KeyP" && e.altKey && !e.ctrlKey && !e.metaKey;
    case "alt-k":
      return e.code === "KeyK" && e.altKey && !e.ctrlKey && !e.metaKey;
    case "ctrl-space":
      return e.code === "Space" && e.ctrlKey && !e.altKey;
    case "f2":
      return e.code === "F2";
    default:
      return false;
  }
}

/** Fires `onLone(choice)` when Ctrl or Shift is tapped by itself. */
export function useLoneKey(choices: KeyChoice[], onLone: (choice: KeyChoice) => void) {
  const onLoneRef = React.useRef(onLone);
  React.useEffect(() => {
    onLoneRef.current = onLone;
  });
  const key = choices.join(",");
  React.useEffect(() => {
    const wanted = new Set(key.split(","));
    let pending: { choice: KeyChoice; at: number } | null = null;
    const down = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const choice: KeyChoice | null = e.key === "Control" ? "ctrl" : e.key === "Shift" ? "shift" : null;
      pending = choice && wanted.has(choice) ? { choice, at: performance.now() } : null;
    };
    const up = (e: KeyboardEvent) => {
      const choice: KeyChoice | null = e.key === "Control" ? "ctrl" : e.key === "Shift" ? "shift" : null;
      if (pending && choice === pending.choice && performance.now() - pending.at < 600) onLoneRef.current(choice);
      pending = null;
    };
    // Any mouse use in between (Ctrl+click, Shift+select) cancels it.
    const cancel = () => (pending = null);
    window.addEventListener("keydown", down, true);
    window.addEventListener("keyup", up, true);
    window.addEventListener("mousedown", cancel, true);
    return () => {
      window.removeEventListener("keydown", down, true);
      window.removeEventListener("keyup", up, true);
      window.removeEventListener("mousedown", cancel, true);
    };
  }, [key]);
}

function Row({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-3 last:border-b-0">
      <div>
        <p className="text-sm font-medium">{label}</p>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
      <div className="w-44 shrink-0">{children}</div>
    </div>
  );
}

function Choice<T extends string>({ value, onChange, options }: { value: T; onChange: (v: T) => void; options: [T, string][] }) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as T)}>
      <SelectTrigger className="h-9 w-full text-sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map(([v, label]) => (
          <SelectItem key={v} value={v}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

const KEY_OPTIONS = Object.entries(KEY_CHOICES) as [KeyChoice, string][];

/** The "Cài đặt" button + dialog (keys, auto replay, hints, key tips). */
export function TranscriptSettingsDialog({ settings, onChange }: { settings: TranscriptSettings; onChange: (patch: Partial<TranscriptSettings>) => void }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex w-fit items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          <Settings className="size-3.5" /> Cài đặt
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="size-5" /> Cài đặt nghe chép
          </DialogTitle>
          <DialogDescription>Lưu trên trình duyệt này, áp dụng cho mọi đề.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col">
          <Row label="Phím nghe lại câu" hint="Phát lại câu đang làm từ đầu">
            <Choice value={settings.replayKey} onChange={(v) => onChange({ replayKey: v })} options={KEY_OPTIONS.filter(([k]) => k !== settings.playPauseKey)} />
          </Row>
          <Row label="Phím phát / tạm dừng" hint="Dừng hoặc chạy tiếp ở chỗ đang nghe">
            <Choice value={settings.playPauseKey} onChange={(v) => onChange({ playPauseKey: v })} options={KEY_OPTIONS.filter(([k]) => k !== settings.replayKey)} />
          </Row>
          <Row label="Tự động lặp lại" hint="Số lần phát lại thêm sau mỗi lần nghe câu">
            <Choice
              value={String(settings.autoReplay)}
              onChange={(v) => onChange({ autoReplay: Number(v) })}
              options={[
                ["0", "Tắt"],
                ["1", "1 lần"],
                ["2", "2 lần"],
                ["3", "3 lần"],
                ["5", "5 lần"],
                ["10", "10 lần"],
                ["-1", "Liên tục"],
              ]}
            />
          </Row>
          <Row label="Nghỉ giữa các lần lặp">
            <Choice
              value={String(settings.replayGap)}
              onChange={(v) => onChange({ replayGap: Number(v) })}
              options={[
                ["0", "Không nghỉ"],
                ["0.5", "0,5 giây"],
                ["1", "1 giây"],
                ["2", "2 giây"],
                ["3", "3 giây"],
              ]}
            />
          </Row>
          <Row label="Hiện sẵn chữ cái đầu" hint="Mỗi ô trống hiện trước chữ cái đầu của từ">
            <Choice value={settings.firstLetters ? "on" : "off"} onChange={(v) => onChange({ firstLetters: v === "on" })} options={[["off", "Tắt"], ["on", "Bật"]]} />
          </Row>
          <Row label="Mẹo phím tắt trên nút">
            <Choice value={settings.showKeyTips ? "on" : "off"} onChange={(v) => onChange({ showKeyTips: v === "on" })} options={[["on", "Hiện"], ["off", "Ẩn"]]} />
          </Row>
        </div>
      </DialogContent>
    </Dialog>
  );
}
