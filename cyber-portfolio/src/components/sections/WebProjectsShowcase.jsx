import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { webProjects } from "../../data/webProjects";
import { useAppStore } from "../../store/useAppStore";
import { getGsap, CINE_EASE } from "../../lib/gsap";

/**
 * Large stacked project panels — cinematic title + full-bleed image reveal.
 */
export default function WebProjectsShowcase() {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const openProjectDetail = useAppStore((s) => s.openProjectDetail);

  useEffect(() => {
    if (reduce) return undefined;
    const { gsap } = getGsap();

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray("[data-cine-project]");
      rows.forEach((row) => {
        const media = row.querySelector("[data-cine-media]");
        const title = row.querySelector("[data-cine-title]");
        const meta = row.querySelector("[data-cine-meta]");

        gsap.fromTo(
          title,
          { yPercent: 80, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 1.1,
            ease: CINE_EASE,
            scrollTrigger: {
              trigger: row,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );

        gsap.fromTo(
          meta,
          { y: 24, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            delay: 0.12,
            ease: CINE_EASE,
            scrollTrigger: {
              trigger: row,
              start: "top 78%",
              toggleActions: "play none none none",
            },
          }
        );

        gsap.fromTo(
          media,
          { scale: 1.12, autoAlpha: 0.35 },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 1.4,
            ease: CINE_EASE,
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              end: "top 20%",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section id="projects" ref={sectionRef} className="relative overflow-hidden pb-8 pt-8 md:pt-12">
      <div className="section-container !pb-10 !pt-8">
        <div className="mb-16 max-w-2xl md:mb-24">
          <p className="mb-4 font-heading text-[11px] uppercase tracking-[0.4em] text-cyan-neon/80">
            Selected work
          </p>
          <h2 className="font-display text-4xl font-black tracking-wide text-white md:text-6xl">
            Projects
          </h2>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-slate-400 md:text-base">
            Interfaces designed, then built — motion-first, product-grade.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-16 md:gap-28">
        {webProjects.map((project, index) => (
          <article
            key={project.id}
            data-cine-project
            className="group relative"
          >
            <button
              type="button"
              onClick={() => openProjectDetail(project.id)}
              data-cursor="interactive"
              className="relative block w-full overflow-hidden text-left"
            >
              <div className="relative mx-auto aspect-[16/10] w-full max-w-7xl overflow-hidden px-6 md:aspect-[21/9] md:px-10">
                <div className="absolute inset-x-6 inset-y-0 overflow-hidden md:inset-x-10">
                  <img
                    data-cine-media
                    src={project.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-void/10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-void/70 via-transparent to-void/30" />
                </div>

                <div className="absolute inset-x-6 bottom-6 z-10 md:inset-x-10 md:bottom-10">
                  <div className="overflow-hidden">
                    <h3
                      data-cine-title
                      className="font-display text-[clamp(1.75rem,5vw,4.5rem)] font-black leading-[0.95] tracking-wide text-white transition-colors duration-500 group-hover:text-cyan-neon"
                    >
                      {project.title}
                    </h3>
                  </div>
                  <div
                    data-cine-meta
                    className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-heading text-xs uppercase tracking-[0.28em] text-slate-300 md:mt-5 md:text-sm"
                  >
                    <span className="text-purple-neon">{String(index + 1).padStart(2, "0")}</span>
                    <span>{project.category}</span>
                    <span className="text-cyan-neon/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      Open case →
                    </span>
                  </div>
                </div>
              </div>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
