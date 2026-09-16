# Content guide

## The project list

Every file in `src/projects/` with the `project` tag (set globally in
`src/projects/projects.json`) is a project. **The list is exactly the
non-archived repos in the `cubicecho` GitHub org, and nothing else.** A repo
that leaves the org, or a personal repo that never joined it, does not get a
card here.

Projects are partitioned into four groups on the `category` frontmatter field.
The groups are declared once, in [`src/_data/categories.js`](../src/_data/categories.js),
and everything else is generated from that list:

- `.eleventy.js` builds one collection per group — `projectAi`, `projectCloud`,
  `projectDev`, `projectApps`.
- `src/index.njk` renders one home section per group, in declaration order.
- `src/group.njk` paginates over the list to produce `/ai/`, `/cloud/`,
  `/dev/`, `/apps/`.
- `src/_includes/base.njk` generates the header nav from it.

So **adding or renaming a group is a change to `categories.js` alone.** Order
within a group comes from the `order` frontmatter field, and each group has its
own sequence starting at 1.

| group | slug | what belongs in it |
| --- | --- | --- |
| AI & Agents | `ai` | MCP servers, agent runtimes, and the libraries under them. |
| Personal Cloud | `cloud` | Self-hosted apps for one person's life, plus the dashboard that stitches them. |
| Dev Tools | `dev` | Libraries meant to be built *with*, and the org's shared scaffolding. |
| Apps | `apps` | Standalone apps that run in a browser and need nothing behind them. **The default** when `category` is unset. |

Current lineup — 32 projects, one per org repo:

| group | projects (in order) |
| --- | --- |
| `ai` | mcp-router, mcp-skills-manager, mcp-zeromem, mcp-ragdown, mcp-actual, google-mcp-suite-docker, min-agent, task-server, kanban-server, agent-core, agent-mcp-pool |
| `cloud` | personal-dashboard, auto-cal, ethos, telos, philotes, eunomia, notes, engrafo, auto-cal-ha-integration |
| `dev` | cubeui, cubesite, graphql-mcp, drizzle-graphql, graphql-casl, graphql-zod, graphql-mocks, graphql-codegen-field-descriptions, cubicecho.com |
| `apps` | fcb1010, rp-tools, ravocal |

Two slugs deliberately differ from their repo name, because the file slug is
the URL and the repo name is not a good one: `task-server` →
`cubicecho/task_server`, and `auto-cal-ha-integration` →
`cubicecho/auto_cal_ha_integration`. `cubicecho-com.md` is the third, to keep a
dot out of the path. In each case `title:` shows the real name and `repo:`
points at the real repo.

## Adding a project

A new repo in the org gets a card here. That is the same checklist
[cubesite](https://github.com/cubicecho/cubesite) enforces for project sites —
repo, Pages site, card.

1. Create `src/projects/<slug>.md`.
2. Frontmatter fields:

   ```yaml
   ---
   title: <display name>            # required — the repo name, as published
   tagline: <one short sentence>    # required — shown on the card and the page
   category: ai | cloud | dev | apps  # optional; omit for `apps`
   order: <number>                  # optional, per-group ordering
   repo: https://github.com/...     # the org repo
   homepage: https://...            # optional — its GitHub Pages site;
                                    #   shown as "site ↗" on the card and
                                    #   "Website →" on the project page. NOTE:
                                    #   do not name this `site` — that key
                                    #   collides with src/_data/site.js.
   npm: https://www.npmjs.com/...   # optional — only if actually published
   demo: https://...                # optional
   ---
   ```

   A tagline containing `: ` must be quoted, or the YAML parser reads it as a
   mapping and the build fails.

3. Body: a short hand-authored intro, three to six sentences — what it is, the
   one thing that makes it worth a click, and the stack. Cross-link sibling
   projects with root-relative links (`/projects/agent-core/`); several of these
   repos only make sense next to each other. End by trusting `project.njk` to
   render the "Full documentation lives in the README" pointer when `repo` is
   set.

## Keeping it in sync with the org

The list drifts when a repo is added, renamed, or archived. To check:

```sh
gh repo list cubicecho --limit 100 --json name,description,isArchived
ls src/projects/*.md
```

`cubesite`'s `npm run audit` covers the other half of the same question — which
repos still have no Pages site, i.e. which cards can't have a `homepage:` yet.

## What does NOT belong on a project page

- The full README. Link to it instead.
- Long install instructions or API reference. Link to the README.
- A project that is not an org repo — including private work. The old site
  carried three (`preflight`, and two repos under the personal `vantreeseba`
  account); they were removed, and a card for something a visitor cannot open
  is worse than no card.
- Screenshots over ~600KB. Optimize first; drop them in `src/assets/` and
  reference with `/assets/<file>`.
