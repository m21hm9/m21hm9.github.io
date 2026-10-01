import { ChevronDown, GraduationCap } from "lucide-react";
import { education, experience, skillGroups } from "@/data/content";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-accent">02 / skills.index</p>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Technical toolkit.</h2>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{skillGroups.length} collections / education</span>
        </div>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
          The languages, tools and methods I use across AI and data science projects.
        </p>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="workbench-frame relative overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:px-6">
              <span><span className="text-accent">skills.json</span> / toolkit</span>
              <span>read only</span>
            </div>
            <div className="divide-y divide-border px-5 sm:px-6">
              {skillGroups.map((group, i) => (
                <div key={group.title} className="grid gap-3 py-5 sm:grid-cols-[145px_1fr]">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="font-mono text-xs font-semibold uppercase tracking-wide text-foreground">{group.title}</h3>
                  </div>
                  <ul className="flex flex-wrap gap-2" aria-label={`${group.title} skills`}>
                    {group.skills.map((skill) => (
                      <li key={skill.name} className="rounded border border-border bg-muted/30 px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="workbench-frame relative h-fit overflow-hidden rounded-xl border border-border">
            <div className="border-b border-border px-5 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-accent sm:px-6">education.md</div>
            <div className="p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-accent" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-foreground">Education</h3>
              </div>
              {education.map((item) => (
                <div key={item.school} className="mt-7 border-l border-accent/60 pl-4">
                  <p className="font-semibold leading-snug text-foreground">{item.school}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.degree}</p>
                  <p className="mt-4 font-mono text-[11px] text-accent">{item.period}</p>
                  {item.description && <p className="mt-1 font-mono text-[11px] text-muted-foreground">{item.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 border-t border-border px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-accent">03 / work.log</p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Experience.</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">Selected roles and the work behind them. Open a role to see the details.</p>

        <ol className="relative mt-11 space-y-4 before:absolute before:bottom-7 before:left-[11px] before:top-7 before:w-px before:bg-border">
          {experience.map((job, i) => (
            <li key={job.company} className="relative pl-9 sm:pl-11">
              <span className="absolute left-[6px] top-7 h-[11px] w-[11px] rounded-full border-2 border-accent bg-background" aria-hidden="true" />
              <details className="workbench-frame group relative overflow-hidden rounded-xl border border-border open:border-accent/50">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent [&::-webkit-details-marker]:hidden sm:px-6">
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">log/{String(i + 1).padStart(2, "0")} · {job.period}</p>
                    <h3 className="mt-2 text-lg font-semibold text-foreground">{job.role}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{job.company} · {job.location}</p>
                  </div>
                  <ChevronDown className="h-5 w-5 shrink-0 text-accent transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <ul className="space-y-2 border-t border-border px-6 py-5 pl-10 text-sm leading-relaxed text-muted-foreground sm:pl-11">
                  {job.bullets.map((bullet) => <li key={bullet} className="list-disc">{bullet}</li>)}
                </ul>
              </details>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
