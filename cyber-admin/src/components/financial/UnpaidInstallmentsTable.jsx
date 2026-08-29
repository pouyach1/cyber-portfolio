import { useState } from "react";
import { BellRing } from "lucide-react";
import GlassPanel from "../ui/GlassPanel";
import { unpaidInstallments } from "../../data/invoices";

export default function UnpaidInstallmentsTable() {
  const [remindedIds, setRemindedIds] = useState([]);

  function sendReminder(id) {
    setRemindedIds((prev) => [...prev, id]);
  }

  return (
    <GlassPanel glow="magenta" className="p-5">
      <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-widest text-white">
        Unpaid Installments Alert
      </h3>

      <div className="space-y-3">
        {unpaidInstallments.map((invoice) => {
          const reminded = remindedIds.includes(invoice.id);
          return (
            <div
              key={invoice.id}
              className="flex flex-col gap-3 rounded-xl border border-slate-800 p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-white">{invoice.client}</p>
                <p className="font-mono text-xs text-slate-500">
                  ${invoice.amount.toLocaleString()} · due {invoice.dueDate}
                  {invoice.overdueDays > 0 && (
                    <span className="ml-2 text-magenta-neon">{invoice.overdueDays}d overdue</span>
                  )}
                </p>
              </div>
              <button
                onClick={() => sendReminder(invoice.id)}
                disabled={reminded}
                className={`flex items-center justify-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors ${
                  reminded
                    ? "border-emerald-neon/40 text-emerald-neon"
                    : "border-magenta-neon/40 text-magenta-neon hover:bg-magenta-neon/10"
                }`}
              >
                <BellRing size={13} />
                {reminded ? "Reminder Sent" : "Send Reminder"}
              </button>
            </div>
          );
        })}
      </div>
    </GlassPanel>
  );
}
