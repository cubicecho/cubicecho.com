---
title: google-mcp-suite-docker
tagline: Exposes the Google Workspace MCP servers over the network for homelab hosting.
category: ai
order: 3
repo: https://github.com/cubicecho/google-mcp-suite-docker
---

google-mcp-suite-docker (aka google-mcp-suite-network) takes the five stdio MCP
servers from [google-mcp-suite](https://github.com/simiancraft/google-mcp-suite)
— Gmail, Calendar, Drive, Docs, and Sheets — and re-exposes each over the
network as a **Streamable HTTP** MCP endpoint, so you can run it once on a
homelab or Docker host and point any MCP client at it.

Each request is addressed as `/<account>/<service>`, so a single deployment can
serve several authorized Google accounts, and an `/admin` UI handles account
authorization. Each session spawns its own child stdio server and forwards raw
JSON-RPC.

Ships as a Docker image with compose config. Stack: TypeScript, Express,
`@modelcontextprotocol/sdk`.
