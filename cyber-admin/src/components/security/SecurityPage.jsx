import { useEffect, useState } from "react";
import { ShieldCheck, ShieldAlert, LogIn } from "lucide-react";
import GlassPanel from "../ui/GlassPanel";
import SectionHeading from "../ui/SectionHeading";

const LOG_TEMPLATES = [
  { text: "Admin login from 91.108.x.x (Berlin) — 2FA verified", tone: "emerald" },
  { text: "Failed login attempt blocked — IP 45.13.x.x", tone: "magenta" },
  { text: "API key rotated for VIP Channel Manager", tone: "cyan" },
  { text: "Webhook signature verified for DEX Trading Bot", tone: "emerald" },
  { text: "Rate limit triggered on Neural Assistant Bot", tone: "purple" },
];

const ACCESS_EVENTS = [
  { id: 1, actor: "Alex Rivera", action: "Logged in", location: "Berlin, DE", time: "3m ago" },
  { id: 2, actor: "API Token #4", action: "Rotated key", location: "System", time: "1h ago" },
  { id: 3, actor: "Unknown", action: "Blocked login attempt", location: "Jakarta, ID", time: "2h ago" },
];

const TONE_COLOR = {
  emerald: "text-emerald-neon",
  magenta: "text-magenta-neon",
  cyan: "text-cyan-neon",
  purple: "text-purple-neon",
};

export default function SecurityPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const template = LOG_TEMPLATES[Math.floor(Math.random() * LOG_TEMPLATES.length)];
      const timestamp = new Date().toLocaleTimeString();
      setLogs((prev) => [...prev.slice(-30), { ...template, time: timestamp }]);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Security & Logs"
        description="Live system log stream and recent access events across your admin console."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <GlassPanel glow="emerald" className="lg:col-span-2 p-5">
          <h3 className="mb-3 flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-widest text-white">
            <ShieldCheck size={15} className="text-emerald-neon" /> Live System Log
          </h3>
          <div className="h-72 overflow-y-auto rounded-xl border border-slate-800 bg-black/60 p-4 font-mono text-xs">
            {logs.length === 0 && <p className="text-slate-600">Waiting for events…</p>}
            {logs.map((log, i) => (
              <p key={i} className={TONE_COLOR[log.tone]}>
                [{log.time}] {log.text}
              </p>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel glow="magenta" className="p-5">
          <h3 className="mb-3 flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-widest text-white">
            <ShieldAlert size={15} className="text-magenta-neon" /> Access Events
          </h3>
          <ul className="space-y-3">
            {ACCESS_EVENTS.map((event) => (
              <li key={event.id} className="flex items-start gap-2.5 rounded-lg border border-slate-800 p-3">
                <LogIn size={14} className="mt-0.5 text-slate-500" />
                <div>
                  <p className="text-sm text-slate-200">
                    <span className="font-semibold text-white">{event.actor}</span> — {event.action}
                  </p>
                  <p className="font-mono text-[11px] text-slate-500">
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
