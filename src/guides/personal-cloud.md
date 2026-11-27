---
title: Start a personal cloud
summary: Self-hosted apps for habits, todos, people, time and documents — with one sign-in in front of all of them.
order: 3
projects: [heautou, ethos, telos, philotes, eunomia, engrafo]
---

The personal cloud is a set of small apps, each of which does one thing: habits
in [ethos](/projects/ethos/), todos in [telos](/projects/telos/), people in
[philotes](/projects/philotes/), where your time went in
[eunomia](/projects/eunomia/), and paper in [engrafo](/projects/engrafo/). Each
runs as its own container with its own database and its own GraphQL API. You
can run one of them or all of them; none depends on another.

What ties them together is sign-in. Put [heautou](/projects/heautou/) in first
and every app after it gets "Sign in with Heautou" by pasting one URL.

## The stack

One compose file runs all six apps, one shared Postgres (one database per app),
and the object storage engrafo keeps files in. Paste it into a new stack in
Portainer, Dockhand or whatever you use, or
[download it](/templates/personal-cloud/docker-compose.yml). Don't want an app? Delete its
service.

Set these in the stack's environment; generate each secret with
`openssl rand -hex 32`:

| variable | |
| --- | --- |
| `PUBLIC_HOST` | the address other machines reach this one at — goes into heautou's issuer URL and each app's own URL |
| `POSTGRES_PASSWORD` | the shared Postgres |
| `RUSTFS_PASSWORD` | engrafo's object storage |
| `ETHOS_AUTH_SECRET`, `TELOS_AUTH_SECRET`, `PHILOTES_AUTH_SECRET`, `ENGRAFO_AUTH_SECRET` | one session secret per app |

Everything else — every port, URL and database URL — is an env var with a
default. Point an app at your own Postgres with its `*_DATABASE_URL`.

| app | what it holds | port |
| --- | --- | --- |
| [heautou](/projects/heautou/) | sign-in | 3000 |
| [ethos](/projects/ethos/) | habits | 3010 |
| [telos](/projects/telos/) | todos | 3011 |
| [philotes](/projects/philotes/) | people | 3012 |
| [eunomia](/projects/eunomia/) | time | 3013 |
| [engrafo](/projects/engrafo/) | documents | 3014 (storage on 9000/9001) |

<details class="compose">
<summary><code>personal-cloud.yml</code> — show the compose file</summary>

```yaml
{% composeFile "personal-cloud" %}
```

</details>

## 1. Set up heautou

Open `http://<PUBLIC_HOST>:3000` within ten minutes of first start and the setup
page creates your admin account. Missed the window? The setup link
(`…/setup#token=…`) is in heautou's container logs.

## 2. Open an app

Each app is on its own port, above. Until it is paired with heautou it offers
its own sign-in (email when `SMTP_URL` is set, or open on a trusted network
with `SECURE_LOCAL_NET=true`).

## 3. Pair it with heautou

In heautou, go to **Clients → Pair an app**, pick which groups may sign in, and
make a setup URL. Paste it into the app's **Set up sign-in** page (or its
settings). The app registers itself with heautou and sign-in works — no client
ID to copy, no restart. A setup URL works once, for ten minutes; make one per
app.

If you would rather configure it by hand, add `OIDC_ISSUER` (heautou's
`ISSUER_URL`), `OIDC_CLIENT_ID` and `OIDC_CLIENT_SECRET` to that app's
`environment:`. Env vars win over pairing.

## 4. Optional: let agents in

ethos, telos, eunomia and engrafo also serve an MCP endpoint at `/mcp`, behind
an API key you make in the app's settings (set `ETHOS_MCP_ENABLED=true` for
ethos; telos needs its AI features on). Once you have a few, [Give your agents tools](/guides/mcp/)
covers putting them in front of a model.

## Where to go next

- [symphony](/projects/symphony/) puts one UI over all of these apps: it
  talks to each one's GraphQL API, and you (or an agent) build its pages out of
  modules.
- Each app's README has the full settings, including email sign-in and S3
  storage.
