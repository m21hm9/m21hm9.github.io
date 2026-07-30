"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Award,
  Brain,
  BriefcaseBusiness,
  Home,
  Mail,
  Shapes,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

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
      <TooltipProvider>
        <div className="flex justify-center px-2 pt-2 sm:px-4 sm:pt-3 lg:px-8">
          <div
            className={cn(
              "w-fit overflow-hidden rounded-2xl bg-background/80 backdrop-blur-xl border border-border/70 shadow-lg transition-all duration-300",
              isScrolled ? "shadow-md" : "shadow-sm"
            )}
          >
            <nav className="flex items-center justify-center px-2 py-2 sm:px-3 sm:py-3">
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                {/* Desktop nav - icon buttons centered */}
                <div className="hidden md:flex items-center gap-1">
                  {NAV_LINKS.map((link) => (
                    <Tooltip key={link.href}>
                      <TooltipTrigger asChild>
                        <Button
                          asChild
                          variant="ghost"
                          size="icon"
                          className={cn(
                            "size-11 rounded-xl bg-background/40 hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-200 transform-gpu hover:scale-110",
                            "[&_svg]:size-4 text-muted-foreground hover:text-foreground"
                          )}
                          aria-label={link.ariaLabel}
                        >
                          <Link href={link.href}>
                            <link.Icon />
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>{link.ariaLabel}</TooltipContent>
                    </Tooltip>
                  ))}
                </div>

                {/* Mobile nav - horizontal row of smaller icon links */}
                <div className="flex md:hidden items-center gap-1">
                  {NAV_LINKS.map((link) => (
                    <Button
                      key={link.href}
                      asChild
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "size-9 rounded-xl bg-background/40 hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-200 transform-gpu hover:scale-110",
                        "[&_svg]:size-4 text-muted-foreground hover:text-foreground"
                      )}
                      aria-label={link.ariaLabel}
                    >
                      <Link href={link.href}>
                        <link.Icon />
                      </Link>
                    </Button>
                  ))}
                </div>

                <ThemeToggle className="hidden sm:flex md:flex" />
              </div>
            </nav>
          </div>
        </div>
      </TooltipProvider>
    </motion.header>
  );
}
