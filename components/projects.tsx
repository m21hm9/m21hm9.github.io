"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, ExternalLink, RotateCcw } from "lucide-react";
import { projects, techIcons } from "@/data/content";
import { Button } from "@/components/ui/button";

export function Projects() {
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <section
      id="projects"
      className="relative scroll-mt-24 py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          Key Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mt-2 text-muted-foreground"
        >
          Click a card to flip and see details.
        </motion.p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => {
            const isFlipped = flipped === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="perspective-[1000px]"
                style={{ minHeight: 380 }}
              >
                <motion.article
                  onClick={() => setFlipped(isFlipped ? null : i)}
                  className="relative h-full w-full cursor-pointer"
                  style={{ transformStyle: "preserve-3d" }}
                  initial={false}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                >
                  {/* Front: title + tech */}
                  <div
                    className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {project.title}
                      </h3>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tech.map((t) => {
                          const iconUrl = techIcons[t];
                          return (
                            <span
                              key={t}
                              className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent"
                              title={t}
                            >
                              {iconUrl ? (
                                <Image
                                  src={iconUrl}
                                  alt=""
                                  className="h-5 w-5 rounded-sm object-contain"
                                  width={20}
                                  height={20}
                                  unoptimized
                                />
                              ) : null}
                              <span>{t}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Click to flip
                    </p>
                  </div>

                  {/* Back: your description + links */}
                  <div
                    className="absolute inset-0 flex flex-col rounded-2xl border border-border bg-card p-6 shadow-md"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <p className="flex-1 overflow-y-auto text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-shrink-0 flex-wrap gap-2">
                      {project.github && (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="gap-1.5"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Github className="h-4 w-4" />
                            Code
                          </a>
                        </Button>
                      )}
                      {project.liveUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="gap-1.5"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="h-4 w-4" />
                            {project.liveUrl.includes("colab.research.google.com")
                              ? "Colab"
                              : "Demo"}
                          </a>
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFlipped(null);
                        }}
                        className="gap-1.5"
                        title="Flip back"
                      >
                        <RotateCcw className="h-4 w-4" />
                        Back
                      </Button>
                    </div>
                  </div>
                </motion.article>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
