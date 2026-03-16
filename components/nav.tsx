"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Brain, BriefcaseBusiness, Home, Mail, Menu, Shapes, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", Icon: Home, ariaLabel: "Home" },
  { href: "/#knowledge-graph", Icon: Brain, ariaLabel: "Digital Brain" },
  { href: "/#professional", Icon: BriefcaseBusiness, ariaLabel: "Professional" },
  { href: "/#projects", Icon: Shapes, ariaLabel: "Projects" },
  { href: "/#certifications", Icon: Award, ariaLabel: "Certifications" },
  { href: "/#contact", Icon: Mail, ariaLabel: "Contact" },
];

export function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="flex justify-center px-4 pt-3 sm:px-6 lg:px-8">
        <div
          className={cn(
            "w-fit overflow-hidden rounded-2xl bg-background/90 backdrop-blur-md border border-border transition-all duration-300",
            isScrolled ? "shadow-md" : "shadow-sm"
          )}
        >
          <nav className="flex items-center justify-center px-4 py-4">
            <div className="flex items-center justify-center gap-3">
              <div className="hidden md:flex items-center gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-label={link.ariaLabel}
                    title={link.ariaLabel}
                    className="px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                  >
                    <link.Icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>

              <ThemeToggle className="hidden sm:flex" />
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileOpen((o) => !o)}
                aria-label="Toggle menu"
              >
                {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </nav>

          <AnimatePresence>
            {isMobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden border-t border-border bg-background/95 backdrop-blur"
              >
                <div className="flex flex-col px-4 py-4 gap-1">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileOpen(false)}
                      aria-label={link.ariaLabel}
                      title={link.ariaLabel}
                      className="px-3 py-2 text-muted-foreground hover:text-foreground rounded-md"
                    >
                      <span className="inline-flex items-center gap-2">
                        <link.Icon className="h-5 w-5" />
                        <span>{link.ariaLabel}</span>
                      </span>
                    </Link>
                  ))}
                  <div className="flex items-center gap-2 pt-2 border-t border-border">
                    <ThemeToggle />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}
