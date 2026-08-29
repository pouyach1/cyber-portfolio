import GlassPanel from "../ui/GlassPanel";
import { activityStream } from "../../data/mockOverview";

const DOT_COLOR = {
  cyan: "bg-cyan-neon",
  purple: "bg-purple-neon",
  emerald: "bg-emerald-neon",
  magenta: "bg-magenta-neon",
};

export default function ActivityStream() {
  return (
    <GlassPanel glow="purple" className="flex h-full flex-col p-5">
      <h3 className="mb-4 text-sm font-bold text-white">جریان فعالیت لحظه‌ای</h3>
      <ul className="space-y-4">
        {activityStream.map((item) => (
          <li key={item.id} className="flex gap-3">
            <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${DOT_COLOR[item.tone]}`} />
            <div>
              <p className="text-sm text-slate-200">{item.text}</p>
              <p className="text-[11px] text-slate-500">{item.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </GlassPanel>
  );
}
