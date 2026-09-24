import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Prefix root-relative public assets when the site is served from a subpath. */
export function withBasePath(assetPath: string) {
  if (!assetPath.startsWith("/") || assetPath.startsWith("//")) return assetPath;
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${assetPath}`;
}
