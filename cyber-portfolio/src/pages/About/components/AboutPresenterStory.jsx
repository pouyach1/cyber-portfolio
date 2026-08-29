import { motion } from "framer-motion";
import PresenterStoryStage from "../../../components/presenter/PresenterStoryStage";
import { aboutPresenterScenes } from "../../../data/aboutPresenterStory";
import { SITE } from "../../../lib/constants";

export default function AboutPresenterStory() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pointer-events-none fixed left-1/2 top-24 z-40 -translate-x-1/2 text-center md:top-28"
      >
        <p className="font-heading text-xs uppercase tracking-[0.35em] text-purple-neon">
          About Me // Identity Interface
        </p>
        <p className="mt-1 font-mono text-[10px] text-slate-500">
          {SITE.robotName} presenting {SITE.name}
        </p>
      </motion.div>

      <PresenterStoryStage
        id="about-presenter"
        scenes={aboutPresenterScenes}
        className="relative bg-void pt-16 md:pt-20"
        endingHref="/#projects"
        endingLabel="Explore Projects →"
        recLabel="DOSSIER ● live feed"
      />
    </>
  );
}
