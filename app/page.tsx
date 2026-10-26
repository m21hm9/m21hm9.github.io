import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Skills, Experience } from "@/components/professional";
import { Projects } from "@/components/projects";
import { Certifications } from "@/components/certifications";
import { Contact } from "@/components/contact";
import { ArrowUp, Github } from "lucide-react";
import { contact } from "@/data/content";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="portfolio-workspace">
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <footer className="border-t border-border bg-card/50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 font-mono text-[10px] text-muted-foreground">
          <span>
            <span className="text-accent">matthew</span>@portfolio:~{" "}
            <span className="ml-2">crafted with curiosity.</span>
          </span>
          <div className="flex items-center gap-5">
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded hover:text-accent focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              GitHub
            </a>
            <a
              href="#hero"
              className="inline-flex items-center gap-1.5 rounded hover:text-accent focus-visible:ring-2 focus-visible:ring-accent"
            >
              Back to top <ArrowUp className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
