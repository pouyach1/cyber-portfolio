import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import GlassPanel from "../ui/GlassPanel";
import { useAppStore } from "../../store/useAppStore";

export default function ProjectCard({ project }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 });
  const openProjectDetail = useAppStore((s) => s.openProjectDetail);

  function handleMouseMove(event) {
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
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group"
    >
      <GlassPanel glow="cyan" className="flex h-full flex-col overflow-hidden">
        <button
          onClick={() => openProjectDetail(project.id)}
          className="relative block h-48 w-full overflow-hidden border-b border-cyan-neon/10"
        >
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
        </button>

        <div className="flex flex-1 flex-col p-6">
          <p className="font-mono text-xs text-purple-neon">{project.category}</p>
          <h3 className="mt-1 font-heading text-lg font-bold text-white transition-colors group-hover:text-cyan-neon">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-slate-400">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-600 px-3 py-1 text-[11px] uppercase tracking-wide text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-auto flex gap-4 pt-5 font-heading text-xs uppercase tracking-widest">
            <button onClick={() => openProjectDetail(project.id)} className="text-cyan-neon hover:underline">
              Case Study
            </button>
            <a href={project.liveUrl} className="text-slate-400 hover:text-white hover:underline">
              Live Site
            </a>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
