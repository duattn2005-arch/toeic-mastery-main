"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { setTranscriptAudioAction } from "@/lib/actions/admin-transcripts";
import { uploadFileInChunks } from "@/lib/chunked-upload";
import { QUESTION_MEDIA_KINDS } from "@/lib/upload-kinds";

const { maxSizeBytes, acceptedTypes: ACCEPTED_TYPES } = QUESTION_MEDIA_KINDS.transcriptAudio;
const MAX_SIZE_MB = Math.round(maxSizeBytes / (1024 * 1024));

/** One audio slot (whole test or a single Part) of a listening transcript —
 * uploading a file saves it straight away; no separate submit step. */
export function TranscriptAudioSlot({
  setKey,
  testNumber,
  part,
  label,
  initialUrl,
}: {
  setKey: string;
  testNumber: number;
  part: number;
  label: string;
  initialUrl: string | null;
}) {
  const router = useRouter();
  const [url, setUrl] = React.useState(initialUrl ?? "");
  const [busy, setBusy] = React.useState(false);
  /** Upload progress 0–100 while sending, null otherwise. */
  const [progress, setProgress] = React.useState<number | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  async function save(nextUrl: string, successMessage: string) {
    const result = await setTranscriptAudioAction(setKey, testNumber, part, nextUrl);
    if (result.error) {
      toast.error(result.error);
      return false;
    }
    setUrl(nextUrl);
    toast.success(successMessage);
    router.refresh();
    return true;
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!(ACCEPTED_TYPES as readonly string[]).includes(file.type)) {
      toast.error("Chỉ hỗ trợ file âm thanh MP3, WAV, OGG, M4A hoặc AAC");
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error(`File âm thanh phải nhỏ hơn ${MAX_SIZE_MB}MB`);
      return;
    }

    setBusy(true);
    try {
      // Sent in small chunks — one big request kept failing on large Part /
      // full-test audio (body limits + timeouts on a slow connection).
      const uploadedUrl = await uploadFileInChunks(file, "transcriptAudio", setProgress);
      await save(uploadedUrl, `Đã lưu file nghe ${label}`);
    } catch (err) {
      toast.error(`Không tải được file nghe ${label}: ${err instanceof Error ? err.message : "lỗi không xác định"}`);
    } finally {
      setBusy(false);
      setProgress(null);
    }
  }

  async function handleRemove() {
    setBusy(true);
    await save("", `Đã xóa file nghe ${label}`);
    setBusy(false);
  }

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-border p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium">{label}</span>
        <div className="flex items-center gap-1.5">
          <input ref={inputRef} type="file" accept={ACCEPTED_TYPES.join(",")} className="hidden" onChange={handleFileChange} />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="inline-flex items-center gap-1.5 rounded-lg border border-input bg-card px-2.5 py-1.5 text-xs font-medium hover:bg-muted disabled:opacity-50"
          >
            {busy ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />}
            {progress !== null ? `Đang tải ${progress}%` : url ? "Thay file" : "Tải file lên"}
          </button>
          {url && (
            <button
              type="button"
              onClick={handleRemove}
              disabled={busy}
              aria-label={`Xóa file nghe ${label}`}
              className="inline-flex items-center rounded-lg border border-input bg-card p-1.5 text-destructive hover:bg-destructive/10 disabled:opacity-50"
            >
              <Trash2 className="size-3.5" />
            </button>
          )}
        </div>
      </div>
      {progress !== null && (
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full rounded-full bg-primary transition-[width] duration-300" style={{ width: `${progress}%` }} />
        </div>
      )}
      {url ? (
        <audio controls preload="none" src={url} className="h-9 w-full" />
      ) : (
        <p className="text-xs text-muted-foreground">Chưa có file nghe</p>
      )}
    </div>
  );
}
