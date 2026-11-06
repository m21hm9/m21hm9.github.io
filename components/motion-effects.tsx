"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function MotionEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const finishIntro = () =>
      document.documentElement.classList.remove("intro-motion");
    const timer = window.setTimeout(finishIntro, 1800);
    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.remove("reveal-pending");
          entry.target.setAttribute("data-revealed", "true");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
    );
    for (const element of elements) {
      if (
        element.dataset.revealed ||
        element.getBoundingClientRect().top < window.innerHeight
      )
        continue;
      element.classList.add("reveal-pending");
      element.style.setProperty(
        "--reveal-delay",
        `${Number(element.dataset.revealDelay || 0)}ms`,
      );
      observer.observe(element);
    }
    return () => {
      observer.disconnect();
      elements.forEach((element) => {
        element.classList.remove("reveal-pending");
        element.style.removeProperty("--reveal-delay");
      });
    };
  }, [pathname]);

  return null;
}
