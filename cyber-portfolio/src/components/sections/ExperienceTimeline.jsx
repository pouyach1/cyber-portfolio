import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import GlassPanel from "../ui/GlassPanel";
import { experience } from "../../data/experience";
import { EASE, DURATION } from "../../lib/motion";

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="section-container">
      <SectionHeading
        eyebrow="Career Log"
        title="Experience"
        description="Selected chapters from the build log — not a résumé dump."
      />

      <div className="relative border-l border-cyan-neon/20 pl-8">
        {experience.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: DURATION.base, delay: i * 0.08, ease: EASE.cinematic }}
            className="relative mb-8 last:mb-0"
          >
            <span className="absolute -left-[38px] top-1.5 h-3 w-3 rounded-full bg-cyan-neon shadow-neon-cyan" />
            <GlassPanel className="surface-interactive p-5 hover:shadow-neon-cyan">
              <p className="font-heading text-xs uppercase tracking-widest text-purple-neon">
                {item.period}
              </p>
              <h3 className="mt-1 font-heading text-lg font-bold text-white">{item.role}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.summary}</p>
            </GlassPanel>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
