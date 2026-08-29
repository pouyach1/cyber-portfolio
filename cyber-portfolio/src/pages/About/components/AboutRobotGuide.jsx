import { memo } from "react";
import RobotCanvas from "../../../components/robot/RobotCanvas";
import { ABOUT_CREATOR } from "../../../data/aboutWorkstation";

/**
 * About-only robot guide — reuses RobotModel via RobotCanvas in lite + presenter mode.
 * No click handler / sparkle bursts to keep interactions snappy.
 */
function AboutRobotGuide() {
  return (
    <div className="relative mx-auto w-full max-w-[220px] lg:max-w-[260px]">
      <div className="pointer-events-none absolute -inset-4 rounded-full bg-cyan-neon/5 blur-2xl" />
      <RobotCanvas
        presenter
        gesture="point"
        lite
        trackMouse
        heightClassName="h-[200px] md:h-[240px] lg:h-[280px]"
        className="relative z-10"
      />
      <p className="mt-1 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
        {ABOUT_CREATOR.robotName} · presentation assistant
      </p>
    </div>
  );
}

export default memo(AboutRobotGuide);
