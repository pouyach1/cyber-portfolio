import { motion } from "framer-motion";

/** Reveals a scene's lines word-by-word, like a teleprompter typing live. */
export default function ProjectorText({ scene }) {
  let wordCounter = 0;
  return (
    <div className="space-y-2 md:space-y-3">
      {scene.lines.map((line, li) => {
        const words = line.split(" ");
        return (
          <p key={li} className="font-heading text-base leading-snug text-cyan-100 md:text-2xl">
            {words.map((word, wi) => {
              const delay = wordCounter * 0.09;
              wordCounter += 1;
              return (
                <motion.span
                  key={wi}
                  initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay, duration: 0.35 }}
                  className="mr-1.5 inline-block"
                >
                  {word}
                </motion.span>
              );
            })}
          </p>
        );
      })}

      {scene.joke && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: wordCounter * 0.09 + 0.3, duration: 0.5 }}
          className="pt-2 font-mono text-xs italic text-cyan-neon/70 md:text-sm"
        >
          &ldquo;{scene.joke}&rdquo;
        </motion.p>
      )}

      {scene.isSkillsScene && scene.skills && (
        <div className="flex flex-wrap gap-2 pt-3">
          {scene.skills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: wordCounter * 0.09 + 0.4 + i * 0.05 }}
              className="rounded-full border border-purple-neon/30 bg-purple-neon/10 px-2.5 py-1 text-[10px] text-purple-neon md:text-[11px]"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      )}
    </div>
  );
}
