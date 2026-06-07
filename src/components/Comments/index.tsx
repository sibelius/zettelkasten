import React, { useEffect, useRef } from 'react';

import { useColorMode } from '@docusaurus/theme-common';
import { useLocation } from '@docusaurus/router';

const UTTERANCES_SRC = 'https://utteranc.es/client.js';

const attributes = {
  repo: 'sibelius/zettelkasten',
  'issue-term': 'pathname',
  label: 'discussion',
  crossorigin: 'anonymous',
};

// utterances injects its iframe as a child of the element that contains the
// <script> tag, so the script must be appended into our own container ref
// rather than the document head/body.
const Comments = (): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { colorMode } = useColorMode();
  const { pathname } = useLocation();

  const theme = colorMode === 'dark' ? 'github-dark' : 'github-light';

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    // Reset on navigation / theme change so utterances re-renders.
    container.innerHTML = '';

    const script = document.createElement('script');
    script.src = UTTERANCES_SRC;
    script.async = true;
    script.setAttribute('theme', theme);

    Object.entries(attributes).forEach(([key, value]) => {
      script.setAttribute(key, value);
    });

    container.appendChild(script);
  }, [theme, pathname]);

  return <div className="utterances-comments" ref={containerRef} />;
};

export default Comments;
