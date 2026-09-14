/**
 * Shared motion language — cinematic, soft, purposeful.
 * Long settles, opacity + transform only. Prefer GSAP for scroll choreography.
 */

export const EASE = {
  out: [0.22, 1, 0.36, 1],
  cinematic: [0.16, 1, 0.3, 1],
  snappy: [0.2, 0.8, 0.2, 1],
  settle: [0.33, 1, 0.68, 1],
  /** Milan-like soft deceleration */
  soft: [0.19, 1, 0.22, 1],
};

export const DURATION = {
  fast: 0.32,
  base: 0.55,
  slow: 0.85,
  hero: 1.15,
  cinema: 1.4,
};

export const fadeUp = (delay = 0, duration = DURATION.base) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration, delay, ease: EASE.soft },
});

export const fadeIn = (delay = 0, duration = DURATION.base) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration, delay, ease: EASE.soft },
});

export const revealViewport = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: DURATION.slow, ease: EASE.soft },
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.09, delayChildren: 0.12 },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE.soft },
  },
};
