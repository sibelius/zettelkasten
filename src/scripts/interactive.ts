/**
 * Notes stay plain Markdown. This reads the rendered page and adds interaction where the content
 * already has the shape for it:
 * - a list of "question? answer" items becomes a deck you can read or practise with;
 * - a task list becomes a checklist that remembers your progress.
 */

const QUESTION = /^(.{6,}?\?)\s+(\S[\s\S]*)$/;

const storage = {
  get<T>(key: string, fallback: T): T {
    try {
      return JSON.parse(localStorage.getItem(key) ?? 'null') ?? fallback;
    } catch {
      return fallback;
    }
  },
  set(key: string, value: unknown) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Private mode: progress lasts for this visit only.
    }
  },
};

const pageKey = (kind: string, index: number) => `${kind}:${location.pathname.replace(/\.html$/, '')}:${index}`;

const el = (tag: string, className: string, html = '') => {
  const node = document.createElement(tag);
  node.className = className;
  node.innerHTML = html;

  return node;
};

/** Splits an item's HTML at the first "?" outside a tag, so links and code survive. */
function splitQuestion(li: HTMLLIElement): {question: string; answer: string} | null {
  if (!QUESTION.test(li.textContent?.trim() ?? '')) {
    return null;
  }

  const html = li.innerHTML;
  let inTag = false;

  for (let i = 0; i < html.length; i++) {
    const char = html[i];

    if (char === '<') {
      inTag = true;
    } else if (char === '>') {
      inTag = false;
    } else if (char === '?' && !inTag) {
      const answer = html.slice(i + 1).trim();

      return answer ? {question: html.slice(0, i + 1).trim(), answer} : null;
    }
  }

  return null;
}

type Card = {question: string; answer: string};

