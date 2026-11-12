# Thang Bloom — nền tảng phân tích người học

Mọi dữ liệu học tập trả lời một câu hỏi: **người học đang vững hay hổng ở bậc tư duy nào, của nhãn kiến thức nào?**
Nền lý thuyết: Thang Bloom bản sửa đổi (Anderson & Krathwohl, 2001) + Mastery Learning (Bloom, 1968).

## 1. Sáu bậc và cách TOEIC Mastery đo

| Bậc | Tên | Hành vi TOEIC | Nguồn dữ liệu | Cấp |
|---|---|---|---|---|
| 1 | Nhớ | Nhớ nghĩa từ, nhận ra từ vựng | Flashcard SM-2, Part 5 chọn nghĩa; tra từ / lưu từ (tín hiệu phụ) | B |
| 2 | Hiểu | Nhận diện điểm ngữ pháp, nắm thông tin trực tiếp | Part 1–2, Part 5 ngữ pháp dễ, câu chi tiết dễ; xem giải thích (tín hiệu phụ) | B |
| 3 | Vận dụng | Dùng quy tắc giải câu mới, đúng thời gian | Part 5 có ngữ cảnh, Part 6 điền từ/từ nối, ý chính; **phải có câu làm có giờ** | I |
| 4 | Phân tích | Đoạn kép/ba, suy luận, NOT, đáp án nhiễu, câu trả lời gián tiếp | Part 6 chèn câu, Part 7, nhãn suy luận, mã bẫy | A |
| 5 | Đánh giá | Chọn giữa các đáp án “nghe đều đúng” theo bằng chứng | Hàm ý người nói, ≥2 đáp án nhiễu cùng trường nghĩa; tỷ lệ đổi đúng→sai, độ ổn định Mock | A |
| 6 | Sáng tạo | Tự xây chiến thuật, lộ trình | Hồ sơ chiến lược, lộ trình, bộ câu tự lưu — **đầu ra, không chấm điểm** | — |

## 2. Hai nguyên tắc trong code

- **Mastery Learning** — một ô (nhãn × bậc) chỉ *vững* khi điểm ≥ 80% trên ≥ 15 câu **khác nhau**; một bậc chỉ vững khi điểm bậc ≥ 80% và không còn ô Đỏ nào (`levelMastery`).
- **Nguyên tắc tầng** — trong từng nhãn, bậc được ra đề là bậc thấp nhất chưa vững (`frontierLevel`), chỉ xét các bậc ngân hàng có câu. Áp dụng ở: luyện điểm yếu (`weakness-practice.ts`), bài kiểm tra theo kỹ năng của Mentor, Gate test (trần bậc theo cấp), lộ trình trên trang Phân tích. Placement **không** lọc (là bài chẩn đoán).

Bằng chứng ngược: ô thiếu dữ liệu mà bậc cao hơn cùng nhãn đã Xanh → “vững (suy ra)”. Ô Đỏ/Vàng thật thì không bao giờ bị ghi đè.

## 3. Mã nguồn

| File | Vai trò |
|---|---|
| `src/lib/bloom/config.ts` | **Mọi hằng số** (ngưỡng, nhiễu, trọng số, thời gian chuẩn, cấp, mã bẫy). Nhóm chỉnh ở đây. |
| `src/lib/bloom/classify.ts` | Luật gắn bậc, nhãn chính, mã bẫy cho câu hỏi (thuần) |
| `src/lib/bloom/engine.ts` | Động cơ chưng cất thuần: `filterNoise`, `groupAttempts`, `scoreCell`, `buildBloomHeatmap`, `levelMastery`, `frontierLevel`, `evaluateBehavior`, `tierProgress` |
| `src/lib/bloom/evidence.ts` | Nạp 4 nguồn → `BloomAttempt[]` |
| `src/lib/bloom/bank.ts`, `gate.ts` | Bậc có câu theo nhãn; bộ lọc tầng khi ra đề |
| `src/lib/bloom/hints.ts` | Gợi ý 2 bước đọc từ câu hỏi, không lộ đáp án |
| `src/lib/bloom/answer-log.ts` | Ảnh chụp bậc + mã bẫy lúc chấm; ghi xem giải thích, gợi ý |
| `src/lib/bloom/*.test.ts` | Kiểm thử — `npm test` |

## 4. Dữ liệu

- `questions.bloom_level`, `bloom_source` ("auto" | "manual" — bậc admin duyệt không bị ghi đè); `question_options.trap_type`.
- `attempt_answers` / `mentor_test_questions`: `bloom_level` (ảnh chụp), `trap_type_hit`, `hint_used_count`, `explanation_viewed_at` (đã có sẵn: `time_spent_sec`, `initial_selected_label`, `answer_change_count`).
- `practice_answers`: Ôn lỗi sai, Quick Study, quiz ngữ pháp (trước đây không lưu theo câu).
- Chế độ suy ra, không lưu cột: `practice` (luyện), `timed` (thi theo Part), `mock` (đề đầy đủ), `placement`, `gate`.
- Dữ liệu cũ không có bậc: lấy bậc của câu hỏi (hoặc suy ra bằng luật) — thống kê cũ không vỡ.

