import { useState } from "react";
import { CalendarClock, KeyRound, Eye, EyeOff } from "lucide-react";
import GlassPanel from "../ui/GlassPanel";
import { toPersianDigits, formatToman } from "../../lib/format";

function daysUntil(dateStr) {
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

const TYPE_LABEL = {
  "telegram-bot": "ربات تلگرام",
  website: "وب‌سایت",
  "fullstack-app": "اپلیکیشن فول‌استک",
  "ai-integration": "یکپارچه‌سازی هوش مصنوعی",
};

export default function KanbanProjectCard({ project, onDragStart }) {
  const [showCreds, setShowCreds] = useState(false);
  const remaining = daysUntil(project.deadline);
  const isUrgent = remaining <= 3 && project.status !== "delivered";

  return (
    <GlassPanel
      as="div"
      draggable
      onDragStart={(e) => onDragStart(e, project.id)}
      glow={isUrgent ? "magenta" : "none"}
      className="cursor-grab space-y-3 p-4 active:cursor-grabbing"
    >
      <div>
        <p className="font-semibold text-white">{project.client_name}</p>
        <p className="text-xs text-slate-500">{TYPE_LABEL[project.type] ?? project.type}</p>
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-cyan-neon">{formatToman(project.budget)}</span>
        <span className={isUrgent ? "flex items-center gap-1 text-magenta-neon" : "flex items-center gap-1 text-slate-500"}>
          <CalendarClock size={12} />
          {remaining >= 0 ? `${toPersianDigits(remaining)} روز مانده` : "گذشته از ددلاین"}
        </span>
      </div>

      <div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-l from-cyan-neon to-purple-neon"
            style={{ width: `${project.progress_percentage}%` }}
          />
        </div>
        <p className="mt-1 text-left text-[10px] text-slate-500">{toPersianDigits(project.progress_percentage)}٪</p>
      </div>

      {project.credentials_json?.length > 0 && (
        <div className="rounded-lg border border-slate-800 p-2">
          <button
            onClick={() => setShowCreds((v) => !v)}
            className="flex w-full items-center justify-between text-[11px] text-slate-400 hover:text-cyan-neon"
          >
            <span className="flex items-center gap-1.5">
              <KeyRound size={12} /> اطلاعات ورود ({toPersianDigits(project.credentials_json.length)})
            </span>
            {showCreds ? <EyeOff size={13} /> : <Eye size={13} />}
          </button>
          {showCreds && (
            <ul className="mt-2 space-y-1 font-mono text-[11px] text-slate-400">
              {project.credentials_json.map((cred) => (
                <li key={cred.label} className="flex justify-between">
                  <span>{cred.label}</span>
                  <span dir="ltr">{cred.username} · {cred.secret_encrypted}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </GlassPanel>
  );
}
