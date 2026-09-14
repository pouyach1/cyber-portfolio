import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function getGsap() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

/** Soft cinematic ease — long settle, no bounce. */
export const CINE_EASE = "power3.out";
export const CINE_EASE_IN_OUT = "power3.inOut";
export const CINE_EASE_SOFT = "power2.out";
