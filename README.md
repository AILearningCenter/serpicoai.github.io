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

### Blocker: Pages is not enabled yet

Workflow runs currently fail at `actions/configure-pages` with:

> Get Pages site failed … verify that the repository has Pages enabled
> and configured to build using GitHub Actions

`has_pages` is still `false`. Enabling Pages is a **repo admin** action.
Collaborators with write (but not admin) cannot flip this in the UI or via
the REST API (`POST /repos/.../pages` returns 404 without admin).

**An org/repo admin must:**

1. Open
   [Settings → Pages](https://github.com/AILearningCenter/serpicoai.github.io/settings/pages).
2. Under **Build and deployment → Source**, choose **GitHub Actions**
   (not “Deploy from a branch”).
3. Re-run the failed workflow (Actions → Deploy to GitHub Pages →
   Re-run all jobs), or push any commit to `main`.

Optional after the first successful deploy: set **Custom domain** to
`serpico.ai` in that same Pages settings page (the build already ships
`public/CNAME`).

### Still needed after Pages is enabled

- **DNS for `serpico.ai`** — point the apex (and optional `www`) at
  GitHub Pages per the `canonical-domain-serpico-ai` plan, then confirm
  the custom domain field under Settings → Pages shows `serpico.ai` and
  HTTPS is provisioned.

**Rollback:** revert the offending commit on `main` (or push a fix) and
let the workflow redeploy; or re-run a prior successful workflow run from
the Actions tab (“Re-run all jobs”).
