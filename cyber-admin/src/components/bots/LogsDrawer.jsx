import { useEffect, useState } from "react";
import ModalShell from "../modals/ModalShell";
import { useDashboardStore } from "../../store/useDashboardStore";

const MOCK_LOG_TEMPLATES = [
  "INFO  webhook received update_id=8841{n}",
  "INFO  dispatched handler: /menu",
  "DEBUG cache hit for user_session:{n}",
  "INFO  response sent in 84ms",
  "WARN  rate limit at 82% for chat_id {n}",
];

export default function LogsDrawer() {
  const logsBotId = useDashboardStore((s) => s.logsBotId);
  const closeLogs = useDashboardStore((s) => s.closeLogs);
  const bots = useDashboardStore((s) => s.bots);
  const bot = bots.find((b) => b.id === logsBotId);

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (!logsBotId) {
      setLogs([]);
      return undefined;
    }
    const interval = setInterval(() => {
      const template = MOCK_LOG_TEMPLATES[Math.floor(Math.random() * MOCK_LOG_TEMPLATES.length)];
      const line = template.replace("{n}", Math.floor(Math.random() * 9000 + 1000));
      const timestamp = new Date().toLocaleTimeString();
      setLogs((prev) => [...prev.slice(-30), `[${timestamp}] ${line}`]);
    }, 900);
    return () => clearInterval(interval);
  }, [logsBotId]);

  return (
    <ModalShell open={!!logsBotId} onClose={closeLogs} title={`Live Logs — ${bot?.name ?? ""}`} wide>
      <div className="h-80 overflow-y-auto rounded-xl border border-slate-800 bg-black/60 p-4 font-mono text-xs">
        {logs.length === 0 && <p className="text-slate-600">Waiting for log stream…</p>}
        {logs.map((line, i) => (
          <p
            key={i}
            className={line.includes("WARN") ? "text-amber-300" : "text-emerald-neon/90"}
          >
            {line}
          </p>
        ))}
      </div>
    </ModalShell>
  );
}
