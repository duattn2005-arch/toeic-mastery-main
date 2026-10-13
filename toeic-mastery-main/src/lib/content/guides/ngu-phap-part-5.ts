import type { Guide } from "./types";

export const NGU_PHAP_PART_5: Guide = {
  slug: "ngu-phap-part-5-toeic",
  title: "Ngữ pháp trọng tâm Part 5 TOEIC: 8 dạng câu hay gặp kèm ví dụ",
  seoTitle: "Ngữ pháp Part 5 TOEIC: 8 dạng câu hay gặp",
  description:
    "Các dạng câu Part 5 TOEIC xuất hiện nhiều nhất: từ loại, thì và hoà hợp chủ vị, giới từ, liên từ, mệnh đề quan hệ, bị động, so sánh và từ vựng, mỗi dạng có mẹo và ví dụ có đáp án.",
  summary: "8 dạng câu Part 5 hay gặp, cách nhận ra từng dạng trong 5 giây và ví dụ có đáp án giải thích.",
  category: "Ngữ pháp",
  sections: [
    {
      id: "nhan-dang",
      heading: "Nhận ra dạng câu trong vài giây",
      blocks: [
        {
          type: "p",
          text: "Trước khi đọc câu, hãy liếc nhanh bốn đáp án. Chúng cho bạn biết người ra đề đang kiểm tra điều gì:",
        },
        {
          type: "table",
          head: ["Bốn đáp án trông như...", "Dạng câu", "Cần nhìn vào"],
          rows: [
            ["Cùng một gốc, khác đuôi (decide, decision, decisive, decisively)", "Từ loại", "Từ trước và sau chỗ trống"],
            ["Các dạng của một động từ (is, are, was, has been)", "Thì, thể, hoà hợp chủ vị", "Chủ ngữ và dấu hiệu thời gian"],
            ["Giới từ hoặc liên từ khác nhau (despite, although, during, while)", "Giới từ – liên từ", "Sau chỗ trống là cụm danh từ hay mệnh đề"],
            ["Bốn từ khác nghĩa", "Từ vựng, cụm từ cố định", "Nghĩa cả câu"],
          ],
        },
      ],
    },
    {
      id: "tu-loai",
      heading: "1. Từ loại (word form)",
      blocks: [
        {
          type: "ul",
          items: [
            "Sau mạo từ (a, the) hoặc tính từ sở hữu (his, our) thường là **danh từ**, hoặc tính từ rồi mới đến danh từ.",
            "Trước danh từ là **tính từ**; sau động từ to be là **tính từ** hoặc danh từ.",
            "Bổ nghĩa cho **động từ, tính từ hoặc cả câu** là **trạng từ** (thường đuôi -ly).",
          ],
        },
        {
          type: "example",
          question: "The company announced a ------- increase in profits. (A) substantial (B) substantially (C) substance (D) substantiate",
          answer: "(A) substantial",
          explain: "Chỗ trống đứng giữa mạo từ “a” và danh từ “increase”, nên cần một tính từ: substantial (đáng kể).",
        },
        {
          type: "example",
          question: "The manager spoke ------- about the new project. (A) enthusiasm (B) enthusiastic (C) enthusiastically (D) enthuse",
          answer: "(C) enthusiastically",
          explain: "Bổ nghĩa cho động từ “spoke” cần một trạng từ: enthusiastically (một cách nhiệt tình).",
        },
      ],
    },
    {
      id: "thi",
      heading: "2. Thì và hoà hợp chủ ngữ – động từ",
      blocks: [
        {
          type: "ul",
          items: [
            "**Dấu hiệu thời gian:** since/for → hiện tại hoàn thành; yesterday, last week, ago → quá khứ đơn; next month, by tomorrow → tương lai.",
            "**The number of + danh từ số nhiều** đi với động từ **số ít**; **a number of + danh từ số nhiều** đi với động từ **số nhiều**.",
            "Động từ chia theo chủ ngữ chính, bỏ qua cụm xen giữa như “of the department”.",
          ],
        },
        {
          type: "example",
          question: "The number of customers ------- grown steadily since 2020. (A) have (B) has (C) are (D) was",
          answer: "(B) has",
          explain: "“The number of” là chủ ngữ số ít, và “since 2020” cho thấy cần hiện tại hoàn thành: has grown.",
        },
      ],
    },
    {
      id: "gioi-tu",
      heading: "3. Giới từ và cụm từ cố định",
      blocks: [
        {
          type: "p",
          text: "Giới từ cần học theo cụm: responsible **for**, interested **in**, depend **on**, in charge **of**, according **to**, in addition **to**. Với giới từ chỉ thời gian, nhớ sự khác nhau giữa **until** (kéo dài đến lúc đó), **by** (muộn nhất là lúc đó), **for** (một khoảng thời gian) và **since** (từ một mốc).",
        },
        {
          type: "example",
          question: "The meeting has been postponed ------- next Tuesday. (A) until (B) since (C) during (D) at",
          answer: "(A) until",
          explain: "Cuộc họp bị hoãn kéo dài đến thứ Ba tuần sau: postponed until. “Since” cần mốc trong quá khứ, “during” cần một khoảng thời gian.",
        },
      ],
    },
    {
      id: "lien-tu",
      heading: "4. Liên từ và giới từ",
      blocks: [
        {
          type: "table",
          head: ["Sau đó là một mệnh đề (S + V)", "Sau đó là cụm danh từ"],
          rows: [
            ["although, even though", "despite, in spite of"],
            ["because, since, as", "because of, due to"],
            ["while, when, before, after", "during, before, after (+ danh từ)"],
          ],
        },
        {
          type: "example",
          question: "------- the heavy rain, the outdoor event went ahead as planned. (A) Although (B) Despite (C) Because (D) Whereas",
          answer: "(B) Despite",
          explain: "Sau chỗ trống là cụm danh từ “the heavy rain” (không có chủ ngữ và động từ), nên cần giới từ despite.",
        },
      ],
    },
    {
      id: "quan-he",
      heading: "5. Mệnh đề quan hệ",
      blocks: [
        {
          type: "ul",
          items: [
            "**who** thay cho người làm chủ ngữ; **which** thay cho vật; **that** dùng cho cả hai trong mệnh đề xác định.",
            "**whose + danh từ** chỉ sở hữu: người hay vật “có” danh từ đó.",
          ],
        },
        {
          type: "example",
          question: "Applicants ------- resumes are incomplete will not be considered. (A) who (B) whom (C) whose (D) which",
          answer: "(C) whose",
          explain: "Sau chỗ trống là danh từ “resumes” biểu thị sở hữu (hồ sơ của ứng viên), nên dùng whose.",
        },
      ],
    },
    {
      id: "bi-dong",
      heading: "6. Thể bị động và phân từ",
      blocks: [
        {
          type: "p",
          text: "Thể bị động có dạng **be + phân từ quá khứ** (is processed, must be submitted). Phân từ cũng làm tính từ: the **attached** file (tệp đính kèm), the **revised** schedule (lịch đã chỉnh sửa), an **interesting** offer.",
        },
        {
          type: "example",
          question: "All invoices must be ------- before the end of the month. (A) submit (B) submitted (C) submitting (D) submits",
          answer: "(B) submitted",
          explain: "Sau “must be” cần phân từ quá khứ để tạo bị động: hoá đơn được nộp.",
        },
      ],
    },
    {
      id: "so-sanh",
      heading: "7. So sánh",
      blocks: [
        {
          type: "ul",
          items: [
            "So sánh hơn: tính từ ngắn + **-er** hoặc **more** + tính từ dài, đi với **than**.",
            "So sánh nhất: **the** + tính từ + **-est** hoặc **the most** + tính từ dài.",
            "So sánh bằng: **as + tính từ + as**.",
          ],
        },
        {
          type: "example",
          question: "This year’s sales were ------- than last year’s. (A) high (B) higher (C) highest (D) the highest",
          answer: "(B) higher",
          explain: "Có “than” thì cần so sánh hơn: higher than.",
        },
      ],
    },
    {
      id: "tu-vung",
      heading: "8. Từ vựng và cụm từ cố định",
      blocks: [
        {
          type: "p",
          text: "Với dạng này, cả bốn đáp án đều đúng ngữ pháp và chỉ một đáp án hợp nghĩa. Chìa khoá là học theo **collocation**: submit a report, attend a meeting, meet a deadline, reach an agreement, place an order, take a look at, make a reservation.",
        },
        {
          type: "example",
          question: "Please ------- the attached form and return it by Friday. (A) complete (B) arrive (C) agree (D) reply",
          answer: "(A) complete",
          explain: "“Complete a form” là cụm cố định (điền vào mẫu đơn). Arrive, agree, reply không đi trực tiếp với tân ngữ là “form”.",
        },
      ],
    },
    {
      id: "thuc-hanh",
      heading: "Luyện tập thế nào?",
      blocks: [
        {
          type: "ol",
          items: [
            "Mỗi ngày làm 10 câu Part 5, hạn chế 20–25 giây mỗi câu.",
            "Với mỗi câu sai, ghi lại dạng câu và lý do, rồi tìm 2–3 câu cùng dạng để làm tiếp.",
            "Cuối tuần, xem lại sổ lỗi sai: các lỗi lặp lại là thứ cần học kỹ nhất.",
          ],
        },
        {
          type: "p",
          text: "Bạn có thể thử ngay bài kiểm tra Part 5 gồm 10 câu miễn phí, không cần đăng nhập, để xem mình mạnh yếu dạng nào.",
        },
      ],
    },
  ],
  faqs: [
    { q: "Part 5 TOEIC thi những chủ điểm ngữ pháp nào?", a: "Chủ yếu là từ loại, thì và hoà hợp chủ vị, giới từ, liên từ, mệnh đề quan hệ, thể bị động, so sánh và từ vựng – cụm từ cố định. Từ loại và giới từ – liên từ xuất hiện nhiều nhất." },
    { q: "Làm Part 5 bao lâu là đủ?", a: "Khoảng 10–12 phút cho 30 câu, tức khoảng 20–25 giây mỗi câu. Nếu một câu mất quá lâu, hãy chọn tạm rồi chuyển sang câu tiếp theo." },
    { q: "Có cần dịch cả câu khi làm Part 5 không?", a: "Không cần với các câu ngữ pháp: nhìn từ đứng trước và sau chỗ trống là đủ. Chỉ câu từ vựng mới cần hiểu nghĩa cả câu." },
  ],
  related: ["meo-lam-bai-toeic-reading", "cach-hoc-tu-vung-toeic", "lo-trinh-hoc-toeic"],
};
