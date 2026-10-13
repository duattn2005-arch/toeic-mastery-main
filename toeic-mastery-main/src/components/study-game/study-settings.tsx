"use client";

import { Settings2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useStudyPreferences } from "@/hooks/use-study-preferences";
import type { RatingMode, StudyStage } from "@/lib/study-preferences";

const STAGE_LABELS: Record<StudyStage, string> = {
  flashcard: "Flashcard",
  match: "Nối từ",
  blast: "Blast",
  balloon: "Bong bóng",
  quiz: "Kiểm tra",
};

const MODES: { value: RatingMode; title: string; hint: string }[] = [
  { value: "four", title: "4 mức", hint: "Học lại · Khó · Nhớ · Rất dễ (phím 1-4)" },
  { value: "two", title: "2 mức", hint: "Học lại (←) hoặc Đã biết (→)" },
];

function SettingSwitch({
  title,
  hint,
  checked,
  onChange,
}: {
  title: string;
  hint: string;
  checked: boolean;
  onChange: (on: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl bg-muted/60 px-3 py-2">
      <span>
        <span className="block text-sm font-semibold">{title}</span>
        <span className="block text-[11px] text-muted-foreground">{hint}</span>
      </span>
      <Switch checked={checked} onCheckedChange={onChange} />
    </label>
  );
}

/** Gear button with all of the learner's study settings (rating mode,
 * sounds, stages), placed at the right end of each study screen's step bar.
 * Changes apply at once and are remembered for their account
 * (useStudyPreferences). */
export function StudySettings({
  stages,
  className,
}: {
  /** Stages this word list can play; when given, the stage picker shows. */
  stages?: StudyStage[];
  className?: string;
}) {
  const [prefs, update] = useStudyPreferences();

  function toggleStage(stage: StudyStage, on: boolean) {
    const next = on ? [...prefs.stages, stage] : prefs.stages.filter((s) => s !== stage);
    // Keep at least one stage among those this list can actually play.
    if (stages && !next.some((s) => stages.includes(s))) return;
    update({ stages: next });
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Cài đặt học"
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-card text-muted-foreground transition-colors hover:text-foreground",
            className
          )}
        >
          <Settings2 className="size-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="max-h-[80vh] w-80 overflow-y-auto rounded-2xl p-4">
        <p className="text-sm font-extrabold">Cài đặt học</p>
        <p className="mt-0.5 text-xs text-muted-foreground">Được lưu cho tài khoản, lần sau học vẫn giữ.</p>

        <p className="mt-4 mb-2 text-xs font-bold text-foreground/80">Tự đánh giá thẻ</p>
        <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Chế độ tự đánh giá">
          {MODES.map((mode) => (
            <button
              key={mode.value}
              type="button"
              role="radio"
              aria-checked={prefs.ratingMode === mode.value}
              onClick={() => update({ ratingMode: mode.value })}
              className={cn(
                "rounded-xl border px-3 py-2.5 text-left transition-colors",
                prefs.ratingMode === mode.value ? "border-primary bg-primary/10" : "border-border hover:bg-muted"
              )}
            >
              <span className="block text-sm font-bold">{mode.title}</span>
              <span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground">{mode.hint}</span>
            </button>
          ))}
        </div>

        <p className="mt-4 mb-2 text-xs font-bold text-foreground/80">Âm thanh</p>
        <div className="flex flex-col gap-1.5">
          <SettingSwitch
            title="Tự phát âm thẻ"
            hint="Đọc từ khi sang thẻ mới và mỗi lần lật thẻ"
            checked={prefs.autoSpeak}
            onChange={(on) => update({ autoSpeak: on })}
          />
          <SettingSwitch
            title="Đọc từ khi chọn đúng"
            hint="Trong mọi trò chơi và phần Kiểm tra"
            checked={prefs.gameSpeak}
            onChange={(on) => update({ gameSpeak: on })}
          />
          <SettingSwitch
            title="Âm báo khi chọn sai"
            hint="Một tiếng báo ngắn khi trả lời sai"
            checked={prefs.gameSfx}
            onChange={(on) => update({ gameSfx: on })}
          />
        </div>

        {stages && stages.length > 1 && (
          <>
            <p className="mt-4 mb-2 text-xs font-bold text-foreground/80">Các giai đoạn muốn học</p>
            <div className="grid grid-cols-2 gap-1.5">
              {stages.map((stage) => (
                <label key={stage} className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-muted">
                  <Checkbox checked={prefs.stages.includes(stage)} onCheckedChange={(on) => toggleStage(stage, on === true)} />
                  {STAGE_LABELS[stage]}
                </label>
              ))}
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
