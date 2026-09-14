import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { KuroCompanion } from "../robot/kuro";
import HologramBubble from "../robot/HologramBubble";
import { EASE, DURATION } from "../../lib/motion";

export default function HeroRobot3D() {
  const [pulse, setPulse] = useState(false);
  const hasGreeted = useRef(false);
  const reduce = useReducedMotion();

  function handleInteract() {
    setPulse(true);
    setTimeout(() => setPulse(false), 900);
    if (!hasGreeted.current) hasGreeted.current = true;
  }

  return (
    <div className="relative">
      {pulse && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2
            animate-ping rounded-full border border-cyan-neon/70"
          style={{ animationDuration: "0.9s" }}
        />
      )}

      <HologramBubble />
      <KuroCompanion
        scale={1.12}
        soundEnabled
        showSfx
        onInteract={handleInteract}
        className="mt-2"
      />
      <motion.p
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: DURATION.slow, ease: EASE.soft }}
        className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-slate-500"
      >
        Tap Kuro — moods shift
      </motion.p>
    </div>
  );
}
