// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Canonical domain per the canonical-domain-serpico-ai plan: serpico.ai is
// already registered/live and is the intended apex canonical form. Setting
// it here now avoids a rework later — sitemap.xml and any absolute-URL
// generation depend on this.
export default defineConfig({
  site: 'https://serpico.ai',
  integrations: [sitemap()],
});
