---
title: eunomia
tagline: A multiplatform activity tracker — what you used, for how long, on your own server.
category: cloud
order: 6
repo: https://github.com/cubicecho/eunomia
---

A desktop tray agent records which application is in use and sends it to a
self-hosted, multi-user server. Apps carry **contexts** — the site in the
browser, the project or book that is open — so "four hours in an editor" can
say which repo, and categories are assigned by hand or matched by regex rules.

The API is GraphQL only, auth included: magic-link login, device provisioning
with API keys, activity ingestion as stateless pings, and per-user
authorization scoping throughout. A web dashboard reads the same graph.

Stack: TypeScript, GraphQL, a tray agent per platform. Status: working MVP.
