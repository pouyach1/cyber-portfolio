import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import GlassPanel from "../ui/GlassPanel";
import { revenueData } from "../../data/overview";

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-panel border-cyan-neon/30 p-3 text-xs">
      <p className="font-mono text-slate-400">{label}</p>
      <p className="mt-1 font-mono text-cyan-neon">Revenue: ${payload[0].value.toLocaleString()}</p>
      <p className="font-mono text-purple-neon">Clients: {payload[1].value}</p>
    </div>
  );
}

export default function RevenueChart() {
  return (
    <GlassPanel glow="cyan" className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-white">
            Revenue & Client Growth
          </h3>
          <p className="text-xs text-slate-500">Last 7 months</p>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00f3ff" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#00f3ff" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="clientsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7000ff" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#7000ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip content={<ChartTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#00f3ff"
              strokeWidth={2}
              fill="url(#revenueFill)"
            />
            <Area
              type="monotone"
              dataKey="clients"
              stroke="#7000ff"
              strokeWidth={2}
              fill="url(#clientsFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassPanel>
  );
}
