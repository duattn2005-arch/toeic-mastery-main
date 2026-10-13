import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập TOEIC Mastery để tiếp tục luyện đề, học từ vựng và theo dõi tiến độ điểm TOEIC của bạn.",
  alternates: { canonical: "/login" },
};

export default function LoginPage() {
  return <LoginForm />;
}
