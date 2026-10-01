import { ArrowUpRight, Github, Linkedin, Mail, Phone } from "lucide-react";
import { contact } from "@/data/content";

const contactLinks = [
  { label: "Email", detail: contact.email, href: `mailto:${contact.email}`, icon: Mail },
  { label: "LinkedIn", detail: "Matthew Thom", href: contact.linkedin, icon: Linkedin },
  { label: "GitHub", detail: "m21hm9", href: contact.github, icon: Github },
  { label: "Phone", detail: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}`, icon: Phone },
];

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-border bg-card/40 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-accent">06 / contact.sh</p>
        <div className="workbench-frame relative mt-6 grid overflow-hidden rounded-xl border border-border md:grid-cols-[0.85fr_1.15fr]">
          <div className="border-b border-border p-6 sm:p-8 md:border-b-0 md:border-r">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">open channel / collaboration</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Get in touch.</h2>
            <p className="mt-4 max-w-sm leading-relaxed text-muted-foreground">Have a question or want to collaborate? I&apos;d love to hear from you.</p>
            <p className="mt-10 font-mono text-[11px] text-muted-foreground"><span className="text-accent">$</span> choose a channel →</p>
          </div>
          <div className="divide-y divide-border">
            {contactLinks.map(({ label, detail, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 px-6 py-5 transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent sm:px-8"
              >
                <Icon className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</span>
                  <span className="mt-1 block truncate text-sm font-medium text-foreground">{detail}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent" aria-hidden="true" />
              </a>
            ))}
            <a
              href={contact.huggingface}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 px-6 py-5 transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent sm:px-8"
            >
              <span className="w-4 shrink-0 font-mono text-xs font-semibold text-accent">HF</span>
              <span className="min-w-0 flex-1">
                <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Hugging Face</span>
                <span className="mt-1 block text-sm font-medium text-foreground">matt2py2</span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