function initDeck(list: HTMLUListElement, cards: Card[], index: number) {
  const key = pageKey('deck', index);
  let known = new Set<number>(storage.get<number[]>(key, []));

  const items = [...list.children] as HTMLLIElement[];
  const deck = el('div', 'deck');
  const toolbar = el('div', 'deck-toolbar');
  const tabs = el(
    'div',
    'tabs deck-tabs',
    `<button type="button" class="tab" data-deck-mode="read" aria-pressed="true">Read</button>
     <button type="button" class="tab" data-deck-mode="practice" aria-pressed="false">Practice</button>`,
  );
  tabs.setAttribute('role', 'group');
  tabs.setAttribute('aria-label', 'How to use these questions');

  const status = el('p', 'deck-status');
  status.setAttribute('aria-live', 'polite');

  const revealAll = el('button', 'deck-action', 'Show all answers');
  (revealAll as HTMLButtonElement).type = 'button';

  toolbar.append(tabs, status, revealAll);
  list.before(deck);
  deck.append(toolbar, list);
  list.classList.add('deck-list');

  // ── Read mode: questions first, answers one click away ───────────────
  items.forEach((li, i) => {
    const {question, answer} = cards[i];

    li.classList.add('deck-item');
    li.innerHTML = '';

    const button = el('button', 'deck-question', `<span class="deck-check" aria-hidden="true"></span><span>${question}</span>`) as HTMLButtonElement;
    button.type = 'button';
    button.setAttribute('aria-expanded', 'false');

    const body = el('div', 'deck-answer', answer);
    body.hidden = true;
    body.id = `deck-${index}-answer-${i}`;
    button.setAttribute('aria-controls', body.id);

    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!open));
      body.hidden = open;
    });

    li.append(button, body);
  });

  const paintKnown = () => {
    items.forEach((li, i) => li.classList.toggle('is-known', known.has(i)));
    status.textContent = `${cards.length} questions${known.size ? `, ${known.size} you know` : ''}`;
  };

  revealAll.addEventListener('click', () => {
    const opening = revealAll.textContent === 'Show all answers';

    items.forEach((li) => {
      li.querySelector('.deck-question')!.setAttribute('aria-expanded', String(opening));
      (li.querySelector('.deck-answer') as HTMLElement).hidden = !opening;
    });
    revealAll.textContent = opening ? 'Hide all answers' : 'Show all answers';
  });

  // ── Practice mode: one card at a time, like flashcards ───────────────
  const stage = el('div', 'deck-stage');
  stage.hidden = true;
  deck.append(stage);

  let order: number[] = [];
  let position = 0;
  let missed: number[] = [];

  const shuffle = (values: number[]) => {
    const copy = [...values];

    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
  };

  const renderCard = () => {
    if (position >= order.length) {
      const knew = order.length - missed.length;

      stage.innerHTML = `<div class="deck-card deck-done">
        <p class="deck-progress-text">Round finished</p>
        <p class="deck-big">You knew ${knew} of ${order.length}.</p>
        <div class="deck-buttons">
          ${missed.length ? `<button type="button" class="button button-primary" data-deck="missed">Practise the ${missed.length} you missed</button>` : ''}
          <button type="button" class="button button-ghost" data-deck="restart">Start over with all ${cards.length}</button>
        </div>
      </div>`;

      return;
    }

    const i = order[position];
    const percent = Math.round((position / order.length) * 100);

    stage.innerHTML = `<div class="deck-progress" role="progressbar" aria-label="Progress" aria-valuemin="0" aria-valuemax="${order.length}" aria-valuenow="${position}"><span style="width: ${percent}%"></span></div>
      <div class="deck-card deck-enter">
        <p class="deck-progress-text">Question ${position + 1} of ${order.length}</p>
        <p class="deck-big">${cards[i].question}</p>
        <div class="deck-reveal" hidden>${cards[i].answer}</div>
        <div class="deck-buttons">
          <button type="button" class="button button-primary" data-deck="reveal">Show answer <kbd>Space</kbd></button>
          <button type="button" class="button button-ghost" data-deck="again" hidden>Review again <kbd>1</kbd></button>
          <button type="button" class="button button-primary" data-deck="known" hidden>I knew it <kbd>2</kbd></button>
        </div>
      </div>`;

    stage.querySelector<HTMLButtonElement>('[data-deck="reveal"]')!.focus({preventScroll: true});
  };

  const start = (subset: number[]) => {
    order = shuffle(subset);
    position = 0;
    missed = [];
    renderCard();
  };

  const act = (action: string) => {
    const i = order[position];

    if (action === 'reveal') {
      stage.querySelector<HTMLElement>('.deck-reveal')!.hidden = false;
      stage.querySelector<HTMLElement>('[data-deck="reveal"]')!.hidden = true;
      stage.querySelectorAll<HTMLElement>('[data-deck="again"], [data-deck="known"]').forEach((button) => (button.hidden = false));
      stage.querySelector<HTMLButtonElement>('[data-deck="known"]')!.focus({preventScroll: true});
    } else if (action === 'known' || action === 'again') {
      if (action === 'known') {
        known.add(i);
      } else {
        known.delete(i);
        missed.push(i);
      }

      storage.set(key, [...known]);
      paintKnown();
      position++;
      renderCard();
    } else if (action === 'missed') {
      start(missed);
    } else if (action === 'restart') {
      start(cards.map((_, j) => j));
    }
  };

  stage.addEventListener('click', (event) => {
    const button = (event.target as Element).closest<HTMLElement>('[data-deck]');

    if (button) {
      act(button.dataset.deck!);
    }
  });

  stage.addEventListener('keydown', (event) => {
    const revealed = !stage.querySelector<HTMLElement>('.deck-reveal')?.hidden;

    if (event.key === ' ' && !revealed && stage.querySelector('[data-deck="reveal"]')) {
      event.preventDefault();
      act('reveal');
    } else if (event.key === '1' && revealed) {
      act('again');
    } else if (event.key === '2' && revealed) {
      act('known');
    }
  });

  tabs.addEventListener('click', (event) => {
    const button = (event.target as Element).closest<HTMLElement>('[data-deck-mode]');

    if (!button) {
      return;
    }

    const practice = button.dataset.deckMode === 'practice';

    tabs.querySelectorAll('[data-deck-mode]').forEach((tab) => tab.setAttribute('aria-pressed', String(tab === button)));
    list.hidden = practice;
    revealAll.hidden = practice;
    stage.hidden = !practice;

    if (practice) {
      start(cards.map((_, j) => j));
    }
  });

  const reset = el('button', 'deck-action deck-reset', 'Forget progress') as HTMLButtonElement;
  reset.type = 'button';
  reset.addEventListener('click', () => {
    known = new Set();
    storage.set(key, []);
    paintKnown();
  });
  toolbar.append(reset);

  paintKnown();
}

