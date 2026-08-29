import GlassPanel from "../ui/GlassPanel";
import { overviewMetrics } from "../../data/overview";

export default function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {overviewMetrics.map((metric) => (
        <GlassPanel key={metric.id} glow={metric.glow} className="p-5">
          <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">{metric.label}</p>
          <p className="mono-metric mt-2 text-2xl font-bold text-white md:text-3xl">{metric.value}</p>
          <p className="mt-1 text-xs text-emerald-neon">{metric.delta}</p>
        </GlassPanel>
      ))}
    </div>
  );
}
