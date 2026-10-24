import type {APIRoute} from 'astro';

import {person} from '../data/site';
import {withBase} from '../lib/docs';
import {colors} from '../lib/og';

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      name: person.name,
      short_name: 'Sibelius',
      description: person.intro,
      start_url: withBase('/'),
      scope: withBase('/'),
      display: 'standalone',
      theme_color: colors.paper,
      background_color: colors.paper,
      icons: [
        {src: withBase('/icons/icon-192.png'), sizes: '192x192', type: 'image/png'},
        {src: withBase('/icons/icon-512.png'), sizes: '512x512', type: 'image/png'},
        {src: withBase('/icons/icon-maskable-512.png'), sizes: '512x512', type: 'image/png', purpose: 'maskable'},
      ],
    }),
    {headers: {'content-type': 'application/manifest+json'}},
  );
