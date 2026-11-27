// The QNAP Container Station 3 registry.
//
// Container Station's custom app templates are single-container only: an image,
// ports, env name/value pairs and folder mappings — no Compose, no git, no form
// variables. So the QNAP registry has two halves:
//
//   - `apps` below → /qnap/templates.json (src/qnap-templates.json.11ty.js):
//     one template per app that runs on its own, with no database server.
//     The deploy wizard lets you edit each env value and folder mapping, so
//     anything you must set is a CHANGE_ME_ value.
//   - every stack in src/_data/templates.js → /qnap/<slug>.yml
//     (src/qnap-stacks.11ty.js): the stack's compose file with each ${VAR}
//     resolved, for Applications → Create. Container Station reads no .env
//     file, so values have to be in the YAML. `stackDefaults` gives QNAP
//     values for the variables that differ there (host paths).
//
// Folder mappings follow QNAP's convention: a `Container` shared folder, one
// subfolder per app. In a template `bind` is share-relative (/Container/...);
// in a compose file it is the full path (/share/Container/...).

const port = (host, container) => `${host}:${container}/tcp`;
const data = (app, sub = "data", container = "/data") => ({
  container,
  bind: `/Container/${app}/${sub}`,
});

module.exports = {
  stackDefaults: {
    NOTES_DIR: "/share/Container/mcp-ragdown/notes",
    AGENT_ROUTER_SRC: "/share/Container/agent-router",
  },

  apps: [
    {
      slug: "heautou",
      title: "heautou",
      sub_title: "Sign-in (OIDC) for your apps",
      description:
        "A minimal OpenID Connect provider for the Cubic Echo apps. Set ISSUER_URL to this NAS's address, then open port 3000 within ten minutes of first start to create the admin account.",
      image: "ghcr.io/cubicecho/heautou:latest",
      env: [{ name: "ISSUER_URL", value: "http://CHANGE_ME_NAS_ADDRESS:3000/oidc" }],
      volumes: [data("heautou")],
      ports: [port(3000, 3000)],
    },
    {
      slug: "mcp-skills-manager",
      title: "mcp-skills-manager",
      sub_title: "Skills for every agent, over MCP",
      description:
        "Serves Markdown skills to MCP clients, with a web editor on port 3100. Leave MCP_SKILLS_TOKEN empty and one is generated and printed to the container log.",
      image: "ghcr.io/cubicecho/mcp-skills-manager:latest",
      env: [{ name: "MCP_SKILLS_TOKEN", value: "" }],
      volumes: [data("mcp-skills-manager")],
      ports: [port(3100, 3000)],
    },
    {
      slug: "mcp-actual",
      title: "mcp-actual",
      sub_title: "Your Actual Budget, over MCP",
      description:
        "Opens one Actual Budget file and serves it to MCP clients on port 3101. Set the three ACTUAL_ values to your sync server; leave MCP_ACTUAL_TOKEN empty to have one generated.",
      image: "ghcr.io/cubicecho/mcp-actual:latest",
      env: [
        { name: "ACTUAL_SERVER_URL", value: "CHANGE_ME_ACTUAL_SERVER_URL" },
        { name: "ACTUAL_PASSWORD", value: "CHANGE_ME_ACTUAL_PASSWORD" },
        { name: "ACTUAL_SYNC_ID", value: "CHANGE_ME_ACTUAL_SYNC_ID" },
        { name: "MCP_ACTUAL_TOKEN", value: "" },
      ],
      volumes: [data("mcp-actual")],
      ports: [port(3101, 3000)],
    },
    {
      slug: "mcp-ragdown",
      title: "mcp-ragdown",
      sub_title: "Search over your Markdown notes, over MCP",
      description:
        "Indexes the Markdown in Container/mcp-ragdown/notes and gives agents search over it, on port 3102. Leave RAGDOWN_TOKEN empty to have one generated.",
      image: "vantreeseba/mcp-ragdown:latest",
      env: [{ name: "RAGDOWN_TOKEN", value: "" }],
      volumes: [data("mcp-ragdown", "notes", "/docs"), data("mcp-ragdown")],
      ports: [port(3102, 3000)],
    },
    {
      slug: "mcp-router",
      title: "mcp-router",
      sub_title: "One endpoint for every MCP server",
      description:
        "Installs MCP servers and serves them all over streamable HTTP on port 3200. Leave MCP_ROUTER_TOKEN empty and one is generated and printed once to the container log.",
      image: "vantreeseba/mcp-router:latest",
      env: [{ name: "MCP_ROUTER_TOKEN", value: "" }],
      volumes: [data("mcp-router")],
      ports: [port(3200, 3000)],
    },
    {
      slug: "llm-router",
      title: "llm-router",
      sub_title: "One OpenAI-compatible endpoint for your model servers",
      description:
        "Puts Ollama, llama.cpp, LM Studio or a hosted API behind one endpoint on port 3201. Leave LLM_ROUTER_TOKEN empty to have one generated.",
      image: "ghcr.io/cubicecho/llm-router:latest",
      env: [{ name: "LLM_ROUTER_TOKEN", value: "" }],
      volumes: [data("llm-router")],
      ports: [port(3201, 3000)],
    },
    {
      slug: "task-server",
      title: "task-server",
      sub_title: "Scheduled AI tasks",
      description:
        "A prompt on a cron, run against an OpenAI-compatible model with your MCP tools, keeping every run's output. Dashboard on port 3204; its database is embedded in the data folder.",
      image: "ghcr.io/cubicecho/task_server:latest",
      env: [
        { name: "TZ", value: "UTC" },
        { name: "OPENAI_API_KEY", value: "" },
      ],
      volumes: [data("task-server")],
      ports: [port(3204, 8787)],
    },
  ],
};
