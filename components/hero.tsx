import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { withBasePath } from "@/lib/utils";

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="intro-title"
      className="site-container pb-9 pt-16 sm:pt-24 lg:pt-28"
    >
      <div className="grid items-center gap-12 pb-14 md:grid-cols-[1.15fr_0.85fr] lg:pb-20">
        <div className="hero-introduction relative z-10">
          <p className="eyebrow mb-7 sm:mb-9">
            Data science · Artificial intelligence
          </p>
          <h1 id="intro-title" className="hero-title font-serif">
            From questions
            <br />
            to <em className="text-accent">understanding.</em>
          </h1>
          <p className="mt-8 max-w-[440px] text-base leading-[1.8] text-muted-foreground sm:text-lg">
            I&apos;m <span className="text-foreground">Matthew Thom</span>, a
            data science student in Hong Kong. I explore AI through research,
            experiments, and building useful things.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-8">
            <Link href="#projects" className="text-link">
              Explore my work <ArrowDown size={15} aria-hidden="true" />
            </Link>
            <Link href="#contact" className="quiet-link">
              Get in touch <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <figure className="hero-portrait-group mx-auto w-full max-w-[360px] md:ml-auto md:mr-0">
          <div className="hero-portrait relative aspect-[4/5] overflow-hidden rounded-sm">
            <Image
              src={withBasePath("/photos/me(1).jpeg")}
              alt="Matthew Thom by the waterfront at sunset"
              fill
              priority
              sizes="(max-width: 767px) 90vw, 360px"
              className="portrait object-cover object-[center_60%]"
            />
          </div>
          <figcaption className="mt-4 text-center text-[10px] tracking-[.14em] text-muted-foreground">
            IDEAS, CONNECTIONS, POSSIBILITIES.
          </figcaption>
        </figure>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t py-5 text-xs text-muted-foreground">
        <span>
          BSc Data Science <span className="mx-2 opacity-40">/</span> City
          University of Hong Kong
        </span>
      </div>
    </section>
  );
}
