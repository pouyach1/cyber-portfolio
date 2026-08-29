import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_TABS } from "../../lib/constants";
import { useDashboardStore } from "../../store/useDashboardStore";

function NavItems({ onNavigate }) {
  const activeTab = useDashboardStore((s) => s.activeTab);
  const setActiveTab = useDashboardStore((s) => s.setActiveTab);

  return (
    <nav className="flex flex-col gap-1">
      {NAV_TABS.map((tab) => {
        const Icon = tab.icon;
        const active = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              onNavigate?.();
            }}
            className={`flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-right text-sm font-medium transition-colors ${
              active
                ? "border border-cyan-neon/40 bg-cyan-neon/10 text-cyan-neon shadow-neon-cyan"
                : "border border-transparent text-slate-400 hover:bg-white/5 hover:text-slate-200"
            }`}
          >
            <Icon size={17} />
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <aside className="glass-panel sticky top-4 hidden h-[calc(100vh-2rem)] w-64 shrink-0 flex-col gap-6 rounded-2xl border-cyan-neon/15 p-5 md:flex">
        <Brand />
        <NavItems />
        <SystemStatus />
      </aside>

      <div className="glass-panel sticky top-0 z-40 mb-4 flex items-center justify-between rounded-none border-x-0 border-t-0 px-4 py-3 md:hidden">
        <Brand compact />
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="باز کردن منو"
          className="rounded-lg border border-slate-700 p-2 text-cyan-neon"
        >
          <Menu size={18} />
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-void/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="glass-panel relative z-10 flex h-full w-72 flex-col gap-6 rounded-none border-r-0 p-5">
            <div className="flex items-center justify-between">
              <Brand compact />
              <button onClick={() => setMobileOpen(false)} aria-label="بستن منو" className="text-slate-400">
                <X size={20} />
              </button>
            </div>
            <NavItems onNavigate={() => setMobileOpen(false)} />
            <SystemStatus />
          </div>
        </div>
      )}
    </>
  );
}

function Brand({ compact = false }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-neon to-purple-neon font-display text-base font-black text-void shadow-neon-cyan">
        C
      </span>
      {!compact && (
        <div>
          <p className="font-display text-sm font-bold text-white">سایبردو</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">admin console</p>
        </div>
      )}
    </div>
  );
}

function SystemStatus() {
  return (
    <div className="mt-auto rounded-xl border border-emerald-neon/20 bg-emerald-neon/5 p-3">
      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-emerald-neon">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-neon opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-neon" />
        </span>
        وضعیت سیستم
      </div>
      <p className="mt-1 text-[11px] text-slate-400">همه‌ی سیستم‌ها فعال هستند</p>
    </div>
  );
}
