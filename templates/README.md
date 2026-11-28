# Stack templates

Each folder holds one `docker-compose.yml`, served from the site at
`/templates/<slug>/docker-compose.yml` and shown inline by the matching guide
(`{% composeFile "<slug>" %}`).

| stack | compose project | guide |
| --- | --- | --- |
| [`personal-cloud`](./personal-cloud/docker-compose.yml) | `cubicecho-cloud` | [personal-cloud](../src/guides/personal-cloud.md) |
| [`mcp`](./mcp/docker-compose.yml) | `cubicecho-mcp` | [mcp](../src/guides/mcp.md) |
| [`ai-router`](./ai-router/docker-compose.yml) | `cubicecho-ai` | [ai-infrastructure](../src/guides/ai-infrastructure.md) |
| [`ai-piecemeal`](./ai-piecemeal/docker-compose.yml) | `cubicecho-ai` | [ai-infrastructure](../src/guides/ai-infrastructure.md) |

## How the stacks fit together

The four stacks share no Docker network. Each one reaches the others through
`PUBLIC_HOST` and a published port, and you set up most of those links in an
app's UI, not in compose. `ai-router` and `ai-piecemeal` use the same compose
project name (`cubicecho-ai`), so run **one or the other**.

```mermaid
flowchart LR
    subgraph cloud["personal-cloud · cubicecho-cloud"]
        heautou["heautou<br/>OIDC sign-in"]
        apps["ethos · telos · philotes<br/>eunomia · engrafo"]
    end

    subgraph mcp["mcp · cubicecho-mcp"]
        mcpservers["mcp-skills-manager<br/>mcp-ragdown · mcp-actual"]
    end

    subgraph ai["cubicecho-ai — pick one"]
        direction TB
        allinone["ai-router stack<br/>ai-router"]
        piece["ai-piecemeal stack<br/>mcp-router · llm-router · agent-router"]
    end

    clients["min-agent · task-server<br/>(in both AI stacks)"]
    models[("model servers<br/>Ollama, llama.cpp, hosted APIs")]

    heautou -- "setup URL / OIDC" --> apps
    heautou -- "setup URL / OIDC" --> allinone
    mcpservers -- "/mcp tools" --> allinone
    mcpservers -- "/mcp tools, LAN discovery" --> piece
    models --> allinone
    models --> piece
    allinone -- "/v1 agents" --> clients
    piece -- "/v1 models or agents" --> clients
    apps -. "eunomia LLM_BASE_URL<br/>(optional)" .-> ai
```

## personal-cloud

Self-hosted apps behind one sign-in. Every app except heautou keeps its data
in its own database on one pgvector Postgres. engrafo also stores files in
RustFS (S3-compatible), and a one-shot job creates its buckets.

```mermaid
flowchart TB
    user(["browser"])

    subgraph stack["cubicecho-cloud"]
        heautou["heautou :3000<br/>OIDC provider<br/>embedded PGlite in /data"]
        ethos["ethos :3010"]
        telos["telos :3011"]
        philotes["philotes :3012"]
        eunomia["eunomia :3013"]
        engrafo["engrafo :3014<br/>documents + OCR"]

        pg[("postgres<br/>pgvector/pg17<br/>db per app")]
        rustfs[("rustfs :9000 / :9001<br/>S3 object storage")]
        init["rustfs-init<br/>one-shot: create buckets<br/>engrafo, engrafo-text"]
    end

    user --> heautou & ethos & telos & philotes & eunomia & engrafo
    user -- "S3_PUBLIC_ENDPOINT<br/>file downloads" --> rustfs

    heautou -. "sign-in" .-> ethos & telos & philotes & engrafo

    ethos & telos & philotes & eunomia & engrafo -- "DATABASE_URL" --> pg
    engrafo -- "S3_ENDPOINT" --> rustfs
    init -- "rc bucket create" --> rustfs
```

The order containers start in, from `depends_on`:

```mermaid
flowchart LR
    pg["postgres<br/>healthy"] --> ethos & telos & philotes & eunomia & engrafo
    rustfs["rustfs<br/>healthy"] --> init["rustfs-init<br/>completed"] --> engrafo
    heautou["heautou<br/>no deps"]
```

