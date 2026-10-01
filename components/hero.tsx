import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { CodePreviewCard } from "@/components/CodePreviewCard";
import { ParticleFace } from "@/components/ParticleFace";

export function Hero() {
  return (
    <section id="hero" className="lab-grid relative overflow-hidden border-b border-border px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pb-28 lg:pt-40">
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div className="relative z-10">
          <div className="mb-7 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em]">
            <span className="flex items-center gap-2 text-accent"><span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />00 / profile</span>
            <span className="text-muted-foreground">AI · data science · Hong Kong</span>
          </div>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.06] tracking-[-0.055em] text-foreground sm:text-6xl xl:text-7xl">
            Hi, I&apos;m <span className="text-accent">Matthew Thom.</span>
          </h1>
          <p className="mt-8 max-w-xl border-l-2 border-accent pl-5 text-lg leading-relaxed text-foreground/90 sm:text-xl">
            I build AI projects that help explore research, evaluate models and understand data.
          </p>
          <p className="mt-5 max-w-xl pl-[22px] text-sm leading-relaxed text-muted-foreground">
            My work spans analytics, model evaluation and applied AI, with a focus on practical experiments and clear results.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="#projects"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Explore projects <ArrowDownRight className="h-4 w-4" />
            </Link>
            <Link
              href="#contact"
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-card px-5 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Get in touch <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 max-w-lg">
            <CodePreviewCard />
          </div>
        </div>

        <div className="workbench-frame relative mx-auto w-full max-w-lg overflow-hidden rounded-xl border border-border">
          <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:px-5">
            <span><span className="text-accent">fig. 01</span> / particle portrait</span>
            <span className="hidden sm:inline">interactive study</span>
          </div>
          <div className="relative">
            <div className="absolute inset-x-10 inset-y-12 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />
            <ParticleFace />
            <div className="portrait-scan absolute inset-0" aria-hidden="true" />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground sm:px-5">
            <span>input: click or tap to scatter</span>
            <span className="text-accent">render: particles</span>
          </div>
        </div>
      </div>
    </section>
  );
}
