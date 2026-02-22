# Thom Man Hei Matthew — Personal Portfolio

A single-page portfolio built with **Next.js 15** (App Router), **TypeScript**, **Tailwind CSS**, **Geist** fonts, **Framer Motion**, and **Lucide icons**.

## Features

- Single-page scroll layout with sticky navigation
- Sections: Hero, About, Professional (Education, Tech stack, Experience), Key Projects, Certifications, Contact
- Dark / light mode toggle with system preference support
- Tech stack icons (Simple Icons CDN) and flip cards for projects
- Responsive layout and optimized images via `next/image`

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

## Deploy (Vercel)

- Connect the repo to [Vercel](https://vercel.com); default Next.js settings (build: `npm run build`, output: Next.js default) work as-is.
- Optional: add a custom domain and environment variables in the Vercel project settings.

## Tech stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Geist** (sans & mono) via `geist` package
- **Radix UI** (Slot, Tooltip) + **CVA** / **clsx** / **tailwind-merge** for components
- **Framer Motion** for animations
- **Lucide React** for icons

## Project structure

- `app/` — layout, global styles, root page
- `components/` — Nav, Hero, About, Professional, Projects, Certifications, Contact, theme toggle, UI primitives
- `data/content.ts` — all copy and links (education, skills, experience, projects, certifications, contact)
