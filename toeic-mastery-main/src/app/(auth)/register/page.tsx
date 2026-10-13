import type { Metadata } from "next";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = {
  title: "Đăng ký",
  description: "Tạo tài khoản TOEIC Mastery miễn phí: luyện đề TOEIC sát thực tế, học từ vựng theo lộ trình và AI Mentor gợi ý cách học.",
  alternates: { canonical: "/register" },
};

export default function RegisterPage() {
  return <RegisterForm />;
}
