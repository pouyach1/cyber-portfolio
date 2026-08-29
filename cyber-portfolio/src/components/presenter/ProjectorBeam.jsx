/** Light beam connecting the holographic screen to the presenter robot below. */
export default function ProjectorBeam() {
  return (
    <div
      className="pointer-events-none mx-auto h-16 w-1/2 opacity-40"
      style={{
        background: "linear-gradient(to bottom, rgba(0,243,255,0.25), transparent)",
        clipPath: "polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)",
      }}
    />
  );
}
