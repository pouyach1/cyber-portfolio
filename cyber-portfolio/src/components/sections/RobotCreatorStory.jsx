import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import RobotCanvas from "../robot/RobotCanvas";
import { creatorStoryScenes } from "../../data/creatorStory";

// One scroll "segment" per scene, plus one extra segment reserved for the
// cinematic close-up ending.
const TOTAL_SEGMENTS = creatorStoryScenes.length + 1;

/** Animated CRT/hologram scanline sweep — pure CSS, no extra assets. */
function ScanlineOverlay() {
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

/** Reveals a scene's lines word-by-word, like a teleprompter typing live. */
function ProjectorText({ scene }) {
  let wordCounter = 0;
  return (
    <div className="space-y-2 md:space-y-3">
      {scene.lines.map((line, li) => {
        const words = line.split(" ");
        return (
          <p key={li} className="font-heading text-base leading-snug text-cyan-100 md:text-2xl">
            {words.map((word, wi) => {
              const delay = wordCounter * 0.09;
              wordCounter += 1;
              return (
                <motion.span
                  key={wi}
                  initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay, duration: 0.35 }}
                  className="mr-1.5 inline-block"
                >
                  {word}
                </motion.span>
              );
            })}
          </p>
        );
      })}

      {scene.joke && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: wordCounter * 0.09 + 0.3, duration: 0.5 }}
          className="pt-2 font-mono text-xs italic text-cyan-neon/70 md:text-sm"
        >
          "{scene.joke}"
        </motion.p>
      )}

      {scene.isSkillsScene && (
        <div className="flex flex-wrap gap-2 pt-3">
          {scene.skills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: wordCounter * 0.09 + 0.4 + i * 0.05 }}
              className="rounded-full border border-purple-neon/30 bg-purple-neon/10 px-2.5 py-1 text-[10px] text-purple-neon md:text-[11px]"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function RobotCreatorStory() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  const [sceneIndex, setSceneIndex] = useState(0);
  const [isEnding, setIsEnding] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const segment = progress * TOTAL_SEGMENTS;
    if (segment >= creatorStoryScenes.length) {
      setIsEnding(true);
    } else {
      setIsEnding(false);
      setSceneIndex(Math.min(creatorStoryScenes.length - 1, Math.floor(segment)));
    }
  });

  const scene = creatorStoryScenes[sceneIndex];

  return (
    <section
      id="story"
      ref={containerRef}
      style={{ height: `${TOTAL_SEGMENTS * 100}vh` }}
      className="relative bg-void"
    >
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-end overflow-hidden">
        {/* Intimate stage atmosphere */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/4 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-neon/10 blur-[120px]" />
          <div className="absolute bottom-10 right-10 h-[300px] w-[300px] rounded-full bg-cyan-neon/10 blur-[100px]" />
          <div className="absolute inset-0 bg-grid-lines bg-[length:56px_56px] opacity-20 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
        </div>

        {/* ── Projector screen — sits BEHIND the robot ─────────────────── */}
        <motion.div
          animate={{ opacity: isEnding ? 0 : 1, y: isEnding ? -20 : 0 }}
          transition={{ duration: 0.8 }}
          className="absolute left-1/2 top-[9%] z-0 w-[88%] max-w-3xl -translate-x-1/2"
        >
          {/* Screen bezel / frame */}
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border-2 border-cyan-neon/30 bg-gradient-to-b from-[#061018] to-[#02060c] shadow-neon-cyan">
            <ScanlineOverlay />
            {/* subtle screen flicker */}
            <motion.div
              className="pointer-events-none absolute inset-0 bg-cyan-neon/5"
              animate={{ opacity: [0.15, 0.28, 0.15] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative z-20 flex h-full flex-col justify-center p-5 md:p-10">
              <AnimatePresence mode="wait">
                {!isEnding && (
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
            {/* corner readouts, purely decorative — sells the "hologram projector" feel */}
            <span className="absolute left-3 top-2.5 z-20 font-mono text-[9px] uppercase tracking-widest text-cyan-neon/50">
              REC ● live feed
            </span>
            <span className="absolute right-3 top-2.5 z-20 font-mono text-[9px] text-cyan-neon/40">
              {String(sceneIndex + 1).padStart(2, "0")}/{String(creatorStoryScenes.length).padStart(2, "0")}
            </span>
          </div>

          {/* Beam connecting screen to the robot below it */}
          <div
            className="pointer-events-none mx-auto h-16 w-1/2 opacity-40"
            style={{
              background: "linear-gradient(to bottom, rgba(0,243,255,0.25), transparent)",
              clipPath: "polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)",
            }}
          />
        </motion.div>

        {/* ── Robot — in front of the screen ───────────────────────────── */}
        <motion.div
          animate={{ scale: isEnding ? 1.7 : 1, y: isEnding ? -60 : 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="relative z-10 mb-6 w-full max-w-xs md:mb-10 md:max-w-sm"
        >
          <RobotCanvas presenter gesture="point" heightClassName="h-[300px] md:h-[380px]" />
        </motion.div>

        {/* Cinematic close-up vignette for the ending */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isEnding ? 1 : 0 }}
          transition={{ duration: 1.2 }}
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              "radial-gradient(circle at 50% 55%, transparent 0%, transparent 18%, rgba(3,7,18,0.75) 45%, #030712 75%)",
          }}
        />

        {/* Ending: floating placeholder link, top-left — wire this up later */}
        <AnimatePresence>
          {isEnding && (
            <motion.a
              href="#"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute left-6 top-24 z-20 rounded-full border border-cyan-neon/50 bg-void/70 px-5 py-2 font-heading text-xs uppercase tracking-widest text-cyan-neon shadow-neon-cyan backdrop-blur-md md:left-12"
            >
              {/* TODO: point this at whatever you want (resume, contact, next section...) */}
              Continue →
            </motion.a>
          )}
        </AnimatePresence>

        {/* Scroll progress dots */}
        {!isEnding && (
          <div className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-2 md:flex">
            {creatorStoryScenes.map((s, i) => (
              <span
                key={s.id}
                className={`w-1.5 rounded-full transition-all ${
                  i === sceneIndex ? "h-4 bg-cyan-neon shadow-neon-cyan" : "h-1.5 bg-slate-700"
                }`}
              />
            ))}
          </div>
        )}

        {!isEnding && (
          <p className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 font-mono text-[10px] text-slate-600">
            scroll to continue
          </p>
        )}
      </div>
    </section>
  );
}
