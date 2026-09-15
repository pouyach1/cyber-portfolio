/**
 * Scroll position abstraction for the Milan motion system.
 *
 * Stage 1 default: native window.scrollY
 * Stage 2: Lenis becomes the authoritative reader when SmoothScroll mounts it
 *
 * Future motion modules must use getScrollY() / motionState.y —
 * never import Lenis directly.
 */

import { motionState } from "./state";

function nativeScrollY() {
  return typeof window !== "undefined" ? window.scrollY : 0;
}

let scrollReader = nativeScrollY;
let usingCustomReader = false;

function syncMotionY(y) {
  const next = Number.isFinite(y) ? y : 0;
  motionState.y = next;
  return next;
}

/** Read current effective scroll Y (Lenis when wired, else native). */
export function getScrollY() {
  try {
    return Number(scrollReader()) || 0;
  } catch {
    return nativeScrollY();
  }
}

/**
 * Redirect the scroll reader.
 * Pass a function, or omit / pass null to restore native window.scrollY.
 */
export function setScrollReader(reader) {
  if (typeof reader === "function") {
    scrollReader = reader;
    usingCustomReader = true;
    try {
      syncMotionY(Number(reader()) || 0);
    } catch {
      syncMotionY(nativeScrollY());
    }
    return;
  }

  scrollReader = nativeScrollY;
  usingCustomReader = false;
  syncMotionY(nativeScrollY());
}

/** Restore native scroll reader (Lenis unmount / cleanup). */
export function resetScrollReader() {
  setScrollReader(null);
}

/**
 * Lightweight push from Lenis (or other engines) on scroll.
 * No DOM queries. No animation logic. Updates shared motionState.y only.
 */
export function reportScrollY(y) {
  syncMotionY(y);
}

/** Whether a non-native reader is currently installed. */
export function isCustomScrollReader() {
  return usingCustomReader;
}
