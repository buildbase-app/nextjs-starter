---
name: buildbase-design
description: The house rules for how this starter looks, moves and scores - BuildBase brand tokens (paper, ink, Plug Orange, cobalt), the display and mono faces, the one-bold-moment rule, CSS-first motion with reduced-motion fallbacks, the Lighthouse and axe gates (npm run score, npm run test:a11y), and which UI, motion and 3D libraries may be added under their licenses. Use before designing or restyling any page or component, adding an animation, a font, an illustration or a UI/animation package, and before calling a visual change done. Pairs with frontend-design (direction), web-interface-guidelines (review checklist), emil-design-eng, choreograph and review-animations (motion craft).
---

# BuildBase design

The public pages of this starter are a product demo people judge in five
seconds and share if it is good. They must look made, not generated; work
for keyboard, screen-reader and phone users; and score 100 where a score can
be 100. This skill is the brief. The other skills in `.claude/skills/` are
the craft:

| Skill                      | Use it for                                                          |
| -------------------------- | ------------------------------------------------------------------- |
| `frontend-design`          | Direction: plan, review the plan against the brief, build, critique |
| `web-interface-guidelines` | The line-by-line review checklist before you say done               |
| `emil-design-eng`          | Interaction polish: press states, origins, easing, timing           |
| `choreograph`              | Entrances and sequences: one per container, short staggers          |
| `review-animations`        | Auditing motion code; approval is earned                            |

## 1. The brand is the brief

`src/app/globals.css` holds every colour as a token. Use the token classes
(`bg-background`, `text-muted-foreground`, `bg-brand`, `text-link`,
`border`...). **Never** a palette class (`bg-purple-50`, `text-blue-600`),
a hex value or `bg-[#...]` in a component: they break dark mode and anyone
who re-themes the starter.

| Token                                    | Role                                                                                                                                          |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `background` (paper)                     | Page. Warm, not white.                                                                                                                        |
| `foreground` (ink)                       | Text, and `primary`: the filled button is ink, not orange.                                                                                    |
| `muted-foreground`                       | Secondary text. Measured 6.7:1 light, 7.5:1 dark.                                                                                             |
| `brand` (Plug Orange)                    | The one hot accent. Marks, strikes, live dots, a progress fill. **Never text** (3.0:1). Under ~5% of a screen. Text on an orange fill is ink. |
| `link` / `ring` (cobalt)                 | Links and focus rings, never orange.                                                                                                          |
| `success` `warning` `destructive` `info` | Status only. Soft fills are alpha tints: `bg-success/10`.                                                                                     |

The SDK's own screens (settings, dialogs, the cookie banner) read the same
colours through the `.saas-os-ui` block at the end of `globals.css`. Change
both together.

Type: Geist Sans for UI and headlines (set large and tight:
`tracking-[-0.04em]`, `leading-[0.98]`), Instrument Serif
(`font-display`) for display moments and numbers in running text, Geist Mono
for code and sequence numbers. All three are OFL and served by `next/font`
from this site; never add a font from a font service (Google Fonts CDN,
Adobe, Fontshare's CDN), and never commit Fontshare/ITF fonts (their licence
forbids repository distribution).

## 2. One bold moment per page

The homepage's moment is the hero's checklist: the SaaS parts every team
rebuilds, crossed off by a hand-drawn orange strike that draws once on load
(`hero-section.tsx`, `.draw-in`). Everything around it is quiet. Before you
add a second effect, remove one.

The generated-look tells to avoid (from `frontend-design`, checked here):

- An accent word in the headline (italic, gradient or coloured).
- ALL-CAPS tracked labels above headings; "eyebrow" pills.
- Numbered markers on things that are not a sequence. The tour is a
  sequence, so its index is numbered; features are not.
- Big number + small label stat tiles. Here the facts are one sentence.
- Identical rounded cards with the same soft shadow; gradient washes;
  glassmorphism; purple-to-blue anything; `→` appended to buttons.
- A fade-up on every section. Motion answers the visitor, or it is the one
  moment.

Show the product, not a picture of it: the hero's SDK panel is live DOM
whose code lines come from the tour catalog (`TOUR_TASKS[].source.sdk`), so
it cannot drift from the code. Any number on a page is counted from code
(`TOUR_TASKS.length`, `locales.length`), never typed.

## 3. Motion

