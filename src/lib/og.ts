import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';

import {Resvg} from '@resvg/resvg-js';
import satori from 'satori';

/** The same index card as the site: card stock, blue rules, one red margin line. */
export const colors = {
  paper: '#edf0f2',
  ink: '#18202b',
  inkSoft: '#3a4352',
  pencil: '#556170',
  blue: '#2f5bd3',
  red: '#c8343c',
  ruled: '#d3ddef',
};

const require = createRequire(import.meta.url);

const font = (pkg: string, file: string) => readFileSync(require.resolve(`${pkg}/files/${file}`));

const fonts = [
  ...[400, 700, 800].flatMap((weight) =>
    ['latin', 'latin-ext'].map((subset) => ({
      name: 'Schibsted Grotesk',
      weight: weight as 400 | 700 | 800,
      style: 'normal' as const,
      data: font('@fontsource/schibsted-grotesk', `schibsted-grotesk-${subset}-${weight}-normal.woff`),
    })),
  ),
  ...['latin', 'latin-ext'].map((subset) => ({
    name: 'Newsreader',
    weight: 400 as const,
    style: 'normal' as const,
    data: font('@fontsource/newsreader', `newsreader-${subset}-400-normal.woff`),
  })),
];

type Style = Record<string, string | number>;
type Node = {type: string; props: {style?: Style; children?: Child | Child[]; [key: string]: unknown}};
type Child = Node | string | null | false;

/** Satori takes a React-like element tree; this keeps it free of JSX. */
export const h = (type: string, style: Style, ...children: Child[]): Node => ({
  type,
  props: {style: {display: 'flex', ...style}, children: children.filter((child) => child !== null && child !== false)},
});

export async function toSvg(node: Node, width: number, height: number): Promise<string> {
  return satori(node as never, {width, height, fonts});
}

export function toPng(svg: string, width: number): Buffer {
  return new Resvg(svg, {fitTo: {mode: 'width', value: width}}).render().asPng();
}

const clip = (value: string, length: number) => {
  if (value.length <= length) {
    return value;
  }

  const cut = value.slice(0, length);

  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
};

/** The monogram: an S on the card, right of the red margin line. Used by the favicon and the cards. */
export function mark(size: number, {rounded = true} = {}): Node {
  const unit = size / 64;

  return h(
    'div',
    {
      width: size,
      height: size,
      background: colors.ink,
      borderRadius: rounded ? 14 * unit : 0,
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
    },
    h('div', {position: 'absolute', left: 15 * unit, top: 0, bottom: 0, width: 4 * unit, background: colors.red}),
    h(
      'div',
      {
        marginLeft: 12 * unit,
        color: colors.paper,
        fontFamily: 'Schibsted Grotesk',
        fontWeight: 800,
        fontSize: 46 * unit,
        lineHeight: 1,
        letterSpacing: -1 * unit,
      },
      'S',
    ),
  );
}

export type Card = {
  /** Small line in the margin, like the section a note lives in. */
  kicker: string;
  title: string;
  description?: string;
  tags?: string[];
  /** The home card sets the name in huge type instead of a page title. */
  variant?: 'page' | 'home';
};

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

const MARGIN = 250;

export async function renderCard(card: Card): Promise<Buffer> {
  const home = card.variant === 'home';
  const title = clip(card.title, 80);
  const titleSize = home ? 128 : title.length <= 22 ? 96 : title.length <= 44 ? 76 : 60;

  const rules = Array.from({length: Math.floor(OG_HEIGHT / 42)}, (_, i) =>
    h('div', {position: 'absolute', left: 0, right: 0, top: 41 + i * 42, height: 1, background: colors.ruled}),
  );

  const tree = h(
    'div',
    {width: OG_WIDTH, height: OG_HEIGHT, background: colors.paper, position: 'relative', fontFamily: 'Schibsted Grotesk', color: colors.ink},
    ...rules,
    h('div', {position: 'absolute', left: MARGIN, top: 0, bottom: 0, width: 4, background: colors.red}),

    // Margin column: where the page lives and what it is about.
    h(
      'div',
      {position: 'absolute', left: 0, top: 72, width: MARGIN - 32, flexDirection: 'column', alignItems: 'flex-end', textAlign: 'right'},
      h('div', {fontSize: 24, fontWeight: 700, color: colors.ink}, card.kicker),
      ...(card.tags ?? []).slice(0, 4).map((tag) => h('div', {marginTop: 10, fontSize: 22, fontWeight: 700, color: colors.blue}, tag)),
    ),
    h('div', {position: 'absolute', left: MARGIN - 32 - 64, bottom: 56}, mark(64)),

    // Content column.
    h(
      'div',
      {position: 'absolute', left: MARGIN + 44, right: 72, top: 64, bottom: 56, flexDirection: 'column'},
      h(
        'div',
        {fontSize: titleSize, fontWeight: 800, lineHeight: home ? 0.92 : 1.04, letterSpacing: home ? -5 : -2, maxWidth: 820},
        home ? h('div', {flexDirection: 'column'}, ...title.split(' ').map((word) => h('div', {}, word))) : title,
      ),
      card.description
        ? h(
            'div',
            {marginTop: 28, fontFamily: 'Newsreader', fontSize: home ? 32 : 30, lineHeight: 1.38, color: colors.inkSoft, maxWidth: 800},
            clip(card.description, home ? 220 : 135),
          )
        : null,
      h(
        'div',
        {marginTop: 'auto', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: 24},
        h('div', {fontWeight: 800}, home ? '' : 'Sibelius Seraphini'),
        h('div', {fontWeight: 400, color: colors.pencil}, 'sibelius.github.io/zettelkasten'),
      ),
    ),
  );

  return toPng(await toSvg(tree, OG_WIDTH, OG_HEIGHT), OG_WIDTH);
}
