import { useEffect } from "react";
import { startReducedMotionTracking } from "./reducedMotion";
import { startMetricsTracking, refreshMetrics } from "./metrics";
import MotionDiagnostics from "./MotionDiagnostics";

/**
 * Mounts Milan motion infrastructure once (site-wide).
 * Stage 1: RAF / metrics / reduced-motion
 * Stage 2: Lenis scroll is wired via SmoothScroll → scroll abstraction
 * No visual redesign — diagnostics render only in DEV.
 */
export default function MotionFoundation() {
  useEffect(() => {
    const stopReduced = startReducedMotionTracking();
    const stopMetrics = startMetricsTracking();
    refreshMetrics();

    return () => {
      stopReduced();
      stopMetrics();
    };
  }, []);

  return import.meta.env.DEV ? <MotionDiagnostics /> : null;
}
