/** Soft atmospheric glows — layered for cinematic depth without animated blur. */
export default function AmbientGlows() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-40 overflow-hidden">
      <div className="absolute left-[12%] top-[8%] h-[640px] w-[640px] rounded-full bg-purple-neon/[0.08] blur-[140px]" />
      <div className="absolute bottom-[6%] right-[4%] h-[420px] w-[420px] rounded-full bg-cyan-neon/[0.07] blur-[110px]" />
      <div className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-magenta-neon/[0.04] blur-[120px]" />
    </div>
  );
}
