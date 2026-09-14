import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { getGsap, CINE_EASE } from "../../lib/gsap";

/** Cinematic scroll reveal — soft y + opacity via GSAP. */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 36,
  as: Tag = "div",
  once = true,
  amount = 0.2,
}) {
  const reduce = useReducedMotion();
  const ref = useRef(null);

  useEffect(() => {
    if (reduce) return undefined;
    const { gsap } = getGsap();
    const el = ref.current;
    if (!el) return undefined;

    const tween = gsap.fromTo(
      el,
      { autoAlpha: 0, y },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        delay,
        ease: CINE_EASE,
        scrollTrigger: {
          trigger: el,
          start: `top ${Math.round((1 - amount) * 100)}%`,
          toggleActions: once ? "play none none none" : "play reverse play reverse",
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduce, delay, y, once, amount]);

  return (
    <Tag ref={ref} className={className} style={reduce ? undefined : { opacity: 0 }}>
      {children}
    </Tag>
  );
}
