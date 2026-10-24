import type {APIRoute} from 'astro';

import {getDocs} from '../lib/docs';

export const GET: APIRoute = async () => {
  const docs = await getDocs();

  return new Response(
    JSON.stringify(
      docs.map((doc) => ({
        title: doc.title,
        url: doc.url,
        section: doc.section.label,
        tags: doc.tags,
        excerpt: doc.excerpt,
        text: doc.text.slice(0, 1500),
      })),
    ),
    {headers: {'content-type': 'application/json'}},
  );
};
