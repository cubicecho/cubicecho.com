# Site overview

## Purpose

`cubicecho.com` is the public face of the **Cubic Echo** open source org.
Visitors are mostly other developers arriving from a GitHub link, an npm package
page, or word of mouth. The site has two jobs:

1. Tell them at a glance what Cubic Echo is.
2. List every project with enough to decide whether to click through.

"Every project" is literal: the card list is the org's repo list. Deeper
documentation always lives in each repo's README and, increasingly, in each
repo's own GitHub Pages site — this one points outward.

## Page structure

```
/                  → home: hero + one section per group, all 32 projects
/ai/               → AI & Agents
/cloud/            → Personal Cloud
/dev/              → Dev Tools
/apps/             → Apps
/about/            → short blurb about the org
/projects/<slug>/  → one page per project
```

The four group pages are one template (`src/group.njk`) paginated over
`src/_data/categories.js`, and the home page renders the same groups as
sections. Adding a group is a data change; see [content.md](./content.md).

Each project page has a hand-authored intro, optional links (Website / GitHub /
npm / demo), and a pointer to the repo README for full docs.

## Tech

- **[Eleventy 3.x](https://www.11ty.dev/)** with the default Nunjucks engine.
- Templates in `src/_includes/`: `base.njk` (layout), `project.njk` (project
  page layout), `project-card.njk` (the card partial shared by the home and
  group pages), `mark.njk` (the inline logo).
- Project data in `src/projects/*.md`, one file per project, with shared
  frontmatter in `src/projects/projects.json`.
- Groups in `src/_data/categories.js`; site-wide config in `src/_data/site.js`.
- Output goes to `_site/` (gitignored).

## Relationship to cubesite

[cubesite](https://github.com/cubicecho/cubesite) owns the org's brand — the
mark, the color tokens, and the `cubesite.css` that each project's own site
vendors. This site predates it and keeps its own `src/css/styles.css`, which is
where those tokens came from; they are the same values, and a change to one
should be carried to the other. `src/_includes/mark.njk` is a copy of
`cubesite/brand/mark.svg`.

The reason a project card can show a "site ↗" link at all is cubesite: it
scaffolds the Pages site each repo links to.

## What this site is not

- Not a blog. If a blog is added later, scope it deliberately and document it
  here.
- Not a docs site. Per-project docs belong in each repo's README or its own
  Pages site.
- Not a CMS. Content is files, edited in a text editor.
