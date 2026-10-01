import { ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/data/content";

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 border-y border-border bg-card/40 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-accent">04 / research.index</p>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Projects and contributions.</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
              The first four repositories pinned to my GitHub, spanning open-source molecular AI, research agents and machine learning experiments.
            </p>
          </div>
          <a
            href="https://github.com/m21hm9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 font-mono text-xs text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            All repositories <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div className="workbench-frame relative mt-10 overflow-hidden rounded-xl border border-border">
          <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:px-7">
            <span><span className="text-accent">research/</span> index.md</span>
            <span>{String(projects.length).padStart(2, "0")} entries</span>
          </div>
          <div className="divide-y divide-border">
            {projects.map((project, i) => (
              <article key={project.title} className="grid gap-5 p-5 transition-colors hover:bg-muted/20 sm:p-7 lg:grid-cols-[180px_1fr] lg:gap-8">
                <div className="font-mono text-[11px] uppercase tracking-[0.1em]">
                  <p className="text-accent">{String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</p>
                  <p className="mt-2 text-muted-foreground">research/{String(i + 1).padStart(2, "0")}.md</p>
                  <p className="mt-5 max-w-40 border-l border-accent/50 pl-3 leading-relaxed text-muted-foreground">{project.category}</p>
                </div>

                <div className="min-w-0">
                  <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{project.title}</h3>
                  <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">{project.summary}</p>

                  <div className="mt-6 grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
                    <div className="border-l border-border pl-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">// research question</p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground">{project.question}</p>
                    </div>
                    <div className="border-l border-border pl-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                        {i === 0 ? "// my contribution" : "// what I built"}
                      </p>
                      <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                        {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-4 border-t border-border pt-5">
                    {project.metric && (
                      <a
                        href={project.metric.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-wrap items-baseline gap-x-2 rounded border border-accent/30 bg-accent/5 px-3 py-1.5 text-accent hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <strong className="font-mono text-base">{project.metric.value}</strong>
                        <span className="text-xs">{project.metric.label}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 self-center" aria-hidden="true" />
                      </a>
                    )}
                    <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-muted-foreground">
                      {project.tech.slice(0, 5).map((tech) => <span key={tech}>#{tech.replaceAll(" ", "-")}</span>)}
                    </div>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:ml-auto"
                    >
                      <Github className="h-4 w-4" aria-hidden="true" /> View project <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
