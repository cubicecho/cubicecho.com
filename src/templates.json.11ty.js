// /templates.json — the app-template feed for Portainer (Settings → App
// Templates) and Dockhand (Templates → Sources). Both read Portainer's v2
// format; type 3 is a Compose stack, fetched from `stackfile` in this repo.
// The entries come from src/_data/templates.js.
const fs = require("node:fs");
const path = require("node:path");

const REPO = "https://github.com/cubicecho/cubicecho.com";

const stackfile = (slug) => `templates/${slug}/docker-compose.yml`;

// A template whose compose file is missing, or whose form asks for a variable
// the compose file never reads, fails the build instead of shipping.
function check({ slug, env }) {
  const file = path.join(__dirname, "..", stackfile(slug));
  if (!fs.existsSync(file)) throw new Error(`template "${slug}": no ${stackfile(slug)}`);
  const compose = fs.readFileSync(file, "utf8");
  for (const { name } of env) {
    if (!compose.includes(`\${${name}`)) {
      throw new Error(`template "${slug}": env ${name} is not used in ${stackfile(slug)}`);
    }
  }
}

module.exports = class {
  data() {
    return { permalink: "/templates.json", eleventyExcludeFromCollections: true };
  }

  render({ templates, site }) {
    templates.forEach(check);
    const feed = {
      version: "2",
      templates: templates.map((t) => ({
        type: 3,
        title: t.title,
        name: `cubicecho-${t.slug}`,
        description: t.description,
        note: t.note,
        categories: t.categories,
        platform: "linux",
        logo: `${site.url}/assets/logo.svg`,
        repository: { url: REPO, stackfile: stackfile(t.slug) },
        env: t.env.map(({ optional, ...e }) => e),
      })),
    };
    return `${JSON.stringify(feed, null, 2)}\n`;
  }
};
