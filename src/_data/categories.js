// The four groups the project list is partitioned into.
//
// This is the single source of truth for the grouping: `.eleventy.js` builds one
// collection per entry, the home page renders a section per entry, and the
// header nav is generated from it. Adding a group means adding it here and
// setting `category: <slug>` on the project files that belong to it.
//
// `slug` is both the `category` value in project frontmatter and the page URL
// (`/ai/`, `/cloud/`, …). The `apps` group is the default for a project with no
// `category` set, and it is last because it is the catch-all.
module.exports = [
  {
    slug: "ai",
    nav: "AI & Agents",
    title: "AI & Agents",
    blurb:
      "MCP servers, agent runtimes, and the libraries underneath them — tooling built for models to use, and for you to host yourself.",
  },
  {
    slug: "cloud",
    nav: "Personal Cloud",
    title: "Personal Cloud",
    blurb:
      "Self-hosted apps for one person's life: time, tasks, habits, notes, people, documents. Each one is its own app with its own GraphQL API, and the dashboard stitches them into a single page.",
  },
  {
    slug: "dev",
    nav: "Dev Tools",
    title: "Dev Tools",
    blurb:
      "Libraries and tooling meant to be built with — a GraphQL toolkit, a component registry, and the scaffolding the rest of these repos share.",
  },
  {
    slug: "apps",
    nav: "Apps",
    title: "Apps",
    blurb:
      "Standalone apps that run in the browser and need nothing behind them.",
  },
];
