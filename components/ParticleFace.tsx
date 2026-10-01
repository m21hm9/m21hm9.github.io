"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/theme-provider";
import { withBasePath } from "@/lib/utils";

const PORTRAIT_SRC = withBasePath("/me.png");
const SAMPLE_STEP = 3;
const GATHER_MS = 1500;
const STAGGER_MS = 480;

type Sample = {
  x: number;
  y: number;
  r: number;
  g: number;
  b: number;
};

function isBackground(r: number, g: number, b: number, a: number) {
  if (a < 16) return true;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const sat = max === 0 ? 0 : (max - min) / max;
  return lum >= 170 && sat <= 0.18;
}

function rgb(r: number, g: number, b: number) {
  return `rgb(${r},${g},${b})`;
}

function liftOnDark(r: number, g: number, b: number) {
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  if (lum >= 96) return rgb(r, g, b);
  const lift = 168 * ((96 - lum) / 96);
  return rgb(
    Math.min(255, Math.round(r + lift)),
    Math.min(255, Math.round(g + lift)),
    Math.min(255, Math.round(b + lift))
  );
}

function samplePortrait(image: HTMLImageElement) {
  const width = image.naturalWidth;
  const height = image.naturalHeight;
  const offscreen = document.createElement("canvas");
  offscreen.width = width;
  offscreen.height = height;
  const offscreenCtx = offscreen.getContext("2d", { willReadFrequently: true });
  if (!offscreenCtx) return { samples: [] as Sample[], width, height };

  offscreenCtx.drawImage(image, 0, 0);
  const { data } = offscreenCtx.getImageData(0, 0, width, height);
  const count = width * height;
  const background = new Uint8Array(count);
  const queue: number[] = [];

  const pushBackground = (index: number) => {
    if (background[index]) return;
    const pixel = index * 4;
    if (
      !isBackground(
        data[pixel],
        data[pixel + 1],
        data[pixel + 2],
        data[pixel + 3]
      )
    ) {
      return;
    }
    background[index] = 1;
    queue.push(index);
  };

  for (let x = 0; x < width; x++) {
    pushBackground(x);
    pushBackground((height - 1) * width + x);
  }
  for (let y = 0; y < height; y++) {
    pushBackground(y * width);
    pushBackground(y * width + width - 1);
  }

  while (queue.length > 0) {
    const index = queue.pop() as number;
    const x = index % width;
    const y = (index / width) | 0;
    if (x > 0) pushBackground(index - 1);
    if (x < width - 1) pushBackground(index + 1);
    if (y > 0) pushBackground(index - width);
    if (y < height - 1) pushBackground(index + width);
  }

  const component = new Int32Array(count);
  component.fill(-1);
  let componentId = 0;
  let portraitId = -1;
  let portraitCount = 0;

  for (let index = 0; index < count; index++) {
    if (background[index] || component[index] !== -1) continue;
    const region: number[] = [index];
    component[index] = componentId;
    let regionCount = 0;
    while (region.length > 0) {
      const current = region.pop() as number;
      regionCount++;
      const x = current % width;
      const y = (current / width) | 0;
      const neighbors = [
        x > 0 ? current - 1 : -1,
        x < width - 1 ? current + 1 : -1,
        y > 0 ? current - width : -1,
        y < height - 1 ? current + width : -1,
      ];
      for (const next of neighbors) {
        if (next < 0 || background[next] || component[next] !== -1) continue;
        component[next] = componentId;
        region.push(next);
      }
    }
    if (regionCount > portraitCount) {
      portraitCount = regionCount;
      portraitId = componentId;
    }
    componentId++;
  }

  const samples: Sample[] = [];
  for (let y0 = 0, row = 0; y0 < height; y0 += SAMPLE_STEP, row++) {
    const xOffset = row % 2 === 0 ? 0 : 1;
    for (let x0 = xOffset; x0 < width; x0 += SAMPLE_STEP) {
      let red = 0;
      let green = 0;
      let blue = 0;
      let sumX = 0;
      let sumY = 0;
      let hits = 0;
      const yLimit = Math.min(height, y0 + SAMPLE_STEP);
      const xLimit = Math.min(width, x0 + SAMPLE_STEP);
      for (let y = y0; y < yLimit; y++) {
        for (let x = x0; x < xLimit; x++) {
          const index = y * width + x;
          if (component[index] !== portraitId) continue;
          const pixel = index * 4;
          red += data[pixel];
          green += data[pixel + 1];
          blue += data[pixel + 2];
          sumX += x;
          sumY += y;
          hits++;
        }
      }
      if (hits === 0) continue;
      const jitter = SAMPLE_STEP * 0.72;
      samples.push({
        x: sumX / hits + (unitNoise(x0, y0) - 0.5) * jitter,
        y: sumY / hits + (unitNoise(x0 + 19, y0 + 7) - 0.5) * jitter,
        r: (red / hits) | 0,
        g: (green / hits) | 0,
        b: (blue / hits) | 0,
      });
    }
  }

  return { samples, width, height };
}

