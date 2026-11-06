"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Grid2X2,
  List,
  X,
} from "lucide-react";
import { projects } from "@/data/content";
import { ProjectArtwork } from "@/components/project-artwork";
import { InteractiveStudy } from "@/components/interactive-study";
import { ThemeToggle } from "@/components/theme-toggle";
import { cancelViewTransition, changeView } from "@/lib/view-transition";

export function ProjectCollection() {
  const [view, setView] = useState<"gallery" | "index">("gallery");
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const origin = useRef<HTMLButtonElement | null>(null);
  const returnScroll = useRef(0);
  const isOpen = selected !== null;
  const project = selected === null ? null : projects[selected];

  useEffect(() => {
    const element = dialog.current;
    if (!element || !isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!element.open) element.showModal();
    return () => {
      if (element.open) element.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useLayoutEffect(() => {
    if (!isOpen) return;
    if (dialog.current) dialog.current.scrollTop = 0;
    closeButton.current?.focus({ preventScroll: true });
  }, [selected, isOpen]);

  const openProject = (index: number, button: HTMLButtonElement) => {
    cancelViewTransition();
    origin.current = button;
    returnScroll.current = window.scrollY;
    setSelected(index);
  };
  const move = (direction: number) =>
    setSelected((current) =>
      current === null
        ? null
        : (current + direction + projects.length) % projects.length,
    );
  const restore = () => {
    setSelected(null);
    origin.current?.focus({ preventScroll: true });
    window.scrollTo({ top: returnScroll.current, behavior: "instant" });
  };

  return (
    <>
      <div className="work-toolbar">
        <p className="text-xs text-muted-foreground">
          {String(projects.length).padStart(2, "0")} selected studies
        </p>
        <div role="group" aria-label="Project view" className="view-switch">
          <button
            type="button"
            aria-pressed={view === "gallery"}
            onClick={() => {
              if (view !== "gallery") changeView(() => setView("gallery"));
              else cancelViewTransition();
            }}
          >
            <Grid2X2 size={14} aria-hidden="true" />
            Gallery
          </button>
          <button
            type="button"
            aria-pressed={view === "index"}
            onClick={() => {
              if (view !== "index") changeView(() => setView("index"));
              else cancelViewTransition();
            }}
          >
            <List size={15} aria-hidden="true" />
            Index
          </button>
        </div>
      </div>
      <div className={`work-collection work-${view}`} data-view={view}>
        {projects.map((item, index) => (
          <article key={item.title} className={`work-item work-item-${index}`}>
            <h3>
              <button
                type="button"
                className="work-open group"
                aria-haspopup="dialog"
                aria-labelledby={`work-title-${index}`}
                onClick={(event) => openProject(index, event.currentTarget)}
              >
                <span
                  className="work-cover"
                  style={{ viewTransitionName: `project-cover-${index}` }}
                  aria-hidden="true"
                >
                  <ProjectArtwork index={index} />
                  <span className="work-cover-note">
                    Concept study / 0{index + 1}
                  </span>
                  <span className="work-cover-open">
                    <ArrowUpRight size={20} />
                  </span>
                </span>
                <span className="work-copy">
                  <span className="eyebrow block">
                    0{index + 1}
                    <span className="mx-3 opacity-40">/</span>
                    {item.category}
                  </span>
                  <span id={`work-title-${index}`} className="work-title">
                    {item.title}
                  </span>
                </span>
                <span className="work-summary">
                  {item.summary}
                  <span className="mt-4 block text-xs text-accent">
                    Explore study{" "}
                    <ArrowUpRight
                      size={13}
                      className="ml-1 inline"
                      aria-hidden="true"
                    />
                  </span>
                </span>
              </button>
            </h3>
          </article>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="project-focus"
        aria-labelledby="focus-title"
        onCancel={(event) => {
          event.preventDefault();
          setSelected(null);
        }}
        onClose={restore}
        onKeyDown={(event) => {
          if ((event.target as HTMLElement).closest("[data-study]")) return;
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            move(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        {project && selected !== null && (
          <>
            <div className="focus-toolbar">
              <button
                ref={closeButton}
                autoFocus
                type="button"
                className="quiet-link"
                aria-label="Close project"
                onClick={() => setSelected(null)}
              >
                <X size={18} aria-hidden="true" />
                Back to work
              </button>
              <span className="eyebrow hidden sm:block">
                Selected work / 0{selected + 1}
              </span>
              <ThemeToggle />
            </div>
            <div key={project.title} className="focus-reader">
              <p className="eyebrow mb-5">{project.category}</p>
              <h2 id="focus-title" className="focus-title font-serif">
                {project.title}
              </h2>
              <p className="focus-introduction">{project.summary}</p>
              <div className="focus-body">
                <div>
                  <InteractiveStudy index={selected} />
                  <p className="mt-5 text-xs leading-[1.9] text-muted-foreground">
                    {project.tech.join(" · ")}
                  </p>
                </div>
                <div>
                  <p className="eyebrow mb-4">The research question</p>
                  <p className="font-serif text-[28px] italic leading-[1.45] text-accent sm:text-[34px]">
                    {project.question}
                  </p>
                  <p className="eyebrow mb-4 mt-8">
                    {selected === 0 ? "My contribution" : "What I built"}
                  </p>
                  <ul className="space-y-4 text-sm leading-[1.9] text-muted-foreground">
                    {project.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="border-l border-accent/40 pl-4"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap items-center gap-6">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link"
                    >
                      View on GitHub
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                    {project.metric && (
                      <a
                        href={project.metric.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="quiet-link text-xs"
                      >
                        {project.metric.value} · {project.metric.label}
                        <ArrowUpRight size={13} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="focus-pagination">
              <button
                type="button"
                aria-label="Previous project"
                onClick={() => move(-1)}
              >
                <ArrowLeft size={18} aria-hidden="true" />
                <span>
                  <span className="eyebrow block">Previous study</span>
                  <span className="mt-2 block font-serif text-xl">
                    {
                      projects[
                        (selected - 1 + projects.length) % projects.length
                      ].title
                    }
                  </span>
                </span>
              </button>
              <button
                type="button"
                aria-label="Next project"
                onClick={() => move(1)}
                className="text-right"
              >
                <span>
                  <span className="eyebrow block">Next study</span>
                  <span className="mt-2 block font-serif text-xl">
                    {projects[(selected + 1) % projects.length].title}
                  </span>
                </span>
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
