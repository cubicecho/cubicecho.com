# cubicecho.com — agent guide

This is the static marketing/landing site for **Cubic Echo**, an open source
software org. It is built with [Eleventy (11ty)](https://www.11ty.dev/) and
deploys to GitHub Pages.

## Quickstart

```sh
npm install
npm run dev    # local dev server with live reload
npm run build  # production build → ./_site
```

## Deeper guidance

Topic-specific docs live in [`.agents/`](./.agents/):

- [overview](./.agents/overview.md) — site purpose, audience, page structure
- [content](./.agents/content.md) — projects list and how to add or edit a project page
- [styling](./.agents/styling.md) — CSS conventions, theme tokens, light/dark
- [deploy](./.agents/deploy.md) — GitHub Pages workflow and domain notes

Read the doc that matches the change you're about to make. If you add a new
class of work that doesn't fit any of the above, add a new file under
`.agents/` and link it here.

## House rules

- No build-time network fetches. Project content is hand-authored in
  `src/projects/*.md`; full docs live in each repo's README.
- Plain CSS only — no Tailwind, no preprocessors. See styling.md.
- Keep new pages small and the file tree shallow. This is a landing site,
  not a CMS.
