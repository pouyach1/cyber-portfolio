import { LayoutDashboard, Bot, Kanban, Wallet, Terminal, ShieldAlert } from "lucide-react";

export const ADMIN = {
  name: "Alex Rivera",
  role: "Web Designer & Bot Architect",
  avatarInitial: "A",
};

export const NAV_TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "bots", label: "Bot Ecosystem", icon: Bot },
  { id: "kanban", label: "Project Kanban", icon: Kanban },
  { id: "financial", label: "Financials & Invoicing", icon: Wallet },
  { id: "devtools", label: "DevTools & Snippets", icon: Terminal },
  { id: "security", label: "Security & Logs", icon: ShieldAlert },
];
