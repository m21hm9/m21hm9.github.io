import Link from "next/link";
import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, Code2, GitBranch } from "lucide-react";
import { CodePreviewCard } from "@/components/CodePreviewCard";
import { MacWindow } from "@/components/mac-window";
import { withBasePath } from "@/lib/utils";

export function Hero() {
  return (
    <section
      id="hero"
      className="lab-grid relative overflow-hidden border-b border-border px-4 pb-12 pt-28 sm:px-6 lg:px-8 lg:pb-16 lg:pt-32"
    >
      <div className="relative mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
        <div className="hero-copy relative z-10">
          <div className="mb-7 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] tracking-wide">
            <span className="inline-flex items-center gap-2 rounded-md border border-accent/20 bg-accent/5 px-2.5 py-1.5 text-accent">
              <GitBranch className="h-3 w-3" aria-hidden="true" />
              main
            </span>
            <span className="text-muted-foreground">
              ~/matthew<span className="px-1 text-accent">/</span>portfolio
            </span>
          </div>
          <p className="mb-3 font-mono text-sm text-muted-foreground">
            <span className="text-accent">const</span> developer{" "}
            <span className="text-accent">=</span>
          </p>
          <h1 className="max-w-3xl text-6xl font-semibold leading-[0.98] tracking-[-0.065em] text-foreground sm:text-7xl xl:text-8xl">
            Matthew
            <span className="block text-accent">
              Thom<span className="text-foreground/30">.</span>
            </span>
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-foreground/90 sm:text-xl">
            Curious by default.
            <br />
            Building with{" "}
            <span className="hero-underline">AI, data &amp; code.</span>
          </p>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            I turn research questions into experiments, evaluate models and
            build tools that make data easier to understand.
          </p>
          <div className="mt-9 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            <Link
              href="#projects"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:px-5"
            >
              <Code2 className="h-4 w-4" aria-hidden="true" />
              <span className="sm:hidden">Projects</span>
              <span className="hidden sm:inline">Explore my work</span>
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="#contact"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:px-5"
            >
              Let&apos;s connect{" "}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-7 max-w-lg">
            <CodePreviewCard />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div
            className="pointer-events-none absolute inset-x-12 inset-y-16 rounded-full bg-accent/10 blur-3xl"
            aria-hidden="true"
          />
          <p className="mb-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
            <span>01 / the human behind the code</span>
            <span>HK · UTC+8</span>
          </p>
          <MacWindow
            title="me(1).jpeg"
            status="~/life"
            className="relative"
          >
            <div className="relative h-[400px] w-full sm:h-[490px] lg:h-[510px]">
              <Image
                src={withBasePath("/photos/me(1).jpeg")}
                alt="Matthew Thom by the waterfront at sunset"
                fill
                priority
                sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) 512px, 500px"
                className="object-cover object-[center_60%]"
              />
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3 font-mono text-[10px] text-muted-foreground">
              <span>
                <span className="text-accent">●</span> Matthew Thom
              </span>
              <span>outside the editor ↗</span>
            </div>
          </MacWindow>
          <div className="mt-5 flex items-center justify-between gap-3 font-mono text-[10px] text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <span className="h-px w-8 bg-accent/50" />
              AI · data science · Hong Kong
            </span>
            <span aria-hidden="true">&lt;/&gt;</span>
          </div>
        </div>
      </div>
    </section>
  );
}
