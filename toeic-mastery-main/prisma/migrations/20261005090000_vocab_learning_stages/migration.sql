-- Vocabulary progress moves to Quizlet-style stages (see
-- src/lib/services/spaced-repetition.ts): a word's level is the number of
-- separate (Vietnam) days it was recalled correctly since it was last
-- missed, and it is "Đã thuộc" only at level 3. Under the old rules one
-- session (Học + Luyện tập + Kiểm tra) could mark a word learned and push
-- its next review 4 days out. Recompute every reviewed word's level from its
-- review history, and bring the next review of words still being learned
-- forward to where the new schedule puts it (never later than before).
UPDATE "user_vocabulary" AS uv
SET
  "repetitions" = s.new_level,
  "is_learned" = s.new_level >= 3,
  "interval_days" = CASE WHEN s.new_level = 0 THEN 0 WHEN s.new_level = 1 THEN 1 WHEN s.new_level = 2 THEN 3 ELSE uv."interval_days" END,
  "next_review_date" = CASE
    WHEN s.new_level <= 2 THEN LEAST(uv."next_review_date", s.last_day + (CASE WHEN s.new_level = 0 THEN 0 WHEN s.new_level = 1 THEN 1 ELSE 3 END))
    ELSE uv."next_review_date"
  END
FROM (
  SELECT
    u."id",
    LEAST(u."repetitions", COALESCE(g.days, 0))::int AS new_level,
    (u."last_reviewed_at" AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Ho_Chi_Minh')::date AS last_day
  FROM "user_vocabulary" AS u
  LEFT JOIN LATERAL (
    SELECT COUNT(DISTINCT (r."reviewed_at" AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Ho_Chi_Minh')::date) AS days
    FROM "vocabulary_reviews" AS r
    WHERE r."user_vocabulary_id" = u."id"
      AND r."rating" IN ('GOOD', 'EASY')
      -- only days after the day of the last miss (a same-day fix doesn't count)
      AND (r."reviewed_at" AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Ho_Chi_Minh')::date > COALESCE(
        (SELECT MAX((a."reviewed_at" AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Ho_Chi_Minh')::date) FROM "vocabulary_reviews" AS a WHERE a."user_vocabulary_id" = u."id" AND a."rating" = 'AGAIN'),
        '-infinity'::date
      )
  ) AS g ON TRUE
  WHERE u."last_reviewed_at" IS NOT NULL
) AS s
WHERE uv."id" = s."id";
