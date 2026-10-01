import { ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/data/content";

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 border-y border-border bg-card/50 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-accent">04 / selected work</p>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Projects and contributions.</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
              The first four repositories pinned to my GitHub, spanning open-source molecular AI, research agents and machine learning experiments.
            </p>
          </div>
          <a
            href="https://github.com/m21hm9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            All repositories <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {projects.map((project, i) => (
            <article
              key={project.title}
              className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg sm:p-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-4 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                <span className="text-accent">research/{String(i + 1).padStart(2, "0")}.md</span>
                <span>{project.category}</span>
              </div>

              <h3 className="mt-6 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{project.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{project.summary}</p>
              {project.metric && (
                <a
                  href={project.metric.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-fit flex-wrap items-baseline gap-x-2 rounded-lg border border-accent/25 bg-accent/5 px-3 py-2 text-accent transition-colors hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <strong className="font-mono text-lg">{project.metric.value}</strong>
                  <span className="text-xs font-medium">{project.metric.label}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 self-center" aria-hidden="true" />
                </a>
              )}

              <div className="mt-6 rounded-lg border border-border bg-muted/40 px-4 py-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">Research question</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground">{project.question}</p>
              </div>

              <div className="mt-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                  {i === 0 ? "My contribution" : "What I built"}
                </p>
                <ul className="mt-3 space-y-2 border-l-2 border-accent/30 pl-4 text-sm leading-relaxed text-muted-foreground">
                  {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.slice(0, 5).map((tech) => (
                  <span key={tech} className="rounded-md border border-border bg-muted/50 px-2.5 py-1 font-mono text-[11px] text-foreground">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex flex-wrap gap-5 pt-7 text-sm font-semibold text-accent">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                  <Github className="h-4 w-4" /> View project <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