function unitNoise(x: number, y: number) {
  const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return value - Math.floor(value);
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

export function ParticleFace() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const themeRef = useRef(resolvedTheme);
  themeRef.current = resolvedTheme;

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let disposed = false;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const image = new Image();
    image.decoding = "async";
    image.src = PORTRAIT_SRC;

    const start = () => {
      if (disposed) return;
      const { samples, width: imageWidth, height: imageHeight } =
        samplePortrait(image);
      const count = samples.length;
      if (count === 0) return;

      const targetX = new Float32Array(count);
      const targetY = new Float32Array(count);
      const originX = new Float32Array(count);
      const originY = new Float32Array(count);
      const delay = new Float32Array(count);
      const lightFill = samples.map((sample) => rgb(sample.r, sample.g, sample.b));
      const darkFill = samples.map((sample) =>
        liftOnDark(sample.r, sample.g, sample.b)
      );

      let cssWidth = 0;
      let cssHeight = 0;
      let dot = 2.4;
      let gatherStart = 0;
      let pointerX = -9999;
      let pointerY = -9999;
      let pointerActive = false;

      const scatter = (now: number) => {
        gatherStart = now;
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = 80 + Math.random() * 170;
          originX[i] = targetX[i] + Math.cos(angle) * distance;
          originY[i] = targetY[i] + Math.sin(angle) * distance;
          delay[i] = Math.random();
        }
      };

      const layout = (restart: boolean) => {
        const rect = parent.getBoundingClientRect();
        cssWidth = rect.width;
        cssHeight = rect.height;
        if (cssWidth < 2 || cssHeight < 2) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const bufferWidth = Math.round(cssWidth * dpr);
        const bufferHeight = Math.round(cssHeight * dpr);
        if (canvas.width !== bufferWidth || canvas.height !== bufferHeight) {
          canvas.width = bufferWidth;
          canvas.height = bufferHeight;
        }
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const pad = 6;
        const scale = Math.min(
          (cssWidth - pad * 2) / imageWidth,
          (cssHeight - pad * 2) / imageHeight
        );
        const drawnWidth = imageWidth * scale;
        const drawnHeight = imageHeight * scale;
        const offsetX = (cssWidth - drawnWidth) / 2;
        const offsetY = (cssHeight - drawnHeight) / 2;
        dot = Math.max(1.7, scale * SAMPLE_STEP * 1.02);

        const settled =
          !restart &&
          (reduceMotion || performance.now() - gatherStart > GATHER_MS + STAGGER_MS);

        for (let i = 0; i < count; i++) {
          targetX[i] = offsetX + samples[i].x * scale;
          targetY[i] = offsetY + samples[i].y * scale;
          if (settled) {
            originX[i] = targetX[i];
            originY[i] = targetY[i];
            delay[i] = 0;
          }
        }

        if (restart || reduceMotion) {
          if (reduceMotion) {
            for (let i = 0; i < count; i++) {
              originX[i] = targetX[i];
              originY[i] = targetY[i];
              delay[i] = 0;
            }
            gatherStart = performance.now() - GATHER_MS - STAGGER_MS;
          } else {
            scatter(performance.now());
          }
        }
      };

      const draw = (now: number) => {
        if (cssWidth < 2 || cssHeight < 2) return;
        const fills = themeRef.current === "dark" ? darkFill : lightFill;
        ctx.clearRect(0, 0, cssWidth, cssHeight);

        for (let i = 0; i < count; i++) {
          const elapsed = now - gatherStart - delay[i] * STAGGER_MS;
          const progress = reduceMotion
            ? 1
            : Math.min(1, Math.max(0, elapsed / GATHER_MS));
          const eased = easeOutCubic(progress);
          let x = originX[i] + (targetX[i] - originX[i]) * eased;
          let y = originY[i] + (targetY[i] - originY[i]) * eased;

          if (!reduceMotion && progress >= 1) {
            x += Math.sin(now * 0.0014 + i * 0.37) * 0.55;
            y += Math.cos(now * 0.0011 + i * 0.21) * 0.55;
          }

          if (!reduceMotion && pointerActive) {
            const dx = x - pointerX;
            const dy = y - pointerY;
            const distance = Math.hypot(dx, dy);
            if (distance < 118 && distance > 0.001) {
              const push = (1 - distance / 118) * 40;
              x += (dx / distance) * push;
              y += (dy / distance) * push;
            }
          }

          ctx.fillStyle = fills[i];
          ctx.beginPath();
          ctx.arc(x, y, dot / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      };

      const tick = (now: number) => {
        if (disposed) return;
        draw(now);
        frame = window.requestAnimationFrame(tick);
      };

      const onPointerMove = (event: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        pointerX = event.clientX - rect.left;
        pointerY = event.clientY - rect.top;
        pointerActive = true;
      };
      const onPointerLeave = () => {
        pointerActive = false;
      };
      const onClick = () => {
        if (reduceMotion) return;
        scatter(performance.now());
      };
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        onClick();
      };

      canvas.addEventListener("pointermove", onPointerMove);
      canvas.addEventListener("pointerleave", onPointerLeave);
      canvas.addEventListener("click", onClick);
      canvas.addEventListener("keydown", onKeyDown);

      const observer = new ResizeObserver(() => layout(false));
      observer.observe(parent);
      layout(true);
      frame = window.requestAnimationFrame(tick);

      return () => {
        observer.disconnect();
        canvas.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("pointerleave", onPointerLeave);
        canvas.removeEventListener("click", onClick);
        canvas.removeEventListener("keydown", onKeyDown);
      };
    };

    let stop: (() => void) | undefined;
    if (image.complete && image.naturalWidth > 0) {
      stop = start();
    } else {
      image.onload = () => {
        stop = start();
      };
    }

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      stop?.();
    };
  }, []);

  return (
    <div className="relative mx-auto h-[380px] w-full max-w-md sm:h-[460px] lg:h-[520px] lg:max-w-lg">
      <canvas
        ref={canvasRef}
        role="img"
        tabIndex={0}
        aria-label="Particle portrait of Matthew Thom. Click to scatter the particles and let them reform."
        className="h-full w-full cursor-pointer focus-visible:outline-none"
      />
    </div>
  );
}
