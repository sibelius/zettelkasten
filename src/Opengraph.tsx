import React from 'react';

import BrowserOnly from '@docusaurus/BrowserOnly';
const Opengraph = (props) => {
  return (
    <BrowserOnly>
      {() => {
        const OpengraphReactComponent = require('opengraph-react').default;
        
        return <OpengraphReactComponent {...props} />;
      }}
    </BrowserOnly>
  );
};

export default Opengraph;
