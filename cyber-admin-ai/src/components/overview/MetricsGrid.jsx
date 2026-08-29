import GlassPanel from "../ui/GlassPanel";
import { overviewMetrics } from "../../data/mockOverview";

export default function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {overviewMetrics.map((metric) => (
        <GlassPanel key={metric.id} glow={metric.glow} className="p-5">
          <p className="text-[11px] text-slate-500">{metric.label}</p>
          <p className="mt-2 text-xl font-bold text-white md:text-2xl">{metric.value}</p>
          <p className="mt-1 text-xs text-emerald-neon">{metric.delta}</p>
        </GlassPanel>
      ))}
    </div>
  );
}
