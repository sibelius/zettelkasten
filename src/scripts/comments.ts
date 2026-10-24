const GISCUS = 'https://giscus.app/client.js';
const MAX_QUOTE = 600;

function loadGiscus(container: HTMLElement) {
  const {repo, repoId, category, categoryId, term} = container.dataset;
  const script = document.createElement('script');

  const attributes: Record<string, string> = {
    'data-repo': repo!,
    'data-repo-id': repoId!,
    'data-category': category!,
    'data-category-id': categoryId!,
    // One thread per note, found by its route rather than whatever URL it was opened from.
    'data-mapping': 'specific',
    'data-term': term!,
    'data-strict': '1',
    'data-reactions-enabled': '1',
    'data-emit-metadata': '0',
    'data-input-position': 'top',
    'data-theme': 'preferred_color_scheme',
    'data-lang': 'en',
    'data-loading': 'lazy',
    crossorigin: 'anonymous',
  };

  script.src = GISCUS;
  script.async = true;

  for (const [key, value] of Object.entries(attributes)) {
    script.setAttribute(key, value);
  }

  container.append(script);
}

/** A link that scrolls straight to the passage and highlights it, using a text fragment. */
function passageLink(text: string): string {
  const words = text.split(/\s+/);
  const fragment =
    words.length <= 8
      ? encodeURIComponent(text)
      : `${encodeURIComponent(words.slice(0, 4).join(' '))},${encodeURIComponent(words.slice(-4).join(' '))}`;

  return `${location.origin}${location.pathname}#:~:text=${fragment}`;
}

function toQuote(text: string): string {
  const clipped = text.length > MAX_QUOTE ? `${text.slice(0, text.lastIndexOf(' ', MAX_QUOTE))}…` : text;
  const quoted = clipped
    .split(/\n+/)
    .map((line) => `> ${line.trim()}`)
    .join('\n>\n');

  return `${quoted}\n>\n> [From this passage](${passageLink(text)})\n\n`;
}

async function copy(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);

    return true;
  } catch {
    const area = document.createElement('textarea');
    area.value = text;
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.append(area);
    area.select();

    const ok = document.execCommand('copy');
    area.remove();

    return ok;
  }
}

export function initComments() {
  const container = document.querySelector<HTMLElement>('[data-giscus]');
  const article = document.querySelector<HTMLElement>('.prose');
  const pop = document.querySelector<HTMLElement>('[data-quote-pop]');
  const button = document.querySelector<HTMLButtonElement>('[data-quote-button]');
  const toast = document.querySelector<HTMLElement>('[data-quote-toast]');

  if (!container || !article || !pop || !button || !toast) {
    return;
  }

  loadGiscus(container);

  let selected = '';
  let toastTimer = 0;

  const hide = () => {
    pop.hidden = true;
    selected = '';
  };

  const show = () => {
    const selection = window.getSelection();

    if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
      hide();

      return;
    }

    const range = selection.getRangeAt(0);
    const text = selection.toString().trim();

    if (text.length < 3 || !article.contains(range.commonAncestorContainer)) {
      hide();

      return;
    }

    const rect = range.getBoundingClientRect();

    selected = text;
    pop.style.left = `${rect.left + rect.width / 2 + window.scrollX}px`;
    pop.style.top = `${rect.top + window.scrollY}px`;
    pop.hidden = false;
  };

  // Touch devices finish a selection without a mouseup, so watch the selection itself.
  let pending = 0;

  document.addEventListener('selectionchange', () => {
    clearTimeout(pending);
    pending = window.setTimeout(show, 180);
  });

  // Keep the selection alive while the button is pressed.
  button.addEventListener('pointerdown', (event) => event.preventDefault());

  button.addEventListener('click', async () => {
    if (!selected) {
      return;
    }

    const ok = await copy(toQuote(selected));

    window.getSelection()?.removeAllRanges();
    hide();
    document.getElementById('comments')?.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});

    toast.textContent = ok
      ? 'Quote copied. Paste it into the comment box to reply to that passage.'
      : 'Could not copy the quote. Copy the passage yourself and paste it into the comment box.';
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 4500);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      hide();
    }
  });
}
