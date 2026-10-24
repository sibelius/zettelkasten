import {person} from '../data/site';
import {getDocs, tagCounts, tagSlug} from './docs';
import type {Card} from './og';

/** Route key for a page: its path under the site base, without extension. The home page is `index`. */
export function routeKey(pathname: string, base: string): string {
  const path = pathname
    .slice(base.replace(/\/$/, '').length)
    .replace(/\.html$/, '')
    .replace(/^\/|\/$/g, '');

  return path || 'index';
}

/** One social card per page the site builds. */
export async function socialCards(): Promise<Map<string, Card>> {
  const docs = await getDocs();
  const cards = new Map<string, Card>();

  cards.set('index', {variant: 'home', kicker: `${person.role}, ${person.company.name}`, title: person.name, description: person.intro});
  cards.set('graph', {kicker: 'Notes', title: 'Every note, every link', description: 'A map of my notes, the tags they carry and the links between them. Search it, drag it, click any dot.'});
  cards.set('tags', {kicker: 'Notes', title: 'Tags', description: 'Every tag in my notes, with how many notes carry it.'});
  cards.set('media', {kicker: 'Talks', title: 'Talks, videos and podcasts', description: 'Slides, recordings of talks and interviews, and podcast episodes, playable on the site.'});
  cards.set('library', {kicker: 'Notes', title: 'Library', description: 'Everything I have written, as a table, a list, a tree or a board.'});
  cards.set('stack', {kicker: 'Open source', title: 'Stack', description: 'The open source Woovi and I build on, and the services we run ourselves, with the posts where we wrote about each one.'});
  cards.set('404', {kicker: 'Not found', title: 'This note is not in the box', description: 'It may have been renamed or removed.'});

  const sections = new Map<string, {label: string; count: number}>();

  for (const doc of docs) {
    cards.set(doc.route, {kicker: doc.section.label, title: doc.title, description: doc.excerpt, tags: doc.tags});

    if (doc.section.key !== 'essays') {
      const key = `category/${tagSlug(doc.section.label)}`;
      sections.set(key, {label: doc.section.label, count: (sections.get(key)?.count ?? 0) + 1});
    }
  }

  for (const [key, section] of sections) {
    cards.set(key, {kicker: `${section.count} pages`, title: section.label, description: `Everything filed under ${section.label.toLowerCase()} in my notes.`});
  }

  for (const [tag, count] of tagCounts(docs)) {
    cards.set(`tags/${tagSlug(tag)}`, {kicker: `${count} ${count === 1 ? 'note' : 'notes'}`, title: tag, description: `Notes tagged ${tag}.`});
  }

  return cards;
}
