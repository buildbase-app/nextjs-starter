# Skills

Claude Code loads these when a task matches their description. Start with
`buildbase-design`: it is the brief for this starter and says when to use
each of the others.

| Skill                      | Source                                                                                                       | Licence                                         | Copied at             |
| -------------------------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------- | --------------------- |
| `buildbase-design`         | This repo                                                                                                    | MIT (the repo's)                                | -                     |
| `frontend-design`          | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/frontend-design)                   | Apache-2.0 (`LICENSE.txt`)                      | `e4bb5d9`, 2026-11-16 |
| `web-interface-guidelines` | [vercel-labs/web-interface-guidelines](https://github.com/vercel-labs/web-interface-guidelines) `command.md` | MIT (`LICENSE`); frontmatter changed, rules not | `434b7f9`, 2026-10-05 |
| `emil-design-eng`          | [emilkowalski/skills](https://github.com/emilkowalski/skills)                                                | MIT (`LICENSE`)                                 | `64eb3de`, 2026-11-15 |
| `choreograph`              | [emilkowalski/skills](https://github.com/emilkowalski/skills)                                                | MIT (`LICENSE`)                                 | `64eb3de`, 2026-11-15 |
| `review-animations`        | [emilkowalski/skills](https://github.com/emilkowalski/skills)                                                | MIT (`LICENSE`)                                 | `64eb3de`, 2026-11-15 |

The vendored folders are byte-for-byte copies (except the one frontmatter
change noted) and are in `.prettierignore`, so updating one is: copy the
upstream folder over it, keep its licence file, update the commit above.

Considered and left out, with the reason:

- `shadcn-ui/ui` `skills/shadcn` (MIT): ships scripts and pre-approves an
  unpinned `npx shadcn@latest`; install it from shadcn if you want it.
- `pbakaus/impeccable` (Apache-2.0): excellent, but 2.4 MB with a launcher
  that downloads a binary and installs hooks. Install it as a plugin.
- `nextlevelbuilder/ui-ux-pro-max-skill` (MIT): a large catalogue whose
  styles include the trend looks this starter avoids.
- `Leonxlnx/taste-skill` (MIT text): 40 MB, installs a Stop hook, and its
  assets include CC BY-SA and Unsplash photos that cannot be redistributed.
- `raunofreiberg/interfaces`, lawsofux.com: no open licence. Linked from
  `buildbase-design/references/inspiration.md` instead.
