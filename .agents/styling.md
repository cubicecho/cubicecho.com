# Styling guide

## Approach

Plain CSS, single file: `src/css/styles.css`. No preprocessor, no framework,
no PostCSS, no build step beyond Eleventy passthrough. If you find yourself
reaching for one, push back first.

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

## Don'ts

- Don't add Tailwind, styled-components, CSS modules, or scoped CSS-in-JS.
- Don't hard-code colors outside the `:root` token block.
- Don't introduce a JS-driven theme switcher without first asking — the cost
  in flash-of-wrong-theme handling is real.
