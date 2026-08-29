import { useEffect, useState } from "react";
import { ShieldCheck, ShieldAlert, LogIn } from "lucide-react";
import GlassPanel from "../ui/GlassPanel";
import SectionHeading from "../ui/SectionHeading";

const LOG_TEMPLATES = [
  { text: "ورود ادمین از IP 91.108.x.x (برلین) — تأیید دومرحله‌ای موفق", tone: "emerald" },
  { text: "تلاش ورود ناموفق مسدود شد — IP 45.13.x.x", tone: "magenta" },
  { text: "کلید API برای مدیر کانال ویژه چرخش کرد", tone: "cyan" },
  { text: "امضای وبهوک برای ربات معامله‌گر دکس تأیید شد", tone: "emerald" },
  { text: "محدودیت نرخ برای دستیار هوشمند نورال فعال شد", tone: "purple" },
];

const ACCESS_EVENTS = [
  { id: 1, actor: "الکس ریوارا", action: "ورود موفق", location: "برلین، آلمان", time: "۳ دقیقه پیش" },
  { id: 2, actor: "توکن API #۴", action: "چرخش کلید", location: "سیستم", time: "۱ ساعت پیش" },
  { id: 3, actor: "ناشناس", action: "ورود مسدودشده", location: "جاکارتا، اندونزی", time: "۲ ساعت پیش" },
];

const TONE_COLOR = { emerald: "text-emerald-neon", magenta: "text-magenta-neon", cyan: "text-cyan-neon", purple: "text-purple-neon" };

export default function SecurityPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const template = LOG_TEMPLATES[Math.floor(Math.random() * LOG_TEMPLATES.length)];
      const timestamp = new Date().toLocaleTimeString("fa-IR");
      setLogs((prev) => [...prev.slice(-30), { ...template, time: timestamp }]);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <SectionHeading title="امنیت و لاگ‌ها" description="جریان زنده‌ی لاگ سیستم و رویدادهای دسترسی اخیر." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <GlassPanel glow="emerald" className="p-5 lg:col-span-2">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-white">
            <ShieldCheck size={15} className="text-emerald-neon" /> لاگ زنده‌ی سیستم
          </h3>
          <div dir="ltr" className="h-72 overflow-y-auto rounded-xl border border-slate-800 bg-black/60 p-4 text-left font-mono text-xs">
            {logs.length === 0 && <p className="text-slate-600">در انتظار رویداد…</p>}
            {logs.map((log, i) => (
              <p key={i} className={TONE_COLOR[log.tone]}>
                [{log.time}] {log.text}
              </p>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel glow="magenta" className="p-5">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-white">
            <ShieldAlert size={15} className="text-magenta-neon" /> رویدادهای دسترسی
          </h3>
          <ul className="space-y-3">
            {ACCESS_EVENTS.map((event) => (
              <li key={event.id} className="flex items-start gap-2.5 rounded-lg border border-slate-800 p-3">
                <LogIn size={14} className="mt-0.5 text-slate-500" />
                <div>
                  <p className="text-sm text-slate-200">
                    <span className="font-semibold text-white">{event.actor}</span> — {event.action}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {event.location} · {event.time}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </GlassPanel>
      </div>
    </div>
  );
}
