-- Automatic question labeller bookkeeping (src/lib/services/tagging).
ALTER TABLE "questions" ADD COLUMN "label_meta" JSONB;
