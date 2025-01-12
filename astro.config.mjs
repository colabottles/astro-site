import { defineConfig } from 'astro/config';
import UnoCSS from 'unocss/astro';

import vue from '@astrojs/vue';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  integrations: [
    vue(),
    UnoCSS(),
  ],
  adapter: netlify()
});