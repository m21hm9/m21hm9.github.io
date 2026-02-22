"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Briefcase, LayoutGrid, X, ChevronDown } from "lucide-react";
import { education, skills, experience } from "@/data/content";

export function Professional() {
  const [showAllTech, setShowAllTech] = useState(false);
  const [expandedExperience, setExpandedExperience] = useState<Set<number>>(new Set());
  return (
    <section
      id="professional"
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
          Professional
        </motion.h2>

        {/* Education card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <h3 className="flex items-center gap-2 text-xl font-semibold text-foreground">
            <GraduationCap className="h-5 w-5 text-accent" />
            Education
          </h3>
          <ul className="mt-4 space-y-4">
            {education.map((item, i) => (
              <li key={i} className="border-l-2 border-accent/30 pl-4">
                <p className="font-medium text-foreground">{item.school}</p>
                <p className="text-sm text-muted-foreground">{item.degree}</p>
                <p className="text-xs text-muted-foreground">{item.period}</p>
                {item.description && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Tech stack — Hailey style: single horizontal bar with logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-12 rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <h3 className="text-xl font-semibold text-foreground">Tech stack.</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Technologies and tools I work with to build innovative solutions.
          </p>
          <div className="tech-stack-viewport mt-5 overflow-hidden rounded-xl bg-background px-6 py-5">
            <AnimatePresence mode="wait">
              {!showAllTech ? (
                <motion.div
                  key="scroll"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col"
                >
                  <div className="flex w-max flex-nowrap items-center gap-6 pb-1 pt-1 animate-tech-scroll">
                    {[...skills, ...skills].map((skill, i) => (
                      <div
                        key={`${skill.name}-${i}`}
                        className="flex shrink-0 items-center justify-center"
                        title={skill.name}
                      >
                        {"image" in skill && skill.image ? (
                          <span className="flex h-[120px] w-[120px] items-center justify-center overflow-hidden rounded-xl bg-background/80">
                            <Image
                              src={skill.image}
                              alt=""
                              width={84}
                              height={84}
                              className="h-[84px] w-[84px] object-contain"
                              unoptimized
                              decoding="async"
                              draggable={false}
                            />
                          </span>
                        ) : (
                          <span className="flex h-[120px] w-[120px] items-center justify-center rounded-xl bg-background/80 text-sm font-medium text-muted-foreground">
                            {skill.name.slice(0, 2)}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setShowAllTech(true)}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/60 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      aria-label="View all technologies"
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col"
                >
                  <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5">
                    {skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex flex-col items-center gap-2 rounded-xl bg-background/80 p-3 transition-colors hover:bg-background"
                      >
                        {"image" in skill && skill.image ? (
                          <span className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-lg">
                            <Image
                              src={skill.image}
                              alt=""
                              width={72}
                              height={72}
                              className="h-[72px] w-[72px] object-contain"
                              unoptimized
                            />
                          </span>
                        ) : (
                          <span className="flex h-24 w-24 items-center justify-center rounded-lg bg-muted/50 text-sm font-medium text-muted-foreground">
                            {skill.name.slice(0, 2)}
                          </span>
                        )}
                        <span className="text-center text-xs font-medium text-foreground leading-tight">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setShowAllTech(false)}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/60 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      aria-label="Close and show scrolling bar"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Experience — Cool Places I Worked At style: click to expand/collapse */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-12 rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <h3 className="flex items-center gap-2 text-xl font-semibold text-foreground">
            <Briefcase className="h-5 w-5 text-accent" />
            Experiences
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Click an experience to expand and see what I did there.
          </p>
          <div className="mt-6 space-y-2">
            {experience.map((job, i) => {
              const isExpanded = expandedExperience.has(i);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="overflow-hidden rounded-xl border border-border bg-background/50 transition-colors hover:bg-background/80"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedExperience((prev) => {
                        const next = new Set(prev);
                        if (isExpanded) next.delete(i);
                        else next.add(i);
                        return next;
                      })
                    }
                    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-xl"
                    aria-expanded={isExpanded}
                    aria-controls={`experience-details-${i}`}
                    id={`experience-trigger-${i}`}
                  >
                    <div className="min-w-0 flex-1">
                      <h4 className="text-lg font-semibold text-foreground">
                        {job.company}
                      </h4>
                      <p className="mt-0.5 text-sm text-accent">{job.role}</p>
                      <p className="text-xs text-muted-foreground">
                        {job.period}
                        {"location" in job && job.location
                          ? ` · ${job.location}`
                          : ""}
                      </p>
                    </div>
                    <motion.span
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0 text-muted-foreground"
                    >
                      <ChevronDown className="h-5 w-5" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        id={`experience-details-${i}`}
                        role="region"
                        aria-labelledby={`experience-trigger-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="border-t border-border"
                      >
                        <ul className="list-inside list-disc space-y-1 px-4 py-3 text-sm text-muted-foreground">
                          {job.bullets.map((bullet, j) => (
                            <li key={j}>{bullet}</li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
