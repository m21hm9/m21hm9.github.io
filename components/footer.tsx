import Link from "next/link";
import { ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="site-container flex flex-wrap items-center justify-between gap-5 py-8 text-[11px] text-muted-foreground">
      <span>© {new Date().getFullYear()} Matthew Thom</span>
      <Link href="#main" className="quiet-link text-[11px]">
        Back to top <ArrowUp size={12} aria-hidden="true" />
      </Link>
    </footer>
  );
}
