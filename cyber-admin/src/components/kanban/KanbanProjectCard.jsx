import { CalendarClock } from "lucide-react";
import GlassPanel from "../ui/GlassPanel";

function daysUntil(dateStr) {
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function KanbanProjectCard({ project, onDragStart }) {
  const remaining = daysUntil(project.dueDate);
  const isUrgent = remaining <= 3 && project.column !== "delivered";

  return (
    <GlassPanel
      as="div"
      draggable
      onDragStart={(e) => onDragStart(e, project.id)}
      glow={isUrgent ? "magenta" : "none"}
      className="cursor-grab space-y-3 p-4 active:cursor-grabbing"
    >
      <div>
        <p className="font-semibold text-white">{project.client}</p>
        <p className="font-mono text-xs text-slate-500">{project.domain}</p>
      </div>

      <div className="flex items-center justify-between font-mono text-xs">
        <span className="text-cyan-neon">${project.budget.toLocaleString()}</span>
        <span className={isUrgent ? "flex items-center gap-1 text-magenta-neon" : "flex items-center gap-1 text-slate-500"}>
          <CalendarClock size={12} />
          {remaining >= 0 ? `${remaining}d left` : "overdue"}
        </span>
      </div>

      <div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-neon to-purple-neon"
            style={{ width: `${project.progress}%` }}
          />
        </div>
        <p className="mt-1 text-right font-mono text-[10px] text-slate-500">{project.progress}%</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span key={t} className="rounded-full border border-slate-700 px-2 py-0.5 text-[10px] text-slate-400">
            {t}
          </span>
        ))}
      </div>
    </GlassPanel>
  );
}
