import { ArrowUpRight } from "lucide-react";
import { certifications } from "@/data/content";
import { SectionHeading } from "@/components/section-heading";

export function Certifications() {
  return (
    <section
      id="certifications"
      aria-label="Credentials"
      className="site-container section-space border-t"
    >
      <SectionHeading
        number="04"
        label="Courses & credentials"
        title="Always learning"
        description="Courses and practical programmes that support my work in AI, data science, and quantitative research."
      />
      <div className="border-t">
        {certifications.map((cert) => (
          <a
            key={cert.name}
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid grid-cols-[1fr_auto] items-center gap-x-5 gap-y-2 border-b py-5 transition-colors hover:text-accent sm:grid-cols-[1fr_180px_20px]"
          >
            <span className="text-sm leading-relaxed">{cert.name}</span>
            <span className="col-start-1 text-xs text-muted-foreground sm:col-auto">
              {cert.issuer}
            </span>
            <ArrowUpRight
              className="col-start-2 row-start-1 h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:col-auto sm:row-auto"
              aria-hidden="true"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
