import { useEffect } from "react";
import { startReducedMotionTracking } from "./reducedMotion";
import { startMetricsTracking, refreshMetrics } from "./metrics";
import MotionDiagnostics from "./MotionDiagnostics";

/**
 * Mounts Stage 1 motion infrastructure once (site-wide).
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
