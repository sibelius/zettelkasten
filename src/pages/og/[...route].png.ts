import type {APIRoute, GetStaticPaths} from 'astro';

import {socialCards} from '../../lib/cards';
import {renderCard, type Card} from '../../lib/og';

export const getStaticPaths: GetStaticPaths = async () => {
  const cards = await socialCards();

  return [...cards].map(([route, card]) => ({params: {route}, props: {card}}));
};

export const GET: APIRoute = async ({props}) => {
  const png = await renderCard((props as {card: Card}).card);

  return new Response(new Uint8Array(png), {headers: {'content-type': 'image/png'}});
};
