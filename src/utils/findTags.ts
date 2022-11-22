import React from 'react';

export const highlightTags = (
  DIV: React.MutableRefObject<HTMLDivElement | undefined>,
  CURR_TAGS: string,
): void => {
  const CURR_DIV = DIV.current;
  const arrWords = CURR_TAGS.split(' ');

  if (CURR_DIV) {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    for (let i = 0; i < arrWords.length; i += 1) {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      if (CURR_DIV?.innerHTML.indexOf(arrWords[i]) !== -1) {
        CURR_DIV.innerHTML = `${CURR_DIV.innerHTML.replace(
          arrWords[i],
          `<span style="color: #4755f5">${arrWords[i]}</span>`,
        )}`;
      }
    }
  }
};

export const highlightTagsOff = (
  DIV: React.MutableRefObject<HTMLDivElement | undefined>,
  CURR_TAGS: string,
): void => {
  const CURR_DIV = DIV.current;
  const arrWords = CURR_TAGS.split(' ');

  if (CURR_DIV) {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    for (let i = 0; i < arrWords.length; i += 1) {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      if (CURR_DIV?.innerHTML.indexOf(arrWords[i]) !== -1) {
        CURR_DIV.innerHTML = `${CURR_DIV.innerHTML.replace(
          arrWords[i],
          `<span style="color: #181e5d">${arrWords[i]}</span>`,
        )}`;
      }
    }
  }
};