The first time the `postgres-data` volume is created, the `create-databases`
config runs `CREATE DATABASE` for ethos, telos, philotes, eunomia and engrafo.
Point an app's `*_DATABASE_URL` at your own Postgres to skip the bundled one.

## mcp

Three MCP servers that don't depend on each other. Each one has a bearer
token, a `/mcp` endpoint and a web UI. None of them needs a database.

```mermaid
flowchart LR
    clients(["MCP clients<br/>Claude Code, min-agent,<br/>task-server, mcp-router, ai-router"])

    subgraph stack["cubicecho-mcp"]
        skills["mcp-skills-manager :3100<br/>skills"]
        ragdown["mcp-ragdown :3102<br/>search Markdown notes"]
        actual["mcp-actual :3101<br/>Actual Budget"]
    end

    notes[/"NOTES_DIR → /docs"/]
    actualsrv[("Actual Budget server<br/>ACTUAL_SERVER_URL")]

    clients -- "Bearer token · /mcp" --> skills & ragdown & actual
    notes --> ragdown
    actual -- "sync" --> actualsrv
```

## ai-router (all in one)

ai-router covers models, MCP tools and agents in one app with one UI. It
signs people in through heautou or any OIDC issuer.

```mermaid
flowchart LR
    user(["browser / apps"])
    heautou["heautou<br/>(personal-cloud)"]
    mcpservers["MCP servers<br/>(mcp stack)"]
    models[("model servers")]

    subgraph stack["cubicecho-ai"]
        air["ai-router :3202<br/>/v1 · /mcp · UI"]
        min["min-agent :3203<br/>chat client"]
        task["task-server :3204<br/>prompts on a cron"]
        pg[("postgres 17<br/>ai_router · min_agent · task_server")]
    end

    user --> air & min & task
    heautou -. "OIDC" .-> air
    air -- "providers" --> models
    air -- "tools" --> mcpservers
    min & task -- "/v1, agent name as model" --> air
    air & min & task -- "DATABASE_URL" --> pg
```

## ai-piecemeal

The same jobs as ai-router, split into three services: mcp-router for tools,
llm-router for models and agent-router for agents. agent-router has no UI and
no published image yet. It runs a checkout from `AGENT_ROUTER_SRC` on
`node:26-slim`, and its only provider is llm-router, under the name `llm`.

```mermaid
flowchart LR
    user(["browser / MCP clients"])
    mcpservers["MCP servers<br/>(mcp stack, LAN discovery)"]
    models[("model servers<br/>host.docker.internal")]

    subgraph stack["cubicecho-ai"]
        mcpr["mcp-router :3200<br/>/mcp merged · /mcp/w/slug"]
        llmr["llm-router :3201<br/>/v1 · pools"]
        agr["agent-router :3205<br/>/v1 · /mcp · /graphql admin"]
        min["min-agent :3203"]
        task["task-server :3204"]
        pg[("postgres 17<br/>agent_router · min_agent · task_server")]
    end

    user --> mcpr & llmr & min & task
    mcpr -- "proxy / run" --> mcpservers
    llmr --> models
    agr -- "provider 'llm'<br/>LLM_ROUTER_TOKEN<br/>model llm/provider/model" --> llmr
    min & task -- "/v1 models" --> llmr
    min & task -. "/v1 agents" .-> agr
    agr & min & task -- "DATABASE_URL" --> pg
```

`LLM_ROUTER_TOKEN` has to be set by you, not generated, because llm-router
checks it and agent-router sends it. mcp-router and llm-router keep their state
in `/data` volumes, not in Postgres.

## Ports at a glance

| stack | default host ports |
| --- | --- |
| personal-cloud | heautou 3000 · ethos 3010 · telos 3011 · philotes 3012 · eunomia 3013 · engrafo 3014 · rustfs 9000 (S3) / 9001 (console) |
| mcp | skills 3100 · actual 3101 · ragdown 3102 |
| ai | mcp-router 3200 · llm-router 3201 · ai-router 3202 · min-agent 3203 · task-server 3204 · agent-router 3205 |

Each port can be changed with that service's `*_PORT` variable.
