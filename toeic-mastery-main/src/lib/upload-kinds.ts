const AUDIO_TYPES = ["audio/mpeg", "audio/mp3", "audio/wav", "audio/x-wav", "audio/ogg", "audio/mp4", "audio/x-m4a", "audio/aac"] as const;

/** Per-kind rules for admin question-media uploads — shared by the
 * single-request route (/api/upload/question-media) and the chunked one
 * (/api/upload/question-media/chunk + /complete). */
export const QUESTION_MEDIA_KINDS = {
  image: {
    bucket: "question-media/images",
    maxSizeBytes: 50 * 1024 * 1024,
    acceptedTypes: ["image/png", "image/jpeg", "image/webp"],
  },
  audio: {
    bucket: "question-media/audio",
    maxSizeBytes: 20 * 1024 * 1024,
    acceptedTypes: AUDIO_TYPES,
  },
  /** Full-test/per-Part listening transcript audio — much longer than a
   * single question's clip, so a higher cap. Sent in chunks (see
   * chunked-upload.ts), so neither Nginx's client_max_body_size nor the
   * proxy's body buffer limit applies to the whole file. */
  transcriptAudio: {
    bucket: "transcripts/audio",
    maxSizeBytes: 200 * 1024 * 1024,
    acceptedTypes: AUDIO_TYPES,
  },
} as const satisfies Record<string, { bucket: string; maxSizeBytes: number; acceptedTypes: readonly string[] }>;

export type QuestionMediaKind = keyof typeof QUESTION_MEDIA_KINDS;

export function isQuestionMediaKind(value: unknown): value is QuestionMediaKind {
  return typeof value === "string" && Object.hasOwn(QUESTION_MEDIA_KINDS, value);
}

/** Each chunk stays far below both Next's default 10MB proxy body buffer
 * and Nginx's 60MB cap, and is quick enough on a slow connection that no
 * single request runs into a gateway timeout. */
export const UPLOAD_CHUNK_SIZE_BYTES = 4 * 1024 * 1024;
