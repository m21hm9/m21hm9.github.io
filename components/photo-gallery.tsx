"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { withBasePath } from "@/lib/utils";

const PHOTOS = [
  {
    src: "/photos/food-1.png",
    alt: "Hot pot with sliced beef",
  },
  {
    src: "/photos/food-2.png",
    alt: "Japanese set lunch",
  },
  {
    src: "/photos/food-3.png",
    alt: "Grilled oyster",
  },
  {
    src: "/photos/food-4.png",
    alt: "Noodles and a vegetable plate",
  },
  {
    src: "/photos/food-5.png",
    alt: "Stir-fried peppers and pork",
  },
  {
    src: "/photos/food-6.png",
    alt: "Clay pot rice",
  },
];

export function PhotoGallery() {
  const [openSrc, setOpenSrc] = useState<string | null>(null);
  const openPhoto = PHOTOS.find((photo) => photo.src === openSrc);

  useEffect(() => {
    if (!openSrc) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenSrc(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openSrc]);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2">
        {PHOTOS.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setOpenSrc(photo.src)}
            className="group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <img
              src={withBasePath(photo.src)}
              alt={photo.alt}
              className="w-full rounded-xl"
            />
            <span className="mt-3 block font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              <span className="text-accent">{String(index + 1).padStart(2, "0")}</span> / {photo.alt}
            </span>
          </button>
        ))}
      </div>
      {openPhoto && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm"
          onClick={() => setOpenSrc(null)}
        >
          <button
            type="button"
            aria-label="Close photo"
            onClick={() => setOpenSrc(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={withBasePath(openPhoto.src)}
            alt={openPhoto.alt}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[88vh] max-w-full rounded-xl"
          />
        </div>
      )}
    </>
  );
}
