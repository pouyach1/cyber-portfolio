import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { getGsap, CINE_EASE } from "../../lib/gsap";

export default function SectionHeading({ eyebrow, title, description }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);

  useEffect(() => {
    if (reduce) return undefined;
    const { gsap } = getGsap();
    const el = ref.current;
    if (!el) return undefined;

    const parts = el.querySelectorAll("[data-cine-head]");
    const tween = gsap.fromTo(
      parts,
      { autoAlpha: 0, y: 28 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: CINE_EASE,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduce]);

  return (
    <div ref={ref} className="mb-14 max-w-2xl md:mb-16">
      {eyebrow && (
        <span
          data-cine-head
          style={reduce ? undefined : { opacity: 0 }}
          className="mb-4 flex items-center gap-3 font-heading text-[11px] uppercase tracking-[0.35em] text-cyan-neon md:text-sm"
        >
          <span className="h-px w-8 bg-cyan-neon/70" aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <h2
        data-cine-head
        style={reduce ? undefined : { opacity: 0 }}
        className="font-display text-3xl font-bold tracking-wide text-white md:text-5xl"
      >
        {title}
      </h2>
      {description && (
        <p
          data-cine-head
          style={reduce ? undefined : { opacity: 0 }}
          className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-400 md:text-base"
        >
          {description}
        </p>
      )}
    </div>
  );
}
