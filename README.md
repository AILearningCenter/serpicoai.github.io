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

### Still needed before Pages goes live

1. **Restore the Actions workflow** — the workflow file is parked at
   `var/github-workflows/deploy-pages.yml` (gitignored) because pushing
   `.github/workflows/*` requires a GitHub credential with the `workflow`
   OAuth scope. Current `gh` auth only has `repo` (and related) scopes.
   Grant the scope, then restore the file:

   ```sh
   gh auth refresh -h github.com -s workflow
   mkdir -p .github/workflows
   cp var/github-workflows/deploy-pages.yml .github/workflows/
   git add .github/workflows/deploy-pages.yml
   git commit -m "Add GitHub Pages deploy workflow"
   git push
   ```

2. **Enable Pages in the repo** — Settings → Pages → Build and deployment
   → Source: **GitHub Actions** (not "Deploy from a branch").

3. **DNS for `serpico.ai`** — point the apex (and optional `www`) at GitHub
   Pages per the `canonical-domain-serpico-ai` plan, then confirm the
   custom domain field under Settings → Pages shows `serpico.ai`.

Once the workflow is on `main`, every push (or a manual
`workflow_dispatch`) builds with Node 22 and publishes `./dist/`. No
deploy secrets are required — the workflow uses GitHub's OIDC Pages
deployment.

**Rollback:** revert the offending commit on `main` (or push a fix) and
let the workflow redeploy; or re-run a prior successful workflow run from
the Actions tab ("Re-run all jobs").
