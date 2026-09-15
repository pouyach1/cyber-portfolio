import { motionState } from "./state";
import { getScrollY } from "./scroll";
import { metrics } from "./metrics";

/**
 * Single shared Master RAF for the Milan motion system.
 * Starts when the first subscriber registers; stops when the last unsubscribes.
 */

const subscribers = new Set();
let rafId = 0;
let running = false;
let bootTime = 0;

function readFrame() {
  const y = getScrollY();
  const H = metrics.viewportHeight || (typeof window !== "undefined" ? window.innerHeight : 0);
  const time = bootTime ? (performance.now() - bootTime) / 1000 : 0;

  motionState.y = y;
  motionState.H = H;
  motionState.time = time;

  return {
    y,
    H,
    time,
    reducedMotion: motionState.reducedMotion,
  };
}

function tick() {
  if (!running) return;

  const frame = readFrame();
  subscribers.forEach((fn) => {
    try {
      fn(frame);
    } catch {
      /* subscriber errors must not stop the loop */
    }
  });

  rafId = requestAnimationFrame(tick);
}

function start() {
  if (running || typeof window === "undefined") return;
  running = true;
  bootTime = performance.now();
  rafId = requestAnimationFrame(tick);
}

function stop() {
  running = false;
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = 0;
  }
}

/**
 * Subscribe to the master frame loop.
 * @param {(frame: { y: number, H: number, time: number, reducedMotion: boolean }) => void} callback
 * @returns {() => void} unsubscribe
 */
export function subscribe(callback) {
  if (typeof callback !== "function") {
    return () => {};
  }

  subscribers.add(callback);
  if (subscribers.size === 1) start();

  return () => {
    subscribers.delete(callback);
    if (subscribers.size === 0) stop();
  };
}

/** Whether the master loop is currently scheduled. */
export function isMasterRafRunning() {
  return running;
}

/** Subscriber count (diagnostics / tests). */
export function getSubscriberCount() {
  return subscribers.size;
}
