// /qnap/<slug>.yml — each stack's compose file made ready to paste into QNAP
// Container Station 3 (Applications → Create). Container Station reads no .env
// file, so every ${VAR} is resolved here:
//
//   - a value you must choose (the stack's non-optional `env` in
//     src/_data/templates.js, a ${VAR:?…}, or a bare ${VAR}) becomes
//     CHANGE_ME_<VAR> — the same text everywhere it appears, so one
//     find-and-replace per value sets it;
//   - a QNAP-specific value from src/_data/qnap.js `stackDefaults` wins;
//   - anything else takes its default (${VAR:-default}, resolved recursively);
//   - $$ (Compose's escaped $) is kept as it is.
const fs = require("node:fs");
const path = require("node:path");

const placeholder = (name) => `CHANGE_ME_${name}`;

// Resolve Compose interpolation in `text`. `must` is the set of variables to
// turn into placeholders, `fixed` the values to substitute outright.
function resolve(text, must, fixed) {
  let out = "";
  for (let i = 0; i < text.length; i++) {
    if (text[i] !== "$") {
      out += text[i];
      continue;
    }
    if (text[i + 1] === "$") {
      out += "$$";
      i++;
      continue;
    }
    if (text[i + 1] !== "{") {
      out += "$";
      continue;
    }
    // Find the matching }, allowing nested ${…} in a default.
    let depth = 0;
    let j = i + 1;
    for (; j < text.length; j++) {
      if (text[j] === "{") depth++;
      else if (text[j] === "}" && --depth === 0) break;
    }
    if (j >= text.length) throw new Error(`unterminated \${ at: ${text.slice(i, i + 40)}`);
    const inner = text.slice(i + 2, j);
    const [, name, op = "", rest = ""] = inner.match(/^([A-Za-z_][A-Za-z0-9_]*)(:?[-?+])?([\s\S]*)$/) ?? [];
    if (!name) throw new Error(`can't read \${${inner}}`);
    if (name in fixed) out += fixed[name];
    else if (must.has(name) || op.endsWith("?") || op === "") out += placeholder(name);
    else if (op.endsWith("-")) out += resolve(rest, must, fixed);
    else throw new Error(`unsupported \${${inner}}`);
    i = j;
  }
  return out;
}

module.exports = class {
  data() {
    return {
      pagination: { data: "templates", size: 1, alias: "stack" },
      permalink: ({ stack }) => `/qnap/${stack.slug}.yml`,
      eleventyExcludeFromCollections: true,
    };
  }

  render({ stack, qnap, site }) {
    const file = path.join(__dirname, "..", "templates", stack.slug, "docker-compose.yml");
    const source = fs.readFileSync(file, "utf8");
    // Drop the source's header comment; it describes .env, which QNAP lacks.
    const body = source.slice(source.search(/^name:/m));
    const must = new Set(stack.env.filter((e) => !e.optional).map((e) => e.name));
    const fixed = { ...qnap.stackDefaults };
    for (const e of stack.env) if (e.optional) fixed[e.name] = "";
    // An env value that resolved to nothing is written as "" rather than left
    // as a YAML null, which Compose reads as "take it from the shell".
    const yaml = resolve(body, must, fixed).replace(
      /^(\s+[A-Z][A-Z0-9_]*):[ \t]*(#.*)?$/gm,
      (_, key, comment) => `${key}: ""${comment ? `   ${comment}` : ""}`,
    );

    const todo = [...new Set(yaml.match(/CHANGE_ME_[A-Z0-9_]+/g) ?? [])];
    const header = [
      `# ${stack.title}, for QNAP Container Station 3`,
      `# Applications → Create, paste this in, then Validate YAML and Create.`,
      `# Guide: ${site.url}${stack.guide}  ·  QNAP: ${site.url}/guides/qnap/`,
      "#",
      "# Container Station reads no .env file, so replace each of these everywhere",
      "# it appears (generate secrets with `openssl rand -hex 32`):",
      ...todo.map((t) => `#   ${t}`),
      ...Object.entries(qnap.stackDefaults)
        .filter(([, v]) => yaml.includes(v))
        .map(([k, v]) => `# ${k} is set to ${v}; create that folder in File Station first.`),
      "",
    ];
    return `${header.join("\n")}${yaml}`;
  }
};
