import { useState } from "react";
import SectionHeading from "../ui/SectionHeading";
import KanbanProjectCard from "./KanbanProjectCard";
import { KANBAN_COLUMNS } from "../../data/projects";
import { useDashboardStore } from "../../store/useDashboardStore";

export default function KanbanBoard() {
  const projects = useDashboardStore((s) => s.projects);
  const moveProject = useDashboardStore((s) => s.moveProject);
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
        title="Web Project Kanban Board"
        description="Drag project cards between stages. Cards glow pink when the deadline is within 3 days."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {KANBAN_COLUMNS.map((column) => {
          const columnProjects = projects.filter((p) => p.column === column.id);
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
                dragOverColumn === column.id
                  ? "border-cyan-neon/60 bg-cyan-neon/5"
                  : "border-slate-800 bg-void/30"
              }`}
            >
              <div className="flex items-center justify-between px-1">
                <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-slate-300">
                  {column.label}
                </h3>
                <span className="font-mono text-[11px] text-slate-500">{columnProjects.length}</span>
              </div>

              <div className="flex flex-col gap-3">
                {columnProjects.map((project) => (
                  <KanbanProjectCard key={project.id} project={project} onDragStart={handleDragStart} />
                ))}
                {columnProjects.length === 0 && (
                  <p className="rounded-xl border border-dashed border-slate-800 p-4 text-center text-xs text-slate-600">
                    Drop here
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
