# mletterio.github.io

Personal site for Michael Letterio, built with [Astro](https://astro.build) and [GSAP](https://gsap.com).

**Live site:** https://mletterio.github.io

## Project structure

```
src/
├── components/
│   ├── BaseHead.astro   # <head>: meta tags, font preloads, motion opt-in
│   ├── Header.astro     # First screen: location + links bar, full-width name
│   ├── Section.astro    # Label + content grid (used for About)
│   └── Footer.astro
├── pages/
│   └── index.astro      # The page — bio copy lives here
├── scripts/
│   └── animations.ts    # ScrollSmoother, intro fade, scroll reveals
├── styles/
│   ├── tokens.css       # Colors, type scale, spacing, layout
│   └── global.css       # Font faces, resets, .container, link styles
└── consts.ts            # Site title, description, social links
```

## Common edits

- **Bio:** `src/pages/index.astro`, inside `<Section id="about">`.
- **Links (LinkedIn, GitHub):** `SOCIAL_LINKS` in `src/consts.ts` — used by the header and footer.
- **Name sizing:** the name fills the content width via `--name-fit` (name width ÷ font size). It's set in `tokens.css` for one line and overridden in `Header.astro` for the two-line phone layout. Adjust these if the name, font, or tracking changes.

## Motion

Animations are deliberately quiet: the name only fades in, a rule wipes under it, and the bio fades up on scroll. Nothing moves the name except the page scroll itself. ScrollSmoother runs on mouse/trackpad devices only; touch devices use native scroll. Everything is skipped when the visitor prefers reduced motion.

## Local development

```sh
npm install       # Install dependencies
npm run dev       # Dev server at localhost:4321
npm run build     # Production build to dist/
npm run preview   # Preview the production build
```

## Deploy

Pushing to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`.
