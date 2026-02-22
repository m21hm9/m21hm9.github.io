"use client";

import { KnowledgeGraph } from "@/components/knowledge-graph";
import { DIGITAL_BRAIN_DATA } from "@/lib/knowledge-graph-data";

export default function GraphPage() {
  return (
    <div className="h-screen w-screen bg-background">
      <KnowledgeGraph data={DIGITAL_BRAIN_DATA} height={600} />
    </div>
  );
}
