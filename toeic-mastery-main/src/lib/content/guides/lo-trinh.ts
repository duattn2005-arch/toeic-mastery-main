import type { Guide } from "./types";

export const LO_TRINH: Guide = {
  slug: "lo-trinh-hoc-toeic",
  title: "Lộ trình học TOEIC từ mất gốc đến 600 và 800 điểm",
  seoTitle: "Lộ trình học TOEIC từ mất gốc đến 600, 800 điểm",
  description:
    "Lộ trình học TOEIC theo giai đoạn: nền tảng, 450–500, 600–650 và 750+. Mỗi giai đoạn nên học gì mỗi ngày, luyện đề ra sao và khi nào nên thi thử.",
  summary: "Kế hoạch theo giai đoạn cho người mất gốc, người cần 600 điểm và người nhắm 800+, kèm thói quen học mỗi ngày.",
  category: "Học tập",
  sections: [
    {
      id: "nguyen-tac",
      heading: "Ba nguyên tắc trước khi lập kế hoạch",
      blocks: [
        {
          type: "ol",
          items: [
            "**Đo trình độ trước.** Làm một đề đủ 200 câu để biết điểm xuất phát và Part nào yếu nhất. Kế hoạch dựa trên số liệu thật hiệu quả hơn kế hoạch dựa trên cảm giác.",
            "**Đều đặn hơn dài.** 45–60 phút mỗi ngày trong nhiều tháng tốt hơn 5 tiếng dồn vào cuối tuần.",
            "**Sửa lỗi quan trọng hơn làm thêm đề.** Mỗi câu sai cần được hiểu vì sao sai, nếu không bạn sẽ sai lại đúng dạng đó.",
          ],
        },
      ],
    },
    {
      id: "cac-giai-doan",
      heading: "Các giai đoạn học",
      blocks: [
        {
          type: "table",
          head: ["Giai đoạn", "Mục tiêu", "Trọng tâm"],
          rows: [
            ["0. Lấy lại nền tảng", "Dưới 300 → khoảng 400", "Ngữ pháp cơ bản, 800–1.000 từ thông dụng, nghe câu ngắn"],
            ["1. Tăng tốc", "Khoảng 450–500", "Part 1, 2, 5 (các Part dễ lấy điểm), từ vựng theo chủ đề công sở"],
            ["2. Ổn định", "Khoảng 600–650", "Part 3, 4, 6; luyện đọc nhanh Part 7 dạng đoạn đơn"],
            ["3. Bứt phá", "750 trở lên", "Part 7 đoạn kép/ba, câu suy luận, giữ độ chính xác cả hai phần"],
          ],
        },
      ],
    },
    {
      id: "giai-doan-0",
      heading: "Giai đoạn 0: lấy lại nền tảng (4–8 tuần)",
      blocks: [
        {
          type: "ul",
          items: [
            "Ôn các thì cơ bản, từ loại (danh từ, động từ, tính từ, trạng từ), giới từ thông dụng.",
            "Học 800–1.000 từ thông dụng trong công việc và đời sống, theo chủ đề, mỗi ngày 10–15 từ.",
            "Nghe các đoạn ngắn có phụ đề rồi nghe lại không phụ đề; tập nghe chép chính tả vài câu mỗi ngày.",
          ],
        },
        { type: "tip", text: "Chưa cần thi thử cả đề ở giai đoạn này. Làm riêng Part 1, 2 và 5 để quen dạng câu và lấy lại tự tin." },
      ],
    },
    {
      id: "giai-doan-1-2",
      heading: "Giai đoạn 1 và 2: từ 450 lên 650",
      blocks: [
        {
          type: "p",
          text: "Ở khoảng điểm này, lợi nhuận lớn nhất nằm ở **Part 5 và Part 2**: câu ngắn, dạng lặp lại, có thể luyện thành phản xạ. Mỗi tuần nên có:",
        },
        {
          type: "ul",
          items: [
            "3–4 buổi luyện theo Part (30–40 phút mỗi buổi), tập trung vào Part yếu nhất.",
            "1 buổi làm đề đủ Listening hoặc Reading trong thời gian thật.",
            "1 buổi xem lại toàn bộ câu sai: ghi nguyên nhân, ghi từ mới, làm lại.",
            "Học từ vựng mỗi ngày bằng flashcard ôn lặp lại ngắt quãng; tuyệt đối không bỏ ngày ôn.",
          ],
        },
        {
          type: "p",
          text: "Khi điểm Part 5 đã ổn định, chuyển bớt thời gian sang Part 3, 4 (nghe và bắt ý paraphrase) và Part 7 đoạn đơn (đọc có chiến lược, không dịch từng chữ).",
        },
      ],
    },
    {
      id: "giai-doan-3",
      heading: "Giai đoạn 3: từ 650 lên 800+",
      blocks: [
        {
          type: "ul",
          items: [
            "Làm đề đủ 200 câu mỗi tuần, đúng 120 phút, để rèn thể lực và phân bổ thời gian.",
            "Tập trung Part 7 đoạn kép và đoạn ba: luyện nối thông tin giữa các tài liệu và câu hỏi suy luận.",
            "Nghe nhiều giọng (Mỹ, Anh, Úc, Canada) và luyện shadowing để bắt nhanh các cụm nối âm.",
            "Mở rộng từ vựng sang chủ đề tài chính, nhân sự, sản xuất, hợp đồng; học theo cụm từ cố định (collocation).",
          ],
        },
      ],
    },
    {
      id: "thoi-quen",
      heading: "Một ngày học mẫu (60 phút)",
      blocks: [
        {
          type: "table",
          head: ["Thời lượng", "Việc làm"],
          rows: [
            ["10–15 phút", "Ôn từ vựng đến hạn (flashcard lặp lại ngắt quãng)"],
            ["25–30 phút", "Luyện một Part: làm bài rồi xem giải thích"],
            ["10–15 phút", "Nghe lại đoạn vừa làm, chép lại câu khó hoặc đọc theo (shadowing)"],
            ["5 phút", "Ghi lại lỗi sai và từ mới của ngày"],
          ],
        },
        {
          type: "p",
          text: "TOEIC Mastery có sẵn lộ trình từ vựng theo ngày, luyện đề theo Part, thống kê điểm yếu theo Part và AI Mentor gợi ý bước tiếp theo, giúp bạn bám sát kế hoạch này mà không phải tự tổ chức mọi thứ.",
        },
      ],
    },
  ],
  faqs: [
    { q: "Mất gốc học TOEIC bao lâu thì đạt 500 điểm?", a: "Còn tuỳ điểm xuất phát và thời gian học mỗi ngày. Với 45–60 phút đều đặn mỗi ngày, nhiều người cần vài tháng. Cách chính xác nhất là làm một đề thi thử để đo, rồi điều chỉnh kế hoạch sau mỗi 3–4 tuần." },
    { q: "Nên học Listening hay Reading trước?", a: "Học song song, nhưng dành nhiều thời gian hơn cho phần yếu hơn. Part 2 và Part 5 là hai Part dễ cải thiện nhanh nhất cho người mới." },
    { q: "Bao lâu nên thi thử một lần?", a: "Khoảng 2–3 tuần một lần ở giai đoạn đầu, mỗi tuần một lần khi gần ngày thi. Quan trọng hơn là xem lại kỹ các câu sai sau mỗi bài." },
  ],
  related: ["cau-truc-de-thi-toeic", "cach-hoc-tu-vung-toeic", "ngu-phap-part-5-toeic"],
};
