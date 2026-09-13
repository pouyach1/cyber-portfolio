import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import RobotCanvas from "../robot/RobotCanvas";
import ProjectorScreen from "./ProjectorScreen";

/**
 * Scroll-driven presenter stage.
 * Performance: only commit React state when scene index / ending flag *change*
 * (avoids re-rendering the WebGL robot every scroll frame under Lenis).
 */
export default function PresenterStoryStage({
  id,
  scenes,
  className = "relative bg-void",
  endingHref = "#",
  endingLabel = "Continue →",
  recLabel = "REC ● live feed",
  robotHeightClassName = "h-[300px] md:h-[380px]",
  showScrollHint = true,
}) {
  const totalSegments = scenes.length + 1;
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [sceneIndex, setSceneIndex] = useState(0);
  const [isEnding, setIsEnding] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const segment = progress * totalSegments;
    const ending = segment >= scenes.length;
    const nextIndex = Math.min(scenes.length - 1, Math.floor(segment));

    setIsEnding((prev) => (prev === ending ? prev : ending));
    setSceneIndex((prev) => (prev === nextIndex ? prev : nextIndex));
  });

  const scene = scenes[sceneIndex];

  return (
    <section
      id={id}
      ref={containerRef}
      style={{ height: `${totalSegments * 100}vh` }}
      className={className}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-end overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/4 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-neon/[0.07] blur-[100px]" />
          <div className="absolute inset-0 bg-grid-lines bg-[length:56px_56px] opacity-15 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
        </div>

        <ProjectorScreen
          scene={scene}
          sceneIndex={sceneIndex}
          totalScenes={scenes.length}
          isEnding={isEnding}
          recLabel={recLabel}
        />

        <div
          className={`relative z-10 mb-6 w-full max-w-xs transition-transform duration-700 ease-out md:mb-10 md:max-w-sm ${
            isEnding ? "translate-y-[-40px] scale-[1.35]" : "translate-y-0 scale-100"
          }`}
        >
          <RobotCanvas
            presenter
            gesture="point"
            lite
            heightClassName={robotHeightClassName}
          />
        </div>

        <div
          className={`pointer-events-none absolute inset-0 z-10 transition-opacity duration-700 ${
            isEnding ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "radial-gradient(circle at 50% 55%, transparent 0%, transparent 18%, rgba(3,7,18,0.75) 45%, #030712 75%)",
          }}
        />

        <AnimatePresence>
          {isEnding && (
            <motion.a
              href={endingHref}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="absolute left-6 top-24 z-20 rounded-full border border-cyan-neon/50 bg-void/70 px-5 py-2 font-heading text-xs uppercase tracking-widest text-cyan-neon md:left-12"
            >
              {endingLabel}
            </motion.a>
          )}
        </AnimatePresence>

        {!isEnding && (
          <div className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-2 md:flex">
            {scenes.map((s, i) => (
              <span
                key={s.id}
                className={`w-1.5 rounded-full transition-all duration-300 ${
                  i === sceneIndex ? "h-4 bg-cyan-neon" : "h-1.5 bg-slate-700"
                }`}
              />
            ))}
          </div>
        )}

        {!isEnding && showScrollHint && (
          <p className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 font-mono text-[10px] text-slate-600">
            scroll to continue
          </p>
        )}
      </div>
    </section>
  );
}
