"use client";

import * as React from "react";
import { Loader2, Music, Upload } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { uploadFileInChunks } from "@/lib/chunked-upload";
import { QUESTION_MEDIA_KINDS } from "@/lib/upload-kinds";

const { maxSizeBytes, acceptedTypes: ACCEPTED_TYPES } = QUESTION_MEDIA_KINDS.audio;
const MAX_SIZE_MB = Math.round(maxSizeBytes / (1024 * 1024));

/**
 * Upload for question audio (Part 1-4), sent in small chunks via
 * /api/upload/question-media/chunk + /complete (see chunked-upload.ts) —
 * Route Handlers, not a Server Action, which has Next's default 1MB body
 * limit. The resulting public URL fills the same `audioUrl`
 * field the form already has, so pasting a URL directly still works as a
 * fallback.
 */
export function QuestionAudioUploader({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState<number | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

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

    setUploading(true);
    try {
      const uploadedUrl = await uploadFileInChunks(file, "audio", setProgress);
      onChange(uploadedUrl);
      toast.success("Đã tải file âm thanh lên");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Tải file thất bại");
    } finally {
      setUploading(false);
      setProgress(null);
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex gap-2">
        <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="https://.../audio.mp3 (hoặc tải file lên)" className="flex-1" />
        <input ref={inputRef} type="file" accept={ACCEPTED_TYPES.join(",")} className="hidden" onChange={handleFileChange} />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-input bg-card px-3 py-2 text-xs font-medium hover:bg-muted disabled:opacity-50"
        >
          {uploading ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />}
          {progress !== null ? `Đang tải ${progress}%` : "Tải file lên"}
        </button>
      </div>
      <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
        <Music className="size-3" /> MP3, WAV, OGG, M4A hoặc AAC, tối đa {MAX_SIZE_MB}MB
      </p>
    </div>
  );
}
