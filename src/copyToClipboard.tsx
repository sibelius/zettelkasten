export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard) {
      if (navigator.permissions) {
        try {
          // we need to check for permissions
          const queryOpts = { name: 'clipboard-write' };
          const permissionStatus = await navigator.permissions.query(queryOpts);

          // Will be 'granted', 'denied' or 'prompt':
          // eslint-disable-next-line
          console.log('cliboard-write: ', permissionStatus.state);

          // Listen for changes to the permission state
          permissionStatus.onchange = () => {
            // eslint-disable-next-line
            console.log('clipboard-write changed: ', permissionStatus.state);
          };
        } catch (err) {
          // eslint-disable-next-line
          console.log('error permissions: ', err);
        }
      }

      // navigator clipboard api method
      await navigator.clipboard.writeText(text);

      // eslint-disable-next-line
      console.log('navigator.clipboard.writeText: ', text);

      return true;
    }
  } catch (err) {
    // eslint-disable-next-line
    console.log('Failed to copy!', err);
  }

  const success = copyClipboardTextNode(text);

  // eslint-disable-next-line
  console.log('textNode: ', success);

  if (!success) {
    const successTextArea = copyClipboardTextArea(text);

    // eslint-disable-next-line
    console.log('textArea: ', success);

    return successTextArea;
  }

  return success;
};

export const copyClipboardTextNode = (text: string): boolean => {
  const copiedText = document.createTextNode(text);

  document.body.appendChild(copiedText);

  const range = document.createRange();

  range.selectNodeContents(copiedText);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);

  try {
    const success = document.execCommand('copy');

    window.getSelection().removeAllRanges();
    copiedText.remove();

    if (success) {
      // eslint-disable-next-line
      console.log('createTextNode: ', text);
    }

    return success;
  } catch (err) {
    // eslint-disable-next-line
    console.log('createTextNode: ', err);

    return false;
  }
};

export const copyClipboardTextArea = (text: string): boolean => {
  const textArea = document.createElement('textarea');

  textArea.value = text;

  document.body.appendChild(textArea);

  textArea.focus();
  textArea.select();

  try {
    const success = document.execCommand('copy');

    document.body.removeChild(textArea);

    if (success) {
      // eslint-disable-next-line
      console.log('textArea: ', text);
    }

    return success;
  } catch (err) {
    // eslint-disable-next-line
    console.log('createTextArea: ', err);

    return false;
  }
};
