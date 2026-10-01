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
        <section id="knowledge-graph" className="workbench-grid scroll-mt-24 border-b border-border px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-accent">01 / knowledge graph</p>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">My digital brain.</h2>
            <p className="mb-8 mt-4 max-w-2xl leading-relaxed text-muted-foreground">
              A map of the tools, experiences and ideas behind my work. Switch between 2D and 3D to explore how they connect.
            </p>
            <div className="workbench-frame relative overflow-hidden rounded-xl border border-border">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground sm:px-6">
                <span><span className="text-accent">graph.view</span> / interactive map</span>
                <span>{DIGITAL_BRAIN_DATA.nodes.length} nodes · {DIGITAL_BRAIN_DATA.links.length} connections</span>
              </div>
              <div className="p-4 sm:p-6">
                <KnowledgeGraphSection data={DIGITAL_BRAIN_DATA} height={480} />
              </div>
              <p className="border-t border-border px-4 py-3 font-mono text-[11px] text-muted-foreground sm:px-6">
                input: drag to explore · switch layouts · click the background to reset
              </p>
            </div>
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
