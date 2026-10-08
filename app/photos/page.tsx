import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { PhotoGallery } from "@/components/photo-gallery";

export const metadata: Metadata = {
  title: "Photos · Thom Man Hei Matthew",
  description: "A few photos of Matthew Thom.",
};

export default function PhotosPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-accent">album / self</p>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">A few photos.</h1>
              <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
                Just me, away from the projects.
              </p>
            </div>
            <Link
              href="/"
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              ← back home
            </Link>
          </div>
          <PhotoGallery />
        </div>
      </main>
    </>
  );
}
