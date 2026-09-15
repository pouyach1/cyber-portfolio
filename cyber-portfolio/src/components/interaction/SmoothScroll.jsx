import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";
import { LENIS } from "../../lib/interaction";
import { reportScrollY, resetScrollReader, setScrollReader } from "../../motion/scroll";

/**
 * Site-wide Lenis smooth scrolling.
 * - Skips when prefers-reduced-motion is on
 * - Uses a single rAF loop; destroyed on unmount
 * - Leaves Framer Motion scroll hooks on native scroll position (Lenis updates root)
 * - Stage 2: wires Lenis scroll into Milan motion getScrollY / motionState.y
 */
export default function SmoothScroll() {
  const reduce = useReducedMotion();
  const lenisRef = useRef(null);

  useEffect(() => {
    if (reduce) {
      resetScrollReader();
      return undefined;
    }

    const prefersFine = window.matchMedia("(pointer: fine)").matches;
    // Keep native touch/momentum on phones; Lenis wheel smoothing on desktop/laptop.
    if (!prefersFine) {
      resetScrollReader();
      return undefined;
    }

    document.documentElement.classList.add("lenis");

    const lenis = new Lenis({
      duration: LENIS.duration,
      easing: LENIS.easing,
      smoothWheel: true,
      wheelMultiplier: LENIS.wheelMultiplier,
      touchMultiplier: LENIS.touchMultiplier,
      autoRaf: false,
    });
    lenisRef.current = lenis;

    // Authoritative scroll source for Milan motion modules (no Lenis imports needed).
    setScrollReader(() => lenis.scroll);
    reportScrollY(lenis.scroll);

    const onLenisScroll = (instance) => {
      // Lenis emits the instance on "scroll"; keep this callback allocation-free-ish.
      reportScrollY(instance?.scroll ?? lenis.scroll);
    };
    const offScroll = lenis.on("scroll", onLenisScroll);

    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Smooth in-page anchors without fighting Lenis
    const onClick = (event) => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -88, duration: 1.15 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId);
      if (typeof offScroll === "function") offScroll();
      lenis.destroy();
      lenisRef.current = null;
      resetScrollReader();
      document.documentElement.classList.remove("lenis");
    };
  }, [reduce]);

  return null;
}
