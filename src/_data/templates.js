// The app templates: one entry per stack in `templates/<slug>/docker-compose.yml`.
//
// /templates.json (src/templates.json.11ty.js) is built from this list: the
// app-template feed for Portainer and Dockhand, in Portainer's v2 format with
// type 3 (Compose stack). A Compose template does not carry the file — it
// points the stack manager at `templates/<slug>/docker-compose.yml` in this
// public repo, fetched at deploy time from `main`. So a change to a stack
// reaches people when it is merged, not when the site deploys.
//
// `guide` links the stack to the guide that explains it (site only, not in the
// feed).
//
// `env` is what the deploy form asks for. Keep it to what a person has to
// decide (addresses, secrets, paths); everything else in the compose file has a
// default. Every name must match a ${VAR} in that compose file — the build
// fails if one does not.
const secret = (name, label) => ({
  name,
  label,
  description: "Generate one with: openssl rand -hex 32",
});

const publicHost = {
  name: "PUBLIC_HOST",
  label: "Public host",
  description:
    "The address other machines reach this one at, e.g. 192.168.1.10. Each app's own URL is built from it.",
  default: "localhost",
};

const postgresPassword = secret("POSTGRES_PASSWORD", "Postgres password");

module.exports = [
  {
    slug: "personal-cloud",
    guide: "/guides/personal-cloud/",
    title: "Cubic Echo: personal cloud",
    description:
      "heautou (sign-in), ethos (habits), telos (todos), philotes (people), eunomia (time) and engrafo (documents), with one shared Postgres.",
    note: "Ports: heautou 3000, ethos 3010, telos 3011, philotes 3012, eunomia 3013, engrafo 3014. Set up heautou first, then pair each app with it. Guide: https://cubicecho.com/guides/personal-cloud/",
    categories: ["cubicecho", "personal cloud"],
    env: [
      publicHost,
      postgresPassword,
      secret("RUSTFS_PASSWORD", "engrafo storage password"),
      secret("ETHOS_AUTH_SECRET", "ethos session secret"),
      secret("TELOS_AUTH_SECRET", "telos session secret"),
      secret("PHILOTES_AUTH_SECRET", "philotes session secret"),
      secret("ENGRAFO_AUTH_SECRET", "engrafo session secret"),
    ],
  },
  {
    slug: "mcp",
    guide: "/guides/mcp/",
    title: "Cubic Echo: MCP servers",
    description:
      "mcp-skills-manager (skills), mcp-ragdown (search over your Markdown notes) and mcp-actual (Actual Budget).",
    note: "Ports: skills 3100, actual 3101, ragdown 3102. Not using Actual Budget? Remove the mcp-actual service. Empty tokens are generated and printed to each server's logs. Guide: https://cubicecho.com/guides/mcp/",
    categories: ["cubicecho", "mcp", "ai"],
    env: [
      {
        name: "NOTES_DIR",
        label: "Notes folder",
        description: "Absolute path on the host to the Markdown folder mcp-ragdown indexes.",
        default: "./notes",
      },
      secret("SKILLS_TOKEN", "mcp-skills-manager token"),
      secret("RAGDOWN_TOKEN", "mcp-ragdown token"),
      secret("ACTUAL_MCP_TOKEN", "mcp-actual token"),
      {
        name: "ACTUAL_SERVER_URL",
        label: "Actual server URL",
        description: "Your Actual Budget sync server.",
      },
      { name: "ACTUAL_PASSWORD", label: "Actual password" },
      {
        name: "ACTUAL_SYNC_ID",
        label: "Actual sync ID",
        description: "Actual → Settings → Advanced → Sync ID.",
      },
    ],
  },
  {
    slug: "ai-router",
    guide: "/guides/ai-infrastructure/",
    title: "Cubic Echo: AI, all in one",
    description:
      "ai-router (models, MCP servers and agents in one app), min-agent (chat) and task-server (scheduled prompts), with one shared Postgres.",
    note: "Ports: ai-router 3202, min-agent 3203, task-server 3204. Pair ai-router with heautou from its sign-in page. Guide: https://cubicecho.com/guides/ai-infrastructure/",
    categories: ["cubicecho", "ai"],
    env: [
      publicHost,
      postgresPassword,
      secret("AI_ROUTER_AUTH_SECRET", "ai-router session secret"),
      { name: "OPENAI_API_KEY", label: "OpenAI API key (optional)" },
    ],
  },
  {
    slug: "ai-piecemeal",
    guide: "/guides/ai-infrastructure/",
    title: "Cubic Echo: AI, piecemeal",
    description:
      "mcp-router (tools), llm-router (models) and agent-router (agents) as separate services, with min-agent, task-server and one shared Postgres.",
    note: "Ports: mcp-router 3200, llm-router 3201, min-agent 3203, task-server 3204, agent-router 3205. agent-router has no image yet: AGENT_ROUTER_SRC must be a checkout of it on the host. Guide: https://cubicecho.com/guides/ai-infrastructure/",
    categories: ["cubicecho", "ai"],
    env: [
      postgresPassword,
      secret("LLM_ROUTER_TOKEN", "llm-router token"),
      secret("AGENT_ROUTER_ADMIN_TOKEN", "agent-router admin token"),
      {
        name: "AGENT_ROUTER_SRC",
        label: "agent-router checkout",
        description: "Absolute path on the host to a checkout of agent-router.",
      },
      { name: "OPENAI_API_KEY", label: "OpenAI API key (optional)" },
    ],
  },
];
