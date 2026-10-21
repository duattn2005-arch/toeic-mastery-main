-- Per-question timings inside a transcript audio file (see
-- src/lib/content/transcripts/segments.ts).
ALTER TABLE "transcript_audio" ADD COLUMN "segments" JSONB;
