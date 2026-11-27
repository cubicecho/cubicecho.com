---
title: llm-router
tagline: One OpenAI-compatible endpoint in front of several model servers, grouped into workspaces.
category: infra
order: 2
repo: https://github.com/cubicecho/llm-router
homepage: https://cubicecho.github.io/llm-router/
---

llm-router is the model-server counterpart of
[mcp-router](/projects/mcp-router/), and it is built the same way. Register
your model servers as providers — Ollama, llama.cpp, LM Studio, a hosted
API — and every client gets one base URL and one token, asking for models as
`<provider>/<model>` (`ollama/qwen3:32b`).

Workspaces give each client its own `/w/<slug>/v1` endpoint and only the models
it should see. Pools spread one model across several servers, and keep a
conversation on the same server through the `X-Session-Id` header, so a warm
cache stays warm.

Stack: TypeScript + Express, React web UI, Docker.
