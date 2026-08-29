let audioCtx = null;

function getContext() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    audioCtx = new AudioContextClass();
  }
  // Browsers suspend the context until a user gesture — resume defensively.
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

/**
 * Plays a single short tone with a quick attack/decay envelope so it
 * sounds like a soft synth "blip" rather than a harsh square wave.
 */
function tone({ freq = 600, duration = 0.12, type = "sine", peak = 0.06, delay = 0, glideTo = null }) {
  const ctx = getContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
  if (glideTo) {
    osc.frequency.exponentialRampToValueAtTime(glideTo, ctx.currentTime + delay + duration);
  }

  gain.gain.setValueAtTime(0, ctx.currentTime + delay);
  gain.gain.linearRampToValueAtTime(peak, ctx.currentTime + delay + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime + delay);
  osc.stop(ctx.currentTime + delay + duration + 0.02);
}

/** Soft two-note "notice me" chirp — used on hover. */
export function playHoverChirp() {
  tone({ freq: 820, duration: 0.07, peak: 0.035, type: "sine" });
}

/** Cheerful ascending 3-note greeting, like a friendly R2-unit saying hi. */
export function playGreetingChirp() {
  tone({ freq: 520, duration: 0.09, peak: 0.05, delay: 0 });
  tone({ freq: 700, duration: 0.09, peak: 0.05, delay: 0.09 });
  tone({ freq: 940, duration: 0.14, peak: 0.06, delay: 0.18 });
}

/** Bright upward chirp + a tiny twinkle — used on click. */
export function playClickSound() {
  tone({ freq: 480, duration: 0.09, peak: 0.07, type: "triangle", glideTo: 900 });
  tone({ freq: 1400, duration: 0.08, peak: 0.035, delay: 0.1 });
  tone({ freq: 1800, duration: 0.06, peak: 0.03, delay: 0.16 });
}

/** Playful two-note "wave hello" blip. */
export function playWaveSound() {
  tone({ freq: 660, duration: 0.08, peak: 0.05, delay: 0 });
  tone({ freq: 880, duration: 0.1, peak: 0.05, delay: 0.1 });
}
