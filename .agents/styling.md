# Styling guide

## Approach

Plain CSS, single file: `src/css/styles.css`. No preprocessor, no framework,
no PostCSS, no build step beyond Eleventy passthrough. If you find yourself
reaching for one, push back first.

The tokens and most of the component rules are shared with the org's other
sites through [cubesite](https://github.com/cubicecho/cubesite), whose
`theme/cubesite.css` was lifted from this file. They are not automatically
linked — this site keeps its own copy, deliberately, because it is the one site
served from a custom domain rather than `/<repo>/`. But **a token change here
belongs there too**, or the org starts looking like two orgs again.

## Theme tokens

All theming flows through CSS custom properties on `:root`, with a
`prefers-color-scheme: dark` block overriding the same names. To restyle the
site, edit the tokens, not the rules.

Key tokens:

| token         | meaning                                  |
| ------------- | ---------------------------------------- |
| `--bg`        | page background                          |
| `--fg`        | primary text                             |
| `--muted`     | secondary text, footer, captions         |
| `--line`      | hairline borders / dividers              |
| `--card`      | card and code-block surface              |
| `--accent`    | links, primary highlights                |
| `--accent-fg` | foreground on accent surfaces            |
| `--maxw`      | max content width (default `64rem`)      |
| `--pad`       | responsive horizontal padding            |
| `--radius`    | shared corner radius                     |
| `--font-sans` | UI font stack                            |
| `--font-mono` | code + project-name font stack           |

## Light/dark

Driven entirely by `prefers-color-scheme`. There is no theme toggle today;
if one is added later, gate it behind a `[data-theme]` attribute on `<html>`
and have it override the same tokens.

## Layout rules of thumb

- Centered column, max width `var(--maxw)`, padding `var(--pad)`.
- Project grid uses `repeat(auto-fill, minmax(min(100%, 18rem), 1fr))` so it
  reflows naturally without media queries.
- Long-form content (project body, about) is capped at `42rem` for
  readability.
- The home page stacks one `.group` section per category, each with a
  `.group-title` linking to that group's page and a `.group-blurb` under it.
  With 40-odd cards the page is long on purpose — the nav and the group pages are
  there for anyone who wants a subset.
- The header nav wraps (`flex-wrap`), in case the wordmark and links don't fit one row. The current page is marked with `aria-current="page"` and styled
  through that attribute rather than a class.

## Guide pages

Guides (`src/guides/*.md`, layout `src/_includes/guide.njk`) read like a docs
manual: the hero across the top, then a section nav beside the prose, then the
project cards full width underneath. Nothing else on the site uses this layout,
and its rules (`.guide-layout`, `.guide-sidebar`, `.toc`, `.toc-mobile`,
`.heading-anchor`) live at the end of `styles.css`.

- **Generated, not hand-written.** The `guideSections` filter in
  `.eleventy.js` runs over the guide's rendered HTML and returns
  `{ html, toc }`: every `<h2>`/`<h3>` gets an `id` (a slug of its text,
  `-2`, `-3`… on a repeat) and a trailing `<a class="heading-anchor">#</a>`,
  and `toc` lists the `##` headings with their `###` headings as children. No
  markdown-it plugin or other dependency.
- **Wide screens** (`min-width: 56rem`): a two-column grid, a 13rem sticky
  sidebar and the prose at `minmax(0, 42rem)`, inside `--maxw`. The sidebar has
  "On this page" (the toc, `###` indented) and "Guides" (every guide, the
  current one `aria-current="page"`), so it doubles as the guide switcher. It
  scrolls on its own if it is taller than the viewport.
- **Narrow screens**: the sidebar is hidden and the same toc renders in a
  folded `<details class="toc-mobile">` "On this page" block above the prose.
  The toc is in the markup twice for this; CSS shows exactly one.
- **Current section**: a small inline script at the end of `guide.njk` uses
  IntersectionObserver to set `aria-current="true"` on the toc link for the
  section in view (the last heading above the top quarter of the viewport, or
  the last one on screen at the bottom of the page). The style hangs off that
  attribute. Without JS the nav is plain links and everything else works.
- Headings have `scroll-margin-top` so a jump does not tuck them under the
  viewport edge; smooth scrolling is on only for guide pages and only under
  `prefers-reduced-motion: no-preference`.
- Tables and the folded compose `<details>` scroll inside themselves; the
  grid column is `minmax(0, …)` and `.guide-main` has `min-width: 0`, so wide
  content cannot push the page sideways. Check 375px for horizontal scroll
  after touching any of this.

## Don'ts

- Don't add Tailwind, styled-components, CSS modules, or scoped CSS-in-JS.
- Don't hard-code colors outside the `:root` token block.
- Don't introduce a JS-driven theme switcher without first asking — the cost
  in flash-of-wrong-theme handling is real.
