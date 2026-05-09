---
title: sendspin-image-server
tagline: Auto-pushes artwork to Sendspin-compatible e-Paper displays on your local network.
status: alpha
order: 5
repo: https://github.com/vantreeseba/sendspin-image-server
---

sendspin-image-server is a home server that finds Sendspin-compatible
e-Paper displays via mDNS, cycles through images on a schedule, and adapts
colours to match each display's limited palette. Image sources can be local
folders, Immich albums, or Home Assistant media; per-display settings cover
palette, dither method (Floyd–Steinberg, Atkinson, Ordered), and slideshow
interval.

Ships as a Docker image with persistent SQLite for metadata and a small web
dashboard on `:8928` for managing displays and image sources.

```sh
docker run -d --name sendspin-image-server --network host \
  -v sendspin-data:/data -v /path/to/photos:/app/images \
  ghcr.io/vantreeseba/sendspin-image-server:main
```
