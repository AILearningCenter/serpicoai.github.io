# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🚀 Deployment

This site deploys to **GitHub Pages** via `.github/workflows/deploy-pages.yml`,
which builds and publishes on every push to `main` (or a manual
`workflow_dispatch` run). No secrets are required — the workflow uses
GitHub's built-in OIDC-based Pages deployment.

The custom domain (`serpico.ai`) is set via `public/CNAME`, which Astro
copies into the build output automatically. In the repo's GitHub Pages
settings ("Settings" → "Pages"), the custom domain field should also show
`serpico.ai` once DNS is pointed at GitHub Pages (see the
`canonical-domain-serpico-ai` plan for the DNS records to add).

**Rollback:** GitHub Pages has no native "previous deployment" rollback —
revert the offending commit on `main` (or push a fix) and let the workflow
redeploy; alternatively, re-run a prior successful workflow run from the
Actions tab ("Re-run all jobs").

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
