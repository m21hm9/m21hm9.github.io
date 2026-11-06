# Matthew Thom — Personal Portfolio

A personal portfolio built with Next.js, TypeScript, Tailwind CSS, and Lucide icons. The design pairs serif headings with Geist body text, warm ivory and near-black themes, and a portrait-led introduction.

## Features

- Gallery and Index project views with shared artwork transitions
- A focused project reader with previous/next navigation and exact return position
- SVG concept illustrations and a step-by-step research workflow
- Research and Professional experience tabs with concise role summaries and organisation links
- A once-per-session portrait reveal and staggered scroll entrances
- Uniform project and photo galleries with matching cover proportions and spacing
- Photo viewer with a thumbnail filmstrip, shared image transitions, arrow keys, mobile swipe, and focus restoration
- Light and dark modes that follow the device initially and remember a manual choice
- A continuous navigation underline that follows the current section, keyboard focus states, and reduced-motion support

## Development

```sh
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000). Edit `data/content.ts` to update projects, experience, education, skills, credentials, and contact details.

## Production

```sh
npm run build
npm start
```

The included GitHub Actions workflow builds a static export and deploys `out/` to GitHub Pages when changes are pushed to `master`. Static export is enabled with `GITHUB_PAGES=true`; Vercel uses the default Next.js build.

## Structure

- `app/` — routes, layout, and shared design tokens
- `components/` — navigation, content sections, gallery, and theme controls
- `data/content.ts` — portfolio content and links
- `lib/theme.ts` — theme preference validation and initial theme script
- `public/photos/` — portrait and food photography

Colours and shared layout styles live in `app/globals.css`. Interactive components handle project views, visual studies, the experience timeline, navigation, theme preferences, and photo browsing. Fonts work without external requests. Animations respect the device's reduced-motion preference, and theme colours update immediately. Shared image transitions use progressive enhancement so the controls also work in older browsers.
