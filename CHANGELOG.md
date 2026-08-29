# Changelog

All notable changes to this project are documented in this file.

## [Unreleased]

### Added
- GitHub Pages deployment workflow (`.github/workflows/deploy-pages.yml`),
  triggered on push to `main`, publishing `dist/` via GitHub's OIDC-based
  Pages deployment (no secrets required).
- `public/CNAME` pinning the custom domain `serpico.ai` for GitHub Pages.
- README section documenting how to deploy and roll back.
