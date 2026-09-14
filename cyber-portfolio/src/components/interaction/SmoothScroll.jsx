import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";
import { LENIS } from "../../lib/interaction";
import { getGsap } from "../../lib/gsap";

/**
 * Site-wide Lenis smooth scrolling, synced to GSAP ScrollTrigger for cinematic scrub.
 */
export default function SmoothScroll() {
  const reduce = useReducedMotion();
  const lenisRef = useRef(null);

  useEffect(() => {
    if (reduce) return undefined;

    const prefersFine = window.matchMedia("(pointer: fine)").matches;
    if (!prefersFine) return undefined;

    document.documentElement.classList.add("lenis");

    const { gsap, ScrollTrigger } = getGsap();

    const lenis = new Lenis({
      duration: LENIS.duration,
      easing: LENIS.easing,
      smoothWheel: true,
      wheelMultiplier: LENIS.wheelMultiplier,
      touchMultiplier: LENIS.touchMultiplier,
      autoRaf: false,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onClick = (event) => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -88, duration: 1.4 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove("lenis");
    };
  }, [reduce]);

  return null;
}
