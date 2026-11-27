// /qnap/templates.json — custom app templates for QNAP Container Station 3
// (Preferences → App Templates → Enable custom template). QNAP's own format,
// single-container only; the entries come from src/_data/qnap.js.
module.exports = class {
  data() {
    return { permalink: "/qnap/templates.json", eleventyExcludeFromCollections: true };
  }

  render({ qnap, site }) {
    const templates = qnap.apps.map((a) => ({
      type: 1,
      title: a.title,
      sub_title: a.sub_title,
      description: a.description,
      logo: `${site.url}/assets/logo.svg`,
      location: `${site.url}/projects/${a.slug}/`,
      platform: "linux",
      image: a.image,
      env: a.env,
      volumes: a.volumes,
      ports: a.ports,
      restart_policy: "unless-stopped",
      interactive: false,
      tty: false,
    }));
    return `${JSON.stringify({ templates }, null, 2)}\n`;
  }
};