function initChecklist(list: HTMLUListElement, index: number) {
  const key = pageKey('checklist', index);
  const boxes = [...list.querySelectorAll<HTMLInputElement>(':scope > li > input[type="checkbox"]')];

  if (boxes.length < 3) {
    return;
  }

  const saved = new Set<number>(storage.get<number[]>(key, []));
  const bar = el(
    'div',
    'checklist-bar',
    `<div class="deck-progress" role="progressbar" aria-label="Checklist progress" aria-valuemin="0" aria-valuemax="${boxes.length}"><span></span></div>
     <p class="checklist-status" aria-live="polite"></p>
     <button type="button" class="deck-action">Uncheck all</button>`,
  );
  list.before(bar);
  list.classList.add('checklist');

  const paint = () => {
    const done = boxes.filter((box) => box.checked).length;

    bar.querySelector<HTMLElement>('.deck-progress')!.setAttribute('aria-valuenow', String(done));
    bar.querySelector<HTMLElement>('.deck-progress span')!.style.width = `${(done / boxes.length) * 100}%`;
    bar.querySelector('.checklist-status')!.textContent = done === boxes.length ? `All ${boxes.length} done` : `${done} of ${boxes.length} done`;
    boxes.forEach((box) => box.closest('li')!.classList.toggle('is-done', box.checked));
  };

  boxes.forEach((box, i) => {
    // Markdown renders task lists read-only; here they are yours to tick.
    box.disabled = false;
    box.checked = saved.has(i) || (box.defaultChecked && !storage.get(`${key}:touched`, false));

    const label = box.closest('li')!;
    box.setAttribute('aria-label', label.textContent?.trim().slice(0, 120) ?? `Item ${i + 1}`);

    box.addEventListener('change', () => {
      storage.set(
        key,
        boxes.flatMap((other, j) => (other.checked ? [j] : [])),
      );
      storage.set(`${key}:touched`, true);
      paint();
    });
  });

  bar.querySelector('button')!.addEventListener('click', () => {
    boxes.forEach((box) => (box.checked = false));
    storage.set(key, []);
    storage.set(`${key}:touched`, true);
    paint();
  });

  paint();
}

export function initInteractive(root: HTMLElement | null = document.querySelector('.prose')) {
  if (!root) {
    return;
  }

  root.querySelectorAll<HTMLUListElement>('ul.contains-task-list').forEach((list, i) => initChecklist(list, i));

  let decks = 0;

  root.querySelectorAll<HTMLUListElement>('ul:not(.contains-task-list)').forEach((list) => {
    const items = [...list.children].filter((child): child is HTMLLIElement => child instanceof HTMLLIElement);

    if (items.length < 4 || items.some((item) => item.querySelector('ul, ol'))) {
      return;
    }

    const cards = items.map(splitQuestion);
    const hits = cards.filter(Boolean).length;

    // Only when the list really is questions and answers, not a list that happens to contain one.
    if (hits === items.length) {
      initDeck(list, cards as Card[], decks++);
    }
  });
}
