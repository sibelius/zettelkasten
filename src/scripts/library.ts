type Preview = {title: string; url: string; section: string; tags: string[]; excerpt: string};

const VIEWS = ['table', 'list', 'tree', 'board'];
const STORAGE_KEY = 'library-view';

const escape = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'})[char]!);

export function initLibrary() {
  const root = document.querySelector<HTMLElement>('[data-library]');

  if (!root) {
    return;
  }

  const text = root.querySelector<HTMLInputElement>('[data-filter-text]')!;
  const section = root.querySelector<HTMLSelectElement>('[data-filter-section]')!;
  const tag = root.querySelector<HTMLSelectElement>('[data-filter-tag]')!;
  const count = root.querySelector<HTMLElement>('[data-count]')!;
  const empty = root.querySelector<HTMLElement>('[data-empty]')!;

  // ── Views: remembered per visitor, and shareable through ?view= ─────
  const setView = (view: string, {push = true} = {}) => {
    if (!VIEWS.includes(view)) {
      return;
    }

    root.dataset.view = view;
    root.querySelectorAll<HTMLElement>('[data-view-panel]').forEach((panel) => (panel.hidden = panel.dataset.viewPanel !== view));
    root.querySelectorAll('[data-view-button]').forEach((button) => button.setAttribute('aria-pressed', String((button as HTMLElement).dataset.viewButton === view)));

    try {
      localStorage.setItem(STORAGE_KEY, view);
    } catch {
      // Private mode: the view simply is not remembered.
    }

    if (push) {
      const url = new URL(location.href);
      url.searchParams.set('view', view);
      history.replaceState(null, '', url);
    }

    filter();
  };

  root.addEventListener('click', (event) => {
    const button = (event.target as Element).closest<HTMLElement>('[data-view-button]');

    if (button) {
      setView(button.dataset.viewButton!);
    }
  });

  // ── Filters apply to every view at once ─────────────────────────────
  function filter() {
    const query = text.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const wantSection = section.value;
    const wantTag = tag.value;
    const panel = root!.querySelector<HTMLElement>(`[data-view-panel="${root!.dataset.view}"]`)!;
    let shown = 0;
    const seen = new Set<string>();

    root!.querySelectorAll<HTMLElement>('[data-item]').forEach((item) => {
      const match =
        query.every((word) => item.dataset.search!.includes(word)) &&
        (!wantSection || item.dataset.section === wantSection) &&
        (!wantTag || item.dataset.tags!.split('|').includes(wantTag));

      item.hidden = !match;

      if (match && panel.contains(item)) {
        // The board shows a note once per tag; count each note once.
        const key = item.querySelector('a')?.getAttribute('href') ?? '';

        if (!seen.has(key)) {
          seen.add(key);
          shown++;
        }
      }
    });

    // Groups and columns show how many of their pages match, and hide when none do.
    root!.querySelectorAll<HTMLElement>('[data-tree-group]').forEach((group) => {
      const visible = group.querySelectorAll('[data-item]:not([hidden])').length;
      const counter = group.querySelector<HTMLElement>(':scope > summary [data-tree-count], :scope > h3 [data-tree-count]');

      if (counter) {
        counter.textContent = String(visible);
      }

      group.hidden = visible === 0;

      // While searching, open the folders that hold results.
      if (group instanceof HTMLDetailsElement && query.length > 0 && visible > 0) {
        group.open = true;
      }
    });

    count.textContent = String(shown);
    empty.hidden = shown > 0;
  }

  text.addEventListener('input', filter);
  section.addEventListener('change', filter);
  tag.addEventListener('change', filter);

  // ── Table sorting ───────────────────────────────────────────────────
  const body = root.querySelector<HTMLTableSectionElement>('[data-sort-body]')!;

  root.querySelectorAll<HTMLButtonElement>('[data-sort]').forEach((button) => {
    button.addEventListener('click', () => {
      const header = button.closest('th')!;
      const key = button.dataset.sort!;
      const numeric = key === 'connections';
      const descending = header.getAttribute('aria-sort') === 'ascending' || (!header.hasAttribute('aria-sort') && (numeric || key === 'updated'));

      root.querySelectorAll('th[aria-sort]').forEach((th) => th.removeAttribute('aria-sort'));
      header.setAttribute('aria-sort', descending ? 'descending' : 'ascending');

      const value = (row: HTMLElement) => {
        if (numeric) {
          return Number(row.dataset.connections);
        }

        return key === 'section' ? row.dataset.sectionLabel! : key === 'updated' ? row.dataset.updated! : row.dataset.title!;
      };

      const sorted = [...body.rows].sort((a, b) => {
        const x = value(a);
        const y = value(b);
        const order = typeof x === 'number' ? x - (y as number) : String(x).localeCompare(String(y));

        return descending ? -order : order;
      });

      body.append(...sorted);
    });
  });

  // ── Tree preview, like a page peek in Notion ─────────────────────────
  const previewEl = root.querySelector<HTMLElement>('[data-tree-preview]')!;
  const previews: Record<string, Preview> = JSON.parse(root.querySelector('[data-preview-data]')!.textContent!);
  let previewing = '';

  const preview = (leaf: HTMLAnchorElement) => {
    const id = leaf.dataset.preview!;

    if (id === previewing) {
      return;
    }

    previewing = id;
    root.querySelectorAll('.tree-leaf[aria-current]').forEach((other) => other.removeAttribute('aria-current'));
    leaf.setAttribute('aria-current', 'true');

    const item = previews[id];
    previewEl.innerHTML = `<div class="preview-in">
      <p class="preview-meta">${escape(item.section)}${item.tags.length ? `, ${escape(item.tags.slice(0, 4).join(', '))}` : ''}</p>
      <h3>${escape(item.title)}</h3>
      ${item.excerpt ? `<p class="preview-text">${escape(item.excerpt)}</p>` : ''}
      <a class="button button-primary" href="${item.url}">Open page</a>
    </div>`;
  };

  root.addEventListener('pointerover', (event) => {
    const leaf = (event.target as Element).closest<HTMLAnchorElement>('.tree-leaf');

    if (leaf) {
      preview(leaf);
    }
  });

  root.addEventListener('focusin', (event) => {
    const leaf = (event.target as Element).closest<HTMLAnchorElement>('.tree-leaf');

    if (leaf) {
      preview(leaf);
    }
  });

  // ── Start in the view from the URL, else the last one used ──────────
  let initial = new URL(location.href).searchParams.get('view');

  try {
    initial ??= localStorage.getItem(STORAGE_KEY);
  } catch {
    // Ignore storage errors.
  }

  const initialTag = new URL(location.href).searchParams.get('tag');

  if (initialTag) {
    tag.value = initialTag;
  }

  setView(initial && VIEWS.includes(initial) ? initial : 'table', {push: false});
}
