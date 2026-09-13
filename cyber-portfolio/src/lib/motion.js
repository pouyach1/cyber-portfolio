/**
 * Shared motion language — Apple/Figma-like easing, purposeful variants.
 * Prefer these over ad-hoc springs so the site feels like one product.
 */

export const EASE = {
  /** Smooth deceleration — primary for reveals */
  out: [0.22, 1, 0.36, 1],
  /** Soft cinematic entrance */
  cinematic: [0.16, 1, 0.3, 1],
  /** Snappy UI (buttons, nav) */
  snappy: [0.2, 0.8, 0.2, 1],
  /** Gentle settle */
  settle: [0.33, 1, 0.68, 1],
};

export const DURATION = {
  fast: 0.35,
  base: 0.55,
  slow: 0.85,
  hero: 1.05,
};

export const fadeUp = (delay = 0, duration = DURATION.base) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration, delay, ease: EASE.cinematic },
});

export const fadeIn = (delay = 0, duration = DURATION.base) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration, delay, ease: EASE.out },
});

export const revealViewport = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25, margin: "0px 0px -8% 0px" },
  transition: { duration: DURATION.slow, ease: EASE.cinematic },
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.09, delayChildren: 0.12 },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 22 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE.cinematic },
  },
};
