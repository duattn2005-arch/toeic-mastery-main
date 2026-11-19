# n8n – Threads + Facebook tự động

Các workflow chạy trên n8n local (http://localhost:5678), giờ theo múi Asia/Ho_Chi_Minh.

| Workflow | Lịch (trong giờ dùng máy: sáng 8–11:30, tối 19–23) | Làm gì |
|---|---|---|
| Threads 1 – Bài ảnh tính năng → chốt PRO | 8:30 & 19:30 | Chọn tính năng, chụp màn hình ‖ săn xu hướng ‖ đọc bài cũ (song song), Gemini viết bài + comment nối tiếp, kiểm duyệt 6 điều kiện, đăng bằng 3 bước API (tạo container → chờ Meta → xuất bản), comment link vào trang đó |
| Threads 2 – Bài chốt PRO | 10:30 & 21:30 | Xoay vòng mẹo / quiz / hỏi đáp / từ dễ nhầm / confession, cùng pipeline như trên; link dẫn do Gemini chọn trong 17 trang sản phẩm (không dẫn blog/hướng dẫn) |
| Threads 3 – Tự trả lời comment | Mỗi 20 phút, 7h–24h | Cổng an toàn → lấy tài khoản ‖ thống kê → lấy bài → quét comment → chọn tối đa 3, quyết định gắn link → Gemini viết song song → kiểm duyệt → đăng cách nhau 15–45 giây; tối đa 60/ngày |
| Facebook 3 – Tự trả lời comment (Page) | Mỗi 15 phút, 7h–24h | Như trên cho Fanpage: like rồi trả lời, tối đa 4/lần, 80/ngày; mỗi bài chỉ gửi link web 1 lần |
| Facebook Group – Trung tâm nội dung | 9:00 mỗi ngày | Một lượt chạy sinh 2 bài song song (ảnh tính năng + tương tác), kiểm duyệt, ghi vào Google Doc kèm ảnh và comment |
| Học mỗi ngày – tài khoản showcase | 19:05 | Tài khoản showcase làm bài thật (full test 3 ngày/lần, ngày khác Listening hoặc Reading) để streak và thống kê luôn có dữ liệu |
| Facebook 1/2 (Page) | tắt | Fanpage đã có người đăng; bật lại trong n8n nếu cần |

Mọi workflow đều là sơ đồ nhiều node có khung chú thích màu, và mỗi node ghi `trace` (nhật ký từng bước) để node "Tổng kết chạy" hiện đủ chi tiết. Bấm **▶ Chạy ngay** để chạy tay: các khoảng nghỉ ngắn lại, không phải chờ.

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

## Google Docs cho bài group

Web app của Apps Script không mở được cho truy cập ẩn danh trên tài khoản này, nên chiều dữ liệu được đảo: helper đẩy mỗi bài nháp lên nhánh `drafts` của repo (`drafts.json`, kho riêng ở `~/.n8n-run/drafts-repo`), còn `gdoc-script.gs` gắn vào doc sẽ tự lấy về mỗi 15 phút và chèn vào doc (kèm ảnh). Dán script vào Extensions → Apps Script, chạy `setup` một lần và cấp quyền. Bài nháp cũng nằm ở `~/.n8n-run/drafts.md`.

## Tốc độ

`thinkingBudget: 0` cho Gemini (2–3 giây mỗi lần gọi thay vì 5–15), giới hạn 30 giây mỗi lần gọi và tự thử lại khi gặp 429/5xx/timeout. Google Search của Gemini (săn xu hướng) mặc định tắt (`GEMINI_SEARCH=off`) vì gói miễn phí báo 429; đặt `GEMINI_SEARCH=on` trong `.env` nếu nâng cấp gói.

## Tuyến nội dung: chốt gói PRO

Mọi bài đăng (Threads 1 và 2, hai nhánh của Facebook Group) đều nhắm tới việc người đọc cân nhắc nâng cấp PRO. Nội dung tự nhiên, thuyết phục, dựa đúng dữ kiện thật của web (`PRO_FACTS` trong `build.mjs`: giới hạn gói free, 11 quyền lợi Pro, ưu đãi thành viên mới). 8 góc: hết lượt, phân tích điểm yếu, transcript ETS, lộ trình theo ngày thi, "rẻ như ly trà sữa", có đáng mua không, ưu đãi thành viên mới, học thông minh hơn. Comment đầu tiên nối tiếp mạch bài rồi dẫn vào `/pricing`.

Quy tắc cứng: không nêu số tiền, chỉ so sánh với ly trà sữa / tô phở / cốc cà phê; số % duy nhất được nêu là ưu đãi giảm 25% cho thành viên mới trong 72 giờ đầu; không bịa lời chứng thực, số học viên, điểm số; không cam kết lên điểm; không khan hiếm giả; thành thật nói ai chưa cần Pro. Node kiểm duyệt chặn bài vi phạm (bài không được đăng), và Gemini được viết lại một lần trước khi tới bước đó. Khi người ta hỏi về Pro/giá ở comment, bot trả lời theo cùng quy tắc và dẫn `/pricing`.
