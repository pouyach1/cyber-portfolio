const VARIANTS = {
  cyan: "border-cyan-neon/50 text-cyan-neon hover:bg-cyan-neon/10",
  purple: "border-purple-neon/50 text-purple-neon hover:bg-purple-neon/10",
  magenta: "border-magenta-neon/50 text-magenta-neon hover:bg-magenta-neon/10",
  ghost: "border-slate-700 text-slate-300 hover:border-slate-500",
};

export default function NeonButton({
  children,
  variant = "cyan",
  as: Tag = "button",
  className = "",
  icon: Icon,
  ...rest
}) {
  return (
    <Tag
      className={`inline-flex items-center justify-center gap-2 rounded-lg border px-3.5 py-2 font-heading text-xs font-semibold uppercase tracking-wider transition-colors ${
        VARIANTS[variant] ?? VARIANTS.cyan
      } ${className}`}
      {...rest}
    >
      {Icon && <Icon size={14} />}
      {children}
    </Tag>
  );
}
