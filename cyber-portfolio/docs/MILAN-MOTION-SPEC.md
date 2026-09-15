# MILAN MOTION SPEC
## Motion & Interaction Reconstruction Blueprint

**Purpose:** Reconstruct the motion language and interaction architecture observed in the Milan Compain reference site as an original implementation.

This document describes behavior, timing, mathematics, dependencies, and visual intent. Do not copy proprietary source code, minified bundles, or original assets.

---

## 01 — CORE PHILOSOPHY

The experience is built as one synchronized motion system rather than independent animations.

Primary principles:

- Scroll is the main timeline.
- All major motion modules receive the same per-frame state.
- Hero, constellation, projects, cursor, and WebGL remain synchronized.
- Motion is mostly continuous rather than trigger-based.
- CSS handles simple transitions and entrances.
- JavaScript handles scroll-driven state and interaction physics.
- Three.js/WebGL handles the spatial particle environment.
- Reduced-motion mode removes or simplifies continuous motion.

The visual feeling should be:

- cinematic
- slow but responsive
- spatial
- minimal
- premium
- atmospheric
- typography-driven
- highly synchronized

---

## 02 — GLOBAL MOTION ENGINE

### Master Frame

Create one shared animation loop.

Each frame produces:

```js
{
  y,       // current scroll position
  H,       // viewport height
  time     // elapsed seconds
}
```

All motion systems subscribe to this same state.

Subscribers:

1. Navigation
2. Hero
3. Constellation
4. Projects
5. Cursor
6. Cosmos/WebGL

Do not create independent animation loops for each module unless technically necessary.

---

## 03 — MOTION TOKENS

### Core easing

```js
easeSmoothstep(t) {
  return t * t * (3 - 2 * t)
}

easeOutQuint(t) {
  return 1 - Math.pow(1 - t, 5)
}

easeInOutCubic(t) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2
}
```

### Main CSS easing

```css
cubic-bezier(.22, 1, .36, 1)
```

---

## 04 — SMOOTH SCROLL

Reference behavior:

```
smooth = 1.1
smoothTouch = 0
normalizeScroll = true
effects = false
ignoreMobileResize = true
```

Desktop:

- smooth virtual scrolling
- scroll position becomes the master animation timeline

Mobile/coarse pointer:

- avoid excessive smooth-scroll complexity
- preserve responsive motion
- prioritize stability

Reduced motion:

- do not initialize smooth scrolling
- use native scroll

---

## 05 — LOADER

### Purpose

The loader is not merely decorative.

It delays the main experience until:

- fonts are ready
- visual/WebGL scene is ready

### Progress weighting

```
Fonts: 60%
Scene: 40%
```

Progress:

```
progress = fonts * 0.6 + scene * 0.4
```

Progress must never move backward.

### Timing

Normal:

```
target duration: 2400ms
hard timeout: 15000ms
```

Reduced motion:

```
target duration: 800ms
```

### Loader words

Reference language cycle:

```
Design
Créatif
Précis
```

Each word:

```
~900ms cycle
~180ms transition gap
```

### Completion

When progress reaches 100%:

```
wait ~400ms
↓
loader.done
↓
body.locked removed
↓
body.ready added
↓
smooth scroll resumes
↓
layout metrics refresh
```

---

## 06 — HERO ENTRANCE

Hero entrance is CSS-driven.

Main animations:

- `rise`
- `fadeIn`

### Hero text

Initial:

```
opacity: 0
translateY: 16px
```

Final:

```
opacity: 1
translateY: 0
```

Duration: ~900ms  
Easing: ease-out

### Arrow

Initial: `opacity: 0`  
Final: `opacity: 1`  
Duration: ~1100ms

Arrow pulse:

```
opacity .4 → .9 → .4
duration ~2.2s infinite
```

Disable under reduced motion.

---

## 07 — HERO SCROLL FADE

Hero uses the beginning of the scroll journey as its animation timeline.

```js
progress = clamp(
  scrollY / (traverseTop + traverseHeight - viewportHeight),
  0,
  1
)
```

### Main name

