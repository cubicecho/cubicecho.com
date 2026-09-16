---
title: task-server
tagline: Scheduled AI tasks — a prompt, a cron trigger, your MCP tools, and the record of every run.
category: ai
order: 8
repo: https://github.com/cubicecho/task_server
---

task-server is [min-agent](/projects/min-agent/) with the chat taken out. You
write a prompt, attach a cron trigger, and the server runs it against an
OpenAI-compatible model with your MCP servers' tools attached — keeping the
output of every run, so a task that started failing quietly is visible rather
than inferred.

There is no conversation here, only tasks that fire on their own: a nightly
digest, a weekly tidy-up, a check that runs while you are asleep.

Stack: TypeScript, GraphQL, Postgres, MCP. Built on
[agent-core](/projects/agent-core/) and
[agent-mcp-pool](/projects/agent-mcp-pool/).
