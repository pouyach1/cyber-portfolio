import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import NeonGrid from "./components/background/NeonGrid";
import AmbientGlows from "./components/background/AmbientGlows";
import NoiseOverlay from "./components/background/NoiseOverlay";
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

/**
 * Homepage shell.
 * IMPORTANT: do not put overflow-x-hidden on this root — it creates a scroll
 * containment that breaks position:sticky on RobotCreatorStory.
 * Horizontal clipping is handled on html/body via overflow-x: clip.
 */
export default function App() {
  return (
    <div className="relative min-h-screen">
      <NeonGrid />
      <AmbientGlows />
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

      <BotSimulatorModal />
      <ProjectDetailModal />
    </div>
  );
}
