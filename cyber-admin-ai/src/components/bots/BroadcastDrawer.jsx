import { useState } from "react";
import { Send } from "lucide-react";
import ModalShell from "../modals/ModalShell";
import NeonButton from "../ui/NeonButton";
import { useDashboardStore } from "../../store/useDashboardStore";
import { useBots } from "../../hooks/useBots";
import { toPersianDigits } from "../../lib/format";

const SEGMENTS = ["همه کاربران", "فعال (۷ روز اخیر)", "کاربران پرداخت‌کننده", "غیرفعال (۳۰ روز+)"];

export default function BroadcastDrawer() {
  const broadcastBotId = useDashboardStore((s) => s.broadcastBotId);
  const closeBroadcast = useDashboardStore((s) => s.closeBroadcast);
  const { bots } = useBots();
  const bot = bots.find((b) => b.id === broadcastBotId);

  const [segment, setSegment] = useState(SEGMENTS[0]);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSend(e) {
    e.preventDefault();
    if (!message.trim()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setMessage("");
      closeBroadcast();
    }, 1200);
  }

  return (
    <ModalShell open={!!broadcastBotId} onClose={closeBroadcast} title={`پیام همگانی — ${bot?.name ?? ""}`} wide>
      <form onSubmit={handleSend} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-[11px] text-slate-400">گروه هدف</label>
          <div className="flex flex-wrap gap-2">
            {SEGMENTS.map((seg) => (
              <button
                type="button"
                key={seg}
                onClick={() => setSegment(seg)}
                className={`rounded-full border px-3 py-1.5 text-[11px] ${
                  segment === seg ? "border-cyan-neon bg-cyan-neon/10 text-cyan-neon" : "border-slate-700 text-slate-400"
                }`}
              >
                {seg}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-[11px] text-slate-400">متن پیام</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            placeholder="پیام همگانی خود را بنویسید... (مارک‌داون پشتیبانی می‌شود)"
            className="w-full rounded-xl border border-slate-700 bg-void/60 p-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-neon focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500">
            برآورد دسترسی: <span className="text-cyan-neon">{toPersianDigits(bot?.active_users?.toLocaleString() ?? 0)}</span> کاربر
          </p>
          <NeonButton type="submit" variant="cyan" icon={Send}>
            {sent ? "ارسال شد ✓" : "ارسال پیام همگانی"}
          </NeonButton>
        </div>
      </form>
    </ModalShell>
  );
}
