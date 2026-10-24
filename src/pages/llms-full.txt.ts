import type {APIRoute} from 'astro';

import {person} from '../data/site';
import {getDocs} from '../lib/docs';

const SITE = 'https://sibelius.github.io/zettelkasten';

/** Every note in full, as Markdown, for language models that read the whole site at once. */
export const GET: APIRoute = async () => {
  const docs = await getDocs();

  const notes = docs.map((doc) => {
    // MDX imports and components mean nothing outside the site.
    const body = (doc.entry.body ?? '')
      .replace(/^import .*$/gm, '')
      .replace(/^#\s+.+$/m, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    return `# ${doc.title}\n\nURL: ${SITE}${doc.url.replace(/^\/zettelkasten/, '')}\n${doc.tags.length ? `Tags: ${doc.tags.join(', ')}\n` : ''}\n${body}`;
  });

  const text = `# ${person.name}: notes\n\n> ${person.intro}\n\n${notes.join('\n\n---\n\n')}\n`;

  return new Response(text, {headers: {'content-type': 'text/plain; charset=utf-8'}});
};
