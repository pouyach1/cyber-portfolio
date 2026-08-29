import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import OverviewPage from "./components/overview/OverviewPage";
import BotEcosystemPage from "./components/bots/BotEcosystemPage";
import KanbanBoard from "./components/kanban/KanbanBoard";
import FinancialPage from "./components/financial/FinancialPage";
import DevToolsPage from "./components/devtools/DevToolsPage";
import SecurityPage from "./components/security/SecurityPage";
import { useDashboardStore } from "./store/useDashboardStore";

const PAGES = {
  overview: OverviewPage,
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
    <div className="min-h-screen bg-void">
      <div className="fixed inset-0 -z-10 bg-grid-lines bg-[length:64px_64px] [mask-image:radial-gradient(ellipse_90%_60%_at_50%_0%,black,transparent)]" />

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
