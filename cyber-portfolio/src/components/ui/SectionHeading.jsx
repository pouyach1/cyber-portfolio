import { motion } from "framer-motion";

export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-14 max-w-2xl"
    >
      {eyebrow && (
        <span className="mb-3 block font-heading text-sm uppercase tracking-[0.3em] text-cyan-neon">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold text-white md:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-slate-400">{description}</p>}
    </motion.div>
  );
}
