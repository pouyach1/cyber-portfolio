import { create } from "zustand";

export const useDashboardStore = create((set) => ({
  activeTab: "overview",
  setActiveTab: (tab) => set({ activeTab: tab }),

  // Bot drawers
  broadcastBotId: null,
  openBroadcast: (id) => set({ broadcastBotId: id }),
  closeBroadcast: () => set({ broadcastBotId: null }),
  logsBotId: null,
  openLogs: (id) => set({ logsBotId: id }),
  closeLogs: () => set({ logsBotId: null }),

  // AI Companion — Deep Focus Mode silences non-critical alerts app-wide
  deepFocusUntil: null,
  startDeepFocus: (minutes = 120) =>
    set({ deepFocusUntil: Date.now() + minutes * 60 * 1000 }),
  endDeepFocus: () => set({ deepFocusUntil: null }),
}));
