export default function NeonGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20 animate-grid-shift bg-grid-lines bg-void bg-[length:80px_80px]
        [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]"
    />
  );
}
