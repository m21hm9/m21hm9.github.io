"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { certifications } from "@/data/content";

export function Certifications() {
  return (
    <section
      id="certifications"
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
          Certifications
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mt-2 text-muted-foreground"
        >
          Credentials and courses I&apos;ve completed. Click to view verification.
        </motion.p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => {
            const href = "url" in cert && cert.url ? cert.url : null;
            const cardClass =
              "flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-accent/50 hover:bg-muted/30 " +
              (href ? "cursor-pointer" : "");
            const motionProps = {
              initial: { opacity: 0, y: 16 } as const,
              whileInView: { opacity: 1, y: 0 } as const,
              viewport: { once: true, margin: "-40px" } as const,
              transition: { duration: 0.4, delay: i * 0.06 },
            };
            const content = (
              <>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                  <Award className="h-5 w-5 text-accent" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-foreground">{cert.name}</p>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  <p className="text-xs text-muted-foreground">{cert.year}</p>
                  {href && (
                    <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-accent">
                      View credential
                      <ExternalLink className="h-3.5 w-3.5" />
                    </span>
                  )}
                </div>
              </>
            );
            return href ? (
              <motion.a
                key={i}
                {...motionProps}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClass}
              >
                {content}
              </motion.a>
            ) : (
              <motion.div key={i} {...motionProps} className={cardClass}>
                {content}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
