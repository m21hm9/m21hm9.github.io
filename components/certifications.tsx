import { ArrowUpRight, Award } from "lucide-react";
import { certifications } from "@/data/content";

export function Certifications() {
  return (
    <section id="certifications" className="scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-accent">05 / continued learning</p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Credentials.</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
          Courses and simulations that support my work in AI, data science and quantitative research.
        </p>

        <div className="mt-9 grid gap-3 md:grid-cols-2">
          {certifications.map((cert, i) => (
            <a
              key={cert.name}
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-4 transition-colors hover:border-accent/50 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
              <Award className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold leading-snug text-foreground">{cert.name}</span>
                <span className="mt-1 block font-mono text-[11px] text-muted-foreground">{cert.issuer}</span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
