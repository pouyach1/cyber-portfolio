import { useEffect, useMemo } from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import RobotModel from "./RobotModel";

/**
 * Tracks pointer into a stable mutable object — no React re-renders on move.
 * Homepage and About both benefit; visuals stay identical.
 */
function useMutableMouse(enabled = true) {
  const mouse = useMemo(() => ({ x: 0, y: 0 }), []);

  useEffect(() => {
    if (!enabled) return undefined;
    function handleMove(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -((event.clientY / window.innerHeight) * 2 - 1);
    }
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [enabled, mouse]);

  return mouse;
}

/**
 * Shared robot canvas.
 * Optional `lite` keeps the same RobotModel but drops heavy Environment / soft shadows
 * for the About workstation — defaults preserve homepage Hero / PresenterStoryStage.
 */
export default function RobotCanvas({
  onInteract,
  presenter = false,
  gesture = null,
  heightClassName = "h-[420px] md:h-[520px]",
  lite = false,
  trackMouse = true,
  className = "",
}) {
  const mouse = useMutableMouse(trackMouse);

  return (
    <div className={`w-full ${onInteract || !lite ? "cursor-pointer" : ""} ${heightClassName} ${className}`}>
      <Canvas
        camera={{ position: [0, 0.2, 3.2], fov: 45 }}
        dpr={lite ? [1, 1.5] : [1, 2]}
        gl={{ antialias: !lite, powerPreference: lite ? "low-power" : "high-performance" }}
        frameloop="always"
      >
        <ambientLight intensity={lite ? 0.7 : 0.55} />
        <pointLight position={[3, 3, 3]} intensity={lite ? 1.4 : 2} color="#00f3ff" />
        <pointLight position={[-3, -1.5, 2]} intensity={lite ? 0.9 : 1.3} color="#7000ff" />
        {!lite && <pointLight position={[0, 1, -3]} intensity={1} color="#ff007f" />}
        <Suspense fallback={null}>
          <RobotModel mouse={mouse} onInteract={onInteract} presenter={presenter} gesture={gesture} />
          {lite ? (
            <ContactShadows
              position={[0, -1.15, 0]}
              opacity={0.28}
              scale={3.2}
              blur={1.2}
              far={1.6}
              color="#00f3ff"
              frames={1}
            />
          ) : (
            <ContactShadows
              position={[0, -1.15, 0]}
              opacity={0.45}
              scale={4}
              blur={2.4}
              far={2}
              color="#00f3ff"
            />
          )}
          {!lite && <Environment preset="city" />}
        </Suspense>
      </Canvas>
    </div>
  );
}
