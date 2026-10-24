export type Mode = 'auto' | 'light' | 'dark';

const ORDER: Mode[] = ['auto', 'light', 'dark'];
const LABELS: Record<Mode, string> = {auto: 'Auto', light: 'Light', dark: 'Dark'};
const DESCRIPTIONS: Record<Mode, string> = {auto: 'follow the system', light: 'light', dark: 'dark'};

export function currentMode(): Mode {
  const theme = document.documentElement.dataset.theme;

  return theme === 'light' || theme === 'dark' ? theme : 'auto';
}

/** The theme actually on screen, resolving "auto" against the system setting. */
export function resolvedTheme(mode = currentMode()): 'light' | 'dark' {
  if (mode !== 'auto') {
    return mode;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function apply(mode: Mode) {
  if (mode === 'auto') {
    delete document.documentElement.dataset.theme;
  } else {
    document.documentElement.dataset.theme = mode;
  }

  try {
    if (mode === 'auto') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', mode);
    }
  } catch {
    // Private mode: the choice lasts for this page only.
  }

  document.querySelectorAll<HTMLElement>('[data-theme-toggle]').forEach((button) => {
    button.dataset.mode = mode;
    button.setAttribute('aria-label', `Theme: ${DESCRIPTIONS[mode]}. Click to change.`);
    button.querySelector('[data-theme-label]')!.textContent = LABELS[mode];
  });

  // Embeds like the comments live in iframes and need to hear about it.
  window.dispatchEvent(new CustomEvent('themechange', {detail: {mode, theme: resolvedTheme(mode)}}));
}

export function initTheme() {
  apply(currentMode());

  document.addEventListener('click', (event) => {
    if ((event.target as Element).closest('[data-theme-toggle]')) {
      apply(ORDER[(ORDER.indexOf(currentMode()) + 1) % ORDER.length]);
    }
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (currentMode() === 'auto') {
      apply('auto');
    }
  });
}
