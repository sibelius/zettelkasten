import React, {useEffect, useState} from 'react';

import BrowserOnly from '@docusaurus/BrowserOnly';

/**
 * The hero background: a live node-and-link field standing in for the slip-box
 * itself — notes as nodes, links as edges.
 *
 * Rendered browser-only on purpose. The threeui component ships its scene as a
 * sandboxed iframe with a ~17KB srcDoc, which we do not want inlined into the
 * statically generated HTML of the home page. Motion is skipped entirely for
 * anyone who asked for reduced motion; the CSS gradient underneath carries the
 * look on its own.
 */
function Field() {
  const [enabled, setEnabled] = useState(false);
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(
    null,
  );

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    const sync = () => setEnabled(!reduced.matches);

    sync();
    reduced.addEventListener('change', sync);

    return () => reduced.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!enabled || Component) {
      return;
    }

    let cancelled = false;

    import('@designcodeio/threeui/components/ConstellationField').then((mod) => {
      if (!cancelled) {
        setComponent(() => mod.ConstellationField);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [enabled, Component]);

  if (!enabled || !Component) {
    return null;
  }

  return (
    <Component
      mode="dark"
      speed={0.55}
      density={1.15}
      length={1.1}
      opacity={0.78}
      strokeWidth={0.8}
    />
  );
}

export default function NoteField() {
  return <BrowserOnly>{() => <Field />}</BrowserOnly>;
}
