import { useState } from "react";
import { motion } from "framer-motion";
import GlassPanel from "../ui/GlassPanel";
import NeonButton from "../ui/NeonButton";
import { NAV_LINKS, SITE } from "../../lib/constants";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-x-0 top-4 z-50 mx-auto w-[92%] max-w-7xl"
    >
      <GlassPanel className="flex items-center justify-between px-5 py-3">
        <a href="#home" className="flex items-center gap-3 font-display text-lg font-bold tracking-widest">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-neon to-purple-neon font-display text-lg font-black text-void shadow-neon-cyan">
            {SITE.robotName.charAt(0)}
          </span>
          <span className="bg-gradient-to-r from-cyan-neon to-purple-neon bg-clip-text text-transparent">
            {SITE.robotName}
          </span>
          <span className="text-slate-500">.dev</span>
        </a>

        <nav className="hidden items-center gap-5 xl:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap font-heading text-xs uppercase tracking-wide text-slate-300 transition-colors hover:text-cyan-neon"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <NeonButton as="a" href="#bots" className="hidden xl:inline-flex">
          Hire Me
        </NeonButton>

        <button
          className="text-2xl text-cyan-neon xl:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "✕" : "☰"}
        </button>
      </GlassPanel>

      {open && (
        <GlassPanel className="mt-2 flex flex-col gap-4 p-5 xl:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-heading text-sm uppercase tracking-wider text-slate-300 hover:text-cyan-neon"
            >
              {link.label}
            </a>
          ))}
          <NeonButton as="a" href="#bots" onClick={() => setOpen(false)}>
            Hire Me
          </NeonButton>
        </GlassPanel>
      )}
    </motion.header>
  );
}
