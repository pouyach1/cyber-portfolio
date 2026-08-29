import { motion } from "framer-motion";

/** Animated CRT/hologram scanline sweep — pure CSS, no extra assets. */
export default function ScanlineOverlay() {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 mix-blend-screen"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to bottom, rgba(0,243,255,0.08) 0px, rgba(0,243,255,0.08) 1px, transparent 2px, transparent 4px)",
      }}
      animate={{ backgroundPositionY: ["0px", "40px"] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
    />
  );
}
