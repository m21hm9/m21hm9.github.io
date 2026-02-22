"use client";

import dynamic from "next/dynamic";
import { ErrorBoundary } from "@/components/error-boundary";
import type { KnowledgeGraphData } from "@/lib/knowledge-graph-data";

const KnowledgeGraph = dynamic(
  () => import("@/components/knowledge-graph").then((mod) => mod.KnowledgeGraph),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[500px] items-center justify-center rounded-lg border border-border bg-muted/20">
        <span className="text-sm text-muted-foreground">Loading graph...</span>
      </div>
    ),
  }
);

interface KnowledgeGraphSectionProps {
  data: KnowledgeGraphData;
  height?: number;
}

export function KnowledgeGraphSection({ data, height = 500 }: KnowledgeGraphSectionProps) {
  return (
    <ErrorBoundary>
      <KnowledgeGraph data={data} height={height} />
    </ErrorBoundary>
  );
}
