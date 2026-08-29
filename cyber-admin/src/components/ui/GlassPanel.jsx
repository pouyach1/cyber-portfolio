const GLOW = {
  cyan: "shadow-neon-cyan border-cyan-neon/25",
  purple: "shadow-neon-purple border-purple-neon/25",
  magenta: "shadow-neon-magenta border-magenta-neon/25",
  emerald: "shadow-neon-emerald border-emerald-neon/25",
  none: "border-cyan-neon/10",
};

export default function GlassPanel({ as: Tag = "div", glow = "none", className = "", children, ...rest }) {
  return (
    <Tag className={`glass-panel border ${GLOW[glow] ?? GLOW.none} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
