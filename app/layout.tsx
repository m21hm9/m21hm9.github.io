import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Thom Man Hei Matthew",
  description:
    "Data Science student @ City University of Hong Kong. Building AI agents & LLM systems. Data Analysis Assistant @ AS Watson Group.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans min-h-screen bg-background text-foreground`}
        {...({ suppressHydrationError: true } as React.HTMLAttributes<HTMLBodyElement>)}
      >
        <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
