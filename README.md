# Serpico AI — Website Rebuild

An Anchor-orchestrated planning/build workspace for converting
[ailearningcenter.ai](https://www.ailearningcenter.ai/) into a static site
under the Serpico AI brand (canonical domain: `serpico.ai`).

Work is tracked as plans under [`.plans/`](.plans/README.md) — see that file
for the `/draft` → `/work` → `/review` workflow this repo follows.

## Development

Requires Node.js **>= 22.12.0** (Astro 7).

```sh
npm install
npm run dev       # local dev server with live reload, at localhost:4321
npm run build     # production build to ./dist/
npm run preview   # preview the build via Astro's own preview server
npm run serve     # serve ./dist/ via a minimal, dependency-free Node server
```

## Project structure

```text
/
├── public/            static assets (favicon, robots.txt, ...)
├── src/
│   ├── components/    shared UI pieces (Header, Footer, Hero, ...)
│   ├── layouts/        page shell (BaseLayout)
│   ├── pages/          one route per file
│   └── nav.config.ts  single source of truth for nav/footer links
├── server.js          minimal static file server for ./dist/
└── astro.config.mjs
```

## Deployment

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
