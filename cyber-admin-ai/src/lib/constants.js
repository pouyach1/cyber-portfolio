import {
  LayoutDashboard,
  Bot,
  Kanban,
  Wallet,
  Terminal,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

export const ADMIN = {
  name: "الکس ریوارا",
  role: "طراح وب و معمار ربات تلگرام",
  avatarInitial: "ا",
};

export const NAV_TABS = [
  { id: "overview", label: "داشبورد اصلی", icon: LayoutDashboard },
  { id: "companion", label: "دستیار هوشمند", icon: Sparkles },
  { id: "bots", label: "اکوسیستم ربات‌ها", icon: Bot },
  { id: "kanban", label: "کانبان پروژه‌ها", icon: Kanban },
  { id: "financial", label: "مالی و فاکتور", icon: Wallet },
  { id: "devtools", label: "جعبه‌ابزار توسعه", icon: Terminal },
  { id: "security", label: "امنیت و لاگ‌ها", icon: ShieldAlert },
];
