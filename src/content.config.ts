import {defineCollection} from 'astro:content';
import {glob} from 'astro/loaders';

const docs = defineCollection({
  loader: glob({
    base: './docs',
    pattern: ['**/*.{md,mdx}', '!**/_*'],
    // Keep the file path as the id, so URLs match the old Docusaurus routes.
    generateId: ({entry}) => entry.replace(/\.mdx?$/, ''),
  }),
});

export const collections = {docs};
