"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Braces,
  Camera,
  Command,
  FileBadge,
  FolderGit2,
  Mail,
  Search,
  UserRound,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const DESTINATIONS = [
  {
    title: "About Matthew",
    detail: "The person behind the projects",
    href: "/#hero",
    icon: UserRound,
    keywords: "home profile introduction",
  },
  {
    title: "Technical toolkit",
    detail: "Languages, frameworks & tools",
    href: "/#skills",
    icon: Braces,
    keywords: "skills stack technology python react",
  },
  {
    title: "Experience",
    detail: "Roles and the work behind them",
    href: "/#experience",
    icon: Command,
    keywords: "work jobs career",
  },
  {
    title: "Projects & contributions",
    detail: "Research, experiments & open source",
    href: "/#projects",
    icon: FolderGit2,
    keywords: "github repos ai research",
  },
  {
    title: "Credentials",
    detail: "Courses and certifications",
    href: "/#certifications",
    icon: FileBadge,
    keywords: "learning education certificates",
  },
  {
    title: "Get in touch",
    detail: "Find a channel to connect",
    href: "/#contact",
    icon: Mail,
    keywords: "contact email linkedin",
  },
  {
    title: "Photo journal",
    detail: "A few things outside the editor",
    href: "/photos",
    icon: Camera,
    keywords: "photos gallery food",
  },
];

export function CommandMenu() {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [mac, setMac] = useState(false);
  const search = query.trim().toLowerCase();
  const results = DESTINATIONS.filter((item) =>
    `${item.title} ${item.detail} ${item.keywords}`
      .toLowerCase()
      .includes(search),
  ).sort((a, b) => {
    if (!search) return 0;
    const score = (item: (typeof DESTINATIONS)[number]) =>
      (item.title.toLowerCase().includes(search) ? 3 : 0) +
      (item.keywords.includes(search) ? 2 : 0);
    return score(b) - score(a);
  });

  function show() {
    setQuery("");
    setActive(0);
    setOpen(true);
    dialogRef.current?.showModal();
    inputRef.current?.focus();
  }
  function close() {
    dialogRef.current?.close();
    setOpen(false);
  }
  function navigate(href: string) {
    close();
    router.push(href);
  }

  useEffect(() => {
    if (!open) return;
    dialogRef.current
      ?.querySelector(`#command-option-${active}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active, query, open]);

  useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.platform));
    const shortcut = (event: KeyboardEvent) => {
      if (
        event.isComposing ||
        event.altKey ||
        event.shiftKey ||
        !(event.metaKey || event.ctrlKey) ||
        event.key.toLowerCase() !== "k"
      )
        return;
      event.preventDefault();
      if (dialogRef.current?.open) {
        dialogRef.current.close();
        setOpen(false);
      } else {
        setQuery("");
        setActive(0);
        setOpen(true);
        dialogRef.current?.showModal();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={show}
        aria-label="Open command menu"
        aria-haspopup="dialog"
        className="command-trigger flex h-9 items-center gap-2 rounded-lg border border-border bg-muted/30 px-2.5 text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <Search className="h-3.5 w-3.5" aria-hidden="true" />
        <kbd className="hidden font-mono text-[10px] sm:inline">
          {mac ? "⌘" : "Ctrl"} K
        </kbd>
      </button>
      <dialog
        ref={dialogRef}
        className="command-dialog"
        aria-label="Navigate the portfolio"
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const box = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < box.left ||
              event.clientX > box.right ||
              event.clientY < box.top ||
              event.clientY > box.bottom
            )
              close();
          }
        }}
      >
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <Search className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                event.preventDefault();
                setActive((index) =>
                  results.length
                    ? (index +
                        (event.key === "ArrowDown" ? 1 : results.length - 1)) %
                      results.length
                    : 0,
                );
              }
              if (event.key === "Enter" && results[active]) {
                event.preventDefault();
                navigate(results[active].href);
              }
            }}
            role="combobox"
            aria-label="Search portfolio pages and sections"
            aria-expanded={open}
            aria-controls="command-results"
            aria-activedescendant={
              results[active] ? `command-option-${active}` : undefined
            }
            autoComplete="off"
            placeholder="Where would you like to go?"
            className="min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground sm:text-sm"
          />
          <button
            type="button"
            aria-label="Close command menu"
            onClick={close}
            className="rounded p-1 text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <div
          className="max-h-[55vh] overflow-y-auto p-2"
          id="command-results"
          role="listbox"
          aria-label="Portfolio destinations"
        >
          {results.length ? (
            results.map((item, index) => (
              <button
                key={item.href}
                id={`command-option-${index}`}
                type="button"
                role="option"
                aria-selected={active === index}
                tabIndex={-1}
                onMouseDown={(event) => event.preventDefault()}
                onPointerMove={() => setActive(index)}
                onClick={() => navigate(item.href)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors",
                  active === index
                    ? "bg-accent/10 text-accent"
                    : "text-muted-foreground hover:bg-muted",
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-foreground">
                    {item.title}
                  </span>
                  <span className="mt-0.5 block text-[11px] text-muted-foreground">
                    {item.detail}
                  </span>
                </span>
                {item.href === "/photos" ? (
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
                )}
              </button>
            ))
          ) : (
            <p className="px-4 py-10 text-center text-sm text-muted-foreground">
              No matches. Try “projects”, “skills” or “photos”.
            </p>
          )}
        </div>
        <div className="flex flex-wrap justify-between gap-2 border-t border-border px-5 py-3 font-mono text-[10px] text-muted-foreground">
          <span>
            ↑ ↓ navigate <span className="px-2 text-border">/</span> ↵ open
          </span>
          <span>esc to close</span>
        </div>
      </dialog>
    </>
  );
}
