"use client";

import { flushSync } from "react-dom";

type Transition = {
  ready: Promise<void>;
  finished: Promise<void>;
  skipTransition: () => void;
};
let active: Transition | null = null;
let revision = 0;

export function cancelViewTransition() {
  revision += 1;
  active?.skipTransition();
  active = null;
}

/** Progressive enhancement; content changes also work without the animation API. */
export function changeView(update: () => void) {
  const token = ++revision;
  let committed = false;
  const commit = () => {
    if (committed || token !== revision) return;
    committed = true;
    flushSync(update);
  };
  const browserDocument = document as Document & {
    startViewTransition?: (update: () => void) => Transition;
  };
  active?.skipTransition();
  if (
    !browserDocument.startViewTransition ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    commit();
    return;
  }
  try {
    const transition = browserDocument.startViewTransition(commit);
    active = transition;
    void transition.ready.catch(() => {});
    void transition.finished
      .catch(() => {})
      .finally(() => {
        if (active === transition) active = null;
      });
  } catch {
    commit();
  }
}
