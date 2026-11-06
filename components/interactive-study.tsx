"use client";

import { useRef, useState } from "react";
import { ProjectArtwork, StudyCaption } from "@/components/project-artwork";

const workflow = [
  {
    name: "Question",
    detail: "A broad topic becomes a set of targeted research queries.",
    x: 83,
  },
  {
    name: "Search",
    detail: "Tavily searches the generated queries in parallel.",
    x: 246,
  },
  {
    name: "Reflect",
    detail: "The agent checks completeness before continuing its research.",
    x: 410,
  },
  {
    name: "Report",
    detail: "Findings come together in a sourced Markdown report.",
    x: 518,
  },
];

export function InteractiveStudy({ index }: { index: number }) {
  const [step, setStep] = useState(0);
  const stepButtons = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <figure data-study className="interactive-study">
      <div className="study-surface study-playground">
        <ProjectArtwork index={index} />
        {index === 1 && (
          <svg
            className="study-overlay"
            viewBox="0 0 600 360"
            fill="none"
            aria-hidden="true"
          >
            <g
              className="study-marker"
              style={{ transform: `translate(${workflow[step].x}px, 180px)` }}
            >
              <circle r="38" fill="currentColor" opacity=".07" />
              <circle
                r="38"
                stroke="currentColor"
                strokeWidth="1"
                opacity=".6"
              />
              <circle r="4" fill="currentColor" />
            </g>
          </svg>
        )}
      </div>
      <StudyCaption index={index} />
      {index === 1 && (
        <div className="study-controls">
          <div
            role="tablist"
            aria-label="Research workflow"
            className="study-steps"
          >
            {workflow.map((item, position) => (
              <button
                key={item.name}
                ref={(element) => {
                  stepButtons.current[position] = element;
                }}
                role="tab"
                type="button"
                id={`workflow-${position}`}
                aria-controls="workflow-explanation"
                aria-selected={step === position}
                tabIndex={step === position ? 0 : -1}
                onClick={() => setStep(position)}
                onKeyDown={(event) => {
                  let next = position;
                  if (event.key === "ArrowRight")
                    next = (position + 1) % workflow.length;
                  else if (event.key === "ArrowLeft")
                    next = (position - 1 + workflow.length) % workflow.length;
                  else if (event.key === "Home") next = 0;
                  else if (event.key === "End") next = workflow.length - 1;
                  else return;
                  event.preventDefault();
                  event.stopPropagation();
                  setStep(next);
                  stepButtons.current[next]?.focus();
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
          <p
            id="workflow-explanation"
            role="tabpanel"
            aria-labelledby={`workflow-${step}`}
            className="mt-4 text-sm leading-relaxed text-muted-foreground"
          >
            {workflow[step].detail}
          </p>
        </div>
      )}
    </figure>
  );
}
