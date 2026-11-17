-- Phiên âm + loại từ cho từ học viên tự thêm (nhập bảng / AI tự điền).
-- Chỉ thêm 2 cột cho phép NULL, không đổi dữ liệu cũ.
ALTER TABLE "saved_words" ADD COLUMN "ipa" TEXT;
ALTER TABLE "saved_words" ADD COLUMN "part_of_speech" TEXT;
