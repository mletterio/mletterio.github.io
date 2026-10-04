# mletterio.github.io

Personal site for Michael Letterio, built with [Astro](https://astro.build) and [GSAP](https://gsap.com).

**Live site:** https://mletterio.github.io

Design decisions — type scale, pairing, colour, rules, motion — are documented in [DESIGN.md](./DESIGN.md).

## Project structure

```
src/
├── components/
│   ├── BaseHead.astro   # <head>: meta tags, font preloads, motion opt-in
│   ├── Header.astro     # First screen: location + links bar, full-width name
│   ├── Section.astro    # Numbered running head + content grid
│   ├── IndexList.astro  # Numbered index rows (title / description / year / link)
│   └── Footer.astro
├── pages/
│   └── index.astro      # The page — bio copy lives here
├── scripts/
│   └── animations.ts    # ScrollSmoother, intro fade, scroll reveals
├── styles/
│   ├── tokens.css       # Colors, type scale, spacing, layout
│   └── global.css       # Font faces, resets, .container, .serif, .arrow, links
└── consts.ts            # Site title, social links, SECTIONS, WORK
```

## Common edits

- **Bio:** `src/pages/index.astro`, inside `<Section id="about">`.
- **Sections:** add an entry to `SECTIONS` in `src/consts.ts` (`id`, `label`, optional serif `subtitle`), then add `<Section id="…">` to `index.astro`. The numbered discs follow the order of `SECTIONS`.
- **Work rows:** the Work section currently says "Coming soon." To list projects, fill `WORK` in `src/consts.ts` and swap the paragraph in `index.astro` for `<IndexList rows={WORK} />`. Any other list (e.g. experience) can use the same `IndexRow` shape.
- **Serif accent:** STIX Two Text (OFL, self-hosted in `public/fonts/`), set by `--font-family-serif` in `tokens.css`. Used only via the `.serif` class, for titles and subtitles, with `font-size-adjust: 0.51` to match ALT Systema's x-height.
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
