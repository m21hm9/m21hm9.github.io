import { SectionHeading } from "@/components/section-heading";
import { ExperienceTimeline } from "@/components/experience-timeline";

export function Experience() {
  return (
    <section
      id="experience"
      aria-label="Experience"
      className="border-y bg-muted/20"
    >
      <div className="site-container section-space">
        <SectionHeading
          number="02"
          label="Research & practice"
          title="Experience"
          description="AI research and applied data work across academia, banking, and retail."
        />
        <ExperienceTimeline />
      </div>
    </section>
  );
}
