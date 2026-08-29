// ─────────────────────────────────────────────────────────────────────────
// Shared database schema — SAME tables used by:
//   1. This admin panel (cyber-admin-ai)
//   2. The main client portfolio site (cyber-portfolio)
//   3. The Telegram bot backends (Python/Node services)
//
// This file is documentation + editor IntelliSense. The app itself ships
// as plain JS (see src/hooks/*.js), so nothing here needs a TS build step —
// but if you later migrate to TypeScript, these interfaces map 1:1 to the
// Postgres tables below. Suggested SQL is included as a comment under each
// interface so you can paste it straight into the Supabase SQL editor.

export interface Bot {
  id: string; // uuid
  name: string;
  status: "running" | "paused" | "error";
  api_token_masked: string; // never store/display the raw token client-side
  active_users: number;
  latency_ms: number;
  uptime_percent: number;
  webhook_url: string;
  logs: BotLogEntry[]; // jsonb
  metrics: Record<string, number | string>; // jsonb — free-form extra stats
  created_at: string; // timestamptz
  updated_at: string; // timestamptz
}

export interface BotLogEntry {
  timestamp: string;
  level: "info" | "warn" | "error";
  message: string;
}

/* SQL:
create table bots (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  status text not null check (status in ('running','paused','error')),
  api_token_masked text not null,
  active_users integer default 0,
  latency_ms integer default 0,
  uptime_percent numeric default 99.9,
  webhook_url text,
  logs jsonb default '[]',
  metrics jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
*/

export interface Project {
  id: string;
  client_name: string;
  type: "telegram-bot" | "website" | "fullstack-app" | "ai-integration";
  budget: number;
  progress_percentage: number;
  status: "backlog" | "in_progress" | "qa" | "delivered";
  deadline: string; // date
  credentials_json: EncryptedCredential[]; // jsonb — display masked, decrypt on demand only
  files: ProjectFile[]; // jsonb
  created_at: string;
  updated_at: string;
}

export interface EncryptedCredential {
  label: string; // e.g. "cPanel", "Domain Registrar"
  username: string;
  secret_encrypted: string; // encrypt at rest — never store plaintext
}

export interface ProjectFile {
  name: string;
  url: string;
  uploaded_at: string;
}

/* SQL:
create table projects (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  type text not null,
  budget numeric not null,
  progress_percentage integer default 0,
  status text not null check (status in ('backlog','in_progress','qa','delivered')),
  deadline date,
  credentials_json jsonb default '[]',
  files jsonb default '[]',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
*/

export interface Invoice {
  id: string;
  client_name: string;
  items_json: InvoiceItem[]; // jsonb
  total_amount: number;
  status: "paid" | "unpaid";
  due_date: string; // date
  telegram_chat_id: string | null; // for one-click reminder sends
  created_at: string;
}

export interface InvoiceItem {
  label: string;
  quantity: number;
  rate: number;
}

/* SQL:
create table invoices (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  items_json jsonb not null default '[]',
  total_amount numeric not null,
  status text not null check (status in ('paid','unpaid')) default 'unpaid',
  due_date date,
  telegram_chat_id text,
  created_at timestamptz default now()
);
*/

export interface AiMemory {
  id: string;
  conversation_logs: AiConversationTurn[]; // jsonb
  scheduled_tasks: AiScheduledTask[]; // jsonb
  user_goals: string[]; // jsonb
  strategic_plans: string[]; // jsonb
  user_mood_notes: AiMoodNote[]; // jsonb — keep short, non-clinical notes only
  updated_at: string;
}

export interface AiConversationTurn {
  role: "user" | "assistant";
  text: string;
  timestamp: string;
}

export interface AiScheduledTask {
  id: string;
  title: string;
  due_at: string;
  priority: "urgent-important" | "not-urgent-important" | "urgent-not-important" | "not-urgent-not-important";
  done: boolean;
}

export interface AiMoodNote {
  date: string;
  note: string;
}

/* SQL:
create table ai_memory (
  id uuid primary key default gen_random_uuid(),
  conversation_logs jsonb default '[]',
  scheduled_tasks jsonb default '[]',
  user_goals jsonb default '[]',
  strategic_plans jsonb default '[]',
  user_mood_notes jsonb default '[]',
  updated_at timestamptz default now()
);
*/
