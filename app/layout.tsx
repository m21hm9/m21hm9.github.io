import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Thom Man Hei Matthew",
  description:
    "Matthew Thom is a Data Science student in Hong Kong exploring AI through research, model evaluation and hands-on projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans min-h-screen bg-background text-foreground`}
        suppressHydrationWarning
      >
        <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
          {children}
        </ThemeProvider>
        {process.env.NEXT_PUBLIC_GITHUB_PAGES === "true" ? null : <Analytics />}
      </body>
    </html>
  );
}
