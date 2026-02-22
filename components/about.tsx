"use client";

import { motion } from "framer-motion";

export function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          About
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mt-8 space-y-6 text-muted-foreground leading-relaxed"
        >
          <p>
            I&apos;m a Data Science student at City University of Hong Kong with
            a strong focus on AI, machine learning, and building systems that
            scale. My work centers on LLMs and AI agents—from prototyping
            retrieval-augmented pipelines to deploying practical tools for
            data analysis and automation.
          </p>
          <p>
            Growing up in Hong Kong has given me a blend of technical rigour and
            an international outlook. I&apos;m comfortable working across
            Python, data engineering, and modern ML tooling, and I enjoy turning
            messy real-world data into clear insights and actionable solutions.
          </p>
          <p>
            When I&apos;m not coding or studying, I keep up with the latest in
            AI research and open-source projects. I&apos;m always open to
            collaboration on data science or AI-related projects—feel free to
            reach out.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
