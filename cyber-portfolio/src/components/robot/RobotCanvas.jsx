import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import RobotModel from "./RobotModel";
import { useMousePosition } from "../../hooks/useMousePosition";

/**
 * `presenter`, `gesture`, and `heightClassName` are new optional props —
 * all default to the exact values this component already used, so the
 * existing `<RobotCanvas onInteract={...} />` call in HeroRobot3D renders
 * identically to before.
 */
export default function RobotCanvas({
  onInteract,
  presenter = false,
  gesture = null,
  heightClassName = "h-[420px] md:h-[520px]",
}) {
  const mouse = useMousePosition();

  return (
    <div className={`w-full cursor-pointer ${heightClassName}`}>
      <Canvas camera={{ position: [0, 0.2, 3.2], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.55} />
        <pointLight position={[3, 3, 3]} intensity={2} color="#00f3ff" />
        <pointLight position={[-3, -1.5, 2]} intensity={1.3} color="#7000ff" />
        <pointLight position={[0, 1, -3]} intensity={1} color="#ff007f" />
        <Suspense fallback={null}>
          <RobotModel mouse={mouse} onInteract={onInteract} presenter={presenter} gesture={gesture} />
          <ContactShadows
            position={[0, -1.15, 0]}
            opacity={0.45}
            scale={4}
            blur={2.4}
            far={2}
            color="#00f3ff"
          />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
