import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import NeonButton from "../ui/NeonButton";
import StatsCounter from "./StatsCounter";
import HeroRobot3D from "./HeroRobot3D";
import { SITE } from "../../lib/constants";
import { EASE, DURATION } from "../../lib/motion";

const headline = ["CREATIVE", "DEVELOPER", "& BOT ARCHITECT"];

export default function Hero() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.4 });
  const textX = useTransform(sx, (v) => v * -0.35);
  const textY = useTransform(sy, (v) => v * -0.25);
  const robotX = useTransform(sx, (v) => v * 0.55);
  const robotY = useTransform(sy, (v) => v * 0.4);

  useEffect(() => {
    if (reduce) return undefined;
    function onMove(e) {
      const x = (e.clientX / window.innerWidth - 0.5) * 24;
      const y = (e.clientY / window.innerHeight - 0.5) * 16;
      mx.set(x);
      my.set(y);
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

  return (
    <section
      id="home"
      className="section-container relative grid min-h-[100svh] items-center gap-12 pt-36 md:grid-cols-2 md:gap-14 md:pt-40"
    >
      {/* Soft depth plane behind copy — guides eye without noise */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 top-1/3 h-72 w-72 rounded-full bg-cyan-neon/5 blur-[90px] md:left-0"
      />

      <motion.div style={reduce ? undefined : { x: textX, y: textY }} className="relative z-10">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.base, ease: EASE.cinematic }}
          className="mb-5 inline-flex items-center gap-3"
        >
          <span className="h-px w-8 bg-gradient-to-r from-purple-neon to-transparent" />
          <p className="font-heading text-sm uppercase tracking-[0.35em] text-purple-neon">
            {SITE.name}
          </p>
          <span className="rounded-full border border-cyan-neon/25 bg-cyan-neon/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-cyan-neon/80">
            Digital Studio
          </span>
        </motion.div>

        <h1 className="text-4xl font-black leading-[1.05] text-white md:text-6xl lg:text-[4.25rem]">
          {headline.map((line, i) => (
            <span key={line} className="hero-mask-line">
              <motion.span
                className={
                  i === 1
                    ? "inline-block bg-gradient-to-r from-cyan-neon via-purple-neon to-magenta-neon bg-clip-text text-transparent neon-text-glow"
                    : "inline-block"
                }
                initial={reduce ? false : { y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: DURATION.hero,
                  delay: 0.18 + i * 0.12,
                  ease: EASE.cinematic,
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.slow, delay: 0.62, ease: EASE.out }}
          className="mt-7 max-w-md text-[15px] leading-relaxed text-slate-400 md:text-base"
        >
          I design and ship futuristic Telegram bot ecosystems and immersive web
          experiences — from crypto auto-traders to award-level 3D interfaces.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.slow, delay: 0.78, ease: EASE.out }}
          className="mt-9 flex flex-wrap gap-4"
        >
          <NeonButton as="a" href="#projects" variant="cyan">
            Explore Showcase
          </NeonButton>
          <NeonButton as="a" href="#bots" variant="purple">
            Test Telegram Bots
          </NeonButton>
        </motion.div>

        <StatsCounter />
      </motion.div>

      <motion.div
        style={reduce ? undefined : { x: robotX, y: robotY }}
        initial={reduce ? false : { opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.15, delay: 0.35, ease: EASE.cinematic }}
        className="relative z-10"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-cyan-neon/10 via-purple-neon/5 to-transparent blur-3xl"
        />
        <HeroRobot3D />
      </motion.div>
    </section>
  );
}
