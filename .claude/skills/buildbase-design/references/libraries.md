# Libraries, components and assets: what may go into this starter

Checked 23 November 2026 by reading each project's LICENSE file or licence
page. Licences change: re-read before adding anything, and record the date.
"Redistribute" means ship it inside a public repo people clone, which is what
this starter is.

## Motion

| Package                                                   | Licence                              | Redistribute  | Notes                                                                                                                               |
| --------------------------------------------------------- | ------------------------------------ | ------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| [motion](https://motion.dev)                              | MIT                                  | yes           | ~63 KB gz full; much less with `LazyMotion` + `m`. Motion+ (Ticker, AnimateNumber...) is paid and token-installed: never here.      |
| [lenis](https://github.com/darkroomengineering/lenis)     | MIT                                  | yes           | 5 KB. Off under reduced motion.                                                                                                     |
| [@formkit/auto-animate](https://auto-animate.formkit.com) | MIT                                  | yes           | 4 KB. Lists and accordions.                                                                                                         |
| [anime.js v4](https://animejs.com)                        | MIT                                  | yes           | Same job as motion; pick one.                                                                                                       |
| [GSAP](https://gsap.com/standard-license)                 | Proprietary "no charge"              | not addressed | Free incl. ScrollTrigger and SplitText, but bans use in no-code animation builders. Fine for your own site, not for an MIT starter. |
| Theatre.js                                                | core Apache-2.0, **studio AGPL-3.0** | studio no     | Stale. Avoid.                                                                                                                       |

## Copy-paste component collections

| Collection                                                                                   | Licence                           | Use                                                                |
| -------------------------------------------------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------ |
| [Magic UI](https://magicui.design) (free repo)                                               | MIT                               | yes; Pro is paid and bans re-selling                               |
| [Motion Primitives](https://motion-primitives.com)                                           | MIT (`LICENCE.md`)                | yes                                                                |
| [Origin UI](https://originui.com)                                                            | MIT                               | yes (legacy). Its successor coss ui is reported AGPL: check first. |
| Animata, Cult UI (free), Kokonut UI (free), Smooth UI, Eldora UI, Indie UI, Kibo UI, uiverse | MIT                               | yes                                                                |
| [React Bits](https://reactbits.dev)                                                          | MIT + **Commons Clause**          | **no**: bans redistributing the components "alone, in a bundle"    |
| [Aceternity UI](https://ui.aceternity.com/licence)                                           | Proprietary                       | **no**: bans redistributing source files and templates             |
| [shadcnblocks](https://www.shadcnblocks.com/license)                                         | Proprietary                       | **no**: bans public repos and "starter kits ... for free"          |
| [Hover.dev](https://www.hover.dev/license)                                                   | Proprietary                       | **no** without written consent                                     |
| [21st.dev](https://21st.dev/terms)                                                           | per component                     | inspiration only                                                   |
| Skiper UI, Tailark                                                                           | no licence text found, paid tiers | **no**                                                             |

Every copied file gets a header comment: source URL, licence, date copied.

## 3D, shaders, visuals

| Package                                                                | Licence               | Notes                                                                                                                         |
| ---------------------------------------------------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| three / @react-three/fiber / drei                                      | MIT                   | ~240 KB gz together: only for a real 3D scene, lazy-loaded with a poster frame. fiber's React peer range is narrow; check it. |
| [ogl](https://github.com/oframe/ogl)                                   | MIT / Unlicense       | 33 KB, light custom WebGL                                                                                                     |
| [@paper-design/shaders-react](https://github.com/paper-design/shaders) | Apache-2.0            | 0.0.x: pin it. One shader, `next/dynamic`, static fallback.                                                                   |
| [cobe](https://github.com/shuding/cobe)                                | MIT                   | 6 KB globe                                                                                                                    |
| Rive runtime, lottie-web, dotLottie                                    | MIT                   | prefer dotLottie                                                                                                              |
| Spline runtime                                                         | no licence file       | **no**                                                                                                                        |
| Unicorn Studio                                                         | proprietary SDK       | **no**                                                                                                                        |
| vanta, shadergradient                                                  | MIT / no LICENSE file | dated or unlicensed: **no**                                                                                                   |

## Fonts

OFL (commit or load via `next/font`, ship the OFL text): Geist, Inter,
Instrument Serif, Bricolage Grotesque, Space Grotesk, Fraunces, Mona Sans /
Hubot Sans (reserved font name: a modified copy must be renamed).
**Not in a public repo:** General Sans, Satoshi, Cabinet Grotesk and other
Fontshare fonts (ITF FFL bans repository distribution and conversion).

## Icons and illustrations

lucide (ISC, already here), Phosphor, Tabler, Heroicons (MIT). Humaaans and
Open Peeps (CC0). unDraw allows use but not compiling its assets "in packs":
link to it, do not bundle a set.

## Native platform (no dependency)

| Feature                                         | Support                              | Use                                             |
| ----------------------------------------------- | ------------------------------------ | ----------------------------------------------- |
| Scroll-driven animations (`animation-timeline`) | Chrome 115, Safari 26, Firefox 159   | reveals, progress, parallax, inside `@supports` |
| `@starting-style`                               | Chrome 117, Firefox 129, Safari 17.5 | entrances after a click                         |
| View Transitions (same document)                | ~93% of users                        | `<ViewTransition>` needs React 19.3             |
| Container queries                               | ~96%                                 | cards that adapt to their slot                  |

## Test-only

`@axe-core/playwright` 4.13.0 (MPL-2.0, dev dependency, never shipped to the
browser). Lighthouse CI runs through `npx @lhci/cli@0.16.0` rather than as a
dependency, so a clone does not install ~250 packages it never uses.
