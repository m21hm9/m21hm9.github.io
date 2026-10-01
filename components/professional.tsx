import { BriefcaseBusiness, ChevronDown, GraduationCap } from "lucide-react";
import { education, experience, skillGroups } from "@/data/content";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-accent">02 / foundations</p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Skills and education.</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
          The tools I use and the studies shaping my work in AI and data science.
        </p>

        <div className="mt-10 grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-5 w-5 text-accent" aria-hidden="true" />
              <h3 className="text-xl font-semibold text-foreground">Education</h3>
            </div>
            <div className="mt-7 space-y-6">
              {education.map((item) => (
                <div key={item.school} className="border-l-2 border-accent/50 pl-4">
                  <p className="font-semibold text-foreground">{item.school}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.degree}</p>
                  <p className="mt-3 font-mono text-xs text-accent">{item.period}</p>
                  {item.description && <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-xl font-semibold text-foreground">Toolkit</h3>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">tools & methods</span>
            </div>
            <div className="mt-5 divide-y divide-border">
              {skillGroups.map((group, i) => (
                <div key={group.title} className="grid gap-3 py-4 sm:grid-cols-[130px_1fr]">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-[10px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <h4 className="font-mono text-xs font-semibold uppercase tracking-wide text-foreground">{group.title}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span key={skill.name} className="rounded-md border border-border bg-muted/40 px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
                        {skill.name}
                      </span>
                    ))}
                  </div>
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
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-accent">03 / experience</p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Experience.</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">Selected roles and the work behind them.</p>
        <div className="mt-10">
          <div className="flex items-center gap-3">
            <BriefcaseBusiness className="h-5 w-5 text-accent" aria-hidden="true" />
            <h3 className="text-xl font-semibold text-foreground">Experience</h3>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Open a role to see the work.</p>
          <div className="mt-5 space-y-3">
            {experience.map((job, i) => (
              <details key={job.company} className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm open:border-accent/40">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent [&::-webkit-details-marker]:hidden sm:px-6">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <span className="font-mono text-[10px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                      <h4 className="text-base font-semibold text-foreground sm:text-lg">{job.company}</h4>
                      <span className="text-sm text-muted-foreground">{job.role}</span>
                    </div>
                    <p className="mt-1 pl-7 font-mono text-xs text-muted-foreground">{job.period} · {job.location}</p>
                  </div>
                  <ChevronDown className="h-5 w-5 shrink-0 text-accent transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <ul className="space-y-2 border-t border-border px-6 py-5 pl-12 text-sm leading-relaxed text-muted-foreground sm:pl-14">
                  {job.bullets.map((bullet) => <li key={bullet} className="list-disc">{bullet}</li>)}
                </ul>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
