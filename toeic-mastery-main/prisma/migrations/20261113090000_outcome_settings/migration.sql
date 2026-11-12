-- Chuẩn đầu ra: phần admin sửa trên web, đè lên nội dung mặc định trong
-- src/lib/bloom/outcomes.ts. Chỉ thêm bảng, không đổi dữ liệu cũ.
CREATE TABLE "outcome_settings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "data" JSONB NOT NULL DEFAULT '{}',
    "updated_by" UUID,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "outcome_settings_pkey" PRIMARY KEY ("id")
);
