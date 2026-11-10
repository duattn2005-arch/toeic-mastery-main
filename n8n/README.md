# n8n AI Agent cho TOEIC Mastery

Thư mục này chứa các workflow [n8n](https://n8n.io) (file JSON) và dịch vụ phụ trợ. Không có mã nguồn n8n.

> **Không đưa token / API key vào file trong repo.** Repo này public. Token và key chỉ nằm trong **Credentials** của n8n.

## Workflow

| File | Mô tả |
| --- | --- |
| `workflows/toeic-threads-hype-v3.json` | **Đang dùng.** 4 bài/ngày (8h, 12h, 17h, 21h): khoe tính năng bằng giọng Gen Z, kèm ảnh chụp web thật, link để ở comment đầu tiên. |
| `workflows/toeic-threads-auto-v2.json` | **Đang dùng.** 2 bài/ngày (10h, 19h): bài kiến thức/mẹo lấy từ trang công khai của website, có link. |
| `workflows/toeic-tutor-agent.json` | Trợ lý luyện thi TOEIC dạng chat: Chat Trigger → AI Agent (Gemini) + Simple Memory. |
| `workflows/toeic-threads-auto.json` | Bản cũ (v1): lấy nội dung từ web đối thủ và dẫn link sai domain. Không dùng. |
| `workflows/image-upload-helper.json` | Workflow phụ cho bài có ảnh của v1. |

### Threads v2 hoạt động thế nào

1. **⚙️ Cấu hình** – chọn ngẫu nhiên kiểu bài (mẹo nhanh, lỗi sai hay gặp, mini quiz, 3 từ vựng). Ở đây cũng có danh sách thương hiệu bị chặn (`BLOCKED_BRANDS`) và các trang không quảng bá (`SKIP_PATHS`).
2. **🗺️ Đọc sitemap** của `https://toeicmastery.click` → **🎯 Chọn trang**: chỉ lấy trang công khai (`/huong-dan/*`, `/tu-vung/*`, `/blog/*`, `/thi-thu-mien-phi`), tránh 30 trang đã đăng gần nhất.
3. **🌐 Tải trang** → **🧹 Tạo prompt**: AI chỉ được dùng nội dung của chính trang đó, không bịa số liệu, không nhắc thương hiệu khác.
4. **🤖 Gemini viết bài** → **✅ Kiểm tra**: bài dài quá 500 ký tự, thiếu link đúng, nhắc thương hiệu bị chặn hoặc có domain lạ thì **dừng, không đăng**. Lý do dừng hiện trong tab Executions.
5. **📱 Tạo bài → ⏱ Chờ 10s → 🚀 Publish** lên Threads → **🎉 Tóm tắt**.

### Threads v3 hoạt động thế nào

1. **⚙️ Cấu hình**: danh sách tính năng (`FEATURES`, mỗi cái có trang để chụp và các "sự thật" AI được phép nói), câu comment gắn link (`LINK_REPLIES`) và danh sách thương hiệu bị chặn.
2. **📸 Chụp ảnh**: gọi `screenshot-service.js` (cổng 3001). Service đăng nhập tài khoản demo, tắt popup, chụp khổ điện thoại rồi upload lên litterbox.catbox.moe (link tự xoá sau 1 giờ) để Threads tải được ảnh.
3. **🤖 Gemini viết bài** → **✅ Kiểm tra**: chặn bài nói "free/miễn phí", "không cần đăng nhập", có link trong bài, hứa tăng điểm, nhắc thương hiệu khác, hay tính năng Pro mà không ghi "Pro".
4. **📱 Tạo bài kèm ảnh → 🚀 Publish → 💬 Comment link → 🚀 Publish comment**.

Cần chạy `screenshot-service.js` cùng lúc với n8n (`npm start` chạy cả hai). Tài khoản demo khai báo trong `n8n/.env` (không commit):

```
SITE_URL=https://toeicmastery.click
DEMO_EMAIL=...
DEMO_PASSWORD=...
```

Tài khoản demo phải là tài khoản email + mật khẩu; tài khoản đăng nhập bằng Google không dùng được.

### Credentials cần tạo trong n8n

| Tên credential | Loại | Điền |
| --- | --- | --- |
| `Gemini API key` | Header Auth | Name: `x-goog-api-key`, Value: API key Gemini |
| `Threads access token` | Query Auth | Name: `access_token`, Value: token Threads của @toeicmasteryy |

Sau khi import, mở các node 🤖, 📱, 💬 và 🚀, chọn đúng credential vừa tạo.

## Chạy n8n

```bash
npx n8n            # hoặc: npm start  (chạy cả screenshot service + n8n)
```

Mở http://localhost:5678, rồi **Import from File…** file trong `workflows/`. Chạy thử bằng **🖱️ Manual Trigger** trước khi bật lịch.
