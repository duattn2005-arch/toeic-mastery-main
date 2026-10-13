import type { Guide } from "./types";

export const CACH_TINH_DIEM: Guide = {
  slug: "cach-tinh-diem-toeic",
  title: "Cách tính điểm TOEIC (thang 10–990) và nên đặt mục tiêu bao nhiêu điểm",
  seoTitle: "Cách tính điểm TOEIC (10–990) và chọn mục tiêu",
  description:
    "Hiểu cách TOEIC Listening & Reading quy đổi số câu đúng ra điểm 10–990, vì sao cùng số câu đúng có thể lệch điểm, và cách chọn mục tiêu điểm hợp lý.",
  summary: "Thang điểm 10–990 hoạt động ra sao, điểm quy đổi có cố định không và chọn mục tiêu thế nào cho hợp lý.",
  category: "Tổng quan",
  sections: [
    {
      id: "thang-diem",
      heading: "Thang điểm TOEIC Listening & Reading",
      blocks: [
        {
          type: "p",
          text: "Mỗi phần thi có điểm từ **5 đến 495**, cộng lại thành tổng điểm từ **10 đến 990**. Điểm luôn là bội số của 5. TOEIC không có khái niệm đậu hay rớt: kết quả chỉ là con số cho biết trình độ của bạn, còn mức điểm cần đạt do trường học hoặc công ty đặt ra.",
        },
        {
          type: "table",
          head: ["Phần", "Số câu", "Điểm"],
          rows: [
            ["Listening", "100", "5 – 495"],
            ["Reading", "100", "5 – 495"],
            ["Tổng", "200", "10 – 990"],
          ],
        },
      ],
    },
    {
      id: "quy-doi",
      heading: "Từ số câu đúng ra điểm: quy đổi như thế nào?",
      blocks: [
        {
          type: "p",
          text: "Bước đầu, mỗi phần được tính theo **số câu đúng** (điểm thô). Câu sai hay bỏ trống đều không bị trừ điểm. Sau đó điểm thô được đổi sang điểm quy đổi bằng một bảng riêng cho từng đề.",
        },
        {
          type: "p",
          text: "Vì bảng quy đổi **khác nhau giữa các đề** (đề khó hơn thì cùng số câu đúng sẽ cho điểm cao hơn một chút để công bằng giữa các lần thi), và mức tăng điểm của mỗi câu đúng cũng không đều, nên không có công thức cố định kiểu “mỗi câu đúng bằng 5 điểm”. Cùng số câu đúng, hai lần thi có thể lệch nhau vài chục điểm.",
        },
        {
          type: "tip",
          title: "Hệ quả thực tế",
          text: "Đừng bỏ trống câu nào, vì không bị trừ điểm. Và đừng quá tin vào con số quy đổi từ một đề thi thử; hãy nhìn xu hướng qua nhiều bài thi.",
        },
      ],
    },
    {
      id: "muc-tieu",
      heading: "Nên đặt mục tiêu bao nhiêu điểm?",
      blocks: [
        {
          type: "p",
          text: "Mục tiêu phụ thuộc vào lý do bạn thi. Bảng sau chỉ mang tính tham khảo, quy định thực tế khác nhau theo từng trường và công ty, hãy hỏi trực tiếp nơi bạn cần nộp chứng chỉ.",
        },
        {
          type: "table",
          head: ["Mục đích", "Mức điểm thường gặp"],
          rows: [
            ["Chuẩn đầu ra đại học", "Khoảng 400–600, tuỳ trường và ngành"],
            ["Xin việc văn phòng, dịch vụ", "Khoảng 500–700"],
            ["Công ty đa quốc gia, ngân hàng, vị trí cần giao tiếp nhiều", "Khoảng 700–850 trở lên"],
          ],
        },
        {
          type: "p",
          text: "Điểm TOEIC thường có hiệu lực **khoảng 2 năm** kể từ ngày thi, nên đừng thi quá sớm so với thời điểm cần nộp.",
        },
      ],
    },
    {
      id: "uoc-luong",
      heading: "Ước lượng điểm từ bài thi thử",
      blocks: [
        {
          type: "ol",
          items: [
            "Làm đủ 200 câu trong 120 phút, không tra từ điển, không dừng giữa chừng.",
            "Đếm số câu đúng của Listening và Reading riêng.",
            "Quy đổi bằng bảng của chính đề đó (nếu đề có). Nếu không có, chỉ nên xem đó là ước lượng thô.",
            "Lặp lại với 3–4 đề rồi lấy trung bình để loại bỏ may rủi từng đề.",
          ],
        },
        {
          type: "p",
          text: "Trên TOEIC Mastery, mỗi bài thi đều được chấm tự động, có lịch sử và thống kê theo Part để bạn theo dõi tiến độ qua từng lần làm.",
        },
      ],
    },
  ],
  faqs: [
    { q: "Điểm TOEIC tối đa là bao nhiêu?", a: "990 điểm, gồm tối đa 495 điểm Listening và 495 điểm Reading." },
    { q: "TOEIC có đậu hay rớt không?", a: "Không. Kết quả là một con số từ 10 đến 990; mức điểm cần đạt do trường học hoặc công ty yêu cầu." },
    { q: "Làm sai có bị trừ điểm không?", a: "Không. Điểm chỉ phụ thuộc số câu đúng, nên hãy trả lời tất cả câu hỏi." },
    { q: "Điểm TOEIC có hiệu lực trong bao lâu?", a: "Thường khoảng 2 năm kể từ ngày thi. Bạn nên kiểm tra yêu cầu cụ thể của nơi nhận chứng chỉ." },
  ],
  related: ["cau-truc-de-thi-toeic", "lo-trinh-hoc-toeic", "meo-lam-bai-toeic-reading"],
};
