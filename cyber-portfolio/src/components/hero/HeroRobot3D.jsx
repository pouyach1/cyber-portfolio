import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import RobotCanvas from "../robot/RobotCanvas";
import HologramBubble from "../robot/HologramBubble";
import { playGreetingChirp } from "../../lib/robotSounds";

export default function HeroRobot3D() {
  const [pulse, setPulse] = useState(false);
  const [wavePops, setWavePops] = useState([]);
  const hasGreeted = useRef(false);

  function handleInteract() {
    setPulse(true);
    setTimeout(() => setPulse(false), 900);

    // Greet on the very first click — browsers require a user gesture
    // before audio is allowed, so this is the earliest we can play it.
    if (!hasGreeted.current) {
      hasGreeted.current = true;
      setTimeout(() => playGreetingChirp(), 250);
    }

    const id = Date.now();
    setWavePops((prev) => [...prev, id]);
    setTimeout(() => setWavePops((prev) => prev.filter((p) => p !== id)), 900);
  }

  return (
    <div className="relative">
      {pulse && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2
            animate-ping rounded-full border-2 border-cyan-neon"
          style={{ animationDuration: "0.9s" }}
        />
      )}

      <AnimatePresence>
        {wavePops.map((id) => (
          <motion.span
            key={id}
            aria-hidden="true"
            initial={{ opacity: 0, y: 0, scale: 0.6 }}
            animate={{ opacity: 1, y: -60, scale: 1.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 text-3xl"
          >
            👋
          </motion.span>
        ))}
      </AnimatePresence>

      <HologramBubble />
      <RobotCanvas onInteract={handleInteract} />
      <p className="mt-2 text-center font-mono text-xs text-slate-500">
        click the robot — it'll wave back
      </p>
    </div>
  );
}
