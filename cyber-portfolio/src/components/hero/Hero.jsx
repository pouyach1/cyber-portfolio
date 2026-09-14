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
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(robotRef.current, {
        yPercent: 10,
        scale: 0.97,
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
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-10 pt-24 md:pb-16 md:pt-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(0,243,255,0.12),transparent_55%),radial-gradient(ellipse_at_20%_80%,rgba(112,0,255,0.14),transparent_50%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void to-transparent" />
      </div>

      <div
        ref={scrubRef}
        className="section-container relative grid w-full items-center gap-8 !py-0 md:grid-cols-[1.05fr_0.95fr] md:gap-10 lg:gap-16"
      >
        <div className="relative z-10 max-w-xl">
          <p
            ref={brandRef}
            className="mb-4 font-heading text-[11px] uppercase tracking-[0.42em] text-cyan-neon/80 md:mb-6 md:text-xs"
          >
            Design · Motion · Front-end
          </p>

          <h1 className="font-display text-[clamp(2.6rem,11vw,5.75rem)] font-black leading-[0.92] tracking-wide text-white">
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
            className="mt-4 font-heading text-base font-semibold uppercase tracking-[0.18em] text-slate-300 md:mt-5 md:text-xl md:tracking-[0.2em]"
          >
            {SITE.role}
          </p>

          <p
            ref={copyRef}
            className="mt-4 max-w-md text-sm leading-relaxed text-slate-400 md:mt-6 md:text-base"
          >
            Futuristic Telegram ecosystems and immersive web experiences —
            engineered with cinematic motion and product-grade detail.
          </p>

          <div ref={ctaRef} className="mt-7 flex flex-wrap gap-3 md:mt-10 md:gap-4">
            <NeonButton as="a" href="#projects" variant="cyan">
              View selected work
            </NeonButton>
            <NeonButton as="a" href="#contact" variant="purple">
              Start a project
            </NeonButton>
          </div>
        </div>

        <div
          ref={robotRef}
          className="relative z-10 mx-auto flex w-full max-w-[280px] justify-center sm:max-w-none md:justify-end"
        >
          <div className="relative scale-[0.88] sm:scale-95 md:scale-100">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,243,255,0.16),transparent_65%)] blur-2xl"
            />
            <HeroRobot3D compact />
          </div>
        </div>
      </div>
    </section>
  );
}