- **CSS first.** Scroll reveals use `animation-timeline: view()` inside
  `@supports`; entrances after a click use `@starting-style`; the strike uses
  a stroke-dash draw. All in every engine as of Firefox 159 (Oct 2026).
- **Every effect has a `prefers-reduced-motion` path** that shows the end
  state. Nothing starts hidden without one.
- Animate `transform` and `opacity` only. UI transitions 150-250 ms,
  ease-out (`--ease-out-quint`). Nothing that repeats on a keystroke animates.
- **No animation runtime on marketing pages by default.** Mobile Total
  Blocking Time is the score this site loses (section 4). If a page truly
  needs `motion`, load it in the one component that uses it
  (`LazyMotion` + `m`, `MotionConfig reducedMotion="user"`) and re-score.

## 4. The scores are part of done

```bash
npm run build && npm run score          # Lighthouse CI, mobile, 5 pages, 3 runs
npm run score:desktop
npm run test:a11y                       # axe WCAG 2.2 AA, light + dark, 6 pages
```

`lighthouserc.cjs` fails below 100 on Accessibility, Best Practices and SEO,
below 95 (mobile) / 98 (desktop) on Performance, LCP over 2.5 s or CLS over
0.1. Set `CHROME_PATH` if there is no system Chrome.

What moved the scores here, so you do not undo it:

- `@stripe/stripe-js/pure`, not the main entry: the main one injects Stripe
  on every page (third-party cookie, Best Practices).
- `src/lib/sentry.ts` imports Sentry dynamically: a static `require` shipped
  ~270 KB to every visitor with Sentry off.
- `PUBLIC_CLIENT_NAMESPACES`: public pages send the browser only the message
  namespaces their client components read (guarded by a test).
- Pricing renders the server's plans as the SDK's `loadingFallback`: real
  prices in the HTML, no layout shift.
- Every public page sits in `SiteShell` (header, one `<main>`, footer), so
  the skip link has a target. Footer column titles are `h2`; never skip a
  heading level.

Known ceiling: `@buildbase/sdk/react` evaluates ~1.7 MB of JS on every page
(its screens are not lazy-loaded yet), which holds mobile Performance in the
80s and makes the SDK's client-only cookie banner the LCP on short pages.
That is an SDK change, tracked in the repo's issues; do not hide it with
tricks that game the metric.

Then look at it. Screenshots at 360, 768, 1280 and 1920, light and dark,
plus one keyboard pass (Tab through, Enter/Space, Escape). A passing test is
not a look.

## 5. Adding a library, component or asset

Allowed when the licence permits commercial use **and redistribution in a
starter people clone**. Keep the notice; note the source in a comment at the
top of copied code. The detail and links are in
`references/libraries.md`.

- **OK:** motion, lenis, @formkit/auto-animate, cobe, ogl, three / r3f /
  drei (lazy, real 3D only), @paper-design/shaders (Apache-2.0, pin it),
  Rive and dotLottie runtimes, lucide / Phosphor / Tabler / Heroicons,
  Humaaans and Open Peeps (CC0), copied code from Magic UI, Motion
  Primitives, Origin UI, Animata, Cult UI (free), Kokonut UI (free), Smooth
  UI, Eldora UI, Indie UI, Kibo UI, uiverse (MIT).
- **No:** React Bits (Commons Clause bans redistributing the components "in
  a bundle"), Aceternity UI (licence bans redistributing source and
  templates), shadcnblocks (bans public repos and starter kits), Hover.dev,
  21st.dev marketplace items, Skiper UI, Tailark, Motion+ (paid, token),
  Spline runtime, Unicorn Studio, Theatre.js Studio (AGPL), unDraw packs,
  Fontshare fonts. GSAP is legal to use but adds a proprietary licence with
  a no-code-builder clause to every clone: not in this starter.

## 6. Copy

Plain verbs, sentence case, one job per line, no em dashes (a spaced hyphen
instead). Every string goes through `next-intl` in all eight locales
(`src/i18n/messages/*.ts`, typed by `src/i18n/types.ts`), plurals in ICU form
in every locale (`ja`/`zh` use `other` only; `ar` has six forms). Arabic is
right to left: use `ms-`/`me-`/`ps-`/`pe-`/`start-`, and mirror anything
directional (`rtl:-scale-x-100`).

## References

`references/inspiration.md`: galleries and specific sites, and what each does
well. Read the writing linked there (Rauno Freiberg, Emil Kowalski, Laws of
UX) rather than copying it: those texts have no open licence.
