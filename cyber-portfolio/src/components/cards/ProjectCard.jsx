import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import GlassPanel from "../ui/GlassPanel";
import { useAppStore } from "../../store/useAppStore";
import { EASE } from "../../lib/motion";

export default function ProjectCard({ project }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 160, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 160, damping: 22 });
  const openProjectDetail = useAppStore((s) => s.openProjectDetail);

  function handleMouseMove(event) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: EASE.cinematic }}
      whileHover={reduce ? undefined : { y: -6 }}
      className="group h-full"
    >
      <GlassPanel
        glow="cyan"
        className="surface-interactive flex h-full flex-col overflow-hidden group-hover:shadow-neon-cyan"
      >
        <button
          type="button"
          onClick={() => openProjectDetail(project.id)}
          className="relative block h-48 w-full overflow-hidden border-b border-cyan-neon/10 text-left"
        >
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />
          <span className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-widest text-cyan-neon opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            Open case study →
          </span>
        </button>

        <div className="flex flex-1 flex-col p-6">
          <p className="font-mono text-xs text-purple-neon">{project.category}</p>
          <h3 className="mt-1 font-heading text-lg font-bold text-white transition-colors duration-300 group-hover:text-cyan-neon">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-600/80 px-3 py-1 text-[11px] uppercase tracking-wide text-slate-300 transition-colors group-hover:border-cyan-neon/30"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-auto flex gap-4 pt-5 font-heading text-xs uppercase tracking-widest">
            <button
              type="button"
              onClick={() => openProjectDetail(project.id)}
              className="text-cyan-neon transition-opacity hover:opacity-80"
            >
              Case Study
            </button>
            <a href={project.liveUrl} className="text-slate-400 transition-colors hover:text-white">
              Live Site
            </a>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
