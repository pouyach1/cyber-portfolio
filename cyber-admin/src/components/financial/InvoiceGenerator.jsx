import { useState } from "react";
import { Plus, Trash2, FileDown, Send } from "lucide-react";
import GlassPanel from "../ui/GlassPanel";
import NeonButton from "../ui/NeonButton";
import { SERVICE_RATES } from "../../data/invoices";
import { calculateInvoiceTotal } from "../../lib/invoiceMath";

export default function InvoiceGenerator() {
  const [client, setClient] = useState("");
  const [items, setItems] = useState([{ id: 1, serviceId: SERVICE_RATES[0].id, quantity: 1 }]);
  const [taxPercent, setTaxPercent] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);

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

  return (
    <GlassPanel glow="purple" className="p-5">
      <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-widest text-white">
        Invoice Generator
      </h3>

      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wide text-slate-400">
            Client Name
          </label>
          <input
            value={client}
            onChange={(e) => setClient(e.target.value)}
            placeholder="e.g. Orbit Commerce"
            className="w-full rounded-lg border border-slate-700 bg-void/60 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-cyan-neon focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wide text-slate-400">
            Itemized Services
          </label>
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
                      {service.label} (${service.rate}/hr)
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, { quantity: Number(e.target.value) })}
                  className="w-16 rounded-lg border border-slate-700 bg-void/60 px-2 py-2 text-center text-xs text-white focus:border-cyan-neon focus:outline-none"
                  aria-label="Hours"
                />
                <button
                  onClick={() => removeItem(item.id)}
                  aria-label="Remove item"
                  className="rounded-lg border border-slate-700 p-2 text-slate-500 hover:border-magenta-neon/50 hover:text-magenta-neon"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addItem}
            className="mt-2 flex items-center gap-1.5 font-mono text-xs text-cyan-neon hover:underline"
          >
            <Plus size={13} /> Add line item
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wide text-slate-400">
              Tax %
            </label>
            <input
              type="number"
              min={0}
              value={taxPercent}
              onChange={(e) => setTaxPercent(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-700 bg-void/60 px-3 py-2 text-sm text-white focus:border-cyan-neon focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wide text-slate-400">
              Discount %
            </label>
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
          <div className="flex justify-between font-mono text-xs text-slate-400">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="mt-2 flex justify-between font-display text-lg font-bold text-cyan-neon">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <NeonButton variant="cyan" icon={FileDown}>
            Export as PDF
          </NeonButton>
          <NeonButton variant="purple" icon={Send}>
            Send Invoice Link via Telegram
          </NeonButton>
        </div>
      </div>
    </GlassPanel>
  );
}
