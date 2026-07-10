---
title: mcp-router
tagline: An MCP gateway — install, run, and re-expose many MCP servers behind one endpoint.
status: alpha
version: v1.0.0
category: ai
order: 1
repo: https://github.com/cubicecho/mcp-router
homepage: https://cubicecho.github.io/mcp-router/
---

mcp-router installs Model Context Protocol servers from registries or npm,
runs them as lazily-spawned stdio child processes (or proxies remote
streamable-HTTP servers), and re-exposes every one over streamable HTTP. Each
server gets its own route at `/mcp/<name>`; an aggregate endpoint at `/mcp`
merges them all with tool names namespaced as `<server>__<tool>`; and
"workspaces" group a chosen subset behind their own `/mcp/w/<slug>` endpoint,
with optional per-workspace `env` / `args` / `headers` overrides.

Point one client at the router instead of configuring N servers in every
client — give each client exactly the tools it needs. Manage everything through
a built-in React web UI or hand-edit the flat JSON config and reload, with
bearer-token auth in front.

Stack: TypeScript + Express backend, React web UI, published Docker images on
GHCR and Docker Hub.
