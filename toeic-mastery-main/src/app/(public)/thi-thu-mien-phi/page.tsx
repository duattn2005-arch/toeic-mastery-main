import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/public/breadcrumbs";
import { Faq } from "@/components/public/faq";
import { FreeQuiz } from "@/components/public/free-quiz";
import { JsonLd } from "@/components/public/json-ld";
import { FREE_QUIZ } from "@/lib/content/free-quiz";
import { absoluteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Thi thử TOEIC Part 5 miễn phí, có đáp án",
  description:
    "Làm thử 10 câu TOEIC Part 5 (điền vào câu) miễn phí, không cần đăng nhập. Chấm điểm ngay và giải thích từng câu về từ loại, thì, giới từ, liên từ, mệnh đề quan hệ.",
  alternates: { canonical: "/thi-thu-mien-phi" },
};

const FAQS = [
  { q: "Bài kiểm tra này có cần đăng nhập không?", a: "Không. Bạn làm và xem kết quả ngay, không cần tài khoản hay email." },
  { q: "Bài kiểm tra có tính điểm TOEIC không?", a: "Không. Đây là 10 câu luyện tập theo dạng Part 5 để bạn biết mình mạnh yếu dạng ngữ pháp nào, không quy đổi sang điểm TOEIC." },
  { q: "Làm xong thì nên làm gì tiếp theo?", a: "Xem lại các câu sai theo từng dạng, đọc bài ngữ pháp Part 5, rồi luyện đề đầy đủ 7 Part trên TOEIC Mastery để có thống kê điểm yếu chi tiết." },
];

export default function FreeQuizPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Thi thử miễn phí" }]} />
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight text-balance md:text-4xl">Thi thử TOEIC Part 5 miễn phí: 10 câu ngữ pháp</h1>
        <p className="mt-4 max-w-[65ch] leading-relaxed text-muted-foreground">
          Part 5 gồm 30 câu điền vào chỗ trống, là phần nhanh nhất để lấy điểm nếu bạn nắm chắc dạng câu. Làm thử 10 câu dưới đây (khoảng 5 phút), nộp bài để xem điểm
          và lời giải thích từng câu. Muốn hiểu các dạng câu, đọc{" "}
          <Link href="/huong-dan/ngu-phap-part-5-toeic" className="font-medium text-primary underline-offset-4 hover:underline">
            8 dạng ngữ pháp Part 5 hay gặp
          </Link>
          .
        </p>
      </header>

      <div className="mt-8">
        <FreeQuiz />
      </div>

      <Faq items={FAQS} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Thi thử TOEIC Part 5 miễn phí",
          url: absoluteUrl("/thi-thu-mien-phi"),
          inLanguage: "vi",
          description: `Bài kiểm tra ${FREE_QUIZ.length} câu TOEIC Part 5 miễn phí, có đáp án giải thích.`,
          isPartOf: { "@type": "WebSite", name: "TOEIC Mastery", url: absoluteUrl("/") },
        }}
      />
    </>
  );
}