Fade window: `0 → 15%` of traverse  
Behavior: `opacity: 1 → 0`  
Use smoothstep.

### Letter spacing

Desktop:

```
base: 0.04em
maximum additional spacing: 0.025em
```

As the hero disappears: `0.04em → 0.065em`

### Subtitle / tag

Remain visible longer. Fade approximately: `35% → 55%`

### Arrow

Fade: `0% → 25%`

When opacity is effectively zero:

```
visibility: hidden
pointer-events: none
```

---

## 08 — HERO LETTER GLOW

The hero contains two conceptual layers:

- normal text
- glow text

The glow reacts to:

1. mouse position
2. WebGL star position

### Mouse influence

Only on fine pointers.

A vertical mouse band determines whether the pointer is close to the hero name.

Each letter receives its own horizontal proximity.

Influence should be strongest near the letter and decay smoothly.

Use asymmetric interpolation:

```
approach: ~0.35
release:  ~0.12
```

This makes the glow react quickly but disappear slowly.

### Glow strength

Combine: `star proximity + mouse proximity`  
Maximum opacity: ~0.9

The resulting glow should feel organic rather than like a standard hover effect.

---

## 09 — CONSTELLATION

The constellation consists of approximately **18 words**.

Each word has data:

```js
{
  desktopPosition,
  mobilePosition,
  scrollStart,
  scrollEnd,
  mobileEnd,
  amplitude,
  tier,
  optionalIcon
}
```

Positions are mostly static.

Scroll controls:

- opacity
- vertical drift
- blur

### Scroll timeline

Constellation starts after the hero traverse.

Each word receives:

```js
f = clamp(
  (scrollUnit - start) / (end - start),
  0,
  1
)
```

### Opacity

Use a smooth envelope: `0 → visible → 0`

First word has a longer entrance/exit envelope. Other words use a short fade envelope.

### Vertical motion

```js
yDrift =
  (0.5 - f)
  * amplitude
  * viewportHeight
  / 100
```

Mobile amplitude: ~40% of desktop

### Blur

As opacity decreases: blur → up to ~8px  
When fully visible: blur ≈ 0

This creates the feeling that words emerge from and dissolve into atmosphere.

---

## 10 — PROJECT MOTION ENGINE

Projects are driven by a shared segment-progress function.

There are approximately **3 project segments**.

Each segment has: enter / hold / exit

### Segment progress

Use viewport center:

```js
centerY = scrollY + viewportHeight / 2
```

Each segment produces normalized progress: `0 → 1`

### Card ENTER

Initial: `opacity: 0`, `Y: +60px`  
Final: `opacity: 1`, `Y: 0`  
Use easeOutQuint.

### HOLD

`opacity: 1`, `Y: 0`

### EXIT

`opacity: 1 → 0`, `Y: 0 → -30px`  
Again use easeOutQuint.

When invisible:

```
visibility: hidden
pointer-events: none
```

---

## 11 — PROJECT TITLE

Title has its own appearance and disappearance timeline.

Motion properties: opacity, blur  
Maximum blur: ~8px  
Conceptually: `appear × leave`

The title should never simply pop in/out.

---

## 12 — PROJECT SPATIAL MOTION

The project system contains a horizontal bias: approximately ±0.22 normalized units

Movement follows an eased segment progression.

A cycloid-like function is used for continuous rotation:

```js
2π * 1.5 * (
  t - sin(2πt) / (2π)
)
```

The exact visual implementation may be redesigned as long as:

- rotation remains smooth
- movement follows scroll
- transitions between projects feel continuous
- there are no abrupt resets

This same project progress also influences the Cosmos scene.

---

## 13 — CURSOR SYSTEM

Cursor only activates on:

```
(hover: hover) and (pointer: fine)
```

There are two primary cursor elements: **dot**, **ring**

Plus: trail particles, visit badge, magnetic elements

---

## 14 — CURSOR DOT

Dot follows the pointer aggressively.

Interpolation: ~0.9

```js
dot += (mouse - dot) * 0.9
```

Click pulse: duration ~260ms, scale `1 → ~1.6 → 1` (sine curve)

Dot disappears when:

