import { ArrowUpRight } from "lucide-react";
import { contact } from "@/data/content";
import { SectionHeading } from "@/components/section-heading";
import { ProjectCollection } from "@/components/project-collection";

export function Projects() {
  return (
    <section
      id="projects"
      aria-label="Selected work"
      className="site-container section-space"
    >
      <SectionHeading
        number="01"
        label="Research & experiments"
        title="Selected work"
        description="A collection of open-source contributions, research tools, and experiments in machine learning."
      >
        <a
          href={contact.github}
          target="_blank"
          rel="noopener noreferrer"
          className="quiet-link"
        >
          All work on GitHub <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </SectionHeading>
      <ProjectCollection />
    </section>
  );
}
