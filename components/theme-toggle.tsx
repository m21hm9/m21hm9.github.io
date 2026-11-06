"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { cancelViewTransition } from "@/lib/view-transition";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={() => {
        cancelViewTransition();
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
      aria-label="Toggle light and dark mode"
      title={
        resolvedTheme === "dark"
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      className="relative flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      <Moon
        size={17}
        className="theme-icon theme-icon-moon absolute"
        aria-hidden="true"
      />
      <Sun
        size={18}
        className="theme-icon theme-icon-sun absolute"
        aria-hidden="true"
      />
    </button>
  );
}
