import { motion, useReducedMotion } from "framer-motion";
import { EASE, DURATION } from "../../lib/motion";

export default function SectionHeading({ eyebrow, title, description }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35, margin: "0px 0px -8% 0px" }}
      transition={{ duration: DURATION.slow, ease: EASE.cinematic }}
      className="mb-14 max-w-2xl"
    >
      {eyebrow && (
        <motion.span
          initial={reduce ? false : { opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: DURATION.base, delay: 0.05, ease: EASE.out }}
          className="mb-3 flex items-center gap-3 font-heading text-sm uppercase tracking-[0.3em] text-cyan-neon"
        >
          <span className="h-px w-6 bg-cyan-neon/70" aria-hidden="true" />
          {eyebrow}
        </motion.span>
      )}
      <h2 className="text-3xl font-bold tracking-wide text-white md:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-400">{description}</p>
      )}
    </motion.div>
  );
}
