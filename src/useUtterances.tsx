import { useEffect } from 'react';

import { useScript } from './useScript';

/**
 * <script src="https://utteranc.es/client.js"
 *               repo="sibelius/zettelkasten"
 *               issue-term="pathname"
 *               label="discussion"
 *               theme="preferred-color-scheme"
 *               crossOrigin="anonymous"
 *               async>
 *       </script>
 */

export const useUtterances = () => {
  const scriptURL = 'https://utteranc.es/client.js';

  const attributes = {
    repo: "sibelius/zettelkasten",
    'issue-term': "url",
    label: "discussion",
    theme: "preferred-color-scheme",
    crossOrigin: "anonymous",
    async: true,
  }

  // eslint-disable-next-line
  const [loaded, error] = useScript({
    src: scriptURL,
    checkForExisting: false,
    ...attributes,
  });

  useEffect(() => {
    if (!error) {
      return;
    }

    // eslint-disable-next-line
    console.log('utteranc.es not loaded');
  }, [error]);
};
