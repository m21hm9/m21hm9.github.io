import path from "path";
import type { NextConfig } from "next";

// Static GitHub Pages export. Vercel builds leave GITHUB_PAGES unset.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const githubPagesBasePath = "/Thom-Man-hei-Matthew";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  transpilePackages: ["reagraph"],
  ...(isGithubPages
    ? {
        output: "export",
        basePath: githubPagesBasePath,
        trailingSlash: true,
      }
    : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? githubPagesBasePath : "",
  },
  images: {
    ...(isGithubPages ? { unoptimized: true } : {}),
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "huggingface.co",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
