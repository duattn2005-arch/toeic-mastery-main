# n8n – Threads + Facebook tự động

Tám workflow chạy trên n8n local (http://localhost:5678), giờ theo múi Asia/Ho_Chi_Minh.

| Workflow | Lịch | Làm gì |
|---|---|---|
| Threads 1 – Bài ảnh tính năng web | 8:30 & 19:30 (+0–40 phút) | Chọn một tính năng (dashboard, thống kê điểm yếu, lộ trình AI Mentor, game từ vựng, ngữ pháp, luyện nghe, lịch sử thi…), chụp màn hình bằng tài khoản showcase, Gemini viết bài khoe tính năng, 2–7 phút sau comment link |
| Threads 2 – Bài tương tác | 12:15 & 21:45 (+0–40 phút) | Xoay vòng: mẹo, quiz Part 5, câu hỏi mở, từ dễ nhầm, confession. Quiz: đáp án + link comment sau 1–3 giờ |
| Threads 3 – Tự trả lời comment | Mỗi 20 phút, 7h–24h | Tối đa 3/lần, 60/ngày, giãn 15–45 giây; bỏ qua comment chủ trang đã tự trả lời; link khi được hỏi hoặc ~30% số lần |
| Facebook 1 – Bài ảnh tính năng (Page) | tắt | Fanpage đã có người đăng. Bật lại trong n8n nếu cần |
| Facebook 2 – Bài tương tác (Page) | tắt | Như trên |
| Facebook 3 – Tự trả lời comment (Page) | Mỗi 15 phút, 7h–24h | Like rồi trả lời comment mới, tối đa 4/lần, 80/ngày |
| Facebook Group – Soạn bài để đăng | 9:00 (ảnh tính năng) & 19:00 (tương tác) | Soạn sẵn bài kèm ảnh và comment cho group TOEIC Mastery. Mở http://localhost:5678/webhook/group-drafts, bấm copy rồi đăng (Meta không có API đăng vào group) |
| Học mỗi ngày – tài khoản showcase | 18:00 (+0–90 phút) | Tài khoản showcase làm bài thật (full test 3 ngày/lần, ngày khác làm Listening hoặc Reading), để streak và thống kê luôn có dữ liệu mới |

Group Facebook chỉ được soạn bài chứ không tự đăng: Meta đã gỡ Groups API (đăng bài, comment) từ tháng 4/2024, còn bot trình duyệt vi phạm điều khoản và dễ làm tài khoản bị khoá.

## Tài khoản showcase

`threads-showcase@toeicmastery.click` ("Minh Anh"), mật khẩu nằm trong `.env`. `helper/study.js` cho tài khoản này làm bài thật: Gemini đọc đề và nghe audio, sau đó một phần đáp án được cố ý đổi để điểm quanh mức 830 (yếu hơn ở Part 3 và Part 7). Đáp án được gửi rải theo thời gian như người thật làm bài. Tài khoản free chỉ được 1 full test và 3 mini test mỗi ngày. Muốn chụp được Thống kê và Quick Study thì cần nâng tài khoản lên Pro trong admin.

## Chạy

n8n (cổng 5678) và helper (cổng 5690) chạy dưới dạng LaunchAgent của macOS (`launchd/`, cài vào `~/Library/LaunchAgents/`). Cả hai tự bật khi đăng nhập vào máy và tự chạy lại nếu bị crash. `run.sh` là script khởi chạy của chúng.

```sh
~/.n8n-run/start.sh   # khởi động lại cả hai (vd sau khi sửa .env)
launchctl bootout gui/$(id -u)/com.toeicmastery.n8n   # tắt hẳn (tương tự với .helper)
```

Khi máy ngủ, các lịch bị bỏ lỡ sẽ không chạy bù.

`~/.n8n-run/.env` (không có trong git):

```
THREADS_TOKEN=...
GEMINI_API_KEY=...
GEMINI_MODEL=gemini-3.1-flash-lite
SITE_URL=https://toeicmastery.click
HELPER_URL=http://127.0.0.1:5690
SITE_EMAIL=threads-showcase@toeicmastery.click
SITE_PASSWORD=...
FB_PAGE_ID=1385731167947995
FB_PAGE_TOKEN=...
```

Các file trong `helper/` được copy sang `~/.n8n-run/helper/`, và chạy `npm i playwright && npx playwright install chromium` ở đó:

- `server.js`: `GET /shot?path=…` đăng nhập bằng tài khoản showcase, đánh dấu mọi popup và tour là đã xem, chụp ảnh 1080×1350, upload lên catbox.moe (Threads và Facebook cần URL ảnh công khai), trả về `{url, text}`. `POST /study?kind=full|listening|reading` chạy `study.js` ở nền.
- `study.js`: buổi học như mô tả ở trên.
- `register.js`: tạo tài khoản showcase. Chỉ chạy một lần.

## Sửa workflow

Sửa `build.mjs`, chạy `node n8n/build.mjs`, rồi import lại:

```sh
n8n import:workflow --input=n8n/workflows/<file>.json
n8n publish:workflow --id=<id>
```
