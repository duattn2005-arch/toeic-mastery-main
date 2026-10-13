import type { Guide } from "./types";

export const HOC_TU_VUNG: Guide = {
  slug: "cach-hoc-tu-vung-toeic",
  title: "Cách học từ vựng TOEIC hiệu quả: học gì, học thế nào để nhớ lâu",
  seoTitle: "Cách học từ vựng TOEIC hiệu quả, nhớ lâu",
  description:
    "Phương pháp học từ vựng TOEIC: chọn chủ đề, học theo cụm và họ từ, ôn lặp lại ngắt quãng, số từ nên học mỗi ngày và cách kiểm tra mình đã nhớ thật.",
  summary: "Học từ vựng TOEIC theo chủ đề, theo cụm, ôn đúng lúc và kiểm tra bằng cách tự nhớ lại.",
  category: "Học tập",
  sections: [
    {
      id: "hoc-gi",
      heading: "Học từ vựng nào cho TOEIC?",
      blocks: [
        {
          type: "p",
          text: "TOEIC xoay quanh môi trường làm việc và đời sống thường ngày, nên từ vựng tập trung vào một số chủ đề lặp đi lặp lại. Học theo chủ đề giúp não gom từ liên quan lại với nhau và dễ nhớ hơn là học rời rạc theo bảng chữ cái.",
        },
        {
          type: "table",
          head: ["Nhóm chủ đề", "Ví dụ ngữ cảnh trong đề"],
          rows: [
            ["Văn phòng và cuộc họp", "lịch họp, báo cáo, hạn chót, thiết bị văn phòng"],
            ["Nhân sự và tuyển dụng", "ứng viên, phỏng vấn, lương thưởng, đào tạo"],
            ["Mua sắm và đặt hàng", "đơn hàng, hoá đơn, giao hàng, hoàn tiền, bảo hành"],
            ["Du lịch và di chuyển", "chuyến bay, đặt phòng, lịch trình, nhà ga"],
            ["Tài chính và ngân hàng", "ngân sách, khoản vay, báo cáo tài chính, thuế"],
            ["Sản xuất và vận hành", "dây chuyền, kiểm tra chất lượng, bảo trì"],
            ["Nhà hàng và giải trí", "đặt bàn, thực đơn, triển lãm, vé"],
          ],
        },
      ],
    },
    {
      id: "hoc-the-nao",
      heading: "Học thế nào để nhớ lâu?",
      blocks: [
        {
          type: "ol",
          items: [
            "**Học theo cụm từ, không học từ rời.** Nhớ “meet a deadline” (kịp hạn chót), “place an order” (đặt hàng), “reach an agreement” (đạt thoả thuận) thay vì chỉ nhớ nghĩa của deadline, order, agreement. Part 5 hay kiểm tra đúng những cụm này.",
            "**Học cả họ từ.** Mỗi từ gốc đi kèm danh từ, động từ, tính từ, trạng từ: decide, decision, decisive, decisively. Cách này giúp trả lời nhanh các câu hỏi từ loại.",
            "**Tự nhớ lại trước khi lật thẻ.** Nhìn từ, cố gọi nghĩa ra trong đầu, rồi mới kiểm tra. Cố gắng nhớ lại mới là lúc trí nhớ được củng cố.",
            "**Học câu ví dụ.** Một câu ngắn có từ đó giúp bạn nhớ cách dùng, giới từ đi kèm và vị trí trong câu.",
            "**Nghe và đọc to.** Biết cách phát âm giúp bạn nhận ra từ khi nghe ở phần Listening.",
          ],
        },
      ],
    },
    {
      id: "lap-lai",
      heading: "Ôn lặp lại ngắt quãng",
      blocks: [
        {
          type: "p",
          text: "Trí nhớ giảm nhanh sau lần học đầu rồi chậm dần. Cách hiệu quả là ôn đúng lúc sắp quên: lần đầu sau khoảng một ngày, rồi cách dần ra vài ngày, một tuần, vài tuần. Từ nào nhớ dễ thì khoảng cách xa dần, từ nào hay quên thì được gặp lại sớm hơn.",
        },
        {
          type: "p",
          text: "Đó là nguyên lý của thuật toán **SM-2** mà TOEIC Mastery dùng cho flashcard: mỗi lần tự đánh giá “Học lại / Khó / Nhớ / Rất dễ” sẽ quyết định khi nào từ đó quay lại. Bạn chỉ cần ôn đúng số từ đến hạn mỗi ngày.",
        },
        { type: "tip", text: "Bỏ lỡ vài ngày ôn là thủ phạm số một làm mất công học. Thà học ít nhưng ôn đều còn hơn học nhiều rồi bỏ." },
      ],
    },
    {
      id: "so-luong",
      heading: "Mỗi ngày nên học bao nhiêu từ?",
      blocks: [
        {
          type: "ul",
          items: [
            "Người mới hoặc ít thời gian: **10–15 từ mới** mỗi ngày kèm ôn các từ cũ.",
            "Người có 45–60 phút mỗi ngày: **15–20 từ mới** là mức vừa sức nếu bạn ôn lại đều đặn.",
            "Quan trọng hơn con số là tổng số từ bạn **thật sự nhớ** sau 1–2 tuần, chứ không phải số từ đã lướt qua.",
          ],
        },
        {
          type: "p",
          text: "Muốn học từ vựng Tiếng Anh THPT (Lớp 11, Lớp 9) trước, bạn có thể xem danh sách đầy đủ theo từng Unit ở mục Từ vựng của TOEIC Mastery; mỗi Unit đều có lộ trình ngày và game ôn tập.",
        },
      ],
    },
    {
      id: "kiem-tra",
      heading: "Làm sao biết mình đã nhớ thật?",
      blocks: [
        {
          type: "ul",
          items: [
            "Cuối mỗi ngày, che nghĩa và tự viết lại 10 từ vừa học. Từ nào quên thì đánh dấu lại.",
            "Làm câu trắc nghiệm hoặc game nối từ để kiểm tra nhận diện nhanh.",
            "Đặt một câu của riêng bạn với từ mới. Nếu đặt được câu đúng, từ đó đã vào trí nhớ chủ động.",
            "Cuối tuần, làm một bài Part 5 và xem bao nhiêu từ mới đã xuất hiện hoặc giúp bạn chọn đúng.",
          ],
        },
      ],
    },
  ],
  faqs: [
    { q: "Học từ vựng TOEIC nên học bao nhiêu từ mỗi ngày?", a: "10–15 từ mới mỗi ngày là mức an toàn cho người mới; người có nhiều thời gian có thể học 15–20 từ nếu ôn lại đều đặn. Điều quan trọng là ôn lại đúng lúc." },
    { q: "Học từ vựng bằng flashcard có hiệu quả không?", a: "Có, nếu bạn tự nhớ lại nghĩa trước khi lật thẻ và ôn theo lịch lặp lại ngắt quãng. Học flashcard mà chỉ lướt xem thì hiệu quả thấp." },
    { q: "Cần biết bao nhiêu từ để đạt 600 hay 800 TOEIC?", a: "Không có con số chính xác, vì điểm còn phụ thuộc ngữ pháp và kỹ năng làm bài. Một mốc thường được nhắc đến là vài nghìn từ thông dụng trong môi trường công sở; hãy ưu tiên nhóm từ lặp lại nhiều trong đề." },
  ],
  related: ["lo-trinh-hoc-toeic", "ngu-phap-part-5-toeic", "meo-lam-bai-toeic-reading"],
};
