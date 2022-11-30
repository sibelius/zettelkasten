import React from 'react';

import BrowserOnly from '@docusaurus/BrowserOnly';

import { opengraphAppID } from './opengraphAppId';

const Opengraph = (props) => {
  return (
    <BrowserOnly>
      {() => {
        const OpengraphReactComponent = require('opengraph-react').default;
        
        return <OpengraphReactComponent appId={opengraphAppID} size='small' {...props} />;
      }}
    </BrowserOnly>
  );
};

export default Opengraph;
