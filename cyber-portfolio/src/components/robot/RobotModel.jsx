import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { playClickSound, playHoverChirp, playWaveSound } from "../../lib/robotSounds";

const SPARKLE_COLORS = ["#00f3ff", "#7000ff", "#ff007f", "#00ff88"];

/**
 * A procedurally-built "cute mech" robot — no external GLTF asset needed.
 * Every part is primitive Three.js geometry, driven by a small internal
 * animation rig (blinking, breathing, waving, sparkle bursts) tied to
 * synth sound effects. `mouse` is the normalized -1..1 cursor position
 * from useMousePosition(); `onInteract` fires whenever the robot is
 * clicked, so the parent can trigger a matching UI pulse.
 *
 * ── New optional props (both default to "off", so existing callers like
 * HeroRobot3D are completely unaffected) ─────────────────────────────────
 * `presenter`  — when true, adds a tiny bow tie + suit lapels + a pointer
 *                stick in the right hand, for the "Creator Origin Story"
 *                section.
 * `gesture`    — when set to "point", the right arm holds a presenting
 *                pose (raised, angled toward a hologram panel) instead of
 *                its usual idle sway/wave. Any other value (or omitted)
 *                keeps the original idle/wave behavior untouched.
 */
export default function RobotModel({ mouse, onInteract, presenter = false, gesture = null }) {
  const group = useRef();
  const head = useRef();
  const leftEye = useRef();
  const rightEye = useRef();
  const leftPupil = useRef();
  const rightPupil = useRef();
  const mouth = useRef();
  const core = useRef();
  const antenna = useRef();
  const antennaTip = useRef();
  const rightShoulder = useRef();
  const leftShoulder = useRef();
  const rightHand = useRef();
  const hoverRing = useRef();
  const pointerStick = useRef();

  const [hovered, setHovered] = useState(false);
  const [sparkles, setSparkles] = useState([]);

  // Mutable animation state that doesn't need React re-renders per frame.
  const anim = useRef({
    nextBlinkAt: 2 + Math.random() * 3,
    blinkPhase: 0, // 0 = open, ramps 0→1→0 while blinking
    waveUntil: 0,
    waveStrength: 0,
    bounceT: 10, // large so it starts settled
    nextAutoWaveAt: 6 + Math.random() * 4,
  });

  function spawnSparkles() {
    const burst = Array.from({ length: 10 }, (_, i) => ({
      id: `${Date.now()}-${i}`,
      angle: (Math.PI * 2 * i) / 10 + Math.random() * 0.4,
      speed: 0.6 + Math.random() * 0.5,
      born: performance.now(),
      color: SPARKLE_COLORS[i % SPARKLE_COLORS.length],
      size: 0.035 + Math.random() * 0.03,
    }));
    setSparkles((prev) => [...prev, ...burst]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => !burst.some((b) => b.id === s.id)));
    }, 900);
  }

  function triggerWave(strength = 1) {
    const a = anim.current;
    a.waveUntil = performance.now() / 1000 + 1.5;
    a.waveStrength = strength;
  }

  function handleClick() {
    anim.current.bounceT = 0;
    triggerWave(1);
    spawnSparkles();
    playClickSound();
    onInteract?.();
  }

  function handlePointerOver() {
    setHovered(true);
    playHoverChirp();
  }

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const a = anim.current;

    // ── Breathing + idle sway ─────────────────────────────────────────
    if (group.current) {
      const breathe = Math.sin(t * 1.3) * 0.12;
      group.current.position.y = breathe;
      group.current.rotation.z = Math.sin(t * 0.6) * 0.025;

      // Gentle squash-and-stretch bounce right after a click.
      a.bounceT += delta;
      const bounce = a.bounceT < 0.5 ? Math.exp(-a.bounceT * 8) * Math.sin(a.bounceT * 26) : 0;
      group.current.scale.set(1 - bounce * 0.12, 1 + bounce * 0.16, 1 - bounce * 0.12);

      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mouse.x * 0.28, 0.05);
    }

    // ── Head + eyes track the cursor (clamped for a "cute" limited range) ─
    const lookX = THREE.MathUtils.clamp(mouse.x, -0.6, 0.6);
    const lookY = THREE.MathUtils.clamp(mouse.y, -0.5, 0.5);
    if (head.current) {
      head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, lookX * 0.45, 0.08);
      head.current.rotation.x = THREE.MathUtils.lerp(head.current.rotation.x, -lookY * 0.25, 0.08);
    }
    [leftPupil, rightPupil].forEach((pupil) => {
      if (!pupil.current) return;
      pupil.current.position.x = THREE.MathUtils.lerp(pupil.current.position.x, lookX * 0.035, 0.15);
      pupil.current.position.y = THREE.MathUtils.lerp(pupil.current.position.y, lookY * 0.025, 0.15);
    });

    // ── Blinking ───────────────────────────────────────────────────────
    if (t > a.nextBlinkAt) {
      a.blinkPhase += delta * 9;
      if (a.blinkPhase >= Math.PI) {
        a.blinkPhase = 0;
        a.nextBlinkAt = t + 2 + Math.random() * 4;
      }
    }
    const blinkSquash = a.blinkPhase > 0 ? Math.max(0.06, 1 - Math.sin(a.blinkPhase)) : 1;
    const hoverWiden = hovered ? 1.12 : 1;
    [leftEye, rightEye].forEach((eye) => {
      if (!eye.current) return;
      eye.current.scale.y = THREE.MathUtils.lerp(eye.current.scale.y, blinkSquash * hoverWiden, 0.4);
      eye.current.scale.x = THREE.MathUtils.lerp(eye.current.scale.x, hoverWiden, 0.2);
    });

    // ── Smile pulse (looks like it's "talking" right after an interaction) ─
    if (mouth.current) {
      const talking = a.bounceT < 0.6 ? Math.abs(Math.sin(t * 14)) * 0.4 : 0;
      mouth.current.scale.x = 1 + talking;
      mouth.current.scale.y = 1 + talking * 0.6;
    }

    // ── Holographic chest core ───────────────────────────────────────
    if (core.current) {
      core.current.scale.setScalar(1 + Math.sin(t * 3) * 0.08);
      core.current.rotation.y += delta * 0.8;
    }

    // ── Hover thruster ring underneath ───────────────────────────────
    if (hoverRing.current) {
      hoverRing.current.rotation.z += delta * 0.5;
      hoverRing.current.material.opacity = 0.35 + Math.sin(t * 2.2) * 0.15;
    }

    // ── Antenna spring-lag + happy boing after click ─────────────────
    if (antenna.current && head.current) {
      const lag = THREE.MathUtils.lerp(antenna.current.rotation.z, -head.current.rotation.y * 0.6, 0.1);
      const boing = a.bounceT < 1 ? Math.exp(-a.bounceT * 5) * Math.sin(a.bounceT * 18) * 0.3 : 0;
      antenna.current.rotation.z = lag + boing;
    }
    if (antennaTip.current) {
      antennaTip.current.scale.setScalar(1 + Math.sin(t * 4) * 0.15);
    }

    // ── Auto-wave every so often, so the robot feels alive ───────────
    // (skipped in "point" gesture mode so it doesn't fight the presenting pose)
    if (gesture !== "point" && t > a.nextAutoWaveAt) {
      triggerWave(0.55);
      playWaveSound();
      a.nextAutoWaveAt = t + 10 + Math.random() * 8;
    }

    // ── Waving right arm (default) OR presenting pose (gesture="point") ──
    const waving = performance.now() / 1000 < a.waveUntil;
    if (rightShoulder.current) {
      if (gesture === "point") {
        // Raise the arm toward a hologram panel with a small idle bob,
        // instead of the default idle sway/wave.
        const bob = Math.sin(t * 1.6) * 0.06;
        rightShoulder.current.rotation.z = THREE.MathUtils.lerp(
          rightShoulder.current.rotation.z,
          -1.35 + bob,
          0.08
        );
        rightShoulder.current.rotation.x = THREE.MathUtils.lerp(rightShoulder.current.rotation.x, -0.25, 0.08);
      } else if (waving) {
        const wave = Math.sin(t * 9) * 0.5 * a.waveStrength;
        rightShoulder.current.rotation.z = THREE.MathUtils.lerp(
          rightShoulder.current.rotation.z,
          -2.1 + wave,
          0.3
        );
        rightShoulder.current.rotation.x = THREE.MathUtils.lerp(rightShoulder.current.rotation.x, 0, 0.2);
      } else {
        rightShoulder.current.rotation.z = THREE.MathUtils.lerp(
          rightShoulder.current.rotation.z,
          Math.sin(t * 1.4) * 0.08,
          0.08
        );
        rightShoulder.current.rotation.x = THREE.MathUtils.lerp(rightShoulder.current.rotation.x, 0, 0.08);
      }
    }
    if (rightHand.current) {
      rightHand.current.rotation.z = gesture === "point" ? Math.sin(t * 2) * 0.08 : waving ? Math.sin(t * 16) * 0.4 : 0;
    }
    if (leftShoulder.current) {
      leftShoulder.current.rotation.z = Math.sin(t * 1.2 + 1) * 0.06;
    }
    // Small idle wobble on the pointer stick itself, like a tiny gesture.
    if (pointerStick.current) {
      pointerStick.current.rotation.x = Math.sin(t * 1.8) * 0.12;
    }
  });

  return (
    <group
      ref={group}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={() => setHovered(false)}
    >
      {/* Hover thruster ring */}
      <mesh ref={hoverRing} position={[0, -1.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.38, 0.03, 8, 32]} />
        <meshBasicMaterial color="#00f3ff" transparent opacity={0.4} />
      </mesh>

      {/* Body — squashed sphere for a chibi silhouette */}
      <mesh position={[0, -0.55, 0]} scale={[1, 0.85, 1]} castShadow>
        <sphereGeometry args={[0.52, 32, 32]} />
        <meshStandardMaterial color="#0f172a" metalness={0.5} roughness={0.35} />
      </mesh>

      {/* Presenter suit lapels — tiny dark V-shaped panels on the chest */}
      {presenter && (
        <>
          <mesh position={[-0.13, -0.3, 0.46]} rotation={[0, 0, 0.5]}>
            <boxGeometry args={[0.16, 0.03, 0.02]} />
            <meshStandardMaterial color="#0b1220" metalness={0.3} roughness={0.5} />
          </mesh>
          <mesh position={[0.13, -0.3, 0.46]} rotation={[0, 0, -0.5]}>
            <boxGeometry args={[0.16, 0.03, 0.02]} />
            <meshStandardMaterial color="#0b1220" metalness={0.3} roughness={0.5} />
          </mesh>
          {/* Tiny bow tie at the neck */}
          <mesh position={[-0.045, -0.16, 0.47]} rotation={[0, 0, 0.5]}>
            <coneGeometry args={[0.035, 0.05, 4]} />
            <meshStandardMaterial color="#ff007f" emissive="#ff007f" emissiveIntensity={0.6} />
          </mesh>
          <mesh position={[0.045, -0.16, 0.47]} rotation={[0, 0, -0.5]}>
            <coneGeometry args={[0.035, 0.05, 4]} />
            <meshStandardMaterial color="#ff007f" emissive="#ff007f" emissiveIntensity={0.6} />
          </mesh>
          <mesh position={[0, -0.16, 0.47]}>
            <sphereGeometry args={[0.018, 8, 8]} />
            <meshStandardMaterial color="#ffffff" emissive="#ff007f" emissiveIntensity={0.4} />
          </mesh>
        </>
      )}

      {/* Holographic chest core */}
      <mesh ref={core} position={[0, -0.5, 0.46]}>
        <icosahedronGeometry args={[0.14, 0]} />
        <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={2} transparent opacity={0.85} />
      </mesh>

      {/* Head group */}
      <group ref={head} position={[0, 0.4, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.52, 32, 32]} />
          <meshStandardMaterial color="#1e293b" metalness={0.35} roughness={0.25} />
        </mesh>

        {/* Eyes — big soft "screens" with a colored pupil + sparkle highlight */}
        <group ref={leftEye} position={[-0.19, 0.03, 0.42]}>
          <mesh scale={[1, 1.15, 1]}>
            <sphereGeometry args={[0.11, 24, 24]} />
            <meshStandardMaterial color="#f8fafc" emissive="#f8fafc" emissiveIntensity={0.3} />
          </mesh>
          <mesh ref={leftPupil} position={[0, 0, 0.09]}>
            <sphereGeometry args={[0.055, 16, 16]} />
            <meshStandardMaterial color="#7000ff" emissive="#7000ff" emissiveIntensity={2.2} />
          </mesh>
          <mesh position={[-0.02, 0.025, 0.14]}>
            <sphereGeometry args={[0.016, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>

        <group ref={rightEye} position={[0.19, 0.03, 0.42]}>
          <mesh scale={[1, 1.15, 1]}>
            <sphereGeometry args={[0.11, 24, 24]} />
            <meshStandardMaterial color="#f8fafc" emissive="#f8fafc" emissiveIntensity={0.3} />
          </mesh>
          <mesh ref={rightPupil} position={[0, 0, 0.09]}>
            <sphereGeometry args={[0.055, 16, 16]} />
            <meshStandardMaterial color="#7000ff" emissive="#7000ff" emissiveIntensity={2.2} />
          </mesh>
          <mesh position={[0.02, 0.025, 0.14]}>
            <sphereGeometry args={[0.016, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>

        {/* Blush cheeks */}
        <mesh position={[-0.34, -0.1, 0.32]} rotation={[0, -0.4, 0]}>
          <circleGeometry args={[0.07, 16]} />
          <meshBasicMaterial color="#ff007f" transparent opacity={0.35} />
        </mesh>
        <mesh position={[0.34, -0.1, 0.32]} rotation={[0, 0.4, 0]}>
          <circleGeometry args={[0.07, 16]} />
          <meshBasicMaterial color="#ff007f" transparent opacity={0.35} />
        </mesh>

        {/* Smile */}
        <mesh ref={mouth} position={[0, -0.16, 0.46]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.09, 0.014, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={1.6} />
        </mesh>

        {/* Presenter professor glasses — thin glowing rim, no lenses */}
        {presenter && (
          <group position={[0, 0.03, 0.44]}>
            <mesh position={[-0.19, 0, 0]}>
              <torusGeometry args={[0.075, 0.008, 8, 20]} />
              <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={1} />
            </mesh>
            <mesh position={[0.19, 0, 0]}>
              <torusGeometry args={[0.075, 0.008, 8, 20]} />
              <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={1} />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.08, 0.008, 0.008]} />
              <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={1} />
            </mesh>
          </group>
        )}

        {/* Antenna with glowing tip */}
        <group ref={antenna} position={[0, 0.5, 0]}>
          <mesh position={[0, 0.16, 0]}>
            <cylinderGeometry args={[0.018, 0.018, 0.32, 8]} />
            <meshStandardMaterial color="#475569" />
          </mesh>
          <mesh ref={antennaTip} position={[0, 0.34, 0]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="#ff007f" emissive="#ff007f" emissiveIntensity={2.2} />
          </mesh>
        </group>
      </group>

      {/* Left arm — gentle idle sway */}
      <group ref={leftShoulder} position={[-0.68, -0.4, 0]}>
        <mesh position={[-0.14, -0.1, 0]} rotation={[0, 0, 0.5]}>
          <capsuleGeometry args={[0.07, 0.28, 6, 12]} />
          <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.3} />
        </mesh>
        <mesh position={[-0.26, -0.28, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.3} />
        </mesh>
      </group>

      {/* Right arm — this is the one that waves / points */}
      <group ref={rightShoulder} position={[0.68, -0.4, 0]}>
        <mesh position={[0.14, -0.1, 0]} rotation={[0, 0, -0.5]}>
          <capsuleGeometry args={[0.07, 0.28, 6, 12]} />
          <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.3} />
        </mesh>
        <mesh ref={rightHand} position={[0.26, -0.28, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.3} />

          {/* Tiny presentation pointer stick — a child of the hand, so it
              inherits every hand movement (wave / point / idle) for free. */}
          {presenter && (
            <group ref={pointerStick} position={[0.12, -0.02, 0]} rotation={[0, 0, -0.9]}>
              <mesh position={[0, 0.13, 0]}>
                <cylinderGeometry args={[0.012, 0.012, 0.26, 8]} />
                <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.3} />
              </mesh>
              <mesh position={[0, 0.27, 0]}>
                <sphereGeometry args={[0.022, 12, 12]} />
                <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={2} />
              </mesh>
            </group>
          )}
        </mesh>
      </group>

      <SparkleBurst sparkles={sparkles} />
    </group>
  );
}

/** Small emissive shards that pop outward and fade — spawned on click. */
function SparkleBurst({ sparkles }) {
  return (
    <>
      {sparkles.map((s) => (
        <Sparkle key={s.id} spark={s} />
      ))}
    </>
  );
}

function Sparkle({ spark }) {
  const ref = useRef();
  const dir = useMemo(
    () => new THREE.Vector3(Math.cos(spark.angle), Math.sin(spark.angle) * 0.6 + 0.4, 0),
    [spark.angle]
  );

  useFrame(() => {
    if (!ref.current) return;
    const age = (performance.now() - spark.born) / 900; // 0..1
    if (age >= 1) return;
    ref.current.position.copy(dir).multiplyScalar(age * spark.speed * 1.6);
    ref.current.position.y += age * 0.4;
    const scale = spark.size * (1 - age);
    ref.current.scale.setScalar(Math.max(scale, 0.0001));
    ref.current.material.opacity = 1 - age;
    ref.current.rotation.x += 0.2;
    ref.current.rotation.y += 0.2;
  });

  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color={spark.color} transparent opacity={1} />
    </mesh>
  );
}
