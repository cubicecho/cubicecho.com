---
title: "Quickstart: QNAP Container Station"
summary: The same stacks on a QNAP NAS — single apps from a Container Station template registry, whole stacks as Applications with the settings filled in.
order: 2
---

QNAP's Container Station 3 can't read the [app-template registry](/guides/app-templates/)
that Portainer and Dockhand use: its custom templates hold one container each,
with no Compose and no form for settings, and its Applications read no `.env`
file. So the QNAP registry comes in two halves.

- **App templates**, for the apps that run on their own — one container, no
  database server. Add one URL to Container Station and deploy them from its
  template list.
- **Stack files**, for everything else. Each stack's compose file with every
  setting written in, ready to paste in as an Application.

Both put each app's data under the `Container` shared folder, in a folder
named after it, so it is easy to find and back up.

## App templates

The registry is one URL:

```text
{{ site.url }}/qnap/templates.json
```

1. In Container Station, open **Preferences → App Templates**, turn on
   **Enable custom template**, paste the URL, and **Apply**.
2. In File Station, create the folders the app uses (below).
3. Open **App Templates → Custom Templates**, pick an app and **Deploy**. In
   the wizard, replace any `CHANGE_ME_` value and check the folder mappings
   before you create it.

| app | port | folders under `Container/` |
| --- | --- | --- |
{% for a in qnap.apps %}| [{{ a.title }}](/projects/{{ a.slug }}/) | {{ a.ports[0] | replace("/tcp", "") | replace(r/:.*/, "") }} | {% for v in a.volumes %}`{{ v.bind | replace("/Container/", "") }}`{% if not loop.last %}, {% endif %}{% endfor %} |
{% endfor %}
An empty token is generated on first start and printed to the container's log.
heautou needs `ISSUER_URL` set to this NAS's address, such as
`http://192.168.1.10:3000/oidc`; open it within ten minutes of first start to
create the admin account.

## Stacks as Applications

Each stack from the other guides has a QNAP version, with every setting
written in and anything you must choose left as a `CHANGE_ME_` value:

| stack | file | guide |
| --- | --- | --- |
{% for t in templates %}| {{ t.title }} | [{{ t.slug }}.yml](/qnap/{{ t.slug }}.yml) | [read]({{ t.guide }}) |
{% endfor %}
1. Open the stack's file. The comment at the top lists every `CHANGE_ME_`
   value in it, and any folder to create in File Station first.
2. In Container Station, **Applications → Create**, give it a name, and paste
   the file in.
3. Replace each `CHANGE_ME_` value — the same name means the same value, so
   replace every copy of it. Generate secrets with `openssl rand -hex 32`;
   `CHANGE_ME_PUBLIC_HOST` is the NAS's address on your network.
4. **Validate YAML**, then **Create**.

To change a setting later, edit the Application's YAML and recreate it. The
stack's guide explains each one.

## Things to know

- **Ports:** every app has its own port, the same as in the other guides, and
  none of them is QTS's own `8080`. If one is taken on your NAS, change the
  left-hand number of its `ports:` entry.
- **The personal-cloud and AI stacks** create their databases with an inline
  `configs:` block, which needs a recent Docker Compose. If **Validate YAML**
  rejects it, update Container Station.
- **Not yet tried on a NAS.** The files follow QNAP's documented format and
  [mcp-router's QNAP files](https://github.com/cubicecho/mcp-router/tree/main/deploy/qnap),
  but this registry hasn't been deployed on QNAP hardware yet. If something
  doesn't work, [open an issue](https://github.com/cubicecho/cubicecho.com/issues).
