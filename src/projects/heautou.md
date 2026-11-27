---
title: heautou
tagline: A minimal self-hosted OIDC provider — one sign-in for every app on your network.
category: cloud
order: 6
repo: https://github.com/cubicecho/heautou
homepage: https://cubicecho.github.io/heautou/
---

heautou is "Sign in with Heautou": an OpenID Connect provider small enough to
run for one household, without standing up Keycloak or Authentik. Flat storage
in an embedded PGlite, a cubeui admin UI, and that is all of it.

The part that makes it worth having is **pairing**. Make a setup URL in
heautou, paste it into an app's "Set up sign-in" page, and the app registers
itself as a client by OAuth Dynamic Client Registration — no client IDs copied
by hand, no restart. [ethos](/projects/ethos/), [telos](/projects/telos/),
[philotes](/projects/philotes/), [eunomia](/projects/eunomia/),
[engrafo](/projects/engrafo/) and [ai-router](/projects/ai-router/) all pair
this way.

Also: device flow, forward auth for apps with no sign-in of their own, and
API resources. For trusted networks only.

Stack: TypeScript, PGlite, cubeui, Docker.
