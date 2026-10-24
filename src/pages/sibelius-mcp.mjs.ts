import type {APIRoute} from 'astro';

import retrieve from '../../mcp/retrieve.mjs?raw';
import server from '../../mcp/server.mjs?raw';

/** The MCP server as one file anyone can download and run with Node, no clone and no install. */
export const GET: APIRoute = () => {
  const body = `#!/usr/bin/env node\n${retrieve.replace(/^export /gm, '')}\n${server.replace(/^import \{[^}]+\} from '\.\/retrieve\.mjs';\n/m, '')}`;

  return new Response(body, {headers: {'content-type': 'text/javascript; charset=utf-8'}});
};
