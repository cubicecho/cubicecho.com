---
title: personal-dashboard
tagline: One page and one GraphQL endpoint over the whole personal cloud.
category: cloud
order: 1
repo: https://github.com/cubicecho/personal-dashboard
---

Each app in the personal cloud already serves its own `/graphql`. The dashboard
introspects them — [auto-cal](/projects/auto-cal/),
[notes](/projects/notes/), [philotes](/projects/philotes/),
[eunomia](/projects/eunomia/) — and stitches each one into a single namespaced
supergraph, then puts a single page in front of it.

The apps stay completely independent: no app repo changes, nothing is
registered anywhere, and an app that is not running simply is not in the graph
that day. Today's schedule, what you were working on, who you owe a message —
one query, one page.

Stack: TypeScript, GraphQL schema stitching, a static dashboard page.