- pointer has not been detected
- visit badge is active

---

## 15 — CURSOR RING

Base ring: ~28px  
Magnetic mode: ~44px  
Vortex mode: ~16px  

Ring interpolation: ~0.14  
Scale interpolation: ~0.18  
Click: ~150ms, scale × 0.85  
Vortex rotation: ~45deg / second

The ring should feel significantly heavier than the dot.

---

## 16 — MAGNETIC INTERACTION

Elements with `data-magnetic` participate.

Detection radius: 70px

```js
strength = 1 - distance / 70
```

Target movement is based on pointer distance from element center.

Maximum movement is defined per element:

```
data-magnetic="6"
data-magnetic="10"
```

Physics:

```
spring: ~0.18
damping: ~0.72
```

This should feel like subtle physical attraction, not a large cursor-follow animation.

---

## 17 — CURSOR TRAIL

Approximately 3 particles.  
Particle life: 400ms  
Emission: ~80ms  

Only emit while the pointer has moved recently.

Each particle: position, velocity, birth time

Velocity is randomized slightly. Opacity and scale decrease with age.

---

## 18 — PROJECT VISIT BADGE

When hovering a project card:

```
normal cursor → hidden
visit badge → visible
```

Badge follows pointer with ~0.18 interpolation.

The movement should lag behind the pointer slightly.

This creates the feeling of a floating UI object attached to the project.

---

## 19 — COSMOS / WEBGL

Cosmos is an optional heavy layer.

Technology: Three.js, WebGL, custom shaders

Primary purpose:

- create depth
- create atmosphere
- connect scroll with a spatial scene
- provide star coordinates to Hero
- respond to pointer interaction

---

## 20 — STAR FIELD

Reference scale: ~6000 star particles

Additional systems: ~900 far dust, ~700 additional dust

The main star contains: core/silhouette, outer cloud (~260 particles)

Star shape uses a custom superellipse-like silhouette.

Approximate parameters:

```
aspect ≈ 1.05
exponent ≈ 3.7
```

The exact geometry may be redesigned for the new implementation.

---

## 21 — STAR SHADER BEHAVIOR

Each star particle can react to: time, depth, life, twinkle, phase, calm zones, opacity, size

Desired behavior:

- distant particles are smaller
- depth affects brightness/size
- some particles subtly drift
- particles gently twinkle
- star becomes progressively visible during scroll

Avoid obvious/random chaotic movement. Motion should feel controlled and cinematic.

---

## 22 — STAR SCROLL LIFE

A normalized scroll value drives the star: `0 → hero`, `1 → project/cosmos state`

The star gradually:

- appears
- gains particle density
- changes depth
- changes scale
- moves through space

The WebGL scene should be synchronized with project scroll progress.

---

## 23 — PROJECT → COSMOS CONNECTION

Project progress drives: Cosmos X/Y position, rotation, depth, scale

The transition should feel like the website itself is moving through a spatial environment.

No independent random camera animation should overpower scroll.

---

## 24 — CURSOR VORTEX

When the pointer enters the active star field:

```
pointer → projected into star-space
```

Particles near the cursor are pushed away.

Concept:

```
cursor creates a temporary hole
particles repel outward
particles then relax back
```

Only enable when pointer is valid, Cosmos is active, and project/outro state allows it.

---

## 25 — COSMOS → HERO COMMUNICATION

The Cosmos system publishes:

```js
{
  starX,
  starY,
  starR,
  vortex
}
```

The Hero consumes these values:

```
WebGL star
     ↓
screen-space position
     ↓
hero letter proximity
     ↓
letter glow
```

This connection is one of the most important parts of the cinematic feeling.

---

## 26 — CALM ZONES

Hero text areas can be sent to the WebGL shader as "calm zones".

Particles near important typography become less visually aggressive.

Purpose: background remains alive but typography remains readable.

This is a visual hierarchy mechanism, not merely an animation.

---

## 27 — NAVIGATION

Navigation state is derived from scroll.

Thresholds approximately:

```
contact:  y >= contactTop - 0.6H
projects: y >= projectsTop - 0.55H
about:    y >= traverseTop + traverseHeight
```

