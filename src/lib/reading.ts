import {withBase} from './docs';

export type ReadingItem = {
  url: string;
  note: string;
  kind: string;
  host: string;
  title: string;
  description: string | null;
  site: string | null;
  image: string | null;
};

export type ReadingEntry = ReadingItem & {date: string};

/** One file per day, written by `pnpm reading`. */
const files = import.meta.glob<ReadingItem[]>('../data/reading/*.json', {eager: true, import: 'default'});

/** Days that have links, newest first. */
export const readingDays: {date: string; items: ReadingItem[]}[] = Object.entries(files)
  .map(([path, items]) => ({date: path.match(/(\d{4}-\d{2}-\d{2})\.json$/)![1], items}))
  .filter((day) => day.items.length > 0)
  .sort((a, b) => b.date.localeCompare(a.date));

export const reading: ReadingEntry[] = readingDays.flatMap(({date, items}) => items.map((item) => ({...item, date})));

export const dayUrl = (date: string) => withBase(`/reading/${date}`);

export const kinds = [
  {id: 'article', label: 'Articles'},
  {id: 'post', label: 'Posts'},
  {id: 'repo', label: 'Repos'},
  {id: 'tool', label: 'Tools'},
  {id: 'video', label: 'Videos'},
  {id: 'paper', label: 'Papers'},
].filter((kind) => reading.some((item) => item.kind === kind.id));

export const kindLabel: Record<string, string> = Object.fromEntries(kinds.map((kind) => [kind.id, kind.label.replace(/s$/, '')]));

/** Long post texts and descriptions read better cut at a word. */
export const clip = (text: string | null, length: number) => (text && text.length > length ? `${text.slice(0, length).replace(/\s+\S*$/, '')}…` : text);

export const monthLabel = (month: string) => new Date(`${month}-15T12:00:00Z`).toLocaleDateString('en-US', {year: 'numeric', month: 'long', timeZone: 'UTC'});

export const dayLabel = (date: string) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'});
