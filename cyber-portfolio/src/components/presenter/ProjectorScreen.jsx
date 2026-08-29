import { motion, AnimatePresence } from "framer-motion";
import ScanlineOverlay from "./ScanlineOverlay";
import ProjectorText from "./ProjectorText";
import ProjectorBeam from "./ProjectorBeam";

export default function ProjectorScreen({
  scene,
  sceneIndex,
  totalScenes,
  isEnding,
  recLabel = "REC ● live feed",
  className = "",
}) {
  return (
    <motion.div
      animate={{ opacity: isEnding ? 0 : 1, y: isEnding ? -20 : 0 }}
      transition={{ duration: 0.8 }}
      className={`absolute left-1/2 top-[9%] z-0 w-[88%] max-w-3xl -translate-x-1/2 ${className}`}
    >
      <div
        className="relative aspect-[16/10] overflow-hidden rounded-2xl border-2 border-cyan-neon/30 bg-gradient-to-b from-[#061018] to-[#02060c] shadow-neon-cyan"
      >
        <ScanlineOverlay />
        <motion.div
          className="pointer-events-none absolute inset-0 bg-cyan-neon/5"
          animate={{ opacity: [0.15, 0.28, 0.15] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative z-20 flex h-full flex-col justify-center p-5 md:p-10">
          <AnimatePresence mode="wait">
            {!isEnding && scene && (
              <motion.div
                key={scene.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectorText scene={scene} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <span className="absolute left-3 top-2.5 z-20 font-mono text-[9px] uppercase tracking-widest text-cyan-neon/50">
          {recLabel}
        </span>
        <span className="absolute right-3 top-2.5 z-20 font-mono text-[9px] text-cyan-neon/40">
          {String(sceneIndex + 1).padStart(2, "0")}/{String(totalScenes).padStart(2, "0")}
        </span>
      </div>
      <ProjectorBeam />
    </motion.div>
  );
}
