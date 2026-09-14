import { useCallback, useState } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import NeonGrid from "./components/background/NeonGrid";
import AmbientGlows from "./components/background/AmbientGlows";
import NoiseOverlay from "./components/background/NoiseOverlay";
import Hero from "./components/hero/Hero";
import CinematicLoader from "./components/hero/CinematicLoader";

import TelegramBotsShowcase from "./components/sections/TelegramBotsShowcase";
import WebProjectsShowcase from "./components/sections/WebProjectsShowcase";
import TechStackMatrix from "./components/sections/TechStackMatrix";
import ExperienceTimeline from "./components/sections/ExperienceTimeline";

import CostEstimator from "./components/configurator/CostEstimator";
import ContactTerminal from "./components/sections/ContactTerminal";

import BotSimulatorModal from "./components/modals/BotSimulatorModal";
import ProjectDetailModal from "./components/modals/ProjectDetailModal";

/**
 * Cinematic homepage — loader → hero composition → work → capabilities → contact.
 * Kuro remains the hero visual anchor.
 */
export default function App() {
  const [ready, setReady] = useState(false);
  const onLoaderDone = useCallback(() => setReady(true), []);

  return (
    <div className="relative min-h-screen">
      <CinematicLoader onComplete={onLoaderDone} />

      <NeonGrid />
      <AmbientGlows />
      <NoiseOverlay />

      <Navbar />

      <main>
        <Hero ready={ready} />
        <WebProjectsShowcase />
        <TelegramBotsShowcase />
        <TechStackMatrix />
        <CostEstimator />
        <ExperienceTimeline />
        <ContactTerminal />
      </main>

      <Footer />

      <BotSimulatorModal />
      <ProjectDetailModal />
    </div>
  );
}
