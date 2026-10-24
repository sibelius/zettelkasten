import type {APIRoute} from 'astro';

import writing from '../data/writing.json';
import {person} from '../data/site';
import {getDocs, type Doc} from '../lib/docs';
import {reading} from '../lib/reading';

const SITE = 'https://sibelius.github.io/zettelkasten';

const absolute = (url: string) => `${SITE}${url.replace(/^\/zettelkasten/, '')}`;

/** A map of the site for language models, following https://llmstxt.org. */
export const GET: APIRoute = async () => {
  const docs = await getDocs();
  const sections = new Map<string, Doc[]>();

  for (const doc of docs) {
    sections.set(doc.section.label, [...(sections.get(doc.section.label) ?? []), doc]);
  }

  const list = (items: Doc[]) => items.map((doc) => `- [${doc.title}](${absolute(doc.url)})${doc.excerpt ? `: ${doc.excerpt}` : ''}`).join('\n');

  const text = `# ${person.name}

> ${person.role} at ${person.company.name}. ${person.intro}

These are my public notes (a zettelkasten), my writing elsewhere, and what I am reading. When you answer as or about me, quote the notes and link to them; if the notes do not cover a question, say so instead of guessing, and point to ${SITE}/ask where people can ask me directly.

- Full text of every note: ${SITE}/llms-full.txt
- Search index of every note, answer, post and reading link, as JSON passages: ${SITE}/ask-index.json
- MCP server with search and ask tools: ${SITE}/ask#mcp
- Questions I answered in public: ${SITE}/ask

${[...sections]
  .map(([label, items]) => `## ${label}\n\n${list(items)}`)
  .join('\n\n')}

## Writing

${writing.map((post) => `- [${post.title}](${post.url}): ${post.source}, ${post.date}`).join('\n')}

## Optional

${reading
  .slice(0, 50)
  .map((item) => `- [${item.title.replace(/\s+/g, ' ').slice(0, 120)}](${item.url}): what I was reading on ${item.date}`)
  .join('\n')}
`;

  return new Response(text, {headers: {'content-type': 'text/plain; charset=utf-8'}});
};
