import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "../../lib/motion";

const VARIANTS = {
  cyan: "border-cyan-neon/60 text-cyan-neon hover:shadow-neon-cyan hover:border-cyan-neon hover:bg-cyan-neon/5",
  purple:
    "border-purple-neon/60 text-purple-neon hover:shadow-neon-purple hover:border-purple-neon hover:bg-purple-neon/5",
};

export default function NeonButton({
  children,
  variant = "cyan",
  as: Tag = "button",
  className = "",
  ...rest
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[Tag] ?? motion.button;

  return (
    <MotionTag
      whileHover={reduce ? undefined : { y: -2, scale: 1.02 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.35, ease: EASE.snappy }}
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full border bg-void/60 px-6 py-3
        font-heading text-sm font-semibold uppercase tracking-widest transition-[box-shadow,border-color,background-color] duration-500
        ${VARIANTS[variant] ?? VARIANTS.cyan} ${className}`}
      {...rest}
    >
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent
          transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
    </MotionTag>
  );
}
