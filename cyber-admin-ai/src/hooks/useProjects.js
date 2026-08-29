import { useSupabaseTable } from "./useSupabaseTable";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";
import { mockProjects } from "../data/mockProjects";

export function useProjects() {
  const { rows: projects, setRows: setProjects, loading, isLive } = useSupabaseTable(
    "projects",
    mockProjects
  );

  async function moveProject(id, status) {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
    if (isLive) {
      await supabase.from("projects").update({ status }).eq("id", id);
    }
  }

  return { projects, loading, isLive, moveProject };
}
