# Content guide

## The project list

The home page renders every file in `src/projects/` that has the `project`
tag (set globally in `src/projects/projects.json`). Order is controlled by
the `order` frontmatter field — lower numbers come first.

Current lineup:

| slug                    | status       | repo                                                | order |
| ----------------------- | ------------ | --------------------------------------------------- | ----- |
| preflight               | coming-soon  | _private_                                           | 1     |
| rpi-auto-gym            | alpha        | github.com/vantreeseba/rpi-auto-gym                 | 2     |
| auto-cal                | alpha        | github.com/vantreeseba/auto-cal                     | 3     |
| philotes                | alpha        | github.com/vantreeseba/philotes                     | 4     |
| sendspin-image-server   | alpha        | github.com/vantreeseba/sendspin-image-server        | 5     |

Most repos currently live under the personal `vantreeseba` GitHub account.
The site itself is intended to deploy from a `cubicecho` GitHub org.

## Adding a project

1. Create `src/projects/<slug>.md`.
2. Frontmatter fields:

   ```yaml
   ---
   title: <display name>            # required
   tagline: <one short sentence>    # required — shown on home card and project page
   status: coming-soon | alpha | stable | archived  # optional, drives the badge
   order: <number>                  # optional, controls list order
   repo: https://github.com/...     # optional; omit for private projects
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
