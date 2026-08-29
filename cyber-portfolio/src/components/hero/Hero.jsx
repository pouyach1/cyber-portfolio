import { motion } from "framer-motion";
import NeonButton from "../ui/NeonButton";
import StatsCounter from "./StatsCounter";
import HeroRobot3D from "./HeroRobot3D";
import { SITE } from "../../lib/constants";

export default function Hero() {
  return (
    <section id="home" className="section-container grid items-center gap-14 pt-40 md:grid-cols-2 md:pt-48">
      <div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 font-heading text-sm uppercase tracking-[0.3em] text-purple-neon"
        >
          {SITE.name}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-black leading-tight text-white md:text-6xl"
        >
          CREATIVE{" "}
          <span className="bg-gradient-to-r from-cyan-neon via-purple-neon to-magenta-neon bg-clip-text text-transparent neon-text-glow">
            DEVELOPER
          </span>
          <br />& BOT ARCHITECT
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 max-w-md text-slate-400"
        >
          I design and ship futuristic Telegram bot ecosystems and immersive web
          experiences — from crypto auto-traders to award-level 3D interfaces.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <NeonButton as="a" href="#projects" variant="cyan">
            Explore Showcase
          </NeonButton>
          <NeonButton as="a" href="#bots" variant="purple">
            Test Telegram Bots
          </NeonButton>
        </motion.div>

        <StatsCounter />
      </div>

      <HeroRobot3D />
    </section>
  );
}
