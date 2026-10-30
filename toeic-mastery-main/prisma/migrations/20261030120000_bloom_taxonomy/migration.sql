-- Thang Bloom làm nền phân tích người học (src/lib/bloom). Chỉ thêm cột/bảng,
-- không đổi hay xoá dữ liệu cũ.

-- Câu hỏi: bậc Bloom + nguồn gắn; đáp án: mã bẫy.
ALTER TABLE "questions" ADD COLUMN "bloom_level" INTEGER;
ALTER TABLE "questions" ADD COLUMN "bloom_source" TEXT;
CREATE INDEX "questions_bloom_level_idx" ON "questions"("bloom_level");
ALTER TABLE "question_options" ADD COLUMN "trap_type" TEXT;

-- Log mỗi lần trả lời (bài làm thường).
ALTER TABLE "attempt_answers" ADD COLUMN "bloom_level" INTEGER;
ALTER TABLE "attempt_answers" ADD COLUMN "trap_type_hit" TEXT;
ALTER TABLE "attempt_answers" ADD COLUMN "hint_used_count" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "attempt_answers" ADD COLUMN "explanation_viewed_at" TIMESTAMP(3);

-- Log mỗi lần trả lời (Placement / Gate / bài kiểm tra Mentor).
ALTER TABLE "mentor_test_questions" ADD COLUMN "bloom_level" INTEGER;
ALTER TABLE "mentor_test_questions" ADD COLUMN "trap_type_hit" TEXT;
ALTER TABLE "mentor_test_questions" ADD COLUMN "hint_used_count" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "mentor_test_questions" ADD COLUMN "explanation_viewed_at" TIMESTAMP(3);

-- Bài luyện không đi qua Attempt (Ôn lỗi sai, Quick Study, quiz ngữ pháp).
CREATE TABLE "practice_answers" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "question_id" UUID NOT NULL,
    "source" TEXT NOT NULL,
    "selected_label" VARCHAR(1) NOT NULL,
    "is_correct" BOOLEAN NOT NULL,
    "time_spent_sec" INTEGER,
    "hint_used_count" INTEGER NOT NULL DEFAULT 0,
    "bloom_level" INTEGER,
    "trap_type_hit" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "practice_answers_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "practice_answers_user_id_created_at_idx" ON "practice_answers"("user_id", "created_at");
ALTER TABLE "practice_answers" ADD CONSTRAINT "practice_answers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "practice_answers" ADD CONSTRAINT "practice_answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
