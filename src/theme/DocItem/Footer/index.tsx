import React from 'react';

import Footer from '@theme-original/DocItem/Footer';
import type FooterType from '@theme/DocItem/Footer';
import type { WrapperProps } from '@docusaurus/types';

import BrowserOnly from '@docusaurus/BrowserOnly';

import Comments from '@site/src/components/Comments';

type Props = WrapperProps<typeof FooterType>;

export default function FooterWrapper(props: Props): JSX.Element {
  return (
    <>
      <Footer {...props} />
      <BrowserOnly>{() => <Comments />}</BrowserOnly>
    </>
  );
}
