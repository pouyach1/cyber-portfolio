import { useState } from "react";
import SectionHeading from "../ui/SectionHeading";
import KanbanProjectCard from "./KanbanProjectCard";
import { KANBAN_COLUMNS } from "../../data/mockProjects";
import { useProjects } from "../../hooks/useProjects";
import { toPersianDigits } from "../../lib/format";

export default function KanbanBoard() {
  const { projects, moveProject } = useProjects();
  const [dragOverColumn, setDragOverColumn] = useState(null);

  function handleDragStart(e, projectId) {
    e.dataTransfer.setData("text/plain", projectId);
  }

  function handleDrop(e, columnId) {
    e.preventDefault();
    const projectId = e.dataTransfer.getData("text/plain");
    moveProject(projectId, columnId);
    setDragOverColumn(null);
  }

  return (
    <div className="space-y-6">
      <SectionHeading
        title="کانبان بورد پروژه‌های وب"
        description="کارت‌ها را بین ستون‌ها جابه‌جا کنید. کارت‌هایی که کمتر از ۳ روز تا ددلاین دارند صورتی می‌شوند."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {KANBAN_COLUMNS.map((column) => {
          const columnProjects = projects.filter((p) => p.status === column.id);
          return (
            <div
              key={column.id}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOverColumn(column.id);
              }}
              onDragLeave={() => setDragOverColumn(null)}
              onDrop={(e) => handleDrop(e, column.id)}
              className={`flex flex-col gap-3 rounded-2xl border p-3 transition-colors ${
                dragOverColumn === column.id ? "border-cyan-neon/60 bg-cyan-neon/5" : "border-slate-800 bg-void/30"
              }`}
            >
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs font-bold text-slate-300">{column.label}</h3>
                <span className="text-[11px] text-slate-500">{toPersianDigits(columnProjects.length)}</span>
              </div>

              <div className="flex flex-col gap-3">
                {columnProjects.map((project) => (
                  <KanbanProjectCard key={project.id} project={project} onDragStart={handleDragStart} />
                ))}
                {columnProjects.length === 0 && (
                  <p className="rounded-xl border border-dashed border-slate-800 p-4 text-center text-xs text-slate-600">
                    اینجا رها کنید
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
