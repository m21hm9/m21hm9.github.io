"use client";

import { useMemo, useState } from "react";
import {
  Braces,
  BrainCircuit,
  Database,
  Search,
  Terminal,
  Wrench,
  X,
} from "lucide-react";
import { skillGroups } from "@/data/content";
import { cn } from "@/lib/utils";

const ICONS = [Braces, BrainCircuit, Database, Terminal, Wrench];
const TOTAL = skillGroups.reduce((sum, group) => sum + group.skills.length, 0);

export function ToolkitBrowser() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const groups = useMemo(
    () =>
      skillGroups
        .map((group, index) => ({
          ...group,
          index,
          skills: group.skills.filter((skill) =>
            `${skill.name} ${group.title}`
              .toLowerCase()
              .includes(query.trim().toLowerCase()),
          ),
        }))
        .filter(
          (group) =>
            (category === "All" || group.title === category) &&
            group.skills.length,
        ),
    [category, query],
  );
  const count = groups.reduce((sum, group) => sum + group.skills.length, 0);

  return (
    <>
      <div className="border-b border-border bg-muted/10 p-4 sm:px-6">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-background/70 px-3 focus-within:border-accent/50 focus-within:ring-2 focus-within:ring-accent/10">
          <Search
            className="h-3.5 w-3.5 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            aria-label="Search technical toolkit"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find a language, framework or tool…"
            className="h-10 min-w-0 flex-1 bg-transparent font-mono text-base text-foreground outline-none placeholder:text-muted-foreground sm:text-xs"
          />
          {query && (
            <button
              type="button"
              aria-label="Clear toolkit search"
              onClick={() => setQuery("")}
              className="rounded p-1 text-muted-foreground hover:text-accent focus-visible:ring-2 focus-visible:ring-accent"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          )}
        </div>
        <div
          className="mt-3 flex flex-wrap gap-1.5"
          aria-label="Filter toolkit by category"
        >
          {["All", ...skillGroups.map((group) => group.title)].map((title) => (
            <button
              key={title}
              type="button"
              onClick={() => setCategory(title)}
              aria-pressed={category === title}
              className={cn(
                "rounded-md border px-2.5 py-1.5 font-mono text-[10px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                category === title
                  ? "border-accent/25 bg-accent/10 text-accent"
                  : "border-transparent text-muted-foreground hover:border-border hover:bg-muted",
              )}
            >
              {title}
            </button>
          ))}
        </div>
      </div>
      <div className="divide-y divide-border px-5 sm:px-6">
        {groups.length ? (
          groups.map((group) => {
            const Icon = ICONS[group.index];
            return (
              <div
                key={group.title}
                className="grid gap-4 py-5 sm:grid-cols-[145px_1fr]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-accent/15 bg-accent/5 text-accent">
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <h3 className="font-mono text-[11px] font-semibold text-foreground">
                    {group.title}
                  </h3>
                </div>
                <ul
                  className="flex flex-wrap items-center gap-2"
                  aria-label={`${group.title} skills`}
                >
                  {group.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="toolkit-chip rounded-md border border-border/80 bg-muted/20 px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground"
                    >
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })
        ) : (
          <div className="py-12 text-center">
            <p className="text-sm text-muted-foreground">
              No tools match this search.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
              className="mt-3 rounded text-xs text-accent underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-accent"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-between gap-3 border-t border-border bg-muted/10 px-5 py-3 font-mono text-[9px] text-muted-foreground sm:px-6">
        <span role="status" aria-live="polite">
          {count} / {TOTAL} tools
        </span>
        <span>~/matthew/stack</span>
      </div>
    </>
  );
}
