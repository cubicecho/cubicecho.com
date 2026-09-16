---
title: auto-cal
tagline: A smart todo and habit scheduler that fits tasks into your time blocks by priority.
category: cloud
order: 2
repo: https://github.com/cubicecho/auto-cal
homepage: https://cubicecho.github.io/auto-cal/
---

auto-cal turns a list of tasks and habits into a real schedule. You define time
blocks — work, exercise, learning, whatever — and give each task a priority;
auto-cal slots them into the right block, tracks completion rates for recurring
habits, and automatically reschedules when higher-priority items push lower
ones down.

Self-hosted on your machine: a React + Apollo Client frontend talks to an
Apollo Server backend over GraphQL, with Drizzle ORM and PGLite for local
persistence. It takes its habits from [ethos](/projects/ethos/) and reaches
Home Assistant through
[auto-cal-ha-integration](/projects/auto-cal-ha-integration/).
