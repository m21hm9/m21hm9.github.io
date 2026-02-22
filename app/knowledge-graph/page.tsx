import { KnowledgeGraph } from "@/components/knowledge-graph";
import { DIGITAL_BRAIN_DATA } from "@/lib/knowledge-graph-data";
import { Nav } from "@/components/nav";

export default function KnowledgeGraphPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <section id="knowledge-graph" className="space-y-4">
            <h1 className="text-2xl font-semibold text-foreground">
              My Digital Brain
            </h1>
            <p className="text-muted-foreground text-sm">
              Education, skills, experience, projects & certifications — all connected. Click a node to focus, click background to reset, drag nodes to explore.
            </p>
            <KnowledgeGraph data={DIGITAL_BRAIN_DATA} height={500} />
          </section>
        </div>
      </main>
    </>
  );
}
