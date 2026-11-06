import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PhotoGallery } from "@/components/photo-gallery";

export const metadata: Metadata = {
  title: "Photos · Matthew Thom",
  description: "A few meals and small moments, away from the projects.",
};

export default function PhotosPage() {
  return (
    <>
      <Nav />
      <main id="main" className="site-container section-space">
        <Link href="/" className="quiet-link mb-12 text-xs">
          <ArrowLeft size={14} aria-hidden="true" />
          Back home
        </Link>
        <p className="eyebrow mb-5">A personal collection</p>
        <h1 className="section-heading text-6xl sm:text-7xl">
          A few <em className="text-accent">meals.</em>
        </h1>
        <p className="mb-12 mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
          Food, small moments, and a little life away from the projects.
        </p>
        <PhotoGallery />
      </main>
      <div className="border-t">
        <Footer />
      </div>
    </>
  );
}
