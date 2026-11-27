---
layout: base.njk
title: About
permalink: /about/
---
<section class="hero">
  <h1>About</h1>
  <p>A small open source outfit.</p>
</section>

<section class="about">

Cubic Echo is a small open source software outfit. The work falls into a few
rough piles: **MCP servers** and the **AI infrastructure** that routes models,
tools and agents, a **personal cloud** of self-hosted apps for one person's
life, **developer libraries** — mostly around GraphQL — and a few **standalone
apps** that run in a browser tab. The [guides](/guides/) are the quickest way in.

They lean on each other more than they look like they do. The agent servers
share an [agent loop](/projects/agent-core/) and a
[tool pool](/projects/agent-mcp-pool/); the personal-cloud apps each serve their
own GraphQL API, and [symphony](/projects/symphony/) puts one UI over all of
them; the apps share
[components](/projects/cubeui/) and a [site kit](/projects/cubesite/). When the
same thing gets written three times, it becomes its own repo — that is most of
the Dev Tools list.

For now, Cubic Echo is run by a single developer. The work is unified by a
preference for small, sharp tools, public source, self-hosting over accounts,
and projects that scratch a real itch.

Everything is on [GitHub]({{ site.github }}), and every project has its own
README; several have their own site too.

</section>
