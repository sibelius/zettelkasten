import {defineConfig} from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import {unified} from '@astrojs/markdown-remark';

import {remarkDocLinks, remarkDropTitle} from './src/lib/remark.mjs';

export const BASE = '/zettelkasten';

export default defineConfig({
  site: 'https://sibelius.github.io',
  base: BASE,
  trailingSlash: 'ignore',
  build: {format: 'file'},
  markdown: {
    processor: unified({remarkPlugins: [[remarkDocLinks, {base: BASE}], remarkDropTitle]}),
    shikiConfig: {themes: {light: 'github-light', dark: 'github-dark'}},
  },
  integrations: [mdx(), sitemap()],
});
