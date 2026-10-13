import type { Guide } from "./types";

export const CAU_TRUC_DE_THI: Guide = {
  slug: "cau-truc-de-thi-toeic",
  title: "Cấu trúc đề thi TOEIC Listening & Reading: 7 Part, 200 câu, 120 phút",
  seoTitle: "Cấu trúc đề thi TOEIC: 7 Part, 200 câu, 120 phút",
  description:
    "Tổng quan đề thi TOEIC Listening & Reading: số câu, thời gian và yêu cầu của từng Part 1–7, kèm cách chia thời gian làm bài hợp lý.",
  summary: "7 Part, 200 câu, 120 phút: mỗi Part hỏi gì, bao nhiêu câu và nên dành bao nhiêu thời gian.",
  category: "Tổng quan",
  sections: [
    {
      id: "tong-quan",
      heading: "Đề thi TOEIC Listening & Reading gồm những gì?",
      blocks: [
        {
          type: "p",
          text: "Bài thi TOEIC Listening & Reading là bài trắc nghiệm gồm **200 câu** làm trong khoảng **2 giờ**, chia làm hai phần: Listening (nghe) 100 câu khoảng 45 phút và Reading (đọc) 100 câu trong 75 phút. Bài thi này không có phần nói và viết; hai kỹ năng đó nằm ở bài thi TOEIC Speaking & Writing riêng.",
        },
        {
          type: "p",
          text: "Phần Listening phát file âm thanh **một lần duy nhất**, bạn không được tua lại. Phần Reading không có giờ nghỉ giữa chừng nên bạn tự quyết định dành bao nhiêu thời gian cho từng Part.",
        },
        {
          type: "table",
          head: ["Part", "Tên gọi", "Số câu", "Bạn cần làm gì"],
          rows: [
            ["1", "Photographs (Mô tả tranh)", "6", "Xem tranh, chọn câu mô tả đúng nhất trong 4 câu nghe được"],
            ["2", "Question–Response (Hỏi – đáp)", "25", "Nghe một câu hỏi hoặc câu nói, chọn 1 trong 3 phản hồi phù hợp"],
            ["3", "Conversations (Hội thoại)", "39", "13 đoạn hội thoại, mỗi đoạn 3 câu hỏi"],
            ["4", "Talks (Bài nói)", "30", "10 bài nói ngắn (thông báo, quảng cáo...), mỗi bài 3 câu hỏi"],
            ["5", "Incomplete Sentences (Điền vào câu)", "30", "Chọn từ hoặc cụm từ điền vào chỗ trống"],
            ["6", "Text Completion (Điền vào đoạn)", "16", "4 đoạn văn, mỗi đoạn 4 chỗ trống (có thể phải chọn cả câu)"],
            ["7", "Reading Comprehension (Đọc hiểu)", "54", "Đoạn đơn (29 câu) và nhiều đoạn liên quan nhau (25 câu)"],
          ],
        },
        {
          type: "tip",
          text: "Đây là cấu trúc phổ biến hiện nay. ETS có thể điều chỉnh đề thi, nên hãy xem thông tin mới nhất ở IIG Việt Nam, đơn vị đại diện chính thức của ETS tại Việt Nam.",
        },
      ],
    },
    {
      id: "listening",
      heading: "Phần Listening: Part 1 đến Part 4",
      blocks: [
        {
          type: "ul",
          items: [
            "**Part 1 – Mô tả tranh (6 câu):** kiểm tra vốn từ về người, vật, hành động và vị trí. Các câu mô tả không in trong đề, bạn chỉ nghe.",
            "**Part 2 – Hỏi đáp (25 câu):** câu hỏi ngắn kiểu What/Where/When/Who/Why/How hoặc câu hỏi Yes/No. Đáp án không in trong đề nên rất dễ bị nhiễu bởi từ phát âm gần giống.",
            "**Part 3 – Hội thoại (39 câu):** hai hoặc ba người nói chuyện trong công việc hoặc đời sống. Một số câu kèm bảng biểu hay hình để đối chiếu thông tin.",
            "**Part 4 – Bài nói (30 câu):** một người nói như thông báo, quảng cáo, bản tin, tin nhắn thoại, hướng dẫn tham quan.",
          ],
        },
        {
          type: "p",
          text: "Giọng đọc trong đề rất đa dạng: Mỹ, Anh, Úc, Canada, New Zealand. Nếu chỉ quen nghe một giọng, bạn nên tập nghe thêm các giọng còn lại trước ngày thi.",
        },
      ],
    },
    {
      id: "reading",
      heading: "Phần Reading: Part 5 đến Part 7",
      blocks: [
        {
          type: "ul",
          items: [
            "**Part 5 (30 câu):** câu đơn lẻ, tập trung vào ngữ pháp và từ vựng. Đây là phần nhanh nhất nếu bạn nắm chắc các dạng câu.",
            "**Part 6 (16 câu):** điền vào email, thông báo, bài báo ngắn. Phải đọc cả đoạn để chọn từ, và có câu yêu cầu chọn câu thích hợp để điền vào đoạn.",
            "**Part 7 (54 câu):** đọc hiểu email, thông báo, quảng cáo, bài báo, tin nhắn, đoạn chat. Đây là phần dài nhất và quyết định bạn có kịp giờ hay không.",
          ],
        },
        {
          type: "p",
          text: "Gợi ý chia 75 phút của phần Reading: khoảng 10–12 phút cho Part 5, 8–10 phút cho Part 6 và phần còn lại (khoảng 50–55 phút) cho Part 7. Con số này chỉ là điểm xuất phát; hãy điều chỉnh theo điểm mạnh yếu của bạn sau vài lần thi thử.",
        },
        {
          type: "example",
          question: "Bạn còn 10 phút mà Part 7 còn 12 câu chưa làm. Nên làm gì?",
          answer: "Làm ngay các câu hỏi chi tiết ngắn, rồi điền ngẫu nhiên phần còn lại.",
          explain:
            "TOEIC không trừ điểm câu sai, nên đừng bỏ trống. Ưu tiên những câu hỏi chi tiết có thể tìm đáp án nhanh, và để các câu suy luận dài cho cuối cùng.",
        },
      ],
    },
    {
      id: "cach-luyen",
      heading: "Làm quen với cấu trúc này như thế nào?",
      blocks: [
        {
          type: "ol",
          items: [
            "Làm một đề đủ 200 câu trong đúng 120 phút để biết mình mất sức ở đâu.",
            "Với mỗi Part, ghi lại số câu sai và nguyên nhân: không biết từ, nghe không kịp, hay hết giờ.",
            "Chọn Part yếu nhất để luyện riêng vài buổi, rồi thi thử lại.",
          ],
        },
        {
          type: "p",
          text: "Trên TOEIC Mastery bạn có thể luyện theo từng Part hoặc thi thử cả đề, hệ thống chấm bài và thống kê điểm yếu theo Part để bạn biết nên ưu tiên luyện gì.",
        },
      ],
    },
  ],
  faqs: [
    { q: "Đề thi TOEIC Listening & Reading có bao nhiêu câu?", a: "Có 200 câu trắc nghiệm: 100 câu Listening (Part 1–4) và 100 câu Reading (Part 5–7)." },
    { q: "Thời gian làm bài TOEIC là bao lâu?", a: "Khoảng 2 giờ: Listening khoảng 45 phút và Reading 75 phút. Phần nghe phát một lần, không tua lại." },
    { q: "TOEIC có trừ điểm khi làm sai không?", a: "Không. Điểm dựa trên số câu đúng, vì vậy bạn nên trả lời hết các câu, kể cả khi phải đoán." },
    { q: "Bài thi TOEIC Listening & Reading có phần nói và viết không?", a: "Không. Nói và viết thuộc bài thi TOEIC Speaking & Writing, đăng ký riêng." },
  ],
  related: ["cach-tinh-diem-toeic", "lo-trinh-hoc-toeic", "meo-lam-bai-toeic-listening"],
};
