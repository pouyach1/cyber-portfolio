/**
 * Shared Milan motion state — Stage 1 foundation.
 * pointer / star are structural placeholders for later stages.
 */

export const motionState = {
  /** Current scroll Y (px) — updated each RAF frame */
  y: 0,
  /** Viewport height (px) */
  H: typeof window !== "undefined" ? window.innerHeight : 0,
  /** Elapsed seconds since engine boot */
  time: 0,
  /** prefers-reduced-motion: reduce */
  reducedMotion: false,
  /** Stage 1 placeholder — no behavior yet */
  pointer: {
    x: 0,
    y: 0,
    seen: false,
  },
  /** Stage 1 placeholder — no behavior yet */
  star: {
    x: 0,
    y: 0,
    radius: 0,
    vortex: false,
    calmZones: null,
  },
};
