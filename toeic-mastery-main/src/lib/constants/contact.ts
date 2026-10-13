import { Globe, type LucideIcon } from "lucide-react";

export interface ContactChannel {
  label: string;
  value: string;
  href: string;
  description: string;
  icon: LucideIcon;
}

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    label: "Facebook",
    value: "TOEIC Mastery",
    href: "https://www.facebook.com/profile.php?id=61594632153439",
    description: "Nhắn tin để được hỗ trợ tài khoản, thanh toán và góp ý nội dung.",
    icon: Globe,
  },
];
