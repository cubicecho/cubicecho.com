---
title: "Quickstart: app templates"
summary: The fastest way in. Add one URL — the Cubic Echo template registry — to Portainer or Dockhand, pick a stack, fill in a short form, deploy.
order: 1
---

The quickest way to run any of this. Every stack in these guides is published
in the **Cubic Echo template registry**: a feed of app templates that Portainer
and Dockhand read, so the stacks show up in their template list. Pick one, fill
in a short form — addresses, passwords, paths — and it deploys. No compose file
to copy, no `.env` to write.

The other guides explain what each stack is and how its pieces connect; read
the one for a stack once it's running. The registry is one URL:

```text
{{ site.url }}/templates.json
```

## 1. Add the registry

### Portainer

**Settings → App Templates**, paste the URL into **URL**, and save. The stacks
appear under **App Templates**, in the `cubicecho` category.

### Dockhand

**Templates → Sources**, add a source with a name (say, `cubicecho`) and the
URL. Dockhand reloads a source at most once an hour, so a new stack can take
that long to show up.

## 2. Pick a stack

Start with the personal cloud or the MCP servers; the AI stacks are more useful
once you have something for them to call.

| template | what it runs | guide |
| --- | --- | --- |
{% for t in templates %}| **{{ t.title }}** | {{ t.description }} | [read]({{ t.guide }}) |
{% endfor %}
Each template points at its compose file in
[this site's repo](https://github.com/cubicecho/cubicecho.com/tree/main/templates),
at `templates/<stack>/docker-compose.yml`. Your stack manager fetches it from
there when you deploy, so you always get the current version.

## 3. Fill in the form

The form asks only for what you have to decide yourself:

- **Public host:** the address other machines reach this one at, such as
  `192.168.1.10`. Each app builds its own URL from it.
- **Passwords and secrets:** generate each one with `openssl rand -hex 32`.
  Don't reuse one across fields.
- **Paths**, such as the notes folder mcp-ragdown indexes: absolute paths on
  the Docker host.

Everything else — ports, database URLs, image tags — has a default in the
compose file. To change one, add it as an environment variable on the stack
after it is created; the guide for that stack lists them.

## 4. Next

Open the stack's guide from the table above. It covers what to do after the
containers are up — setting up sign-in, pairing apps, connecting clients.

## Without a stack manager

The templates are ordinary compose files. Open one from the table above, or
from the folded **compose file** block in its guide, and paste it into a new
stack — or run it with `docker compose` and set the same variables in a `.env`
file next to it.
