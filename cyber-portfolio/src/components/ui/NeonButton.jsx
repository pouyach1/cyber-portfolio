const VARIANTS = {
  cyan: "border-cyan-neon/60 text-cyan-neon hover:shadow-neon-cyan",
  purple: "border-purple-neon/60 text-purple-neon hover:shadow-neon-purple",
};

export default function NeonButton({
  children,
  variant = "cyan",
  as: Tag = "button",
  className = "",
  ...rest
}) {
  return (
    <Tag
      className={`group relative overflow-hidden rounded-full border bg-void/60 px-6 py-3
        font-heading text-sm font-semibold uppercase tracking-widest transition-shadow duration-300
        ${VARIANTS[variant] ?? VARIANTS.cyan} ${className}`}
      {...rest}
    >
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent
          transition-transform duration-700 group-hover:translate-x-full"
      />
    </Tag>
  );
}
