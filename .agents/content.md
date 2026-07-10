# Content guide

## The project list

Every file in `src/projects/` with the `project` tag (set globally in
`src/projects/projects.json`) is a project. The listing is **partitioned** on
the `category` frontmatter field into three tabs:

- `/` (home) — `projectMain`: category `app` (the default when unset).
- `/ai/` (`src/ai.njk`) — `projectAi`: category `ai`.
- `/dev/` (`src/dev.njk`) — `projectDev`: category `dev`.

These collections and the full `project` collection are defined in
`.eleventy.js` and sorted by `order` (lower first). **Each category has its own
`order` sequence** (they start over at 1 per tab). Categories:

- `ai` — MCP / LLM / agent tooling.
- `dev` — libraries and developer tooling meant to be built _with_.
- `app` (default) — end-user apps and hardware, including ML/CV projects like
  `rpi-auto-gym` (treated as an app, not AI).

Current lineup:

| slug                      | category | status      | repo                                          | order |
| ------------------------- | -------- | ----------- | --------------------------------------------- | ----- |
| preflight                 | app      | coming-soon | _private_                                     | 1     |
| rpi-auto-gym              | app      | alpha       | github.com/vantreeseba/rpi-auto-gym           | 2     |
| auto-cal                  | app      | alpha       | github.com/cubicecho/auto-cal                 | 3     |
| philotes                  | app      | alpha       | github.com/cubicecho/philotes                 | 4     |
| sendspin-image-server     | app      | alpha       | github.com/vantreeseba/sendspin-image-server  | 5     |
| notes                     | app      | alpha       | github.com/cubicecho/notes                    | 6     |
| ravocal                   | app      | alpha       | github.com/cubicecho/ravocal                  | 7     |
| rp-tools                  | app      | alpha       | github.com/cubicecho/rp-tools                 | 8     |
| mcp-router                | ai       | alpha       | github.com/cubicecho/mcp-router               | 1     |
| mcp-skills-manager        | ai       | alpha       | github.com/cubicecho/mcp-skills-manager       | 2     |
| google-mcp-suite-docker   | ai       | alpha       | github.com/cubicecho/google-mcp-suite-docker  | 3     |
| graphql-casl              | dev      | alpha       | github.com/vantreeseba/graphql-casl           | 1     |
| graphql-zod               | dev      | alpha       | github.com/vantreeseba/graphql-zod            | 2     |
| graphql-mcp               | dev      | alpha       | github.com/cubicecho/graphql-mcp              | 3     |

Org projects live under the `cubicecho` GitHub org; a few older libraries and
hardware repos are still under the personal `vantreeseba` account.

## Adding a project

1. Create `src/projects/<slug>.md`.
2. Frontmatter fields:

   ```yaml
   ---
   title: <display name>            # required
   tagline: <one short sentence>    # required — shown on home card and project page
   status: coming-soon | alpha | stable | archived  # optional, drives the badge
   category: ai | dev               # optional — routes to /ai/ or /dev/; omit for home
   order: <number>                  # optional, controls list order (per category)
   repo: https://github.com/...     # optional; omit for private projects
   homepage: https://...            # optional — the project's own site / GH Pages;
                                    #   shown as "site ↗" on the card and "Website →"
                                    #   on the project page. NOTE: do not name this
                                    #   `site` — that key collides with the global
                                    #   `src/_data/site.js` object.
   npm: https://www.npmjs.com/...   # optional
   demo: https://...                # optional
   ---
   ```

3. Body: a short hand-authored intro (~3–6 sentences). End each project page
   by trusting the `project.njk` layout to render the "Full documentation
   lives in the README" pointer when `repo` is set.

## Editing existing projects

The `tagline:` field is currently a `TODO` placeholder for every project
except as the user fills them in. Each `.md` body also has a `<!-- TODO -->`
comment marking the intro to rewrite. When you're given a real description,
replace both.

## Status badges

| value         | use when                                                 |
| ------------- | -------------------------------------------------------- |
| `coming-soon` | repo is private or pre-launch                            |
| `alpha`       | published but unstable / breaking changes likely         |
| `stable`      | published, API considered stable                         |
| `archived`    | no longer maintained — keep on the list with this badge  |

Adding a new status value also requires a `.badge-<value>` rule in
`src/css/styles.css`.

## What does NOT belong on a project page

- The full README. Link to it instead.
- Long install instructions or API reference. Link to the README.
- Screenshots over ~600KB. Optimize first; drop them in `src/assets/` and
  reference with `/assets/<file>`.