Active navigation receives `.on`

A small nav dot follows the active link using the link's actual screen rectangle.

---

## 28 — SCROLL TO NAVIGATION

Navigation targets:

- Brand → top
- About → about section
- Projects → project segment
- Contact → document end

With smooth scrolling when motion is allowed. Reduced-motion: native scroll behavior.

---

## 29 — CONTACT REVEALS

Elements using `.fade-blur` start hidden.

Intersection threshold: ~0.15

When visible:

```
opacity: 0 → 1
transform: translateY(32px) → 0
filter: blur(...) → blur(0)
```

Duration: ~1s  
Each element reveals once.

---

## 30 — COPY TOAST

Copy feedback uses a short keyframe animation.

Total duration: ~1.6–1.7s

Conceptual timeline:

```
0%      hidden
~14%    visible
~72%    visible
100%    hidden
```

Use this only for lightweight feedback.

---

## 31 — RESPONSIVE RULES

Desktop:

- full cursor system
- full constellation amplitude
- full WebGL interaction
- larger spatial movement

Mobile:

- no fine-pointer cursor system
- reduced constellation amplitude
- simplified interaction
- reduced WebGL workload
- avoid excessive scroll smoothing
- preserve readability above spectacle

The experience must remain performant before visual fidelity.

---

## 32 — REDUCED MOTION

When `@media (prefers-reduced-motion: reduce)` or equivalent JS media query is active:

Disable/simplify:

- ScrollSmoother / heavy smooth scroll
- arrow pulse
- constellation drift
- continuous blur transitions
- unnecessary cursor effects
- particle vortex
- excessive WebGL movement

Preserve:

- readable content
- basic opacity transitions
- navigation
- usable scrolling
- essential interaction feedback

---

## 33 — MOTION HIERARCHY

### Tier 1 — Essential

Typography, Scroll timing, Hero fade, Project transitions, Constellation, Cursor

### Tier 2 — Signature

Letter glow, Magnetic UI, Cycloid project motion, Loader, Star ↔ Hero communication

### Tier 3 — Heavy

Three.js 6000 particles, Custom shaders, Cursor vortex, Door particle field

If performance becomes an issue, reduce Tier 3 before compromising Tier 1.

---

## 34 — IMPLEMENTATION ARCHITECTURE

Suggested structure:

```
motion/
├── motionEngine
├── scroll
├── metrics
├── loader
├── hero
├── constellation
├── projects
├── cursor
├── navigation
├── contact
└── cosmos
```

Shared state:

```js
motionState = {
  scrollY,
  viewportHeight,
  time,
  reducedMotion,
  pointer,
  star
}
```

Star state:

```js
star = {
  x,
  y,
  radius,
  vortex,
  calmZones
}
```

Do not tightly couple unrelated components.

---

## 35 — IMPLEMENTATION ORDER

### Stage 1

Build: layout metrics, master RAF, shared motion state, reduced-motion detection

Verify: RAF works, scroll position is correct, viewport resize works, reduced-motion works

### Stage 2

Build: smooth scrolling, loader, body.ready

### Stage 3

Build: hero entrance, hero scroll fade, arrow, letter spacing

### Stage 4

Build: constellation

### Stage 5

Build: projects, project title, enter/hold/exit, cycloid movement

### Stage 6

Build: cursor, ring, magnetic elements, trail, visit badge

### Stage 7

Build: hero letter glow (mouse first, then star → hero)

### Stage 8

Build: Cosmos/WebGL progressively

### Stage 9

Finish: navigation, contact, responsive tuning, reduced motion, performance

---

## 36 — QUALITY CHECKLIST

Check timing, typography, interaction, scroll continuity, WebGL support role, responsive design, and accessibility (reduced-motion + usable without cinematic effects).

---

## 37 — FINAL RULE

Do not try to reproduce the reference by copying its bundle.

Instead reproduce:

**motion language + timing + interaction physics + scroll choreography + visual hierarchy + spatial relationships**

The implementation must be original and modular.

The reference is used as a behavioral and visual study, not as a source-code dependency.

---

END OF SPEC
