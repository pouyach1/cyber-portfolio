import { motionState } from "./state";

/**
 * prefers-reduced-motion detection with live media-query updates.
 */

const QUERY = "(prefers-reduced-motion: reduce)";

let mediaQuery = null;
let started = false;
const listeners = new Set();

function readPreference() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia(QUERY).matches;
}

function apply(next) {
  if (motionState.reducedMotion === next) return;
  motionState.reducedMotion = next;
  listeners.forEach((fn) => {
    try {
      fn(next);
    } catch {
      /* subscriber errors must not break detection */
    }
  });
}

function onChange(event) {
  apply(!!event.matches);
}

/** Current reduced-motion flag (also mirrored on motionState). */
export function getReducedMotion() {
  return motionState.reducedMotion;
}

/** Subscribe to reduced-motion changes. Returns unsubscribe. */
export function onReducedMotionChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** Start listening. Idempotent. Syncs motionState immediately. */
export function startReducedMotionTracking() {
  if (typeof window === "undefined") return () => {};

  apply(readPreference());

  if (started) {
    return () => {};
  }

  mediaQuery = window.matchMedia(QUERY);
  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", onChange);
  } else if (typeof mediaQuery.addListener === "function") {
    mediaQuery.addListener(onChange);
  }
  started = true;

  return () => {
    if (!mediaQuery) return;
    if (typeof mediaQuery.removeEventListener === "function") {
      mediaQuery.removeEventListener("change", onChange);
    } else if (typeof mediaQuery.removeListener === "function") {
      mediaQuery.removeListener(onChange);
    }
    started = false;
    mediaQuery = null;
  };
}
