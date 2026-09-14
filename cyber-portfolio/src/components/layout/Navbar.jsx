import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import NeonButton from "../ui/NeonButton";
import { NAV_LINKS, SITE } from "../../lib/constants";
import { EASE, DURATION } from "../../lib/motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        ticking = false;
      });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={reduce ? false : { opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.slow, delay: 0.15, ease: EASE.soft }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 transition-[background-color,backdrop-filter,border-color] duration-500 md:px-10 ${
          scrolled
            ? "border-b border-white/5 bg-void/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <a
          href="#home"
          data-cursor="interactive"
          className="group flex items-center gap-3 font-display text-lg font-bold tracking-widest"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-neon to-purple-neon font-display text-lg font-black text-void transition-transform duration-500 group-hover:scale-105">
            {SITE.robotName.charAt(0)}
          </span>
          <span className="bg-gradient-to-r from-cyan-neon to-purple-neon bg-clip-text text-transparent">
            {SITE.robotName}
          </span>
        </a>

        <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-cursor="interactive"
              className="nav-link whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <NeonButton as="a" href="#contact" className="hidden xl:inline-flex">
          Hire Me
        </NeonButton>

        <button
          className="text-2xl text-cyan-neon transition-transform duration-300 hover:scale-110 xl:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          data-cursor="interactive"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <motion.div
          initial={reduce ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE.soft }}
          className="border-b border-white/5 bg-void/95 px-6 py-6 backdrop-blur-xl xl:hidden"
        >
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-heading text-sm uppercase tracking-wider text-slate-300 transition-colors hover:text-cyan-neon"
              >
                {link.label}
              </a>
            ))}
            <NeonButton as="a" href="#contact" onClick={() => setOpen(false)}>
              Hire Me
            </NeonButton>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
