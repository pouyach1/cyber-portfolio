export default function AmbientGlows() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-40">
      <div className="absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 animate-pulse-slow rounded-full bg-purple-neon/10 blur-[140px]" />
      <div className="absolute bottom-10 right-10 h-[400px] w-[400px] animate-pulse-slow rounded-full bg-cyan-neon/10 blur-[120px]" />
    </div>
  );
}
