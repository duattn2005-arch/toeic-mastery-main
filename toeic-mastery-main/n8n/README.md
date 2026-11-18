# n8n – Threads tự động

Ba workflow cho tài khoản Threads @toeicmasteryy, chạy trên n8n local (http://localhost:5678).

| Workflow | Lịch | Làm gì |
|---|---|---|
| Threads 1 – Bài ảnh từ website | 8:30 & 19:30 (+0–40 phút ngẫu nhiên) | Chọn 1 trang trên sitemap (blog / từ vựng / hướng dẫn / thi thử), chụp màn hình, Gemini viết bài theo nội dung trang, đăng kèm ảnh, 2–7 phút sau tự comment link trang đó |
| Threads 2 – Bài tương tác | 12:15 & 21:45 (+0–40 phút) | Xoay vòng: mẹo, quiz Part 5, câu hỏi mở, từ dễ nhầm, confession. Quiz: đáp án + link comment sau 1–3 giờ; loại khác: link comment sau 3–10 phút |
| Threads 3 – Tự trả lời comment | Mỗi 20 phút, 7h–24h | Trả lời comment mới (≤ 2 ngày) trên bài 4 ngày gần nhất, tối đa 3/lần, 60/ngày, giãn 15–45 giây; bỏ qua comment chủ trang đã tự trả lời; chèn link khi người ta hỏi hoặc ~30% số lần (mỗi người tối đa 1 lần) |

Chống spam: khoảng 4 bài/ngày (giới hạn của Threads là 250), giờ đăng lệch ngẫu nhiên, không có link trong thân bài, trang đã đăng thì không chọn lại cho tới khi hết vòng.

## Chạy

```sh
~/.n8n-run/start.sh   # bật helper chụp ảnh (cổng 5690) + n8n (cổng 5678)
```

Key nằm ở `~/.n8n-run/.env`, không có trong git:

```
THREADS_TOKEN=...
GEMINI_API_KEY=...
GEMINI_MODEL=gemini-3.1-flash-lite
SITE_URL=https://toeicmastery.click
HELPER_URL=http://127.0.0.1:5690
```

`helper/server.js` dùng Playwright chụp trang ở khung 1080×1350. Trước khi tải trang, nó đặt sẵn cờ "đã đóng" cho popup đăng nhập và thông báo cookie, rồi upload ảnh lên catbox.moe, vì Threads chỉ nhận `image_url` công khai. Lần đầu cài: `cd ~/.n8n-run/helper && npm i playwright && npx playwright install chromium`.

## Sửa workflow

Sửa `build.mjs`, chạy `node n8n/build.mjs`, rồi import lại:

```sh
n8n import:workflow --input=n8n/workflows/threads-1-image-post.json
n8n publish:workflow --id=thrImagePost01
```

Nghiên cứu đối thủ dùng Gemini kèm Google Search. Gói Gemini miễn phí hiện bị lỗi 429 cho tính năng search, nên bước này tự bỏ qua và chỉ viết theo các mẫu viral cài sẵn cùng giọng văn của các bài cũ.
