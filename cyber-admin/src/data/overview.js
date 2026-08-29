export const revenueData = [
  { month: "Feb", revenue: 4200, clients: 8 },
  { month: "Mar", revenue: 5100, clients: 10 },
  { month: "Apr", revenue: 4800, clients: 11 },
  { month: "May", revenue: 6300, clients: 13 },
  { month: "Jun", revenue: 7100, clients: 15 },
  { month: "Jul", revenue: 8900, clients: 18 },
  { month: "Aug", revenue: 9600, clients: 21 },
];

export const overviewMetrics = [
  { id: "revenue", label: "Monthly Revenue", value: "$9,600", delta: "+12.4%", glow: "cyan" },
  { id: "bots", label: "Active Bots", value: "3 / 4", delta: "1 needs attention", glow: "purple" },
  { id: "users", label: "Total Bot Users", value: "63.8K", delta: "+2.1K this week", glow: "emerald" },
  { id: "pending", label: "Pending Projects", value: "3", delta: "1 near deadline", glow: "magenta" },
];

export const activityStream = [
  { id: 1, text: "Bot #2 CPU spike resolved automatically", time: "2m ago", tone: "emerald" },
  { id: 2, text: "Payment received from Orbit Commerce — $1,500", time: "18m ago", tone: "cyan" },
  { id: 3, text: "VIP Channel Manager paused for maintenance", time: "42m ago", tone: "purple" },
  { id: 4, text: "New lead: Nexus DEX requested a quote", time: "1h ago", tone: "cyan" },
  { id: 5, text: "Support Ticket Bot latency degraded (410ms)", time: "3h ago", tone: "magenta" },
];
