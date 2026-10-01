"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/#knowledge-graph", label: "Digital brain" },
  { href: "/#skills", label: "Skills" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#certifications", label: "Credentials" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
      const activationLine = window.innerHeight * 0.32;
      let current: string | null = null;
      for (const link of NAV_LINKS) {
        const id = link.href.split("#")[1];
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= activationLine) current = id;
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        aria-label="Main navigation"
        className={cn(
          "relative mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-xl border border-border bg-background/95 px-4 py-2.5 backdrop-blur-xl transition-shadow sm:px-5",
          isScrolled ? "shadow-lg" : "shadow-sm"
        )}
      >
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" className="shrink-0 font-mono text-sm font-bold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            <span className="text-accent">&lt;</span>matthew.thom<span className="text-accent">/&gt;</span>
          </Link>
          <span className="hidden border-l border-border pl-3 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground xl:inline">/ workspace</span>
        </div>
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={activeSection === link.href.split("#")[1] ? "location" : undefined}
              className={cn(
                "rounded-md px-2.5 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                activeSection === link.href.split("#")[1] && "bg-accent/10 text-accent ring-1 ring-accent/20"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <span className="hidden border-r border-border pr-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground xl:inline">index / 06</span>
          <ThemeToggle className="flex h-9 w-9 shrink-0" />
          <button
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:hidden"
          >
            {isMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
        {isMenuOpen && (
          <div id="mobile-navigation" className="absolute inset-x-0 top-full mt-2 grid gap-1 rounded-xl border border-border bg-background p-2 shadow-lg lg:hidden">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-md px-4 py-3 font-mono text-xs uppercase tracking-wide text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
