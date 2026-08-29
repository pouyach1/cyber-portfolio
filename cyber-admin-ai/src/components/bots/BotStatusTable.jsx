import { useMemo, useState } from "react";
import { RotateCw, Pause, Play, FileText, Radio, Search, TriangleAlert } from "lucide-react";
import GlassPanel from "../ui/GlassPanel";
import StatusPill from "../ui/StatusPill";
import { useBots } from "../../hooks/useBots";
import { useDashboardStore } from "../../store/useDashboardStore";
import { toPersianDigits } from "../../lib/format";

const STATUS_FILTERS = [
  { id: "all", label: "همه" },
  { id: "running", label: "فعال" },
  { id: "paused", label: "متوقف" },
  { id: "error", label: "خطا" },
];

export default function BotStatusTable() {
  const { bots, restartBot, togglePauseBot, emergencyStopBot } = useBots();
  const openBroadcast = useDashboardStore((s) => s.openBroadcast);
  const openLogs = useDashboardStore((s) => s.openLogs);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const visibleBots = useMemo(() => {
    return bots.filter((bot) => {
      const matchesSearch = bot.name.includes(search.trim());
      const matchesStatus = statusFilter === "all" || bot.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [bots, search, statusFilter]);

  return (
    <GlassPanel glow="cyan" className="p-5">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((status) => (
            <button
              key={status.id}
              onClick={() => setStatusFilter(status.id)}
              className={`rounded-full border px-3 py-1.5 text-[11px] transition-colors ${
                statusFilter === status.id
                  ? "border-cyan-neon bg-cyan-neon/10 text-cyan-neon"
                  : "border-slate-700 text-slate-400 hover:border-slate-500"
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجوی ربات..."
            aria-label="جستجوی ربات"
            className="w-full rounded-full border border-slate-700 bg-void/60 py-2 pl-4 pr-9 text-sm text-white placeholder:text-slate-500 focus:border-cyan-neon focus:outline-none sm:w-56"
          />
        </div>
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[720px] text-right">
          <thead>
            <tr className="border-b border-slate-800 text-[11px] text-slate-500">
              <th className="pb-3 pl-4">ربات</th>
              <th className="pb-3 pl-4">توکن</th>
              <th className="pb-3 pl-4">وضعیت</th>
              <th className="pb-3 pl-4">کاربران</th>
              <th className="pb-3 pl-4">آپ‌تایم</th>
              <th className="pb-3 pl-4">تأخیر</th>
              <th className="pb-3">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {visibleBots.map((bot) => (
              <tr key={bot.id} className="border-b border-slate-800/60 text-sm">
                <td className="py-3 pl-4 font-semibold text-white">{bot.name}</td>
                <td className="py-3 pl-4 font-mono text-xs text-slate-500" dir="ltr">
                  {bot.api_token_masked}
                </td>
                <td className="py-3 pl-4">
                  <StatusPill status={bot.status} />
                </td>
                <td className="py-3 pl-4 text-slate-300">{toPersianDigits(bot.active_users.toLocaleString())}</td>
                <td className="py-3 pl-4 text-slate-300">{toPersianDigits(bot.uptime_percent)}٪</td>
                <td className={`py-3 pl-4 ${bot.latency_ms > 300 ? "text-magenta-neon" : "text-cyan-neon"}`}>
                  {toPersianDigits(bot.latency_ms)}ms
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

      <div className="space-y-3 md:hidden">
        {visibleBots.map((bot) => (
          <div key={bot.id} className="rounded-xl border border-slate-800 p-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-semibold text-white">{bot.name}</p>
              <StatusPill status={bot.status} />
            </div>
            <p className="font-mono text-xs text-slate-500" dir="ltr">
              {bot.api_token_masked}
            </p>
            <div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <p className="text-slate-300">{toPersianDigits(bot.active_users.toLocaleString())}</p>
                <p className="text-slate-600">کاربر</p>
              </div>
              <div>
                <p className="text-slate-300">{toPersianDigits(bot.uptime_percent)}٪</p>
                <p className="text-slate-600">آپ‌تایم</p>
              </div>
              <div>
                <p className={bot.latency_ms > 300 ? "text-magenta-neon" : "text-cyan-neon"}>
                  {toPersianDigits(bot.latency_ms)}ms
                </p>
                <p className="text-slate-600">تأخیر</p>
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
        <p className="py-8 text-center text-sm text-slate-500">رباتی با این فیلتر پیدا نشد.</p>
      )}
    </GlassPanel>
  );
}

function BotActions({ bot, onRestart, onTogglePause, onStop, onBroadcast, onLogs }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <IconButton label="راه‌اندازی مجدد" onClick={onRestart} icon={RotateCw} />
      <IconButton
        label={bot.status === "paused" ? "ازسرگیری" : "توقف موقت"}
        onClick={onTogglePause}
        icon={bot.status === "paused" ? Play : Pause}
      />
      <IconButton label="مشاهده لاگ‌ها" onClick={onLogs} icon={FileText} />
      <IconButton label="پیام همگانی" onClick={onBroadcast} icon={Radio} />
      <IconButton label="توقف اضطراری" onClick={onStop} icon={TriangleAlert} danger />
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
