export default function AmbientGlows() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-40 overflow-hidden">
      <div className="absolute left-1/2 top-[18%] h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 animate-pulse-slow rounded-full bg-purple-neon/[0.09] blur-[150px]" />
      <div
        className="absolute bottom-[8%] right-[6%] h-[440px] w-[440px] animate-pulse-slow rounded-full bg-cyan-neon/[0.09] blur-[130px]"
        style={{ animationDelay: "1.4s" }}
      />
      <div
        className="absolute left-[8%] bottom-[22%] h-[280px] w-[280px] animate-pulse-slow rounded-full bg-magenta-neon/[0.05] blur-[110px]"
        style={{ animationDelay: "2.2s" }}
      />
    </div>
  );
}
