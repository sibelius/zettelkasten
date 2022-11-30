import React from 'react';

import BrowserOnly from '@docusaurus/BrowserOnly';

import { opengraphAppID } from './opengraphAppId';

const Opengraph = (props) => {
  return (
    <BrowserOnly>
      {() => {
        const OpengraphReactComponent = require('opengraph-react').default;

        const { site } = props;

        return (
          <>
            <OpengraphReactComponent appId={opengraphAppID} size='small' {...props} />
            <a href={site}>{site}</a>
          </>
        );
      }}
    </BrowserOnly>
  );
};

export default Opengraph;
