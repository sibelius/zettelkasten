import {requestUrl} from '../../mcp/retrieve.mjs';

export type SearchDoc = {
  title: string;
  url: string;
  section: string;
  tags: string[];
  excerpt: string;
  text: string;
};

export type SearchHit = {doc: SearchDoc; score: number};

let index: Promise<SearchDoc[]> | null = null;

/** The index is fetched once, the first time anyone searches. Shared with the graph. */
export function loadIndex(url = document.querySelector<HTMLElement>('[data-search]')?.dataset.index ?? ''): Promise<SearchDoc[]> {
  index ??= fetch(url).then((response) => response.json());

  return index;
}

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

/** Every word must match somewhere. Titles count most, then tags, then the body. */
export function search(docs: SearchDoc[], query: string, limit = 12): SearchHit[] {
  const words = normalize(query).split(/\s+/).filter(Boolean);

  if (words.length === 0) {
    return [];
  }

  const hits: SearchHit[] = [];

  for (const doc of docs) {
    const title = normalize(doc.title);
    const tags = normalize(doc.tags.join(' '));
    const text = normalize(doc.text);
    let score = 0;

    for (const word of words) {
      if (title.startsWith(word)) {
        score += 12;
      } else if (title.includes(word)) {
        score += 8;
      } else if (tags.includes(word)) {
        score += 5;
      } else if (text.includes(word)) {
        score += 1;
      } else {
        score = 0;
        break;
      }
    }

    if (score > 0) {
      hits.push({doc, score});
    }
  }

  return hits.sort((a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title)).slice(0, limit);
}

const escape = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'})[char]!);

export function highlight(value: string, query: string): string {
  const words = query.split(/\s+/).filter((word) => word.length > 1);
  let html = escape(value);

  for (const word of words) {
    html = html.replace(new RegExp(`(${escape(word).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'), '<mark>$1</mark>');
  }

  return html;
}

/** A short window of body text around the first matching word. */
function snippet(doc: SearchDoc, query: string): string {
  const word = normalize(query).split(/\s+/).find(Boolean) ?? '';
  const at = normalize(doc.text).indexOf(word);

  if (at < 0 || normalize(doc.title).includes(word)) {
    return doc.excerpt;
  }

  const start = Math.max(0, at - 60);

  return `${start > 0 ? '…' : ''}${doc.text.slice(start, start + 170)}…`;
}

export function initSearch() {
  const dialog = document.querySelector<HTMLDialogElement>('[data-search]');

  if (!dialog) {
    return;
  }

  const input = dialog.querySelector<HTMLInputElement>('input')!;
  const list = dialog.querySelector<HTMLUListElement>('[role="listbox"]')!;
  const status = dialog.querySelector<HTMLElement>('.search-status')!;
  let hits: SearchHit[] = [];
  let active = 0;

  const select = (next: number) => {
    active = (next + hits.length) % Math.max(hits.length, 1);

    list.querySelectorAll('li').forEach((item, i) => {
      item.setAttribute('aria-selected', String(i === active));

      if (i === active) {
        item.scrollIntoView({block: 'nearest'});
        input.setAttribute('aria-activedescendant', item.id);
      }
    });
  };

  const render = async () => {
    const query = input.value.trim();
    const docs = await loadIndex();

    hits = search(docs, query);
    list.innerHTML = hits
      .map(
        ({doc}, i) => `<li id="search-hit-${i}" role="option" aria-selected="${i === 0}">
          <a href="${doc.url}">
            <span class="search-title">${highlight(doc.title, query)}</span>
            <span class="search-meta">${escape(doc.section)}</span>
            <span class="search-excerpt">${highlight(snippet(doc, query), query)}</span>
          </a></li>`,
      )
      .join('');
    active = 0;

    if (!query) {
      status.textContent = `${docs.length} notes. Type to search titles, tags and text.`;
    } else {
      status.innerHTML =
        hits.length === 0
          ? `Nothing matches “${escape(query)}”. Try a shorter word, or <a href="${escape(requestUrl(query, 'the site search'))}" target="_blank" rel="noopener">ask me to write about it</a>.`
          : `${hits.length} results`;
    }
  };

  const open = () => {
    if (dialog.open) {
      return;
    }

    dialog.showModal();
    input.select();
    render();
  };

  document.addEventListener('click', (event) => {
    if ((event.target as Element).closest('[data-search-open]')) {
      open();
    }
  });

  document.addEventListener('keydown', (event) => {
    const typing = (event.target as Element).closest('input, textarea, [contenteditable]');

    if ((event.key === 'k' && (event.metaKey || event.ctrlKey)) || (event.key === '/' && !typing)) {
      event.preventDefault();
      open();
    }
  });

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  input.addEventListener('input', render);

  input.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      select(active + (event.key === 'ArrowDown' ? 1 : -1));
    } else if (event.key === 'Enter' && hits[active]) {
      event.preventDefault();
      window.location.href = hits[active].doc.url;
    }
  });
}
