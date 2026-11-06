"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { experience, type ExperienceCategory } from "@/data/content";

const categories: { id: ExperienceCategory; label: string }[] = [
  { id: "research", label: "Research" },
  { id: "professional", label: "Professional" },
];

function TimelineGroup({
  category,
  vertical,
}: {
  category: ExperienceCategory;
  vertical: boolean;
}) {
  const jobs = experience.filter((job) => job.category === category);
  const [selected, setSelected] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <div className="experience-explorer">
      <div
        role="tablist"
        aria-label={`${category === "research" ? "Research" : "Professional"} positions`}
        aria-orientation={vertical ? "vertical" : "horizontal"}
        className="timeline-list"
      >
        {jobs.map((job, index) => (
          <button
            key={job.id}
            ref={(element) => {
              buttons.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`experience-tab-${job.id}`}
            aria-label={job.company}
            aria-controls={`experience-panel-${job.id}`}
            aria-selected={selected === index}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => {
              let next = index;
              if (event.key === (vertical ? "ArrowDown" : "ArrowRight"))
                next = (index + 1) % jobs.length;
              else if (event.key === (vertical ? "ArrowUp" : "ArrowLeft"))
                next = (index - 1 + jobs.length) % jobs.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = jobs.length - 1;
              else return;
              event.preventDefault();
              event.stopPropagation();
              setSelected(next);
              buttons.current[next]?.focus();
            }}
          >
            <span className="timeline-period">{job.period}</span>
            <span className="timeline-company">{job.company}</span>
            <span className="timeline-role">
              {job.role}
              {job.focus ? ` · ${job.focus}` : ""}
            </span>
          </button>
        ))}
      </div>
      <div className="timeline-panels">
        {jobs.map((job, index) => (
          <div
            key={job.id}
            id={`experience-panel-${job.id}`}
            role="tabpanel"
            aria-labelledby={`experience-tab-${job.id}`}
            hidden={selected !== index}
            tabIndex={0}
            className="timeline-panel"
          >
            <h3 className="font-serif text-[30px] leading-tight tracking-[-.035em] sm:text-[38px]">
              {job.role}
            </h3>
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="quiet-link mt-4 text-sm"
            >
              {job.company}
              <ArrowUpRight size={13} className="shrink-0" aria-hidden="true" />
            </a>
            <p className="mt-6 max-w-xl text-base leading-[1.85] text-muted-foreground">
              {job.summary}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ExperienceTimeline() {
  const [category, setCategory] = useState<ExperienceCategory>("research");
  const [vertical, setVertical] = useState(true);
  const categoryButtons = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setVertical(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <div>
      <div className="experience-category-header">
        <div
          role="tablist"
          aria-label="Experience category"
          className="view-switch experience-category-switch"
        >
          {categories.map((item, index) => (
            <button
              key={item.id}
              ref={(element) => {
                categoryButtons.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`experience-category-${item.id}`}
              aria-label={item.label}
              aria-controls={`experience-category-panel-${item.id}`}
              aria-selected={category === item.id}
              tabIndex={category === item.id ? 0 : -1}
              onClick={() => setCategory(item.id)}
              onKeyDown={(event) => {
                let next = index;
                if (event.key === "ArrowRight")
                  next = (index + 1) % categories.length;
                else if (event.key === "ArrowLeft")
                  next = (index - 1 + categories.length) % categories.length;
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = categories.length - 1;
                else return;
                event.preventDefault();
                setCategory(categories[next].id);
                categoryButtons.current[next]?.focus();
              }}
            >
              {item.label}
              <span aria-hidden="true" className="ml-1 text-[10px] opacity-60">
                {experience.filter((job) => job.category === item.id).length}
              </span>
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          {experience.filter((job) => job.category === category).length}{" "}
          positions
        </p>
      </div>
      {categories.map((item) => (
        <div
          key={item.id}
          id={`experience-category-panel-${item.id}`}
          role="tabpanel"
          aria-labelledby={`experience-category-${item.id}`}
          hidden={category !== item.id}
        >
          <TimelineGroup category={item.id} vertical={vertical} />
        </div>
      ))}
    </div>
  );
}
