-- Cài đặt nhỏ dạng key/value admin chỉnh trên web (khoá GA4 Measurement
-- Protocol, mốc đã gửi bù GA4). Chỉ thêm bảng mới.
CREATE TABLE "app_settings" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updated_by" UUID,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "app_settings_pkey" PRIMARY KEY ("key")
);
