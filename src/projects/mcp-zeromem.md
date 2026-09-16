---
title: mcp-zeromem
tagline: Conversational memory for agents that costs zero tokens to maintain.
category: ai
order: 3
repo: https://github.com/cubicecho/mcp-zeromem
---

Every turn an agent sees goes into one SQLite store. Recall over that store —
an entity graph plus lexical and dense search — runs with no LLM in the loop,
so remembering is free: the only tokens spent are the ones the model spends
reading what came back. That is the whole idea, and it is what separates this
from memory systems that pay a summarization call on every write.

The method follows the Zero-Mem paper
([arXiv:2607.29377](https://arxiv.org/abs/2607.29377)), whose upstream
implementation is [ptaranat/zeromem](https://github.com/ptaranat/zeromem).

Stack: TypeScript, SQLite, MCP.
