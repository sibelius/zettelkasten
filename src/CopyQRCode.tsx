import React, { useState } from 'react';
import { Text } from 'rebass';
import { useDebouncedCallback } from 'use-debounce';

import { copyToClipboard } from './copyToClipboard';

const DEBOUNCE_DELAY = 1000;

type Pops = {
  value: string;
};
export const CopyQRCode = ({ value }: Pops) => {
  const [isCopied, setIsCopied] = useState(false);

  const clearCopied = useDebouncedCallback(() => {
    setIsCopied(false);
  }, DEBOUNCE_DELAY);

  const handleCopy = async () => {
    setIsCopied(true);
    await copyToClipboard(value);
    clearCopied();
  };

  const renderLabel = () => {
    if (isCopied) {
      return (
        <Text as='span' sx={{ textTransform: 'uppercase' }}>
          {'Copied'}
        </Text>
      );
    }

    return (
      <Text as='span' sx={{ textTransform: 'uppercase' }}>
        {'Copy QR Code'}
      </Text>
    );
  };

  return (
    <button onClick={handleCopy}>
      {renderLabel()}
    </button>
  );
};

export default CopyQRCode;
