import { useMemo, useState } from "react";
import { RotateCw, Pause, Play, FileText, Radio, Search, TriangleAlert } from "lucide-react";
import GlassPanel from "../ui/GlassPanel";
import StatusPill from "../ui/StatusPill";
import { useDashboardStore } from "../../store/useDashboardStore";

const STATUS_FILTERS = ["All", "running", "paused", "error"];

export default function BotStatusTable() {
  const bots = useDashboardStore((s) => s.bots);
  const restartBot = useDashboardStore((s) => s.restartBot);
  const togglePauseBot = useDashboardStore((s) => s.togglePauseBot);
  const emergencyStopBot = useDashboardStore((s) => s.emergencyStopBot);
  const openBroadcast = useDashboardStore((s) => s.openBroadcast);
  const openLogs = useDashboardStore((s) => s.openLogs);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const visibleBots = useMemo(() => {
    return bots.filter((bot) => {
      const matchesSearch = bot.name.toLowerCase().includes(search.trim().toLowerCase());
      const matchesStatus = statusFilter === "All" || bot.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [bots, search, statusFilter]);

  return (
    <GlassPanel glow="cyan" className="p-5">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide transition-colors ${
                statusFilter === status
                  ? "border-cyan-neon bg-cyan-neon/10 text-cyan-neon"
                  : "border-slate-700 text-slate-400 hover:border-slate-500"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search bots..."
            aria-label="Search bots"
            className="w-full rounded-full border border-slate-700 bg-void/60 py-2 pl-9 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-cyan-neon focus:outline-none sm:w-56"
          />
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[720px] text-left">
          <thead>
            <tr className="border-b border-slate-800 font-mono text-[11px] uppercase tracking-wide text-slate-500">
              <th className="pb-3 pr-4">Bot</th>
              <th className="pb-3 pr-4">Token</th>
              <th className="pb-3 pr-4">Status</th>
              <th className="pb-3 pr-4">Users</th>
              <th className="pb-3 pr-4">Uptime</th>
              <th className="pb-3 pr-4">Latency</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleBots.map((bot) => (
              <tr key={bot.id} className="border-b border-slate-800/60 text-sm">
                <td className="py-3 pr-4 font-semibold text-white">{bot.name}</td>
                <td className="py-3 pr-4 font-mono text-xs text-slate-500">{bot.tokenPreview}</td>
                <td className="py-3 pr-4">
                  <StatusPill status={bot.status} />
                </td>
                <td className="py-3 pr-4 font-mono text-slate-300">{bot.activeUsers.toLocaleString()}</td>
                <td className="py-3 pr-4 font-mono text-slate-300">{bot.uptime}%</td>
                <td className={`py-3 pr-4 font-mono ${bot.latency > 300 ? "text-magenta-neon" : "text-cyan-neon"}`}>
                  {bot.latency}ms
                </td>
                <td className="py-3">
                  <BotActions
                    bot={bot}
                    onRestart={() => restartBot(bot.id)}
                    onTogglePause={() => togglePauseBot(bot.id)}
                    onStop={() => emergencyStopBot(bot.id)}
                    onBroadcast={() => openBroadcast(bot.id)}
                    onLogs={() => openLogs(bot.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {visibleBots.map((bot) => (
          <div key={bot.id} className="rounded-xl border border-slate-800 p-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-semibold text-white">{bot.name}</p>
              <StatusPill status={bot.status} />
            </div>
            <p className="font-mono text-xs text-slate-500">{bot.tokenPreview}</p>
            <div className="mt-2 grid grid-cols-3 gap-2 text-center font-mono text-xs">
              <div>
                <p className="text-slate-300">{bot.activeUsers.toLocaleString()}</p>
                <p className="text-slate-600">users</p>
              </div>
              <div>
                <p className="text-slate-300">{bot.uptime}%</p>
                <p className="text-slate-600">uptime</p>
              </div>
              <div>
                <p className={bot.latency > 300 ? "text-magenta-neon" : "text-cyan-neon"}>{bot.latency}ms</p>
                <p className="text-slate-600">latency</p>
              </div>
            </div>
            <div className="mt-3">
              <BotActions
                bot={bot}
                onRestart={() => restartBot(bot.id)}
                onTogglePause={() => togglePauseBot(bot.id)}
                onStop={() => emergencyStopBot(bot.id)}
                onBroadcast={() => openBroadcast(bot.id)}
                onLogs={() => openLogs(bot.id)}
              />
            </div>
          </div>
        ))}
      </div>

      {visibleBots.length === 0 && (
        <p className="py-8 text-center text-sm text-slate-500">No bots match your filters.</p>
      )}
    </GlassPanel>
  );
}

function BotActions({ bot, onRestart, onTogglePause, onStop, onBroadcast, onLogs }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <IconButton label="Restart Bot" onClick={onRestart} icon={RotateCw} />
      <IconButton
        label={bot.status === "paused" ? "Resume Bot" : "Pause Bot"}
        onClick={onTogglePause}
        icon={bot.status === "paused" ? Play : Pause}
      />
      <IconButton label="View Logs" onClick={onLogs} icon={FileText} />
      <IconButton label="Broadcast" onClick={onBroadcast} icon={Radio} />
      <IconButton label="Emergency Stop" onClick={onStop} icon={TriangleAlert} danger />
    </div>
  );
}

function IconButton({ label, onClick, icon: Icon, danger = false }) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`rounded-lg border p-1.5 transition-colors ${
        danger
          ? "border-magenta-neon/40 text-magenta-neon hover:bg-magenta-neon/10"
          : "border-slate-700 text-slate-400 hover:border-cyan-neon/50 hover:text-cyan-neon"
      }`}
    >
      <Icon size={14} />
    </button>
  );
}
