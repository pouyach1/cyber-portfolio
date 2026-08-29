import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import NeonGrid from "./components/background/NeonGrid";
import AmbientGlows from "./components/background/AmbientGlows";
import NoiseOverlay from "./components/background/NoiseOverlay";
import ParticleField from "./components/background/ParticleField";
import Hero from "./components/hero/Hero";

import TelegramBotsShowcase from "./components/sections/TelegramBotsShowcase";
import WebProjectsShowcase from "./components/sections/WebProjectsShowcase";
import TechStackMatrix from "./components/sections/TechStackMatrix";
import ExperienceTimeline from "./components/sections/ExperienceTimeline";
import RobotCreatorStory from "./components/sections/RobotCreatorStory";

import CostEstimator from "./components/configurator/CostEstimator";
import ContactTerminal from "./components/sections/ContactTerminal";

import BotSimulatorModal from "./components/modals/BotSimulatorModal";
import ProjectDetailModal from "./components/modals/ProjectDetailModal";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <NeonGrid />
      <AmbientGlows />
      <ParticleField />
      <NoiseOverlay />

      <Navbar />

      <main>
        <Hero />
        <RobotCreatorStory />
        <TelegramBotsShowcase />
        <WebProjectsShowcase />
        <CostEstimator />
        <TechStackMatrix />
        <ExperienceTimeline />
        <ContactTerminal />
      </main>

      <Footer />

      {/* Global overlays */}
      <BotSimulatorModal />
      <ProjectDetailModal />
    </div>
  );
}