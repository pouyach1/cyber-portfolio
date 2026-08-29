import { motion } from "framer-motion";

export default function AvatarOrb({ speaking = false }) {
  return (
    <div className="relative flex h-20 w-20 items-center justify-center">
      <motion.span
        animate={{ scale: speaking ? [1, 1.15, 1] : [1, 1.05, 1] }}
        transition={{ duration: speaking ? 0.6 : 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-neon/40 to-purple-neon/40 blur-lg"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute inset-1 rounded-full border border-dashed border-cyan-neon/40"
      />
      <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-neon to-purple-neon shadow-neon-cyan">
        <span className="font-display text-xl font-black text-void">ه</span>
      </div>
    </div>
  );
}
