import { useEffect, useRef } from "react";
import { subscribe, isMasterRafRunning, getSubscriberCount } from "./masterRaf";
import { motionState } from "./state";
import { metrics } from "./metrics";
import { isCustomScrollReader } from "./scroll";

/**
 * DEV-only motion foundation diagnostic.
 * Isolated and easy to remove — not a designed UI surface.
 */
export default function MotionDiagnostics() {
  const preRef = useRef(null);

  useEffect(() => {
    if (!import.meta.env.DEV) return undefined;

    const unsubscribe = subscribe((frame) => {
      const el = preRef.current;
      if (!el) return;
      el.textContent = [
        "[milan-motion Stage 2]",
        `raf: ${isMasterRafRunning() ? "on" : "off"}  subs: ${getSubscriberCount()}`,
        `scrollSource: ${isCustomScrollReader() ? "lenis" : "native"}`,
        `y: ${frame.y.toFixed(1)}`,
        `H: ${frame.H}`,
        `time: ${frame.time.toFixed(2)}s`,
        `reducedMotion: ${frame.reducedMotion}`,
        `vw: ${metrics.viewportWidth}  docH: ${metrics.documentHeight}`,
        `state.y: ${motionState.y.toFixed(1)}`,
      ].join("\n");
    });

    return unsubscribe;
  }, []);

  if (!import.meta.env.DEV) return null;

  return (
    <pre
      ref={preRef}
      aria-hidden="true"
      data-milan-motion-diag=""
      style={{
        position: "fixed",
        left: 8,
        bottom: 8,
        zIndex: 99999,
        margin: 0,
        padding: 6,
        fontSize: 10,
        lineHeight: 1.35,
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        color: "#9ff5d4",
        background: "rgba(0,0,0,0.72)",
        pointerEvents: "none",
        whiteSpace: "pre",
        maxWidth: "42vw",
      }}
    />
  );
}
