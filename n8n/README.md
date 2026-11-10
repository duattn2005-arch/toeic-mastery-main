# n8n AI Agent cho TOEIC Mastery

Thư mục này chứa các workflow [n8n](https://n8n.io) (file JSON) và dịch vụ phụ trợ. Không có mã nguồn n8n.

> **Không đưa token / API key vào file trong repo.** Repo này public. Token và key chỉ nằm trong **Credentials** của n8n.

## Workflow

| File | Mô tả |
| --- | --- |
| `workflows/toeic-threads-auto-v2.json` | **Đang dùng.** Tự đăng bài lên Threads 10 lần/ngày, nội dung lấy từ chính website. |
| `workflows/toeic-tutor-agent.json` | Trợ lý luyện thi TOEIC dạng chat: Chat Trigger → AI Agent (Gemini) + Simple Memory. |
| `workflows/toeic-threads-auto.json` | Bản cũ (v1): lấy nội dung từ web đối thủ và dẫn link sai domain. Không dùng. |
| `workflows/image-upload-helper.json` | Workflow phụ cho bài có ảnh của v1. |

### Threads v2 hoạt động thế nào

1. **⚙️ Cấu hình** – chọn ngẫu nhiên kiểu bài (mẹo nhanh, lỗi sai hay gặp, mini quiz, 3 từ vựng). Ở đây cũng có danh sách thương hiệu bị chặn (`BLOCKED_BRANDS`) và các trang không quảng bá (`SKIP_PATHS`).
2. **🗺️ Đọc sitemap** của `https://toeicmastery.click` → **🎯 Chọn trang**: chỉ lấy trang công khai (`/huong-dan/*`, `/tu-vung/*`, `/blog/*`, `/thi-thu-mien-phi`), tránh 30 trang đã đăng gần nhất.
3. **🌐 Tải trang** → **🧹 Tạo prompt**: AI chỉ được dùng nội dung của chính trang đó, không bịa số liệu, không nhắc thương hiệu khác.
4. **🤖 Gemini viết bài** → **✅ Kiểm tra**: bài dài quá 500 ký tự, thiếu link đúng, nhắc thương hiệu bị chặn hoặc có domain lạ thì **dừng, không đăng**. Lý do dừng hiện trong tab Executions.
5. **📱 Tạo bài → ⏱ Chờ 10s → 🚀 Publish** lên Threads → **🎉 Tóm tắt**.

### Credentials cần tạo trong n8n

| Tên credential | Loại | Điền |
| --- | --- | --- |
| `Gemini API key` | Header Auth | Name: `x-goog-api-key`, Value: API key Gemini |
| `Threads access token` | Query Auth | Name: `access_token`, Value: token Threads của @toeicmasteryy |

Sau khi import, mở các node 🤖, 📱 và 🚀, chọn đúng credential vừa tạo.

## Chạy n8n

```bash
npx n8n            # hoặc: npm start  (chạy cả screenshot service + n8n)
```

Mở http://localhost:5678, rồi **Import from File…** file trong `workflows/`. Chạy thử bằng **🖱️ Manual Trigger** trước khi bật lịch.
