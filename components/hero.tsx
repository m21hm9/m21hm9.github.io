import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { CodePreviewCard } from "@/components/CodePreviewCard";
import { ParticleFace } from "@/components/ParticleFace";

export function Hero() {
  return (
    <section id="hero" className="lab-grid relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pb-28 lg:pt-40">
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div className="relative z-10">
          <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 font-mono text-xs tracking-wide text-muted-foreground shadow-sm">
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            DATA SCIENCE · AI · HONG KONG
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.06] tracking-[-0.055em] text-foreground sm:text-6xl xl:text-7xl">
            Hi, I&apos;m <span className="text-accent">Matthew Thom.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            I build AI projects that help explore research, evaluate models and understand data.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Data Science student at City University of Hong Kong, with experience in analytics, model evaluation and applied AI.
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

        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute inset-x-10 inset-y-12 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />
          <ParticleFace />
          <p className="absolute bottom-2 right-2 rounded-full border border-border bg-card/90 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground shadow-sm sm:bottom-4">
            interactive portrait / click to scatter
          </p>
        </div>
      </div>
    </section>
  );
}
