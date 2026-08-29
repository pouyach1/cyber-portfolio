import { motion } from "framer-motion";
import GlassPanel from "../ui/GlassPanel";
import TypewriterText from "../ui/TypewriterText";
import { ROBOT_MESSAGES, SITE } from "../../lib/constants";

export default function HologramBubble() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="absolute -top-4 right-0 w-64 md:-top-2 md:right-4"
    >
      <GlassPanel glow="purple" className="p-4">
        <p className="mb-1 font-heading text-xs uppercase tracking-widest text-purple-neon">
          {SITE.robotName} // online
        </p>
        <TypewriterText messages={ROBOT_MESSAGES} />
      </GlassPanel>
    </motion.div>
  );
}
