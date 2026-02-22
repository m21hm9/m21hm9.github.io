"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Phone } from "lucide-react";
import { contact } from "@/data/content";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          Get in Touch
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mt-4 text-muted-foreground"
        >
          Have a question or want to collaborate? I&apos;d love to hear from
          you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          {"phone" in contact && contact.phone && (
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-foreground transition-colors hover:border-accent/50 hover:bg-muted/50"
            >
              <Phone className="h-5 w-5 text-accent" />
              <span>Phone</span>
            </a>
          )}
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-foreground transition-colors hover:border-accent/50 hover:bg-muted/50"
          >
            <Mail className="h-5 w-5 text-accent" />
            <span>Email</span>
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-foreground transition-colors hover:border-accent/50 hover:bg-muted/50"
          >
            <Linkedin className="h-5 w-5 text-accent" />
            <span>LinkedIn</span>
          </a>
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-foreground transition-colors hover:border-accent/50 hover:bg-muted/50"
          >
            <Github className="h-5 w-5 text-accent" />
            <span>GitHub</span>
          </a>
          {"huggingface" in contact && contact.huggingface && (
            <a
              href={contact.huggingface}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-foreground transition-colors hover:border-accent/50 hover:bg-muted/50"
            >
              <span className="text-accent font-medium">HF</span>
              <span>HuggingFace</span>
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
