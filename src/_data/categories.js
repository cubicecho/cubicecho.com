// The groups the project list is partitioned into.
//
// This is the single source of truth for the grouping: `.eleventy.js` builds one
// collection per entry, the home page renders a section per entry, and each
// entry gets its own page at `/<slug>/`. Adding a group means adding it here and
// setting `category: <slug>` on the project files that belong to it.
//
// `slug` is both the `category` value in project frontmatter and the page URL
// (`/mcp/`, `/cloud/`, …). The `apps` group is the default for a project with no
// `category` set. `other` is last because it is the catch-all.
//
// The header nav does not list the groups — there are too many for one row.
// It links Guides, the home page (which shows every group) and About.
module.exports = [
  {
    slug: "mcp",
    title: "MCP Servers",
    blurb:
      "Model Context Protocol servers: skills, your own notes, your budget — each one a set of tools any MCP client can call.",
  },
  {
    slug: "infra",
    title: "AI Infrastructure",
    blurb:
      "The routers that sit between your clients and everything else: one endpoint for many MCP servers, one for many model servers, and one address for every app's agents.",
  },
  {
    slug: "agents",
    title: "AI Apps",
    blurb:
      "Agents you host yourself and actually use: a chat client, and a server that runs prompts on a schedule.",
  },
  {
    slug: "libs",
    title: "AI Libraries",
    blurb:
      "The agent loop and MCP tool pool the AI apps share, and the discovery library the MCP servers use to find each other — published so you can build your own on them.",
  },
  {
    slug: "cloud",
    title: "Personal Cloud",
    blurb:
      "Self-hosted apps for one person's life: habits, todos, people, time, documents, and the sign-in in front of them. Each is its own app with its own GraphQL API.",
  },
  {
    slug: "dev",
    title: "Dev Tools",
    blurb:
      "Libraries and tooling meant to be built with — a GraphQL toolkit, a component registry, and the scaffolding the rest of these repos share.",
  },
  {
    slug: "apps",
    title: "Apps",
    blurb:
      "Standalone apps that run in the browser and need nothing behind them.",
  },
  {
    slug: "other",
    title: "Other",
    blurb: "Projects that span the rest.",
  },
];
