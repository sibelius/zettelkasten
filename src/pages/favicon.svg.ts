import type {APIRoute} from 'astro';

import {mark, toSvg} from '../lib/og';

export const GET: APIRoute = async () =>
  new Response(await toSvg(mark(64), 64, 64), {headers: {'content-type': 'image/svg+xml'}});
