/**
 * Milan motion foundation — Stage 1–2 public API.
 * Existing `src/lib/motion.js` remains the Framer Motion reveal language.
 */

export { motionState } from "./state";
export {
  getScrollY,
  setScrollReader,
  resetScrollReader,
  reportScrollY,
  isCustomScrollReader,
} from "./scroll";
export {
  getReducedMotion,
  onReducedMotionChange,
  startReducedMotionTracking,
} from "./reducedMotion";
export {
  metrics,
  refreshMetrics,
  setSectionMetric,
  getSectionMetric,
  startMetricsTracking,
} from "./metrics";
export { subscribe, isMasterRafRunning, getSubscriberCount } from "./masterRaf";
export { default as MotionFoundation } from "./MotionFoundation";
