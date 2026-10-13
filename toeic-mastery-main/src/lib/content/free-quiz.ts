/** The free, no-login Part 5 style quiz at /thi-thu-mien-phi. Original
 * questions, written for this site. */
export interface FreeQuizQuestion {
  /** Sentence with ------- where the answer goes. */
  text: string;
  options: [string, string, string, string];
  /** Index into options. */
  correct: 0 | 1 | 2 | 3;
  topic: string;
  explain: string;
}

export const FREE_QUIZ: FreeQuizQuestion[] = [
  {
    text: "The marketing team will ------- the new product at the conference next week.",
    options: ["introduction", "introduce", "introduced", "introducing"],
    correct: 1,
    topic: "Dạng động từ",
    explain: "Sau động từ khuyết thiếu “will” cần động từ nguyên mẫu: will introduce.",
  },
  {
    text: "Ms. Tanaka is responsible ------- coordinating all client visits.",
    options: ["of", "for", "at", "with"],
    correct: 1,
    topic: "Giới từ",
    explain: "“Be responsible for + V-ing/danh từ” là cụm cố định: chịu trách nhiệm về việc gì.",
  },
  {
    text: "Please submit your expense report ------- Friday at the latest.",
    options: ["by", "until", "since", "during"],
    correct: 0,
    topic: "Giới từ thời gian",
    explain: "“By + mốc thời gian” nghĩa là muộn nhất vào lúc đó, đi với cụm “at the latest”.",
  },
  {
    text: "All employees must wear identification badges ------- they are inside the building.",
    options: ["while", "during", "despite", "because of"],
    correct: 0,
    topic: "Liên từ – giới từ",
    explain: "Sau chỗ trống là mệnh đề “they are inside the building” nên cần liên từ: while. During, despite, because of đều theo sau bởi cụm danh từ.",
  },
  {
    text: "The ------- of the new regulations has been postponed until March.",
    options: ["implement", "implemented", "implementation", "implementing"],
    correct: 2,
    topic: "Từ loại",
    explain: "Sau mạo từ “The” và trước “of” cần danh từ: implementation (việc thực thi).",
  },
  {
    text: "Neither the manager nor the assistants ------- aware of the schedule change.",
    options: ["was", "is", "were", "has been"],
    correct: 2,
    topic: "Hoà hợp chủ – vị",
    explain: "Với “neither ... nor ...”, động từ chia theo danh từ gần nhất: “the assistants” là số nhiều nên dùng “were”.",
  },
  {
    text: "The report, ------- was prepared by the finance department, shows a 12 percent increase in sales.",
    options: ["who", "which", "what", "where"],
    correct: 1,
    topic: "Mệnh đề quan hệ",
    explain: "Đại từ quan hệ thay cho “the report” (vật) làm chủ ngữ của mệnh đề phụ nên dùng which.",
  },
  {
    text: "Mr. Kim has worked for the company ------- more than ten years.",
    options: ["since", "for", "during", "ago"],
    correct: 1,
    topic: "Giới từ thời gian",
    explain: "“For + khoảng thời gian” (for ten years). “Since” cần một mốc thời gian như since 2015.",
  },
  {
    text: "The conference room is available only to employees ------- have reserved it in advance.",
    options: ["whose", "whom", "who", "which"],
    correct: 2,
    topic: "Mệnh đề quan hệ",
    explain: "“Employees” là người và làm chủ ngữ của “have reserved”, nên dùng who.",
  },
  {
    text: "Sales were ------- higher in the second quarter than in the first.",
    options: ["notice", "noticing", "noticeable", "noticeably"],
    correct: 3,
    topic: "Từ loại",
    explain: "Bổ nghĩa cho tính từ so sánh “higher” cần trạng từ: noticeably (một cách đáng chú ý).",
  },
];

export function quizLevel(score: number, total: number) {
  const ratio = score / total;
  if (ratio >= 0.9) return { label: "Rất tốt", text: "Ngữ pháp Part 5 của bạn đã khá vững. Hãy chuyển sang luyện tốc độ và các Part còn lại." };
  if (ratio >= 0.7) return { label: "Khá", text: "Bạn nắm được phần lớn các dạng câu. Xem lại các dạng bị sai để lấy nốt điểm." };
  if (ratio >= 0.4) return { label: "Trung bình", text: "Bạn cần củng cố một số dạng ngữ pháp cơ bản. Đọc bài ngữ pháp Part 5 rồi làm lại." };
  return { label: "Cần củng cố", text: "Hãy bắt đầu từ nền tảng: từ loại, thì và giới từ. Học theo lộ trình sẽ giúp bạn tiến bộ nhanh hơn." };
}
