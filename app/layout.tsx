import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { themeScript } from "@/lib/theme";
import { introScript } from "@/lib/motion";
import { MotionEffects } from "@/components/motion-effects";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Thom Man Hei Matthew",
  description:
    "Matthew Thom explores AI through research, model evaluation and hands-on data science projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body
        className={`${GeistSans.variable} font-sans min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider>
          <MotionEffects />
          {children}
        </ThemeProvider>
        {process.env.NEXT_PUBLIC_GITHUB_PAGES === "true" ? null : <Analytics />}
      </body>
    </html>
  );
}
