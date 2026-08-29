import NeonGrid from "../../components/background/NeonGrid";
import AmbientGlows from "../../components/background/AmbientGlows";
import NoiseOverlay from "../../components/background/NoiseOverlay";
import ParticleField from "../../components/background/ParticleField";
import AboutNav from "./components/AboutNav";
import IdentityHero from "./components/IdentityHero";
import StoryLog from "./components/StoryLog";
import MindModule from "./components/MindModule";
import TechSubsystem from "./components/TechSubsystem";
import JourneyArchive from "./components/JourneyArchive";
import HumanChannel from "./components/HumanChannel";
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
        <IdentityHero />
        <StoryLog />
        <MindModule />
        <TechSubsystem />
        <JourneyArchive />
        <HumanChannel />
        <DepartureCTA />
      </main>
    </div>
  );
}
