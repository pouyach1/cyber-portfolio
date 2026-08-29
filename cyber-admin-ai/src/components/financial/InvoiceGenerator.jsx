import { useState } from "react";
import { Plus, Trash2, FileDown, Send } from "lucide-react";
import GlassPanel from "../ui/GlassPanel";
import NeonButton from "../ui/NeonButton";
import { SERVICE_RATES } from "../../data/mockInvoices";
import { calculateInvoiceTotal } from "../../lib/invoiceMath";
import { formatToman } from "../../lib/format";
import { useInvoices } from "../../hooks/useInvoices";

export default function InvoiceGenerator() {
  const { createInvoice } = useInvoices();
  const [client, setClient] = useState("");
  const [items, setItems] = useState([{ id: 1, serviceId: SERVICE_RATES[0].id, quantity: 1 }]);
  const [taxPercent, setTaxPercent] = useState(9);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [sentState, setSentState] = useState(null);

  const resolvedItems = items.map((item) => {
    const service = SERVICE_RATES.find((s) => s.id === item.serviceId);
    return { ...item, label: service.label, rate: service.rate };
  });

  const { subtotal, total } = calculateInvoiceTotal(resolvedItems, taxPercent, discountPercent);

  function addItem() {
    setItems((prev) => [...prev, { id: Date.now(), serviceId: SERVICE_RATES[0].id, quantity: 1 }]);
  }

  function updateItem(id, patch) {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function handleExportPdf() {
    setSentState("pdf");
    setTimeout(() => setSentState(null), 1500);
  }

  function handleSendTelegram() {
    createInvoice({
      id: `inv-${Date.now()}`,
      client_name: client || "بدون نام",
      items_json: resolvedItems,
      total_amount: total,
      status: "unpaid",
      due_date: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
      telegram_chat_id: null,
    });
    setSentState("telegram");
    setTimeout(() => setSentState(null), 1500);
  }

  return (
    <GlassPanel glow="purple" className="p-5">
      <h3 className="mb-4 text-sm font-bold text-white">فاکتور ساز</h3>

      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-[11px] text-slate-400">نام مشتری</label>
          <input
            value={client}
            onChange={(e) => setClient(e.target.value)}
            placeholder="مثلاً: اوربیت کامرس"
            className="w-full rounded-lg border border-slate-700 bg-void/60 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-cyan-neon focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-[11px] text-slate-400">خدمات فاکتور</label>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <select
                  value={item.serviceId}
                  onChange={(e) => updateItem(item.id, { serviceId: e.target.value })}
                  className="flex-1 rounded-lg border border-slate-700 bg-void/60 px-2 py-2 text-xs text-white focus:border-cyan-neon focus:outline-none"
                >
                  {SERVICE_RATES.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.label} ({formatToman(service.rate)}/ساعت)
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, { quantity: Number(e.target.value) })}
                  className="w-16 rounded-lg border border-slate-700 bg-void/60 px-2 py-2 text-center text-xs text-white focus:border-cyan-neon focus:outline-none"
                  aria-label="ساعت"
                />
                <button
                  onClick={() => removeItem(item.id)}
                  aria-label="حذف آیتم"
                  className="rounded-lg border border-slate-700 p-2 text-slate-500 hover:border-magenta-neon/50 hover:text-magenta-neon"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
          <button onClick={addItem} className="mt-2 flex items-center gap-1.5 text-xs text-cyan-neon hover:underline">
            <Plus size={13} /> افزودن آیتم
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-[11px] text-slate-400">مالیات ٪</label>
            <input
              type="number"
              min={0}
              value={taxPercent}
              onChange={(e) => setTaxPercent(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-700 bg-void/60 px-3 py-2 text-sm text-white focus:border-cyan-neon focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] text-slate-400">تخفیف ٪</label>
            <input
              type="number"
              min={0}
              value={discountPercent}
              onChange={(e) => setDiscountPercent(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-700 bg-void/60 px-3 py-2 text-sm text-white focus:border-cyan-neon focus:outline-none"
            />
          </div>
        </div>

        <div className="rounded-xl border border-cyan-neon/20 bg-cyan-neon/5 p-4">
          <div className="flex justify-between text-xs text-slate-400">
            <span>جمع جزء</span>
            <span>{formatToman(Math.round(subtotal))}</span>
          </div>
          <div className="mt-2 flex justify-between text-lg font-bold text-cyan-neon">
            <span>مبلغ نهایی</span>
            <span>{formatToman(Math.round(total))}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <NeonButton variant="cyan" icon={FileDown} onClick={handleExportPdf}>
            {sentState === "pdf" ? "خروجی گرفته شد ✓" : "خروجی PDF"}
          </NeonButton>
          <NeonButton variant="purple" icon={Send} onClick={handleSendTelegram}>
            {sentState === "telegram" ? "لینک ارسال شد ✓" : "ارسال لینک فاکتور در تلگرام"}
          </NeonButton>
        </div>
      </div>
    </GlassPanel>
  );
}
