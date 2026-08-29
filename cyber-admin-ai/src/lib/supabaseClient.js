import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * This client MUST point at the exact same Supabase project as the main
 * portfolio site and the Telegram bot backends — all three read/write the
 * same `bots`, `projects`, `invoices`, and `ai_memory` tables (see
 * src/types/database.d.ts for the shared schema).
 *
 * Until real credentials are set in `.env.local`, `isSupabaseConfigured`
 * is false and every hook in `src/hooks/` transparently falls back to the
 * local mock data in `src/data/`, so the dashboard stays fully usable
 * during development.
 */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
