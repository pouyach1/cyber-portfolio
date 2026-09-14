/**
 * Interaction-layer constants — cinematic scroll / magnetic / cursor feel.
 */

export const LENIS = {
  /** Heavier, film-like inertia */
  duration: 1.25,
  wheelMultiplier: 0.85,
  touchMultiplier: 1.15,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
};

export const MAGNETIC = {
  strength: 0.28,
  maxPull: 10,
  spring: { stiffness: 220, damping: 24, mass: 0.35 },
};

export const CURSOR = {
  ringSpring: { stiffness: 160, damping: 26, mass: 0.4 },
  dotSpring: { stiffness: 480, damping: 36, mass: 0.2 },
  idleScale: 1,
  hoverScale: 1.55,
};
