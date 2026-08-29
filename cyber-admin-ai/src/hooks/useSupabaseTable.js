import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";

/**
 * Fetches all rows from `table`. If Supabase isn't configured yet
 * (see .env.example), falls back to `mockData` so the dashboard is fully
 * usable in local dev without real credentials.
 *
 * Returns `setRows` too, so quick actions (restart a bot, move a Kanban
 * card) can update local state optimistically — swap those spots for real
 * `supabase.from(table).update(...)` calls once you're live.
 */
export function useSupabaseTable(table, mockData) {
  const [rows, setRows] = useState(mockData);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;

    let cancelled = false;
    setLoading(true);

    supabase
      .from(table)
      .select("*")
      .then(({ data, error: fetchError }) => {
        if (cancelled) return;
        if (fetchError) {
          setError(fetchError.message);
          setRows(mockData); // graceful fallback on query failure too
        } else {
          setRows(data ?? []);
        }
        setLoading(false);
      });

    // Live updates: reflect INSERT/UPDATE/DELETE from other admins or bots
    const channel = supabase
      .channel(`realtime:${table}`)
      .on("postgres_changes", { event: "*", schema: "public", table }, () => {
        supabase
          .from(table)
          .select("*")
          .then(({ data }) => {
            if (!cancelled && data) setRows(data);
          });
      })
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  return { rows, setRows, loading, error, isLive: isSupabaseConfigured };
}
