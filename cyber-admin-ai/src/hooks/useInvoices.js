import { useSupabaseTable } from "./useSupabaseTable";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";
import { mockUnpaidInvoices } from "../data/mockInvoices";

export function useInvoices() {
  const { rows: invoices, setRows: setInvoices, loading, isLive } = useSupabaseTable(
    "invoices",
    mockUnpaidInvoices
  );

  async function createInvoice(invoice) {
    setInvoices((prev) => [...prev, invoice]);
    if (isLive) {
      await supabase.from("invoices").insert(invoice);
    }
  }

  return { invoices, loading, isLive, createInvoice };
}
