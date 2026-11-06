import { ArrowUpRight } from "lucide-react";
import { contact } from "@/data/content";

const socials = [
  { label: "LinkedIn", href: contact.linkedin },
  { label: "GitHub", href: contact.github },
  { label: "Hugging Face", href: contact.huggingface },
];

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="border-y bg-muted/30"
    >
      <div className="site-container section-space">
        <p className="eyebrow mb-7">
          05 <span className="mx-2 opacity-40">/</span> Get in touch
        </p>
        <div className="grid gap-10 md:grid-cols-2 md:items-end md:gap-16">
          <h2 data-reveal id="contact-title" className="section-heading">
            Good things start
            <br />
            with a <em className="text-accent">conversation.</em>
          </h2>
          <div data-reveal data-reveal-delay="90" className="md:pb-1">
            <p className="max-w-sm text-sm leading-[1.85] text-muted-foreground">
              Have a question, an idea, or something you&apos;d like to work on
              together? I&apos;d love to hear from you.
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="mt-6 inline-flex max-w-full items-center gap-3 border-b border-foreground/40 pb-2 text-base transition-colors hover:text-accent sm:text-lg"
            >
              <span className="break-all">{contact.email}</span>
              <ArrowUpRight size={18} className="shrink-0" aria-hidden="true" />
            </a>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-4">
              {socials.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="quiet-link text-xs"
                >
                  {link.label}
                  <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              ))}
            </div>
            <a
              href={`tel:${contact.phone.replace(/[\s-]/g, "")}`}
              className="quiet-link mt-5 text-xs"
            >
              {contact.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
