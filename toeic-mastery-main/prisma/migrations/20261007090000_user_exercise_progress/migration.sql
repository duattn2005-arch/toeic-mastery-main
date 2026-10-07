-- Saved answers/results for static exercises (Mastery grammar quizzes,
-- vocabulary collection "Kiểm tra tổng hợp").
CREATE TABLE "user_exercise_progress" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "exercise_key" TEXT NOT NULL,
    "answers" JSONB NOT NULL DEFAULT '{}',
    "submitted" BOOLEAN NOT NULL DEFAULT false,
    "total" INTEGER NOT NULL,
    "last_correct" INTEGER,
    "last_answered" INTEGER,
    "last_done_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_exercise_progress_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "user_exercise_progress_user_id_exercise_key_key" ON "user_exercise_progress"("user_id", "exercise_key");

ALTER TABLE "user_exercise_progress" ADD CONSTRAINT "user_exercise_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
