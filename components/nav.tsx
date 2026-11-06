"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/#projects", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
  { href: "/photos", label: "Photos" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const desktopLinks = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    visible: false,
  });

  useLayoutEffect(() => {
    const container = desktopLinks.current;
    if (!container) return;
    let disposed = false;
    const measure = () => {
      if (disposed) return;
      const active =
        container.querySelector<HTMLAnchorElement>("a[aria-current]");
      if (!active || !container.getBoundingClientRect().width) {
        setIndicator((previous) => ({ ...previous, visible: false }));
        return;
      }
      setIndicator({
        left: active.offsetLeft,
        width: active.offsetWidth,
        visible: true,
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    document.fonts.ready.then(measure);
    return () => {
      disposed = true;
      observer.disconnect();
    };
  }, [activeSection, pathname]);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }
    const sections = links
      .map((link) => link.href.split("#")[1])
      .filter(Boolean);
    let frame = 0;
    const update = () => {
      frame = 0;
      const activationLine = Math.min(window.innerHeight * 0.3, 220);
      let current: string | null = null;
      for (const id of sections) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= activationLine)
          current = id;
      }
      if (
        window.scrollY > 0 &&
        window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 4
      )
        current = "contact";
      setActiveSection(current);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    const main = document.querySelector("main");
    if (main) observer.observe(main);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  const current = (href: string): "page" | "location" | undefined => {
    const section = href.split("#")[1];
    if (section)
      return pathname === "/" && activeSection === section
        ? "location"
        : undefined;
    return href === pathname ? "page" : undefined;
  };

  const navigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false);
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    )
      return;
    const sectionId = href.split("#")[1];
    const section =
      sectionId && pathname === "/" ? document.getElementById(sectionId) : null;
    if (!section) return;
    event.preventDefault();
    section.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
    if (window.location.hash !== `#${sectionId}`)
      window.history.pushState(window.history.state, "", href);
  };

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const closeOnDesktop = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnDesktop);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-background focus:p-3"
      >
        Skip to content
      </a>
      <nav
        aria-label="Main navigation"
        className="site-container relative flex h-20 items-center justify-between gap-5"
      >
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-serif whitespace-nowrap text-[25px] tracking-[-.05em]"
        >
          Matthew Thom<span className="text-accent">.</span>
        </Link>
        <div className="flex items-center gap-5 lg:gap-8">
          <div
            ref={desktopLinks}
            className="relative hidden items-center gap-6 md:flex lg:gap-8"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current(link.href)}
                onClick={(event) => navigate(event, link.href)}
                className="nav-link text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <span
              aria-hidden="true"
              className="nav-indicator"
              style={{
                width: indicator.width,
                transform: `translateX(${indicator.left}px)`,
                opacity: indicator.visible ? 1 : 0,
              }}
            />
          </div>
          <div className="flex items-center gap-2 md:border-l md:pl-5">
            <ThemeToggle />
            <button
              ref={menuButton}
              type="button"
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen(!open)}
              className="flex h-10 w-10 items-center justify-center md:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {open && (
          <div
            id="mobile-navigation"
            className="absolute inset-x-0 top-full grid border-b bg-background px-6 py-5 shadow-sm md:hidden"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current(link.href)}
                onClick={(event) => navigate(event, link.href)}
                className="py-3 text-base text-muted-foreground hover:text-foreground aria-[current]:text-accent"
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
