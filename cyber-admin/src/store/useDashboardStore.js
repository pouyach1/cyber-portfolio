import { create } from "zustand";
import { initialBots } from "../data/bots";
import { initialProjects } from "../data/projects";

export const useDashboardStore = create((set, get) => ({
  // Navigation
  activeTab: "overview",
  setActiveTab: (tab) => set({ activeTab: tab }),

  // Bot fleet — mutable so quick actions have visible effect
  bots: initialBots,
  restartBot: (id) =>
    set((state) => ({
      bots: state.bots.map((b) => (b.id === id ? { ...b, status: "running", latency: 90 } : b)),
    })),
  togglePauseBot: (id) =>
    set((state) => ({
      bots: state.bots.map((b) =>
        b.id === id ? { ...b, status: b.status === "paused" ? "running" : "paused" } : b
      ),
    })),
  emergencyStopBot: (id) =>
    set((state) => ({
      bots: state.bots.map((b) => (b.id === id ? { ...b, status: "error" } : b)),
    })),

  // Broadcast drawer
  broadcastBotId: null,
  openBroadcast: (botId) => set({ broadcastBotId: botId }),
  closeBroadcast: () => set({ broadcastBotId: null }),

  // Bot logs drawer
  logsBotId: null,
  openLogs: (botId) => set({ logsBotId: botId }),
  closeLogs: () => set({ logsBotId: null }),

  // Kanban board
  projects: initialProjects,
  moveProject: (projectId, toColumn) =>
    set((state) => ({
      projects: state.projects.map((p) => (p.id === projectId ? { ...p, column: toColumn } : p)),
    })),

  // Invoice generator draft
  invoiceDraft: { client: "", items: [], taxPercent: 0, discountPercent: 0 },
  setInvoiceDraft: (patch) =>
    set((state) => ({ invoiceDraft: { ...state.invoiceDraft, ...patch } })),
}));
