import type { Guide } from "./types";

export const MEO_READING: Guide = {
  slug: "meo-lam-bai-toeic-reading",
  title: "Mẹo làm bài TOEIC Reading Part 5–7: chia thời gian và đọc hiểu nhanh",
  seoTitle: "Mẹo làm bài TOEIC Reading Part 5–7",
  description:
    "Chiến lược TOEIC Reading: cách phân bổ 75 phút, làm Part 5 và Part 6 nhanh mà chính xác, đọc Part 7 theo câu hỏi, xử lý đoạn kép và các dạng câu hay gặp.",
  summary: "Chia 75 phút thế nào, Part 5 – 6 làm nhanh ra sao và đọc Part 7 theo câu hỏi để kịp giờ.",
  category: "Kỹ năng",
  sections: [
    {
      id: "thoi-gian",
      heading: "Chia thời gian cho 75 phút Reading",
      blocks: [
        {
          type: "table",
          head: ["Part", "Số câu", "Thời gian gợi ý"],
          rows: [
            ["5", "30", "10–12 phút (khoảng 20–25 giây mỗi câu)"],
            ["6", "16", "8–10 phút"],
            ["7", "54", "50–55 phút"],
          ],
        },
        {
          type: "p",
          text: "Lỗi phổ biến nhất của người mới là **mất quá nhiều thời gian cho Part 5**, rồi hết giờ trước khi đọc xong Part 7. Part 5 chỉ kiểm tra ngữ pháp và từ vựng: biết là biết, không biết thì ngồi lâu cũng không ra.",
        },
        { type: "tip", text: "Thấy câu nào quá 40 giây mà chưa chọn được, hãy đánh dấu, chọn tạm một đáp án rồi quay lại nếu còn thời gian." },
      ],
    },
    {
      id: "part-5",
      heading: "Part 5: Điền vào câu",
      blocks: [
        {
          type: "ol",
          items: [
            "**Nhìn các lựa chọn trước** để biết dạng câu: cùng một gốc từ nhưng khác từ loại là câu từ loại; các dạng của một động từ là câu thì hoặc thể; bốn từ khác nhau là câu từ vựng, giới từ hoặc liên từ.",
            "Với câu từ loại, chỉ cần nhìn **từ đứng trước và sau chỗ trống**, không cần dịch cả câu.",
            "Không dịch hết câu sang tiếng Việt; đọc tìm manh mối ngữ pháp trước.",
            "Với câu từ vựng, đọc cả câu để chọn từ hợp nghĩa và hợp cụm từ cố định.",
          ],
        },
        {
          type: "example",
          question: "The new policy will be ------- next month. (A) implement (B) implemented (C) implementing (D) implementation",
          answer: "(B) implemented",
          explain: "Sau “will be” cần phân từ quá khứ để tạo thể bị động: “will be implemented”. Chính sách được thực hiện, không phải tự thực hiện.",
        },
      ],
    },
    {
      id: "part-6",
      heading: "Part 6: Điền vào đoạn",
      blocks: [
        {
          type: "ul",
          items: [
            "Đọc **cả đoạn**, không làm từng câu rời, vì một số chỗ trống cần thông tin ở câu trước hoặc sau.",
            "Câu hỏi chọn thì hoặc từ nối (however, therefore, in addition...) thường phụ thuộc vào **ý của câu liền trước**.",
            "Với dạng chọn câu điền vào đoạn, tìm đại từ, từ nối và danh từ nhắc lại ở các câu xung quanh để biết câu cần điền phải nối với ý nào.",
          ],
        },
      ],
    },
    {
      id: "part-7",
      heading: "Part 7: Đọc hiểu",
      blocks: [
        {
          type: "ol",
          items: [
            "**Đọc câu hỏi trước, đọc đoạn văn sau.** Bạn sẽ biết cần tìm gì và chỉ đọc kỹ chỗ liên quan.",
            "Nhìn **tiêu đề, người gửi, ngày tháng** của email hay thông báo để nắm bối cảnh trong vài giây.",
            "Câu hỏi chi tiết: tìm từ khoá rồi đọc quanh vị trí đó; đáp án thường là cách nói khác của câu trong bài.",
            "Câu hỏi NOT: kiểm tra từng đáp án với bài, loại những ý **có** trong bài; đáp án còn lại là câu trả lời.",
            "Câu hỏi suy luận (infer): chọn ý được **ngầm hiểu từ bài**, không chọn ý bạn tự suy diễn thêm.",
            "Với nhiều đoạn liên quan nhau, các câu hỏi cuối thường cần **kết hợp thông tin** từ hai tài liệu (ví dụ email và bảng giá).",
          ],
        },
        { type: "tip", text: "Làm đúng theo thứ tự các câu hỏi, vì chúng thường theo thứ tự xuất hiện của thông tin trong bài. Nếu đoạn dài, chia nhỏ ra đọc theo từng câu hỏi thay vì đọc hết một lượt." },
      ],
    },
    {
      id: "cuoi-gio",
      heading: "Khi sắp hết giờ",
      blocks: [
        {
          type: "p",
          text: "Còn 2–3 phút mà chưa làm xong, hãy ưu tiên các câu dễ trả lời (hỏi chi tiết ngắn) rồi **tô hết phần còn lại**. Không bị trừ điểm khi sai nên bỏ trống là mất điểm vô ích.",
        },
      ],
    },
  ],
  faqs: [
    { q: "Nên làm Part 5 rồi Part 6, Part 7 theo thứ tự hay làm Part 7 trước?", a: "Phần lớn người học nên làm theo thứ tự để giữ nhịp. Nếu bạn thường hết giờ ở Part 7, hãy giảm thời gian Part 5 xuống khoảng 10 phút thay vì đảo thứ tự." },
    { q: "Có nên dịch từng chữ khi đọc Part 7 không?", a: "Không. Hãy đọc tìm ý theo câu hỏi, nắm cấu trúc đoạn văn và các từ nối. Dịch từng chữ sẽ làm bạn hết giờ." },
    { q: "Hết giờ mà chưa làm xong Part 7 thì sao?", a: "Tô ngẫu nhiên các câu còn lại vì không bị trừ điểm khi sai. Lần sau hãy luyện giảm thời gian ở Part 5 và Part 6." },
  ],
  related: ["ngu-phap-part-5-toeic", "cach-tinh-diem-toeic", "meo-lam-bai-toeic-listening"],
};
