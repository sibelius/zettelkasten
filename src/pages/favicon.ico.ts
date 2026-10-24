import type {APIRoute} from 'astro';

import {mark, toPng, toSvg} from '../lib/og';

/** An ICO is a tiny directory of PNGs; browsers that skip the SVG still get a sharp icon. */
export const GET: APIRoute = async () => {
  const sizes = [16, 32, 48];
  const svg = await toSvg(mark(64), 64, 64);
  const images = sizes.map((size) => toPng(svg, size));

  const header = Buffer.alloc(6 + sizes.length * 16);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(sizes.length, 4);

  let offset = header.length;

  sizes.forEach((size, i) => {
    const entry = 6 + i * 16;
    header.writeUInt8(size, entry);
    header.writeUInt8(size, entry + 1);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(images[i].length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += images[i].length;
  });

  return new Response(new Uint8Array(Buffer.concat([header, ...images])), {headers: {'content-type': 'image/x-icon'}});
};
