# Site overview

## Purpose

`cubicecho.com` is the public face of the **Cubic Echo** open source org.
Visitors are mostly other developers arriving from a GitHub link, an npm
package page, or word of mouth. The site has two jobs:

1. Tell them at a glance what Cubic Echo is.
2. List the projects with enough info to decide whether to click through.

Deeper documentation always lives in each project's repo README — the site
points outward.

## Page structure

```
/              → home (hero + project grid; general apps)
/ai/           → AI Projects tab (MCP / LLM / agent tooling)
/dev/          → Dev Tools tab (libraries + developer tooling)
/about/        → short blurb about the org
/projects/<slug>/  → one page per project
```

The project set is partitioned across the home, `/ai/`, and `/dev/` pages by
the `category` frontmatter field (see [content.md](./content.md)). Each project
page has a hand-authored intro, optional links (GitHub / npm / demo), and a
pointer to the repo README for full docs.

## Tech

- **[Eleventy 3.x](https://www.11ty.dev/)** with the default Nunjucks template
  engine.
- Templates live in `src/_includes/` (`base.njk` layout, `project.njk`
  project-page layout, `project-card.njk` — the shared card partial included by
  the `/`, `/ai/`, and `/dev/` list pages).
- Project data lives in `src/projects/*.md` (one file per project), with
  shared frontmatter in `src/projects/projects.json`.
- Site-wide config is in `src/_data/site.js`.
- Output goes to `_site/` (gitignored).

## What this site is not

- Not a blog. If a blog is added later, scope it deliberately and document it
  here.
- Not a docs site. Per-project docs belong in each repo's README.
- Not a CMS. Content is files, edited in a text editor.
