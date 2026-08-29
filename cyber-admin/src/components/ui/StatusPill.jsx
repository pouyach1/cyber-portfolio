const STATUS_STYLES = {
  running: "bg-emerald-neon/10 text-emerald-neon border-emerald-neon/40",
  paused: "bg-amber-400/10 text-amber-300 border-amber-400/40",
  error: "bg-magenta-neon/10 text-magenta-neon border-magenta-neon/40",
};

const STATUS_LABEL = {
  running: "Running",
  paused: "Paused",
  error: "Error",
};

export default function StatusPill({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide ${
        STATUS_STYLES[status] ?? STATUS_STYLES.paused
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "running" ? "animate-pulse-slow bg-emerald-neon" : "bg-current"
        }`}
      />
      {STATUS_LABEL[status] ?? status}
    </span>
  );
}
