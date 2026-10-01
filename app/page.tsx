import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { KnowledgeGraphSection } from "@/components/knowledge-graph-section";
import { Skills, Experience } from "@/components/professional";
import { Projects } from "@/components/projects";
import { Certifications } from "@/components/certifications";
import { Contact } from "@/components/contact";
import { DIGITAL_BRAIN_DATA } from "@/lib/knowledge-graph-data";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <section id="knowledge-graph" className="scroll-mt-24 border-y border-border bg-card/50 px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-accent">01 / explore the connections</p>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">My digital brain.</h2>
            <p className="mb-8 mt-4 max-w-2xl leading-relaxed text-muted-foreground">
              A map of the tools, experiences and ideas behind my work. Switch between 2D and 3D to explore how they connect.
            </p>
            <KnowledgeGraphSection data={DIGITAL_BRAIN_DATA} height={440} />
            <p className="mt-4 font-mono text-xs text-muted-foreground">
              Drag to explore · switch layouts · click the background to reset the view
            </p>
          </div>
        </section>
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>
    </>
  );
}
