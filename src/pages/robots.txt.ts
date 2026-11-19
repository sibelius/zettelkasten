import type {APIRoute} from 'astro';

import {withBase} from '../lib/docs';

export const GET: APIRoute = ({site}) => {
  const sitemap = new URL(withBase('/sitemap-index.xml'), site);

  return new Response(
    [
      'User-agent: *',
      'Allow: /',
      '',
      `Sitemap: ${sitemap}`,
    ].join('\n'),
    {headers: {'content-type': 'text/plain; charset=utf-8'}},
  );
};
