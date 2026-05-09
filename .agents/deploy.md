# Deploy guide

## Target

GitHub Pages, served from the `cubicecho` GitHub org (repo TBD — most likely
`cubicecho/cubicecho.com`).

## Workflow

`.github/workflows/deploy.yml` runs on every push to `main`:

1. `npm ci`
2. `npm run build` (Eleventy → `_site/`)
3. `actions/upload-pages-artifact` uploads `_site/`
4. `actions/deploy-pages` publishes it

Manual runs are allowed via `workflow_dispatch`.

## One-time repo setup

1. In GitHub repo settings → **Pages**, set source to **GitHub Actions**.
2. Push to `main`. The first run will provision the Pages environment.

## Custom domain (cubicecho.com)

When the domain is wired up:

1. Add `cubicecho.com` in GitHub repo settings → Pages → Custom domain.
2. Drop a `CNAME` file at `src/CNAME` containing `cubicecho.com` so Eleventy
   passes it through to `_site/CNAME`. (Add `CNAME` to the
   `addPassthroughCopy` calls in `.eleventy.js` if needed.)
3. Point the apex `A` records at the GitHub Pages IPs and a `www` `CNAME` at
   `<org>.github.io`, per
   [GitHub's docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Subpath deploys

If the site is ever served from `https://<org>.github.io/<repo>/` instead of
a custom domain, add `pathPrefix: "/<repo>/"` to the Eleventy config return
object **and** route every internal link through the `url` filter
(`{{ "/about/" | url }}`). Currently we don't, because we expect a custom
domain.

## Local preview of a production build

```sh
npm run build
npx http-server _site -p 8080
```

(There is no committed dev dependency on `http-server` — install it ad-hoc
or use any static file server.)