## 5. Chặn kẽ hở

- Bỏ trống → không tính. Xem đáp án **trước** khi chọn → loại; xem **sau** → chấm theo lựa chọn đầu tiên.
- Câu Đọc < 8 giây (đoán) / > 150 giây (ngâm) → loại và đếm riêng. Câu Nghe không lọc theo thời gian.
- Câu đúng nhờ gợi ý → 50% điểm; làm lại câu đã từng đúng → 80%; mỗi câu chỉ một điểm dữ liệu trong ô.
- Từ bậc 3: cần ≥ 30% câu làm có giờ mới được Xanh. Ô Xanh quá 30 ngày không làm lại → “cần ôn lại”.
- Bậc 5 còn đòi hỏi: ≤ 5% câu bậc 4–5 bị đổi đúng → sai, và 3 Mock gần nhất chênh ≤ 10%.
- Gate test: ngoài ≥ 80% tổng và không nhãn Hổng, mỗi bậc của cấp đang rời (B: 1–2, I: 3) phải ≥ 80% khi được hỏi ≥ 3 câu.
- Tín hiệu không đo được (thời gian ở bài nhiều câu cùng lúc, gợi ý ở bài cũ) = null → luật liên quan tự bỏ qua.

## 6. Chuẩn đầu ra, chỉ báo, rubric (theo hướng dẫn chuẩn đầu ra LYDINC/PTIT)

| File | Vai trò |
|---|---|
| `src/lib/bloom/outcomes.ts` | **Mục tiêu chương trình** (mục tiêu chung + PO1–PO4 theo 4 trụ cột UNESCO), **16 chuẩn đầu ra** CĐR1–CĐR16 (cấu trúc A-B-C-D, một động từ Bloom, có mốc thời gian) và **chỉ báo** (động từ + nội dung + cách đánh giá). Checklist tự động `checkOutcome` (ABCD, SMART, động từ mơ hồ / tiến trình, đúng bậc). Hàm chấm `assessOutcomes`. |
| `src/lib/bloom/rubric.ts` | Rubric 5 mức: <50% · 50–65% · 65–80% · 80–90% · ≥90% — mức 4 trùng ngưỡng vững nên không lệch heatmap Đỏ/Vàng/Xanh. |
| `src/lib/bloom/domains.ts` | Ba miền Bloom: bộ động từ đầy đủ; **miền kỹ năng** (Dave P1–P5 = kỹ năng làm bài: luyện → có giờ → đúng nhịp → đề đầy đủ → ổn định); **miền thái độ** (Krathwohl A1–A5: xem giải thích → học đều → làm lại lỗi sai → theo lộ trình → chuỗi dài + trung thực); rubric sản phẩm **bậc 6 Sáng tạo** (kế hoạch tự xây). |
| `src/lib/bloom/outcome-data.ts` | Nạp tín hiệu thái độ / sáng tạo; đếm câu ngân hàng theo chỉ báo; báo cáo mức đạt của nhóm người học (cache 10 phút, tối đa 60 người). |

- Chỉ báo nhận thức đo bằng ô nhãn × bậc của heatmap (cần ≥ 15 câu khác nhau); tiến bộ so với hồ sơ tính đến 30 ngày trước (`pastProfile` trong `getLearnerBloom`).
- Một chuẩn đầu ra **Đạt** khi mọi chỉ báo đã đo và đều ≥ mức 4; mức của chuẩn đầu ra = trung bình (làm tròn xuống) các chỉ báo đã đo.
- Giao diện: tab **Chuẩn đầu ra** ở `/analytics`, trang **Đề cương** `/syllabus`, trang quản trị `/admin/outcomes` (checklist, ma trận đối chiếu ngân hàng câu, phân bố mức đạt).
- Chỉnh chuẩn đầu ra: sửa `LEARNING_OUTCOMES` rồi chạy `npm test` — kiểm thử bắt CĐR không đạt checklist.
- **Admin sửa câu chữ trên web** ở `/admin/outcomes/edit`: mục tiêu chung, PO1–PO4 và phần A-B-C-D + thời gian + mục tiêu đóng góp của từng chuẩn đầu ra. Lưu vào bảng `outcome_settings` (một dòng JSON, chỉ phần khác mặc định), đè lên `outcomes.ts` qua `applyOverrides`; bản sửa không đạt checklist (`catalogErrors`) thì không lưu. Cách đo (chỉ báo, nhãn, bậc) vẫn ở code. Nút “Khôi phục mặc định” xoá dòng này.
- `src/components/outcomes.render.test.tsx` render thử tab Chuẩn đầu ra, Đề cương và form sửa bằng dữ liệu giả (chạy trong `npm test`).
