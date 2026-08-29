import { Plus } from "lucide-react";
import { ADMIN, NAV_TABS } from "../../lib/constants";
import { useDashboardStore } from "../../store/useDashboardStore";
import NeonButton from "../ui/NeonButton";

export default function Header() {
  const activeTab = useDashboardStore((s) => s.activeTab);
  const current = NAV_TABS.find((t) => t.id === activeTab);

  return (
    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-cyan-neon">// {activeTab}</p>
        <h1 className="text-2xl font-bold text-white md:text-3xl">{current?.label}</h1>
      </div>

      <div className="flex items-center gap-3">
        <NeonButton variant="cyan" icon={Plus} className="hidden sm:inline-flex">
          New Project / Bot
        </NeonButton>

        <div className="glass-panel flex items-center gap-3 rounded-full border-purple-neon/20 px-3 py-1.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-neon to-magenta-neon font-display text-sm font-bold text-void">
            {ADMIN.avatarInitial}
          </span>
          <div className="hidden text-left sm:block">
            <p className="text-xs font-semibold text-white">{ADMIN.name}</p>
            <p className="text-[10px] text-slate-500">{ADMIN.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
