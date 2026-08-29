import NeonGrid from "../../components/background/NeonGrid";
import AmbientGlows from "../../components/background/AmbientGlows";
import NoiseOverlay from "../../components/background/NoiseOverlay";
import ParticleField from "../../components/background/ParticleField";
import AboutNav from "./components/AboutNav";
import AboutWorkstation from "./components/AboutWorkstation";
import DepartureCTA from "./components/DepartureCTA";

export default function About() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <NeonGrid />
      <AmbientGlows />
      <ParticleField />
      <NoiseOverlay />

      <AboutNav />

      <main>
        <AboutWorkstation />
        <DepartureCTA />
      </main>
    </div>
  );
}
