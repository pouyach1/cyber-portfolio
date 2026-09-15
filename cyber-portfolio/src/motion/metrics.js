/**
 * Layout metrics layer.
 * Stage 1: generic viewport / document measurements only.
 * Later stages can extend `sections` without rewriting this architecture.
 */

export const metrics = {
  viewportWidth: 0,
  viewportHeight: 0,
  documentHeight: 0,
  /** Reserved for Stage 3+ section tops/heights */
  sections: {},
};

/**
 * Refresh viewport + document metrics.
 * Call on load and resize — not every RAF frame.
 */
export function refreshMetrics() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return metrics;
  }

  metrics.viewportWidth = window.innerWidth;
  metrics.viewportHeight = window.innerHeight;
  metrics.documentHeight = Math.max(
    document.documentElement?.scrollHeight ?? 0,
    document.body?.scrollHeight ?? 0,
    window.innerHeight
  );

  return metrics;
}

/**
 * Register or update a named section measurement (Stage 3+).
 * Stage 1 exposes the API only — callers may pass { top, height, ... }.
 */
export function setSectionMetric(id, value) {
  if (!id) return;
  metrics.sections[id] = value;
}

/** Read a section metric by id. */
export function getSectionMetric(id) {
  return metrics.sections[id] ?? null;
}

/**
 * Bind resize refresh. Returns cleanup.
 * Uses a rAF-coalesced listener to avoid layout thrash.
 */
export function startMetricsTracking() {
  if (typeof window === "undefined") return () => {};

  refreshMetrics();

  let raf = 0;
  const onResize = () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      refreshMetrics();
    });
  };

  window.addEventListener("resize", onResize, { passive: true });

  return () => {
    window.removeEventListener("resize", onResize);
    if (raf) cancelAnimationFrame(raf);
  };
}
