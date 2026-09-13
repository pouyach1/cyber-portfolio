/**
 * Interaction-layer constants — keep motion.js as the reveal language;
 * these tune scroll / magnetic / cursor feel only.
 */

export const LENIS = {
  /** Seconds-feel duration for wheel interpolation */
  duration: 1.05,
  wheelMultiplier: 0.92,
  touchMultiplier: 1.4,
  /** Sync with existing cinematic ease family */
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
};

export const MAGNETIC = {
  strength: 0.32,
  maxPull: 10,
  spring: { stiffness: 220, damping: 22, mass: 0.35 },
};

export const CURSOR = {
  /** Outer ring follows with soft lag */
  ringSpring: { stiffness: 180, damping: 24, mass: 0.4 },
  /** Dot tracks tightly */
  dotSpring: { stiffness: 500, damping: 35, mass: 0.2 },
  idleScale: 1,
  hoverScale: 1.55,
};
