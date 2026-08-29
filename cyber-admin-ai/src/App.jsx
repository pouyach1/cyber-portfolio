import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import OverviewPage from "./components/overview/OverviewPage";
import AiCompanionPage from "./components/ai-companion/AiCompanionPage";
import BotEcosystemPage from "./components/bots/BotEcosystemPage";
import KanbanBoard from "./components/kanban/KanbanBoard";
import FinancialPage from "./components/financial/FinancialPage";
import DevToolsPage from "./components/devtools/DevToolsPage";
import SecurityPage from "./components/security/SecurityPage";
import { useDashboardStore } from "./store/useDashboardStore";
import { isSupabaseConfigured } from "./lib/supabaseClient";

const PAGES = {
  overview: OverviewPage,
  companion: AiCompanionPage,
  bots: BotEcosystemPage,
  kanban: KanbanBoard,
  financial: FinancialPage,
  devtools: DevToolsPage,
  security: SecurityPage,
};

export default function App() {
  const activeTab = useDashboardStore((s) => s.activeTab);
  const ActivePage = PAGES[activeTab] ?? OverviewPage;

  return (
    <div dir="rtl" className="min-h-screen bg-void">
      <div className="fixed inset-0 -z-10 bg-grid-lines bg-[length:64px_64px] [mask-image:radial-gradient(ellipse_90%_60%_at_50%_0%,black,transparent)]" />

      {!isSupabaseConfigured && (
        <div className="border-b border-amber-400/30 bg-amber-400/10 px-4 py-2 text-center text-xs text-amber-300">
          حالت آفلاین — Supabase پیکربندی نشده، از داده‌ی نمایشی محلی استفاده می‌شه. برای اتصال به دیتابیس مشترک، فایل{" "}
          <code dir="ltr" className="font-mono">.env.local</code> را بر اساس{" "}
          <code dir="ltr" className="font-mono">.env.example</code> تنظیم کنید.
        </div>
      )}

      <div className="mx-auto flex max-w-[1600px] gap-6 p-4 md:p-6">
        <Sidebar />
        <main className="min-w-0 flex-1">
          <Header />
          <ActivePage />
        </main>
      </div>
    </div>
  );
}
