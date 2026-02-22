"use client";

import { useRef, useCallback, useState, useMemo, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import type { KnowledgeGraphData } from "@/lib/knowledge-graph-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LayoutGrid, Box } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import type { GraphCanvasRef, Theme } from "reagraph";

const GraphCanvas = dynamic(
  () =>
    import("reagraph")
      .then((mod) => mod.GraphCanvas)
      .catch((err) => {
        console.error("Reagraph load failed:", err);
        throw err;
      }),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[400px] items-center justify-center bg-muted/30">
        <span className="text-sm text-muted-foreground">Loading graph...</span>
      </div>
    ),
  }
);

type LayoutType = "forceDirected2d" | "forceDirected3d";

interface KnowledgeGraphProps {
  data: KnowledgeGraphData;
  height?: number;
}

function toReagraphData(data: KnowledgeGraphData) {
  const nodeColors: Record<string, string> = {
    education: "#3b82f6",
    skill: "#10b981",
    experience: "#f59e0b",
    role: "#8b5cf6",
    project: "#ec4899",
    certification: "#06b6d4",
    issuer: "#6b7280",
    domain: "#6366f1",
  };

  const nodes = data.nodes.map((n) => ({
    id: n.id,
    label: n.name,
    size: n.val ?? 6,
    fill: nodeColors[n.group ?? "skill"] ?? "#64748b",
  }));

  const edges = data.links.map((link, i) => ({
    id: `${link.source}-${link.target}-${i}`,
    source: link.source,
    target: link.target,
    label: link.name,
  }));

  return { nodes, edges };
}

export function KnowledgeGraph({ data, height = 500 }: KnowledgeGraphProps) {
  const graphRef = useRef<GraphCanvasRef | null>(null);
  const [layoutType, setLayoutType] = useState<LayoutType>("forceDirected2d");
  const { resolvedTheme } = useTheme();
  const { nodes, edges } = useMemo(() => toReagraphData(data), [data]);
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    import("reagraph").then((mod) => {
      setTheme(resolvedTheme === "dark" ? mod.darkTheme : mod.lightTheme);
    });
  }, [resolvedTheme]);

  const handleFitView = useCallback(() => {
    graphRef.current?.fitNodesInView?.();
  }, []);

  // Fit graph to view when mounted or layout changes (layout settles after a short delay)
  useEffect(() => {
    if (!theme) return;
    const t = setTimeout(() => {
      graphRef.current?.fitNodesInView?.();
    }, 800);
    return () => clearTimeout(t);
  }, [theme, layoutType]);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={layoutType === "forceDirected2d" ? "default" : "outline"}
          size="sm"
          onClick={() => setLayoutType("forceDirected2d")}
          className={cn(
            "gap-1.5",
            layoutType === "forceDirected2d" && "ring-2 ring-accent/50"
          )}
        >
          <LayoutGrid className="h-4 w-4" />
          2D
        </Button>
        <Button
          variant={layoutType === "forceDirected3d" ? "default" : "outline"}
          size="sm"
          onClick={() => setLayoutType("forceDirected3d")}
          className={cn(
            "gap-1.5",
            layoutType === "forceDirected3d" && "ring-2 ring-accent/50"
          )}
        >
          <Box className="h-4 w-4" />
          3D
        </Button>
        <Button variant="outline" size="sm" onClick={handleFitView}>
          Fit view
        </Button>
      </div>
      <div
        className="relative w-full overflow-hidden rounded-lg border border-border bg-background shrink-0"
        style={{ width: "100%", height, minHeight: 400 }}
      >
        {theme ? (
          <Suspense
            fallback={
              <div className="flex h-full min-h-[400px] items-center justify-center bg-muted/30">
                <span className="text-sm text-muted-foreground">Loading graph...</span>
              </div>
            }
          >
            <GraphCanvas
              ref={graphRef}
              nodes={nodes}
              edges={edges}
              layoutType={layoutType}
              cameraMode={layoutType === "forceDirected3d" ? "rotate" : "pan"}
              theme={theme}
              labelType="all"
              onCanvasClick={handleFitView}
              glOptions={{ antialias: true, alpha: true }}
            />
          </Suspense>
        ) : (
          <div className="flex h-full min-h-[400px] items-center justify-center bg-muted/30">
            <span className="text-sm text-muted-foreground">Loading graph...</span>
          </div>
        )}
      </div>
    </div>
  );
}
