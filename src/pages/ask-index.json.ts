import type {APIRoute} from 'astro';

import {getPassages} from '../lib/knowledge';

/** Everything Ask Sibelius and the MCP server search, split into passages. */
export const GET: APIRoute = async () => {
  const passages = await getPassages();

  return new Response(JSON.stringify({generated: new Date().toISOString(), passages}), {headers: {'content-type': 'application/json'}});
};
