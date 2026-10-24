import type {APIRoute} from 'astro';

import {person} from '../data/site';
import {withBase} from '../lib/docs';
import {reading} from '../lib/reading';

const escape = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** The /reading feed as RSS, so anyone can follow what I recommend in their reader. */
export const GET: APIRoute = ({site}) => {
  const page = new URL(withBase('/reading'), site).toString();

  const items = reading
    .slice(0, 100)
    .map((item) => {
      const description = [item.note, item.description].filter(Boolean).join('\n\n');

      return `    <item>
      <title>${escape(item.title)}</title>
      <link>${escape(item.url)}</link>
      <guid isPermaLink="true">${escape(item.url)}</guid>
      <pubDate>${new Date(`${item.date}T12:00:00Z`).toUTCString()}</pubDate>
      <source url="${escape(page)}">${escape(item.site ?? item.host)}</source>${description ? `\n      <description>${escape(description)}</description>` : ''}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escape(person.name)}: Reading</title>
    <link>${page}</link>
    <description>Articles, posts, repos and tools I am reading and recommend.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {headers: {'content-type': 'application/rss+xml; charset=utf-8'}});
};
