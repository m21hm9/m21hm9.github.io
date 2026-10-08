"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/theme-provider";
import { withBasePath } from "@/lib/utils";

const PORTRAIT_SRC = withBasePath("/me.png");
const SAMPLE_STEP = 3;
const GATHER_MS = 1500;
const BURST_MS = 700;
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
      const sampleX = sumX / hits;
      const sampleY = sumY / hits;
      if (unitNoise(x0 + 4, y0 + 9) > edgeKeep(sampleX, sampleY, width, height)) {
        continue;
      }
      const jitter = SAMPLE_STEP * 0.72;
      samples.push({
        x: sampleX + (unitNoise(x0, y0) - 0.5) * jitter,
        y: sampleY + (unitNoise(x0 + 19, y0 + 7) - 0.5) * jitter,
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

function edgeKeep(x: number, y: number, width: number, height: number) {
  const side = width * 0.1;
  const bottom = height * 0.3;
  let keep = 1;
  if (x < side) keep = Math.min(keep, x / side);
  if (x > width - side) keep = Math.min(keep, (width - x) / side);
  if (y > height - bottom) keep = Math.min(keep, (height - y) / bottom);
  return keep;
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
      const endX = new Float32Array(count);
      const endY = new Float32Array(count);
      const liveX = new Float32Array(count);
      const liveY = new Float32Array(count);
      const delay = new Float32Array(count);
      const lightFill = samples.map((sample) => rgb(sample.r, sample.g, sample.b));
      const darkFill = samples.map((sample) =>
        liftOnDark(sample.r, sample.g, sample.b)
      );

      let cssWidth = 0;
      let cssHeight = 0;
      let dot = 2.4;
      let motionStart = 0;
      let motionMs = GATHER_MS;
      let mode: "burst" | "gather" = "gather";
      let pointerX = -9999;
      let pointerY = -9999;
      let pointerActive = false;

      const cloudPosition = (index: number) => {
        const centerX = cssWidth * 0.5;
        const centerY = cssHeight * 0.48;
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.sqrt(Math.random());
        const cloudX = centerX + Math.cos(angle) * cssWidth * 0.34 * radius;
        const cloudY = centerY + Math.sin(angle) * cssHeight * 0.36 * radius;
        return {
          x: targetX[index] * 0.42 + cloudX * 0.58,
          y: targetY[index] * 0.42 + cloudY * 0.58,
        };
      };

      const beginGather = (now: number, fromLive: boolean) => {
        mode = "gather";
        motionStart = now;
        motionMs = GATHER_MS;
        for (let i = 0; i < count; i++) {
          if (!fromLive) {
            const cloud = cloudPosition(i);
            originX[i] = cloud.x;
            originY[i] = cloud.y;
          }
          endX[i] = targetX[i];
          endY[i] = targetY[i];
          delay[i] = Math.random();
        }
      };

      const burst = (now: number) => {
        mode = "burst";
        motionStart = now;
        motionMs = BURST_MS;
        for (let i = 0; i < count; i++) {
          originX[i] = liveX[i];
          originY[i] = liveY[i];
          const cloud = cloudPosition(i);
          endX[i] = cloud.x;
          endY[i] = cloud.y;
          delay[i] = Math.random() * 0.45;
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

        const padX = cssWidth * 0.12;
        const padY = cssHeight * 0.14;
        const scale = Math.min(
          (cssWidth - padX * 2) / imageWidth,
          (cssHeight - padY * 2) / imageHeight
        );
        const drawnWidth = imageWidth * scale;
        const drawnHeight = imageHeight * scale;
        const offsetX = (cssWidth - drawnWidth) / 2;
        const offsetY = (cssHeight - drawnHeight) / 2;
        dot = Math.max(1.7, scale * SAMPLE_STEP * 1.02);

        const settled =
          !restart &&
          mode === "gather" &&
          (reduceMotion || performance.now() - motionStart > motionMs + STAGGER_MS);

        for (let i = 0; i < count; i++) {
          targetX[i] = offsetX + samples[i].x * scale;
          targetY[i] = offsetY + samples[i].y * scale;
          if (settled) {
            originX[i] = targetX[i];
            originY[i] = targetY[i];
            endX[i] = targetX[i];
            endY[i] = targetY[i];
            liveX[i] = targetX[i];
            liveY[i] = targetY[i];
            delay[i] = 0;
          }
        }

        if (restart || reduceMotion) {
          if (reduceMotion) {
            for (let i = 0; i < count; i++) {
              originX[i] = targetX[i];
              originY[i] = targetY[i];
              endX[i] = targetX[i];
              endY[i] = targetY[i];
              liveX[i] = targetX[i];
              liveY[i] = targetY[i];
              delay[i] = 0;
            }
            mode = "gather";
            motionStart = performance.now() - GATHER_MS - STAGGER_MS;
            motionMs = GATHER_MS;
          } else {
            beginGather(performance.now(), false);
          }
        }
      };

      const draw = (now: number) => {
        if (cssWidth < 2 || cssHeight < 2) return;
        const fills = themeRef.current === "dark" ? darkFill : lightFill;
        ctx.clearRect(0, 0, cssWidth, cssHeight);

        if (
          !reduceMotion &&
          mode === "burst" &&
          now - motionStart > motionMs + STAGGER_MS * 0.45
        ) {
          for (let i = 0; i < count; i++) {
            originX[i] = endX[i];
            originY[i] = endY[i];
            endX[i] = targetX[i];
            endY[i] = targetY[i];
            delay[i] = Math.random();
          }
          mode = "gather";
          motionStart = now;
          motionMs = GATHER_MS;
        }

        for (let i = 0; i < count; i++) {
          const elapsed = now - motionStart - delay[i] * (mode === "burst" ? STAGGER_MS * 0.45 : STAGGER_MS);
          const progress = reduceMotion
            ? 1
            : Math.min(1, Math.max(0, elapsed / motionMs));
          const eased = easeOutCubic(progress);
          let x = originX[i] + (endX[i] - originX[i]) * eased;
          let y = originY[i] + (endY[i] - originY[i]) * eased;
          liveX[i] = x;
          liveY[i] = y;

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
        burst(performance.now());
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
