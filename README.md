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

Target: **GitHub Pages** on
[`AILearningCenter/serpicoai.github.io`](https://github.com/AILearningCenter/serpicoai.github.io)
(custom domain `serpico.ai` via `public/CNAME`).

The Actions workflow (`.github/workflows/deploy-pages.yml`) is on `main`
and builds with Node 22, uploading `./dist/`. No deploy secrets are
required — it uses GitHub's OIDC Pages deployment.

### Pages is enabled and deploying

A repo admin has since enabled Pages (Source = GitHub Actions) and the
workflow has completed successful deploys, including a manual
`workflow_dispatch` run. The custom domain `serpico.ai` (and `www`) is
configured with an approved HTTPS certificate — DNS and the domain setup
described below are already done, not still pending.

**Rollback:** revert the offending commit on `main` (or push a fix) and
let the workflow redeploy; or re-run a prior successful workflow run from
the Actions tab (“Re-run all jobs”).
