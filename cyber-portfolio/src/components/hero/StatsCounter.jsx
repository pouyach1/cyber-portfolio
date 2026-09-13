import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { HERO_STATS } from "../../lib/constants";
import { EASE, DURATION } from "../../lib/motion";

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return undefined;
    if (reduce) {
      setDisplay(value);
      return undefined;
    }
    const duration = 1400;
    const start = performance.now();
    let raf;
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out cubic for premium count feel
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(Number((value * eased).toFixed(value % 1 !== 0 ? 1 : 0)));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduce]);

  return (
    <span ref={ref} className="font-display text-3xl font-black text-white md:text-4xl">
      {display}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  const reduce = useReducedMotion();

  return (
    <div className="mt-12 grid grid-cols-3 gap-6 border-t border-cyan-neon/10 pt-8">
      {HERO_STATS.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05 + i * 0.12, duration: DURATION.base, ease: EASE.out }}
        >
          <Counter value={stat.value} suffix={stat.suffix} />
          <p className="mt-1.5 text-[10px] uppercase tracking-[0.18em] text-slate-500 md:text-xs">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
