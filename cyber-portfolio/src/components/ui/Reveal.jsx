import { motion, useReducedMotion } from "framer-motion";
import { EASE, DURATION } from "../../lib/motion";

/**
 * Scroll-triggered reveal — hierarchy and pacing, not decoration.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 36,
  as: Tag = "div",
  once = true,
  amount = 0.22,
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[Tag] ?? motion.div;

  if (reduce) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount, margin: "0px 0px -6% 0px" }}
      transition={{ duration: DURATION.slow, delay, ease: EASE.cinematic }}
    >
      {children}
    </MotionTag>
  );
}
