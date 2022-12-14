import React from 'react';

export const setTagColor = (
  DIV: React.MutableRefObject<HTMLDivElement | undefined>,
  CURR_TAGS: string,
  color: string,
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
          `<span style="color: ${color}">${arrWords[i]}</span>`,
        )}`;
      }
    }
  }
};
