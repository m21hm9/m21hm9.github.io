"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { withBasePath } from "@/lib/utils";
import { cancelViewTransition, changeView } from "@/lib/view-transition";

const photos = [
  {
    src: "/photos/food-1.png",
    alt: "Hot pot with sliced beef",
    ratio: 619 / 1087,
  },
  { src: "/photos/food-2.png", alt: "Japanese set lunch", ratio: 625 / 1097 },
  { src: "/photos/food-3.png", alt: "Grilled oyster", ratio: 625 / 1054 },
  {
    src: "/photos/food-4.png",
    alt: "Noodles and a vegetable plate",
    ratio: 623 / 1083,
  },
  {
    src: "/photos/food-5.png",
    alt: "Stir-fried peppers and pork",
    ratio: 619 / 984,
  },
  { src: "/photos/food-6.png", alt: "Clay pot rice", ratio: 623 / 842 },
];

export function PhotoGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selected = selectedIndex === null ? null : photos[selectedIndex];
  const isOpen = selectedIndex !== null;
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const slideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const filmstrip = useRef<HTMLDivElement>(null);
  const thumbnails = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const strip = filmstrip.current;
    const thumbnail = thumbnails.current[selectedIndex];
    if (!strip || !thumbnail) return;
    const center = () =>
      strip.scrollTo({
        left:
          thumbnail.offsetLeft -
          (strip.clientWidth - thumbnail.clientWidth) / 2,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    center();
    const observer = new ResizeObserver(center);
    observer.observe(strip);
    return () => observer.disconnect();
  }, [selectedIndex]);

  useEffect(
    () => () => {
      if (slideTimer.current) clearTimeout(slideTimer.current);
    },
    [],
  );

  useEffect(() => {
    const element = dialog.current;
    if (!element || !isOpen) return;
    if (!element.open) element.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Let the first new pointer gesture interrupt the opening image transition.
    const interrupt = () => cancelViewTransition();
    window.addEventListener("pointermove", interrupt, {
      once: true,
      capture: true,
    });
    return () => {
      window.removeEventListener("pointermove", interrupt, true);
      element.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const close = () => {
    if (slideTimer.current) clearTimeout(slideTimer.current);
    changeView(() => {
      setPreviousIndex(null);
      setSelectedIndex(null);
    });
  };

  const selectPhoto = (
    index: number,
    direction = selectedIndex !== null && index < selectedIndex ? -1 : 1,
  ) => {
    if (selectedIndex === null || index === selectedIndex) return;
    cancelViewTransition();
    touchStart.current = null;
    if (slideTimer.current) clearTimeout(slideTimer.current);
    setDirection(direction);
    setPreviousIndex(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? null
        : selectedIndex,
    );
    slideTimer.current = setTimeout(() => setPreviousIndex(null), 460);
    setSelectedIndex(index);
  };
  const movePhoto = (direction: number) => {
    if (selectedIndex !== null)
      selectPhoto(
        (selectedIndex + direction + photos.length) % photos.length,
        direction,
      );
  };

  return (
    <>
      <div className="contact-sheet">
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            aria-label={`Enlarge photo: ${photo.alt}`}
            aria-haspopup="dialog"
            onClick={(event) => {
              trigger.current = event.currentTarget;
              if (slideTimer.current) clearTimeout(slideTimer.current);
              changeView(() => {
                setPreviousIndex(null);
                setDirection(0);
                setSelectedIndex(index);
              });
            }}
            data-reveal
            data-reveal-delay={index % 2 === 0 ? "0" : "90"}
            className={`photo-tile sheet-item sheet-item-${index} text-left`}
          >
            <span
              className="sheet-image relative block overflow-hidden rounded-sm"
              style={{
                viewTransitionName:
                  selectedIndex === index ? "none" : `photograph-${index}`,
              }}
            >
              <Image
                src={withBasePath(photo.src)}
                alt={photo.alt}
                fill
                priority={index === 0}
                sizes="(max-width: 767px) 90vw, (max-width: 1199px) 45vw, 520px"
                className="object-cover"
              />
            </span>
            <span className="sheet-caption mt-4 flex items-baseline gap-4 text-xs text-muted-foreground">
              <span className="opacity-60">0{index + 1}</span>
              {photo.alt}
              <ArrowUpRight
                size={13}
                className="ml-auto shrink-0"
                aria-hidden="true"
              />
            </span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="photo-dialog"
        aria-label={selected ? `Photo: ${selected.alt}` : "Photo viewer"}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClose={() => {
          if (slideTimer.current) clearTimeout(slideTimer.current);
          setPreviousIndex(null);
          setSelectedIndex(null);
          trigger.current?.focus();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            movePhoto(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        {selected && (
          <div
            className="relative px-2 pt-14"
            onClick={(event) => event.stopPropagation()}
          >
            <span className="absolute left-2 top-3 text-xs text-muted-foreground">
              A few meals
              <span className="ml-5 hidden opacity-70 sm:inline">
                Use ← → to explore
              </span>
            </span>
            <button
              autoFocus
              type="button"
              aria-label="Close photo"
              onClick={close}
              className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-muted hover:bg-border"
            >
              <X size={20} aria-hidden="true" />
            </button>
            <div
              className="photo-stage relative h-[56svh] overflow-hidden"
              style={{ touchAction: "pan-y pinch-zoom" }}
              onTouchStart={(event) => {
                const touch = event.touches[0];
                touchStart.current =
                  event.touches.length === 1
                    ? { x: touch.clientX, y: touch.clientY }
                    : null;
              }}
              onTouchCancel={() => {
                touchStart.current = null;
              }}
              onTouchEnd={(event) => {
                const start = touchStart.current;
                touchStart.current = null;
                const end = event.changedTouches[0];
                if (!start || !end || event.touches.length) return;
                const dx = end.clientX - start.x;
                const dy = end.clientY - start.y;
                if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3)
                  movePhoto(dx < 0 ? 1 : -1);
              }}
            >
              {previousIndex !== null && (
                <div
                  key={`outgoing-${previousIndex}`}
                  className="photo-frame-out absolute inset-0"
                  data-direction={direction}
                  aria-hidden="true"
                >
                  <div
                    className="photo-media"
                    style={{
                      aspectRatio: photos[previousIndex].ratio,
                      width: `min(100%, calc(var(--photo-height) * ${photos[previousIndex].ratio}))`,
                    }}
                  >
                    <Image
                      src={withBasePath(photos[previousIndex].src)}
                      alt=""
                      fill
                      sizes="95vw"
                      className="object-contain"
                      draggable={false}
                    />
                  </div>
                </div>
              )}
              <div
                key={selected.src}
                className="photo-frame absolute inset-0"
                data-direction={direction}
              >
                <div
                  className="photo-media"
                  style={{
                    viewTransitionName: `photograph-${selectedIndex}`,
                    aspectRatio: selected.ratio,
                    width: `min(100%, calc(var(--photo-height) * ${selected.ratio}))`,
                  }}
                >
                  <Image
                    src={withBasePath(selected.src)}
                    alt={selected.alt}
                    fill
                    sizes="95vw"
                    className="object-contain"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-[44px_1fr_44px] items-center gap-3 pb-2 pt-5">
              <button
                type="button"
                aria-label="Previous photo"
                onClick={() => movePhoto(-1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <ArrowLeft size={18} aria-hidden="true" />
              </button>
              <div
                aria-live="polite"
                aria-atomic="true"
                className="text-center"
              >
                <p className="text-sm text-muted-foreground">{selected.alt}</p>
                <p className="mt-2 text-[11px] tracking-widest text-muted-foreground">
                  {(selectedIndex ?? 0) + 1} / {photos.length}
                </p>
              </div>
              <button
                type="button"
                aria-label="Next photo"
                onClick={() => movePhoto(1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
            <div
              ref={filmstrip}
              className="photo-filmstrip"
              role="group"
              aria-label="Photo thumbnails"
            >
              {photos.map((photo, index) => (
                <button
                  key={photo.src}
                  ref={(element) => {
                    thumbnails.current[index] = element;
                  }}
                  type="button"
                  aria-label={`View photo ${index + 1}: ${photo.alt}`}
                  aria-current={selectedIndex === index ? "true" : undefined}
                  onClick={() => selectPhoto(index)}
                  className="filmstrip-thumbnail"
                >
                  <Image
                    src={withBasePath(photo.src)}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
