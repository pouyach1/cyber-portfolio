import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { HERO_STATS } from "../../lib/constants";

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Number((value * progress).toFixed(value % 1 !== 0 ? 1 : 0)));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-3xl font-black text-white md:text-4xl">
      {display}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  return (
    <div className="mt-10 grid grid-cols-3 gap-6">
      {HERO_STATS.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 + i * 0.15, duration: 0.5 }}
        >
          <Counter value={stat.value} suffix={stat.suffix} />
          <p className="mt-1 text-xs uppercase tracking-wider text-slate-400">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
