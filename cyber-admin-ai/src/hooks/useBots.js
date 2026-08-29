import { useSupabaseTable } from "./useSupabaseTable";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";
import { mockBots } from "../data/mockBots";

export function useBots() {
  const { rows: bots, setRows: setBots, loading, isLive } = useSupabaseTable("bots", mockBots);

  async function patchBot(id, patch) {
    setBots((prev) => prev.map((b) => (b.id === id ? { ...b, ...patch } : b)));
    if (isLive) {
      await supabase.from("bots").update(patch).eq("id", id);
    }
  }

  return {
    bots,
    loading,
    isLive,
    restartBot: (id) => patchBot(id, { status: "running", latency_ms: 90 }),
    togglePauseBot: (id) => {
      const bot = bots.find((b) => b.id === id);
      patchBot(id, { status: bot?.status === "paused" ? "running" : "paused" });
    },
    emergencyStopBot: (id) => patchBot(id, { status: "error" }),
  };
}
