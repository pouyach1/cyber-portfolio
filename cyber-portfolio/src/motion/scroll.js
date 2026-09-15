/**
 * Scroll position abstraction.
 * Stage 1: native window.scrollY.
 * Later stages may redirect this to Lenis / ScrollSmoother without changing callers.
 */

let scrollReader = () => (typeof window !== "undefined" ? window.scrollY : 0);

/** Read current scroll Y. */
export function getScrollY() {
  return scrollReader();
}

/**
 * Redirect the scroll reader (Stage 2+).
 * Pass a function, or omit / pass null to restore native window.scrollY.
 */
export function setScrollReader(reader) {
  scrollReader =
    typeof reader === "function"
      ? reader
      : () => (typeof window !== "undefined" ? window.scrollY : 0);
}
