import type {APIRoute, GetStaticPaths} from 'astro';

import {colors, h, mark, toPng, toSvg} from '../../lib/og';

const icons = {
  'apple-touch-icon': {size: 180, maskable: false},
  'icon-192': {size: 192, maskable: false},
  'icon-512': {size: 512, maskable: false},
  // Android crops maskable icons to a circle, so the mark sits inside a safe zone.
  'icon-maskable-512': {size: 512, maskable: true},
};

export const getStaticPaths: GetStaticPaths = () => Object.keys(icons).map((name) => ({params: {name}}));

export const GET: APIRoute = async ({params}) => {
  const {size, maskable} = icons[params.name as keyof typeof icons];
  const tree = maskable
    ? h('div', {width: size, height: size, background: colors.ink, alignItems: 'center', justifyContent: 'center'}, mark(size * 0.72, {rounded: false}))
    : mark(size, {rounded: false});

  return new Response(new Uint8Array(toPng(await toSvg(tree, size, size), size)), {headers: {'content-type': 'image/png'}});
};
