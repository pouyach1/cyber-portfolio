import SectionHeading from "../ui/SectionHeading";
import ProjectCard from "../cards/ProjectCard";
import { webProjects } from "../../data/webProjects";

export default function WebProjectsShowcase() {
  return (
    <section id="projects" className="section-container">
      <SectionHeading
        eyebrow="Portfolio"
        title="Web Design & Frontend Projects"
        description="Interactive interfaces built with a focus on motion and detail."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {webProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
