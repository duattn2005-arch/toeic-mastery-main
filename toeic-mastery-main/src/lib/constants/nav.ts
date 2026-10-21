import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  ClipboardList,
  Headphones,
  BookOpen,
  SpellCheck2,
  Layers,
  Lightbulb,
  Bookmark,
  History,
  BarChart3,
  Bot,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Other paths that light this item up (e.g. the dictionary, reached from "Đã lưu"). */
  also?: string[];
}

export function isNavActive(pathname: string, item: Pick<NavItem, "href" | "also">) {
  if (item.href === "/dashboard") return pathname === item.href;
  return [item.href, ...(item.also ?? [])].some((href) => pathname === href || pathname.startsWith(`${href}/`));
}

export const MAIN_NAV: NavItem[] = [
  { label: "Tổng quan", href: "/dashboard", icon: LayoutDashboard },
  { label: "AI Mentor", href: "/mentor", icon: Bot },
  { label: "Luyện đề", href: "/practice", icon: ClipboardList },
  { label: "Listening", href: "/listening", icon: Headphones },
  { label: "Reading", href: "/reading", icon: BookOpen },
  { label: "Grammar", href: "/grammar", icon: SpellCheck2 },
  { label: "Từ vựng", href: "/vocabulary", icon: Layers },
  { label: "TOEIC Tips", href: "/tips", icon: Lightbulb },
  { label: "Đã lưu", href: "/bookmarks", icon: Bookmark, also: ["/dictionary"] },
  { label: "Lịch sử", href: "/history", icon: History },
  { label: "Thống kê", href: "/analytics", icon: BarChart3 },
];

export const MOBILE_NAV: NavItem[] = [
  { label: "Tổng quan", href: "/dashboard", icon: LayoutDashboard },
  { label: "AI Mentor", href: "/mentor", icon: Bot },
  { label: "Luyện đề", href: "/practice", icon: ClipboardList },
  { label: "Từ vựng", href: "/vocabulary", icon: Layers },
  { label: "Thống kê", href: "/analytics", icon: BarChart3 },
];
