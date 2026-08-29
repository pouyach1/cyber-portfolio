import { useState } from "react";
import { BellRing, Send } from "lucide-react";
import GlassPanel from "../ui/GlassPanel";
import { useInvoices } from "../../hooks/useInvoices";
import { formatToman, toPersianDigits } from "../../lib/format";

export default function UnpaidInstallmentsTable() {
  const { invoices } = useInvoices();
  const [remindedIds, setRemindedIds] = useState([]);

  function sendReminder(id) {
    setRemindedIds((prev) => [...prev, id]);
  }

  return (
    <GlassPanel glow="magenta" className="p-5">
      <h3 className="mb-4 text-sm font-bold text-white">هشدار اقساط پرداخت‌نشده</h3>

      <div className="space-y-3">
        {invoices.map((invoice) => {
          const reminded = remindedIds.includes(invoice.id);
          const overdue = invoice.overdue_days ?? 0;
          return (
            <div
              key={invoice.id}
              className="flex flex-col gap-3 rounded-xl border border-slate-800 p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-white">{invoice.client_name}</p>
                <p className="text-xs text-slate-500">
                  {formatToman(invoice.total_amount)} · سررسید {invoice.due_date}
                  {overdue > 0 && <span className="mr-2 text-magenta-neon">{toPersianDigits(overdue)} روز تأخیر</span>}
                </p>
              </div>
              <button
                onClick={() => sendReminder(invoice.id)}
                disabled={reminded || !invoice.telegram_chat_id}
                title={!invoice.telegram_chat_id ? "چت‌آیدی تلگرام این مشتری ثبت نشده" : undefined}
                className={`flex items-center justify-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                  reminded ? "border-emerald-neon/40 text-emerald-neon" : "border-magenta-neon/40 text-magenta-neon hover:bg-magenta-neon/10"
                }`}
              >
                {reminded ? <BellRing size={13} /> : <Send size={13} />}
                {reminded ? "یادآوری ارسال شد" : "ارسال یادآوری در تلگرام"}
              </button>
            </div>
          );
        })}
      </div>
    </GlassPanel>
  );
}
