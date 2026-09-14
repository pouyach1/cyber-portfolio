import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import NeonButton from "../ui/NeonButton";
import HeroRobot3D from "./HeroRobot3D";
import { SITE } from "../../lib/constants";
import { getGsap, CINE_EASE } from "../../lib/gsap";

/**
 * Cinematic hero — one composition: brand, line, CTA, Kuro as visual plane.
 * Soft mask reveals + scroll parallax (milancompain-inspired motion language).
 */
export default function Hero({ ready = true }) {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const brandRef = useRef(null);
  const roleRef = useRef(null);
  const copyRef = useRef(null);
  const ctaRef = useRef(null);
  const robotRef = useRef(null);
  const scrubRef = useRef(null);
  const lineRefs = useRef([]);

  // Hide cinematic layers until intro plays (skip when reduced motion).
  useEffect(() => {
    if (reduce) return undefined;
    const { gsap } = getGsap();
    const lines = lineRefs.current.filter(Boolean);
    gsap.set([brandRef.current, roleRef.current, copyRef.current, ctaRef.current], {
      autoAlpha: 0,
      y: 40,
    });
    gsap.set(robotRef.current, { autoAlpha: 0, y: 56, scale: 0.94 });
    gsap.set(lines, { yPercent: 110 });
    return undefined;
  }, [reduce]);

  useEffect(() => {
    if (!ready || reduce) return undefined;

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const lines = lineRefs.current.filter(Boolean);

      const intro = gsap.timeline({ defaults: { ease: CINE_EASE } });

      intro
        .to(brandRef.current, { autoAlpha: 1, y: 0, duration: 1.05 }, 0.05)
        .to(lines, { yPercent: 0, duration: 1.15, stagger: 0.1 }, 0.18)
        .to(roleRef.current, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.55)
        .to(copyRef.current, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.7)
        .to(ctaRef.current, { autoAlpha: 1, y: 0, duration: 0.85 }, 0.85)
        .to(
          robotRef.current,
          { autoAlpha: 1, y: 0, scale: 1, duration: 1.25, ease: "power3.out" },
          0.35
        );

      gsap.to(scrubRef.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(robotRef.current, {
        yPercent: 12,
        scale: 0.96,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [ready, reduce]);

  const brandParts = SITE.name.split(" ");

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-28 md:items-center md:pb-20 md:pt-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(0,243,255,0.12),transparent_55%),radial-gradient(ellipse_at_20%_80%,rgba(112,0,255,0.14),transparent_50%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void to-transparent" />
      </div>

      <div
        ref={scrubRef}
        className="section-container relative grid w-full items-center gap-10 !py-0 md:grid-cols-[1.05fr_0.95fr] md:gap-8 lg:gap-16"
      >
        <div className="relative z-10 max-w-xl">
          <p
            ref={brandRef}
            className="mb-6 font-heading text-[11px] uppercase tracking-[0.42em] text-cyan-neon/80 md:text-xs"
          >
            Design · Motion · Front-end
          </p>

          <h1 className="font-display text-[clamp(2.75rem,8vw,5.75rem)] font-black leading-[0.92] tracking-wide text-white">
            {brandParts.map((part, i) => (
              <span key={part} className="hero-mask-line">
                <span
                  ref={(el) => {
                    lineRefs.current[i] = el;
                  }}
                  className={`inline-block ${
                    i === brandParts.length - 1
                      ? "bg-gradient-to-r from-cyan-neon via-white to-purple-neon bg-clip-text text-transparent"
                      : ""
                  }`}
                >
                  {part}
                </span>
              </span>
            ))}
          </h1>

          <p
            ref={roleRef}
            className="mt-5 font-heading text-lg font-semibold uppercase tracking-[0.2em] text-slate-300 md:text-xl"
          >
            {SITE.role}
          </p>

          <p
            ref={copyRef}
            className="mt-6 max-w-md text-[15px] leading-relaxed text-slate-400 md:text-base"
          >
            Futuristic Telegram ecosystems and immersive web experiences —
            engineered with cinematic motion and product-grade detail.
          </p>

          <div ref={ctaRef} className="mt-10 flex flex-wrap gap-4">
            <NeonButton as="a" href="#projects" variant="cyan">
              View selected work
            </NeonButton>
            <NeonButton as="a" href="#contact" variant="purple">
              Start a project
            </NeonButton>
          </div>
        </div>

        <div ref={robotRef} className="relative z-10 flex justify-center md:justify-end">
          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,243,255,0.16),transparent_65%)] blur-2xl"
            />
            <HeroRobot3D />
          </div>
        </div>
      </div>
    </section>
  );
}
