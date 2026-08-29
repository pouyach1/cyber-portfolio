import { useState } from "react";
import { Plus } from "lucide-react";
import GlassPanel from "../ui/GlassPanel";

const QUADRANTS = [
  { id: "urgent-important", label: "فوری و مهم", hint: "همین الان انجام بده", glow: "magenta" },
  { id: "not-urgent-important", label: "مهم، غیرفوری", hint: "برنامه‌ریزی کن", glow: "cyan" },
  { id: "urgent-not-important", label: "فوری، غیرمهم", hint: "واگذار کن", glow: "purple" },
  { id: "not-urgent-not-important", label: "غیرفوری و غیرمهم", hint: "بعداً یا حذف", glow: "none" },
];

export default function EisenhowerMatrix({ tasks, onAddTask, onToggleTask }) {
  const [draft, setDraft] = useState("");
  const [quadrant, setQuadrant] = useState(QUADRANTS[0].id);

  function handleAdd(e) {
    e.preventDefault();
    if (!draft.trim()) return;
    onAddTask({
      id: Date.now().toString(),
      title: draft.trim(),
      priority: quadrant,
      due_at: new Date().toISOString(),
      done: false,
    });
    setDraft("");
  }

  return (
    <GlassPanel glow="purple" className="p-5">
      <h3 className="mb-4 text-sm font-bold text-white">ماتریس اولویت‌بندی (آیزنهاور)</h3>

      <form onSubmit={handleAdd} className="mb-4 flex flex-col gap-2 sm:flex-row">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="کار جدید..."
          className="flex-1 rounded-lg border border-slate-700 bg-void/60 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-cyan-neon focus:outline-none"
        />
        <select
          value={quadrant}
          onChange={(e) => setQuadrant(e.target.value)}
          className="rounded-lg border border-slate-700 bg-void/60 px-2 py-2 text-xs text-white focus:border-cyan-neon focus:outline-none"
        >
          {QUADRANTS.map((q) => (
            <option key={q.id} value={q.id}>
              {q.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="flex items-center justify-center gap-1 rounded-lg border border-cyan-neon/40 px-3 py-2 text-xs text-cyan-neon hover:bg-cyan-neon/10"
        >
          <Plus size={14} /> افزودن
        </button>
      </form>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {QUADRANTS.map((q) => (
          <div key={q.id} className="rounded-xl border border-slate-800 p-3">
            <p className="text-xs font-bold text-white">{q.label}</p>
            <p className="mb-2 text-[11px] text-slate-500">{q.hint}</p>
            <ul className="space-y-1.5">
              {tasks.filter((t) => t.priority === q.id).map((task) => (
                <li key={task.id} className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => onToggleTask(task.id)}
                    className="accent-cyan-500"
                  />
                  <span className={task.done ? "text-slate-600 line-through" : "text-slate-300"}>
                    {task.title}
                  </span>
                </li>
              ))}
              {tasks.filter((t) => t.priority === q.id).length === 0 && (
                <li className="text-[11px] text-slate-700">خالی</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}
