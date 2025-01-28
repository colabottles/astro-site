import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import netlify from '@astrojs/netlify';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  site: "https://toddl.dev",
  integrations: [vue(), preact()],
  adapter: netlify()
});