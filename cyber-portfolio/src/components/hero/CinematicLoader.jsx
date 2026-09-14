import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { getGsap, CINE_EASE_IN_OUT } from "../../lib/gsap";

/**
 * Cinematic intro — counter + curtain wipe, then hands the page to scroll motion.
 */
export default function CinematicLoader({ onComplete }) {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  const rootRef = useRef(null);
  const countRef = useRef(null);
  const barRef = useRef(null);
  const panelRef = useRef(null);
  const completed = useRef(false);

  useEffect(() => {
    if (done) return undefined;

    const finish = () => {
      if (completed.current) return;
      completed.current = true;
      setDone(true);
      onComplete?.();
    };

    if (reduce) {
      finish();
      return undefined;
    }

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const counter = { value: 0 };

      const tl = gsap.timeline({
        defaults: { ease: CINE_EASE_IN_OUT },
        onComplete: finish,
      });

      tl.to(counter, {
        value: 100,
        duration: 1.35,
        ease: "power2.inOut",
        onUpdate: () => {
          if (countRef.current) {
            countRef.current.textContent = String(Math.round(counter.value)).padStart(3, "0");
          }
        },
      })
        .to(
          barRef.current,
          {
            scaleX: 1,
            duration: 1.35,
            ease: "power2.inOut",
          },
          0
        )
        .to(panelRef.current, {
          yPercent: -110,
          duration: 0.95,
          ease: "power4.inOut",
        })
        .to(
          rootRef.current,
          {
            autoAlpha: 0,
            duration: 0.35,
          },
          "-=0.25"
        );
    }, rootRef);

    return () => ctx.revert();
  }, [reduce, done, onComplete]);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-void"
      aria-hidden="true"
    >
      <div ref={panelRef} className="absolute inset-0 bg-void" />
      <div className="relative z-10 flex w-full max-w-sm flex-col items-center gap-8 px-8">
        <p className="font-heading text-[11px] uppercase tracking-[0.45em] text-cyan-neon/70">
          Entering domain
        </p>
        <p
          ref={countRef}
          className="font-display text-6xl font-black tracking-widest text-white md:text-7xl"
        >
          000
        </p>
        <div className="h-px w-full overflow-hidden bg-white/10">
          <div
            ref={barRef}
            className="h-full origin-left scale-x-0 bg-gradient-to-r from-cyan-neon via-purple-neon to-magenta-neon"
          />
        </div>
      </div>
    </div>
  );
}
