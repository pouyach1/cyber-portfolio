# CyberDev Admin Dashboard

A production-ready cyberpunk admin console for a web designer & Telegram bot
developer — built with React + Vite, Tailwind CSS, Recharts, lucide-react,
Framer Motion, and Zustand.

## Setup

```bash
npm install
npm run dev      # http://localhost:5174
npm run build
npm run preview
```

## Modules

1. **Overview** — revenue/client growth area chart (Recharts), metric cards,
   live activity stream.
2. **Bot Ecosystem Controller** — searchable/filterable bot status table
   (masked token, status badge, users, uptime, latency), quick actions
   (Restart, Pause/Resume, View Logs, Broadcast, Emergency Stop), a live
   mock log stream drawer, and a broadcast composer targeting user segments.
3. **Project Kanban Board** — 4-column board (Backlog → In Progress → QA →
   Delivered) with native HTML5 drag-and-drop; cards glow pink within 3 days
   of the deadline.
4. **Financials & Invoicing** — itemized invoice generator with live tax/
   discount calculation, "Export as PDF" / "Send via Telegram" mock actions,
   and an unpaid-installments table with one-click reminders.
5. **DevTools & Snippet Vault** — searchable Python/Node/React snippet
   library with copy-to-clipboard, plus a webhook ping simulator.
6. **Security & Logs** — live-streaming mock system log and recent access
   events.

## Project structure

```
cyber-admin/
├── index.html
├── tailwind.config.js        # shared cyberpunk design tokens
├── src/
│   ├── App.jsx                # sidebar + header + active-tab page switch
│   ├── lib/
│   │   ├── constants.js       # nav tabs, admin profile
│   │   └── invoiceMath.js     # invoice total calculation
│   ├── store/
│   │   └── useDashboardStore.js  # Zustand: active tab, bots, kanban, modals
│   ├── data/                  # dummy data — swap for real API calls later
│   │   ├── bots.js
│   │   ├── projects.js
│   │   ├── invoices.js
│   │   ├── overview.js
│   │   └── snippets.js
│   └── components/
│       ├── layout/
│       │   ├── Sidebar.jsx    # desktop rail + mobile drawer, system status
│       │   └── Header.jsx     # page title, profile badge, quick action
│       ├── ui/                # GlassPanel, StatusPill, NeonButton, SectionHeading
│       ├── modals/
│       │   └── ModalShell.jsx # shared portal + AnimatePresence modal
│       ├── overview/
│       │   ├── OverviewPage.jsx
│       │   ├── MetricsGrid.jsx
│       │   ├── RevenueChart.jsx
│       │   └── ActivityStream.jsx
│       ├── bots/
│       │   ├── BotEcosystemPage.jsx
│       │   ├── BotStatusTable.jsx
│       │   ├── BroadcastDrawer.jsx
│       │   └── LogsDrawer.jsx
│       ├── kanban/
│       │   ├── KanbanBoard.jsx
│       │   └── KanbanProjectCard.jsx
│       ├── financial/
│       │   ├── FinancialPage.jsx
│       │   ├── InvoiceGenerator.jsx
│       │   └── UnpaidInstallmentsTable.jsx
│       ├── devtools/
│       │   ├── DevToolsPage.jsx
│       │   ├── SnippetVault.jsx
│       │   └── WebhookTester.jsx
│       └── security/
│           └── SecurityPage.jsx
```

## Notes
- All data lives in `src/data/` and is wired through the Zustand store in
  `src/store/useDashboardStore.js` — swap the initial arrays for real API
  calls when you're ready to connect a backend.
- Bot quick actions (restart/pause/stop), Kanban drag-and-drop, and invoice
  totals are fully interactive against local state — no backend required to
  demo the whole flow.
- "Export as PDF" and "Send Invoice Link via Telegram" are UI mockups per
  the spec; wire them to a PDF library (e.g. `pdf-lib`) and your bot's send
  API when ready.
