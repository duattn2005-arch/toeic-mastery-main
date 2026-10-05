-- Corrects 20261005090000_vocab_learning_stages: a word is "Đã thuộc" as
-- soon as it is answered right with no miss — it is "Đang học" only when
-- the learner missed it (AGAIN, or HARD) on the day it was last studied.
-- Recomputed from the review history, so words that migration moved back
-- to "Đang học" despite clean answers are restored.
WITH last_review AS (
  SELECT DISTINCT ON (r."user_vocabulary_id")
    r."user_vocabulary_id" AS id,
    r."rating" AS rating,
    (r."reviewed_at" AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Ho_Chi_Minh')::date AS day
  FROM "vocabulary_reviews" AS r
  ORDER BY r."user_vocabulary_id", r."reviewed_at" DESC
),
missed AS (
  SELECT r."user_vocabulary_id" AS id,
         MAX((r."reviewed_at" AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Ho_Chi_Minh')::date) AS day
  FROM "vocabulary_reviews" AS r
  WHERE r."rating" IN ('AGAIN', 'HARD')
  GROUP BY r."user_vocabulary_id"
),
streak AS (
  SELECT lr.id,
         lr.rating,
         lr.day,
         (m.day = lr.day) IS TRUE AS missed_last_day,
         (SELECT COUNT(DISTINCT (r."reviewed_at" AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Ho_Chi_Minh')::date)
            FROM "vocabulary_reviews" AS r
           WHERE r."user_vocabulary_id" = lr.id
             AND r."rating" IN ('GOOD', 'EASY')
             AND (r."reviewed_at" AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Ho_Chi_Minh')::date > COALESCE(m.day, '-infinity'::date)) AS clean_days
  FROM last_review AS lr
  LEFT JOIN missed AS m ON m.id = lr.id
)
UPDATE "user_vocabulary" AS uv
SET
  "is_learned" = NOT s.missed_last_day,
  "repetitions" = CASE WHEN s.missed_last_day THEN 0 ELSE GREATEST(1, LEAST(s.clean_days, 5))::int END,
  "interval_days" = CASE
    WHEN s.missed_last_day THEN (CASE WHEN s.rating = 'AGAIN' THEN 0 ELSE 1 END)
    ELSE (ARRAY[4, 7, 14, 30, 60])[GREATEST(1, LEAST(s.clean_days, 5))]
  END,
  "next_review_date" = s.day + CASE
    WHEN s.missed_last_day THEN (CASE WHEN s.rating = 'AGAIN' THEN 0 ELSE 1 END)
    ELSE (ARRAY[4, 7, 14, 30, 60])[GREATEST(1, LEAST(s.clean_days, 5))]
  END
FROM streak AS s
WHERE uv."id" = s.id;
