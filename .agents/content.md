# Content guide

## The project list

Every file in `src/projects/` with the `project` tag (set globally in
`src/projects/projects.json`) is a project. **The list is exactly the
non-archived repos in the `cubicecho` GitHub org, and nothing else.** A repo
that leaves the org, or a personal repo that never joined it, does not get a
card here.

Projects are partitioned into groups on the `category` frontmatter field.
The groups are declared once, in [`src/_data/categories.js`](../src/_data/categories.js),
and everything else is generated from that list:

- `.eleventy.js` builds one collection per group — `projectMcp`, `projectInfra`,
  `projectCloud`, and so on.
- `src/index.njk` renders one home section per group, in declaration order.
- `src/group.njk` paginates over the list to produce one page per group.

The header nav does not list the groups (there are too many); it links Guides,
the home page and About. So **adding or renaming a group is a change to
`categories.js` alone.** Order within a group comes from the `order`
frontmatter field, and each group has its own sequence starting at 1.

| group | slug | what belongs in it |
| --- | --- | --- |
| MCP Servers | `mcp` | MCP servers an agent calls for tools. |
| AI Infrastructure | `infra` | Routers in front of MCP servers, model servers, and agents. |
| AI Apps | `agents` | Agents people run and use: chat, scheduled tasks. |
| AI Libraries | `libs` | The published libraries the AI apps are built on. |
| Personal Cloud | `cloud` | Self-hosted apps for one person's life, and the sign-in in front of them. |
| Dev Tools | `dev` | Libraries meant to be built *with*, and the org's shared scaffolding. |
| Apps | `apps` | Standalone apps that run in a browser and need nothing behind them. **The default** when `category` is unset. |
| Other | `other` | Projects that span the rest. |

Current lineup:

| group | projects (in order) |
| --- | --- |
| `mcp` | mcp-skills-manager, mcp-ragdown, mcp-actual, mcp-zeromem |
| `infra` | mcp-router, llm-router, ai-router |
| `agents` | min-agent, task-server, kanban-server (deprecated) |
| `libs` | agent-core, agent-mcp-pool, mcp-discovery |
| `cloud` | ethos, telos, philotes, eunomia, engrafo, heautou, auto-cal, notes, auto-cal-ha-integration |
| `dev` | cubeui, cubesite, graphql-mcp, drizzle-graphql, graphql-casl, graphql-zod, graphql-mocks, graphql-codegen-field-descriptions, cubicecho.com |
| `apps` | fcb1010, rp-tools, ravocal |
| `other` | symphony |

The org has more repos than cards (personal-dashboard, left off on purpose because symphony covers it;
google-mcp-suite-docker, dropped because upstream google-mcp-suite now serves
HTTP itself — the site lists only cubicecho projects, so it is not linked;
Home Assistant integrations, s3-artifacts-mcp,
ephemeris, personal-homepage, …); `gh repo list` below shows the gap.

### Status

An optional `status:` frontmatter field (`early`, `deprecated`) renders as a
badge on the card and the project page. An archived repo keeps its card with
`status: deprecated` and a line at the top of the body saying what replaced it.

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
   status: early | deprecated       # optional — shown as a badge
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

## Guides

`src/guides/*.md` are getting-started guides that walk through several
projects together (layout `guide.njk`, URL `/guides/<slug>/`). Frontmatter:
`title`, `summary` (shown on the guide card), `order`, and `projects` — a list
of project slugs rendered as cards at the end. An unknown slug fails the build.
The home page shows the guides first, under "Start here".

The section nav beside a guide is built from its headings at build time, so
there is nothing to maintain by hand: use `##` for sections and `###` for
subsections under them (deeper levels are not listed), and keep heading text
short, since it is also the nav label and the anchor (`## The stack` →
`#the-stack`). Renaming a heading changes its anchor, so check for links to it.
Write headings in Markdown, not raw `<h2>` with attributes, or the nav will
not pick them up. See [styling.md](./styling.md#guide-pages) for how it works.

Each guide carries compose files covering every project in it, in
`templates/<slug>/docker-compose.yml` at the repo root (so a stack manager can
deploy them from this repo), shown in a guide with `{% composeFile "<slug>" %}` and
passthrough-copied to `/templates/<slug>/docker-compose.yml`. Readers paste them into Portainer, Dockhand and the
like, so guides show the file and the env vars to set, not `docker` commands,
and alternatives are separate files rather than compose profiles (stack UIs
handle profiles poorly). Conventions:
images from each repo's own compose or release workflow; every port, URL and
`DATABASE_URL` an env var with a default (`${ETHOS_DATABASE_URL:-postgres://…}`);
one shared Postgres with an inline `configs:` init script creating a database
per app; unique host ports across all three files (cloud 30xx, MCP 31xx, AI
32xx); optional services are ones you delete. Check with
`docker compose -f <file> config -q` after a change, and re-read the source
repo's compose file when one of its apps changes.
Only state how projects connect if a README says so. Nunjucks runs over
Markdown here, so a literal `{{` in a code block needs `{% raw %}`.

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
