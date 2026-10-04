# Design system: mletterio.github.io

Reference for future work on the site. Every value here lives in
`src/styles/tokens.css`; this file explains **why** it has that value. The
numbers were measured from the fonts or the rendered page rather than chosen
by eye. When something changes, re-measure, then update both files.

---

## 1. Principles

| # | Principle | Source | What it means here |
|---|---|---|---|
| 1 | **ALT Systema is the core.** A second face exists only to complement it. | Pairing practice: contrast the classification, share the structure ([Google Fonts: font matrix](https://fonts.google.com/knowledge/choosing_type/pairing_typefaces_based_on_their_construction_using_the_font_matrix), [TypeEd](https://type-ed.com/resources/rag-right/2017/10/18/3-steps-to-great-typeface-pairs)) | The serif sets only titles and subtitles. It never sets body text or the name. |
| 2 | **Hierarchy through size and weight, not colour.** | Swiss / International Typographic Style ([Swiss Design for web](https://swissthemes.design/insights/swiss-design-for-web-designers)) | One ink. No grey or faded text. |
| 3 | **One modular scale.** Every size is a step in it. | Tim Brown, [More Meaningful Typography](https://alistapart.com/article/more-meaningful-typography/) | Five steps, with each role assigned one step. |
| 4 | **The scale is fluid.** It's gentler on phones and wider on desktop. | Utopia, [Designing with fluid type scales](https://utopia.fyi/blog/designing-with-fluid-type-scales/) | Ratio 1.2 at 360px, 1.25 at 1440px, interpolated in between. |
| 5 | **Readable measure and leading.** | Butterick: [line length 45–90 characters](https://practicaltypography.com/line-length.html), [line spacing 120–145%](https://practicaltypography.com/line-spacing.html) | The bio runs about 53 characters per line on desktop. Text leading sits between 1.25 and 1.45. |
| 6 | **Quiet motion.** Nothing moves on its own except to arrive. | Project decision | The name moves only with scroll. Reveals use opacity and a 16px rise. |
| 7 | **Book-like restraint.** | The DETAIL book *Alpine Architektur in Südtirol*, with Foster + Partners and Yelle Maillé as secondary references | Numbered running heads, hairline rules, generous white space, asymmetric grid. |

---

## 2. Typefaces

| Role | Face | Styles shipped | File | Licence |
|---|---|---|---|---|
| Core: name, text, interface | **ALT Systema** (ALT Type Foundry; rational neo-grotesk) | Regular 400, Bold 700 | `public/fonts/ALTSystema-*.woff` | Commercial web licence for this site |
| Accent: titles, subtitles | **STIX Two Text** (transitional serif) | Regular 400, Latin subset | `public/fonts/STIXTwoText-Regular.woff2` | SIL OFL 1.1, see `public/fonts/STIXTwoText-OFL.txt` |

The SemiBold and Black ALT Systema files remain in `public/fonts/` but have no
`@font-face` rule. Add one in `global.css` only if a role truly needs it.

### Why STIX Two Text pairs with ALT Systema

These were measured from the outlines, in headless Chrome, with x-heights matched:

| Metric | ALT Systema | STIX Two Text | Principle |
|---|---|---|---|
| x-height / cap height | 0.729 | 0.720 | Matching proportions, so capitals line up on a shared line (+1%) |
| Stem weight (Regular, em) | 0.084 | 0.084 | Identical colour (ink density 1.00×) |
| Set width at matched x-height | 1.00 | 1.01× | Even texture side by side |
| Stroke contrast (thick/thin) | 1.2× (monoline) | 2.4× | Different flesh: clearly a serif, yet robust at 19px |
| Stress axis | — | near-vertical | Same rational skeleton |

Other faces that were evaluated, kept here for the record:
- **Foundry Wilson** was the best of The Foundry Types' serifs, but it is 16% wider, its capitals sit 9% taller, and it has swash ligatures by default.
- **PT Serif** was a close free alternative.
- **Libre Baskerville** and **Source Serif 4**, and the other Foundry serifs, were considered and set aside.

### Serif usage

- Apply it only through the `.serif` class in `global.css`. That class sets
  `font-size-adjust: 0.51`, so its x-height equals ALT Systema's (0.51em) at
  any size.
- Set it at the **same size** as the ALT text it accompanies, in Regular only.
- Never use it for body text, the name, links or metadata.

---

## 3. Type scale

These are fluid steps, interpolated between a 360px viewport (16px × 1.2) and a
1440px viewport (18px × 1.25), with each step clamped to that range.

| Token | Role | 360px | 1440px | Weight | Leading | Used by |
|---|---|---|---|---|---|---|
| `--step--1` / `--type-meta` | Metadata | 14px* | 14.4px | 400 | 1.4 | Masthead bar, footer, index metadata |
| `--step-0` / `--type-body` | Body | 16px | 18px | 400 | 1.45 | Default running text |
| `--step-1` / `--type-head` | Running head | 19.2px | 22.5px | 700 label + 400 serif | 1.25 | Section heads, index titles |
| `--step-2` / `--type-lede` | Lede | 23px | 28.1px | 400 | 1.3 | Bio and short section prose |
| `--step-3` | Reserved | 27.6px | 35.2px | — | — | Spare step for a future larger title |
| Name (exception) | Display | ≈71px | ≈138px | 700 | 0.9 | Masthead only, fitted to the content width |

\* Step −1 would be 13.3px at 360px. It is floored at 14px for legibility.

**Resulting ratios:** lede to head is 1.20× on phones and 1.25× on desktop,
which keeps the hierarchy clear at every width. Head to meta runs from 1.37×
to 1.56×.

### The name

- `font-size: calc(100cqi / var(--name-fit))`, where the masthead is the
  container.
- `--name-fit` is the measured *ink* width of the name in em: 9.073 for one
  line, plus a little slack, giving **9.09**. Phones (≤640px) set it to
  **4.53**, fitted to "LETTERIO", so the name breaks onto two lines.
- `margin-left: -0.084em` cancels the side bearing of the M and L, so the ink
  sits exactly on the gutter.
- Tracking is −0.03em, and the case comes from `text-transform: uppercase`, so
  screen readers say the name instead of spelling it out.
- If the name, tracking or weight changes, re-measure with canvas
  `measureText` (actualBoundingBox). Advance widths from the font file were
  about 3% off because of kerning.

### Tracking

The name uses −0.03em. Everything else uses the font's default spacing.

---

## 4. Colour

| Token | Value | Use |
|---|---|---|
| `--black` (ink) | `rgb(15, 18, 25)` | All text, rules, disc fills. **18.7:1** on white, WCAG AAA. |
| `--page-bg` (paper) | `#ffffff` | Background, disc digits, selected text |

- **There are no greys.** Secondary information is made quieter through size
  (`--type-meta`) and position, never by fading it. A faded copyright reads as
  disabled, not designed.
- Text selection inverts: ink background with paper text.

---

## 5. Rules

- **Weight `--rule-weight`: 1.5px.** That equals ALT Regular's stem
  (0.084em) at about 18px, so rules carry the same weight as the type around
  them. Screens at 1.5dppx or less use **2px**, because they can't draw half a
  pixel crisply.
- **Draw rules as fills or inset shadows, never `border`.** Chrome rounds
  border widths down to whole CSS pixels, which turns 1.5px into 1px.
  - A standalone rule is a block with `height: var(--rule-weight); background: ink;` (see `.rule` in `Header.astro`).
  - A rule on a box is `box-shadow: inset 0 var(--rule-weight) ink` for the top edge, or `inset 0 calc(-1 * var(--rule-weight)) ink` for the bottom (see `Footer.astro` and `IndexList.astro`).
- **Where rules appear:** under the name, above the footer, and between index
  rows. Add new rules only where they separate content.

---

## 6. Layout

- **Container (`.container`):** a maximum width of 1400px, with
  `--layout-px` gutters of `clamp(20px, 5vw, 80px)`.
- **Masthead:** fills the first screen (`min-height: 100svh`). The bar sits at
  the top, and the name and rule sit at the bottom.
- **Section grid:** 12 columns. The running head takes columns 1–3 and the
  content columns 4–12, and they share a baseline. At ≤640px the section
  stacks to one column.
- **Breakpoints:** there is one, at **640px**. Components that need to adapt
  use container queries instead, sized on their own width: the name uses
  `cqi`, and `IndexList` switches layout at 40rem.
- **Spacing tokens:**
  - `--space-xs` 1rem, `--space-sm` 1.5rem, `--space-md` 2.5rem
  - `--space-xl` `clamp(5rem, 10vw, 9rem)`, used for section padding
- **Prose measure:** `max-width: 38ch` at lede size.

---

## 7. Components

| Component | File | Spec |
|---|---|---|
| Masthead | `src/components/Header.astro` | Meta bar ("Boston, MA" on the left, links on the right), the fitted name, a 1.5px rule. It sits in normal flow, not fixed. |
| Section running head | `src/components/Section.astro` | ● disc + ALT Bold label, with the optional STIX subtitle on its own line, flush left, at the **same size** (`--type-head`). |
| Disc | `Section.astro` `.disc` | 0.95em ink circle, **centred on the label's capitals** (`align-self: center`, measured within 0.5px). Digit is ALT Bold at 0.52em. |
| Section content | `Section.astro` | Prose is `--type-lede` / `--lh-lede` with `text-wrap: pretty`. Each slotted element marks its own `data-reveal`. |
| Index list | `src/components/IndexList.astro` | Rows: number / serif title (`--type-head`) / description (`--type-meta`) / year ↗. Rules between rows. Rows are at least 44px tall. |
| Footer | `src/components/Footer.astro` | Rule, then © year + name, then links. Everything in ink at `--type-meta`. |
| Links | `global.css` | Inherit the ink colour; a 1px underline fades in on hover. Outbound links use `.arrow`, ALT's → rotated −45°, because the font has no ↗ glyph. |

**Sections are data.** `SECTIONS` in `src/consts.ts` sets the order, labels
and subtitles, and the disc numbers follow that order.

---

## 8. Motion (GSAP)

All motion code lives in `src/scripts/animations.ts`.

- **Gate:** an inline script in `BaseHead.astro` adds `html.motion` unless the
  visitor prefers reduced motion. A 3-second fail-safe removes it, so content
  can't stay hidden if the script fails.
- **ScrollSmoother:** only on fine pointers (mouse or trackpad), with
  `smooth: 0.8`. Touch devices get native scroll. No `normalizeScroll`.
  - When the smoother is active, `animations.ts` adds `html.has-smoother`.
  - That class keeps `#smooth-content` on its own GPU layer
    (`will-change: transform`) and turns off rubber-band overscroll.
  - **Don't remove it.** ScrollSmoother doesn't set `will-change` on the
    content itself. Without it, every scroll frame repaints the page. A trace
    of a fast flick up showed 204 raster tasks without it and 0 with it; that
    was the stutter.
- **Intro:**
  - The name fades in only. **It never translates on a timer**; it moves 1:1
    with the page.
  - The rule wipes in with `scaleX`.
  - The bar fades in.
- **Reveals:** each `[data-reveal]` element fades in with a 16px rise, once,
  when it reaches 85% of the viewport.
- **Not used:** no pinning, scrubbing, parallax, cursor effects or
  per-character splits.

---

## 9. Accessibility

- Text contrast is 18.7:1.
- Every interactive element is at least 44×44px.
- `:focus-visible` shows a 2px ink outline.
- `prefers-reduced-motion` turns off smoothing and animation.
- There is no horizontal scroll at any width from 320px to 2560px.

---

## 10. Content and privacy rules

- **No photographs for now.** Before any image is committed, check it for GPS
  and EXIF data (`mdls -name kMDItemLatitude <file>`) and strip it, because
  the repo is public.
- **Public contact is LinkedIn and GitHub only.** Never a phone number, email
  or address.
- **No role tagline** (e.g. "software engineer & photographer") in the
  masthead or footer.

---

## 11. Extending the system

| Task | How |
|---|---|
| Add a section | Add `{ id, label, subtitle? }` to `SECTIONS`, then add `<Section id="…">` in `index.astro`. |
| List projects | Fill `WORK` in `consts.ts` and swap "Coming soon." for `<IndexList rows={WORK} />`. |
| A new text role | Pick an existing step. Don't invent a size. If nothing fits, use `--step-3`. |
| A new weight or face | Check its pairing against §2: x-height/cap, stem and colour against ALT Systema. Then add an `@font-face`, and preload it only if it appears above the fold. |
| A new rule | `--rule-weight`, drawn as a fill or inset shadow (§5). |
| Re-measuring | Use canvas `measureText` and pixel sampling in a headless browser (see git history for the method). |
