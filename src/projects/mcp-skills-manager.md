---
title: mcp-skills-manager
tagline: An MCP server that serves reusable "skills" — markdown playbooks — to agents.
category: ai
order: 2
repo: https://github.com/cubicecho/mcp-skills-manager
homepage: https://cubicecho.github.io/mcp-skills-manager/
---

mcp-skills-manager serves skills — reusable markdown documents (instructions,
playbooks, references) — to agents over MCP. Every skill is exposed two ways at
once: as an MCP **tool** whose call returns the skill's markdown on demand, and
as a `skill://` **resource** for clients that browse and attach resources, with
resource templates, argument completion, pagination, and live updates when
skills change on disk.

Discovery meta-tools (`list_skills`, `search_skills`) let an agent find the
right skill, and agent-side authoring tools plus a markdown web editor let you
create, update, rename, and delete skills. Named workspaces expose curated
subsets. Runs over both stdio and HTTP.

Stack: TypeScript + Node/Express, React web UI, Docker.
