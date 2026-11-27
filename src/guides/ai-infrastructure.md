---
title: Run your own AI infrastructure
summary: One endpoint for your MCP servers, one for your model servers, one for your agents — as separate pieces or as one ai-router — and the apps that sit on top.
order: 3
projects: [ai-router, mcp-router, llm-router, min-agent, task-server, agent-core, agent-mcp-pool, mcp-discovery]
---

Once you have more than one model server and more than a couple of MCP
servers, every client ends up with a copy of every address, key and model
name — and they drift. The routers here each put one endpoint in front of a
kind of thing, so the clients only know the router.

There are three things to route, and two ways to run them:

| | tools | models | agents |
| --- | --- | --- | --- |
| **piecemeal** | [mcp-router](/projects/mcp-router/) | [llm-router](/projects/llm-router/) | agent-router |
| **all in one** | [ai-router](/projects/ai-router/) | ai-router | ai-router |

- **ai-router** is the whole combination: providers and pools, MCP servers,
  agents, workspaces and people, in one app with one UI and one sign-in. Pick it
  if you want agents and don't want to wire three services together.
- **Piecemeal** is each concern as its own small service. Pick it if you only
  need one of them — say, one endpoint for every MCP client — or want to swap a
  piece out. mcp-router and llm-router each have their own UI; agent-router has
  none, and is driven over GraphQL.

## The stacks

One compose file for each way. Both also run [min-agent](/projects/min-agent/),
[task-server](/projects/task-server/) and a shared Postgres. Paste one into a
new stack, or download it: [ai-router.yml](/templates/ai-router/docker-compose.yml) or
[ai-piecemeal.yml](/templates/ai-piecemeal/docker-compose.yml).

Set these in the stack's environment; generate each secret with
`openssl rand -hex 32`:

| variable | stack | |
| --- | --- | --- |
| `PUBLIC_HOST` | all in one | this machine's LAN address or hostname; ai-router builds its own URL from it |
| `POSTGRES_PASSWORD` | both | the shared Postgres |
| `AI_ROUTER_AUTH_SECRET` | all in one | ai-router's session secret |
| `LLM_ROUTER_TOKEN` | piecemeal | llm-router's token; agent-router uses it too, so set it rather than letting one generate |
| `AGENT_ROUTER_ADMIN_TOKEN` | piecemeal | admin on agent-router's `/graphql` |
| `AGENT_ROUTER_SRC` | piecemeal | path to a checkout of agent-router |

| service | stack | port |
| --- | --- | --- |
| [mcp-router](/projects/mcp-router/) | piecemeal | 3200 |
| [llm-router](/projects/llm-router/) | piecemeal | 3201 |
| [ai-router](/projects/ai-router/) | all in one | 3202 |
| [min-agent](/projects/min-agent/) | both | 3203 |
| [task-server](/projects/task-server/) | both | 3204 |
| agent-router | piecemeal | 3205 |

## All in one: ai-router

[ai-router](/projects/ai-router/) runs an agent's whole loop — prompt, models
and MCP tools — behind an OpenAI-compatible `/v1`. An app names an *agent* as
the model and gets back the answer; change an agent's model or tools in one
place and every app that uses it follows.

1. Open `http://<PUBLIC_HOST>:3202` and set up sign-in. Pair it with
   [heautou](/projects/heautou/) by pasting a setup URL, exactly like the
   personal-cloud apps, or set the `AI_ROUTER_OIDC_*` vars.
2. Add your model servers as providers, and the MCP servers from
   [Give your agents tools](/guides/mcp/).
3. Make an agent, a workspace, and a workspace key.
4. Point apps at `http://<PUBLIC_HOST>:3202/v1` with that key, and the agent's
   name as the model. The same agents are served as tools at `/mcp`.

Worker machines can dial in to run tools that have to live somewhere else. It is
early, 0.x — expect it to move.

<details class="compose">
<summary><code>ai-router.yml</code> — show the compose file</summary>

```yaml
{% composeFile "ai-router" %}
```

</details>

## Piecemeal

<details class="compose">
<summary><code>ai-piecemeal.yml</code> — show the compose file</summary>

```yaml
{% composeFile "ai-piecemeal" %}
```

</details>

### Tools: mcp-router

[mcp-router](/projects/mcp-router/) installs MCP servers from registries, npm or
PyPI, runs them on demand, proxies remote ones, and serves them all from
`http://<PUBLIC_HOST>:3200`:

- `/mcp` is every server merged, with tools named `<server>__<tool>`.
- `/mcp/<name>` is one server.
- `/mcp/w/<slug>` is a **workspace**: a chosen subset, for a client that should
  only see those tools.

```sh
claude mcp add --transport http router http://<PUBLIC_HOST>:3200/mcp \
  --header "Authorization: Bearer <token>"
```

The token is printed to its logs on first start unless you set
`MCP_ROUTER_TOKEN`. It can also find MCP servers that advertise themselves on
the LAN, such as mcp-skills-manager with "Advertise on the local network" on.

### Models: llm-router

[llm-router](/projects/llm-router/) is the same idea for model servers. Add
Ollama, llama.cpp, LM Studio or a hosted API as providers in its UI at
`http://<PUBLIC_HOST>:3201`. Clients use `http://<PUBLIC_HOST>:3201/v1` (or
`/w/<slug>/v1` for a workspace), `LLM_ROUTER_TOKEN` as the API key, and
`<provider>/<model>` as the model. A model server on the Docker host itself is
`http://host.docker.internal:<port>/v1`.

A **pool** spreads one model across several servers and keeps each
conversation on the same one, so a warm cache stays warm.

### Agents: agent-router

agent-router is ai-router's agent half on its own: agents, workspaces, runs and
the agent loop, with no UI and no people — just an admin, on `/graphql`. It
serves the same `/v1` and `/mcp` for agents that ai-router does.

The stack points it at llm-router as its one provider, named `llm`, so an
agent's model is `llm/<llm-router provider>/<model>` — for example
`llm/ollama/qwen3:8b`. Agents, workspaces and keys are made with GraphQL
mutations against `http://<PUBLIC_HOST>:3205/graphql`, sent with
`Authorization: Bearer $AGENT_ROUTER_ADMIN_TOKEN`; its README walks through
them. Tools come from workers you attach to a workspace, not from mcp-router.

It has no published image yet, so the stack runs a checkout of the repo
(`AGENT_ROUTER_SRC`) on Node 26. It is the newest piece here and an MVP.

## Something to use it with

- [min-agent](/projects/min-agent/) — a chat client, at
  `http://<PUBLIC_HOST>:3203`. Under **Settings → Agent**, point it at
  llm-router for raw models, or at ai-router or agent-router for agents; add MCP
  servers under **Settings → MCP**. Web, Android and desktop.
- [task-server](/projects/task-server/) — the same thing with the chat taken
  out, at `http://<PUBLIC_HOST>:3204`: a prompt on a cron, with every run's
  output kept. An agent profile can point at ai-router with an agent's name as
  the model.

[kanban-server](/projects/kanban-server/) was the third app; it is retired, and
[telos](/projects/telos/) carries on the idea of agents working a board.

## Building your own

min-agent and task-server share their agent loop and MCP client pool, and both
are published: [agent-core](/projects/agent-core/) is the endpoint-agnostic
loop, and [agent-mcp-pool](/projects/agent-mcp-pool/) keeps MCP clients
connected and hands their tools to it. [mcp-discovery](/projects/mcp-discovery/)
is the other direction: it lets a server you write publish a Server Card and
announce itself on the LAN, so mcp-router finds it with no address typed in.
