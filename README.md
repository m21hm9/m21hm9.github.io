# Thom Man Hei Matthew — Personal Portfolio

A personal portfolio built with **Next.js 16** (App Router), **TypeScript**, **Tailwind CSS**, **Geist** fonts, **Framer Motion**, and **Lucide icons**.

## Features

- Single-page layout with a clear introduction and featured projects near the top
- Sections: Projects, Professional (Education, Tech stack, Experience), Digital Brain, Certifications, Contact
- Interactive particle portrait and 2D/3D knowledge graph
- Dark-first theme with a light mode toggle
- Categorized toolkit and research-note cards for the four pinned GitHub repositories
- Responsive layout and keyboard-friendly controls

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Edit content**

   Update `data/content.ts` with your data:
   - Education, skills (with optional `image` URLs), experience bullets, projects (GitHub/demo links), certifications, contact (email, LinkedIn, GitHub).

3. **Run locally**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Deploy

- The included GitHub Actions workflow builds a static export and deploys `out/` to GitHub Pages when changes are pushed to `master`.
- For Vercel, connect the repository and use the default Next.js build settings. The static export is enabled only when `GITHUB_PAGES=true`.

## Tech stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Geist** (sans & mono) via `geist` package
- **Radix UI** (Slot, Tooltip) + **CVA** / **clsx** / **tailwind-merge** for components
- **Framer Motion** for animations
- **Lucide React** for icons

## Project structure

- `app/` — layout, global styles, root page, knowledge graph route
- `components/` — navigation, sections, particle portrait, knowledge graph, theme toggle, UI primitives
- `data/content.ts` — all copy and links (education, skills, experience, projects, certifications, contact)
