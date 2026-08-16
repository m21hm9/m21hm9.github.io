import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { KnowledgeGraphSection } from "@/components/knowledge-graph-section";
import { Professional } from "@/components/professional";
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
        <section id="knowledge-graph" className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              My Digital Brain
            </h2>
            <p className="text-muted-foreground text-sm mb-4">
              Data Science student at City University of Hong Kong. Haha this is my digital brain!
            </p>
            <KnowledgeGraphSection data={DIGITAL_BRAIN_DATA} height={500} />
          </div>
        </section>
        <Professional />
        <Projects />
        <Certifications />
        <Contact />
      </main>
    </>
  );
}
