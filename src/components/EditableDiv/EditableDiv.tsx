import React, { FormEvent, useContext, useEffect, useRef, useState } from 'react';

import { Context } from '../../index';
import { TagType } from '../../store/types';
import { setTagColor } from '../../utils/findTags';

import styles from './EditableDiv.module.scss';

type EditableDivType = {
  tag: TagType;
  onChangeText: (id: string, value: string, tags: TagType) => void;
  value: string;
  id: string;
};

export const EditableDiv: React.FC<EditableDivType> = ({
  onChangeText,
  value,
  id,
  tag,
}) => {
  const { store } = useContext(Context);
  const DIV = useRef<HTMLDivElement>();
  const SELECTED_TAG_COLOR = '#303cce';
  const CURR_TAGS = store.noteState.currentTag;

  const [editMode, setEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(value);

  useEffect(() => {
    if (DIV.current) {
      if (editMode) {
        setTagColor(DIV, CURR_TAGS, SELECTED_TAG_COLOR);
      } else {
        DIV.current.textContent = title;
      }
    }
  }, [editMode, title]);

  const onBlurCallback = (event: React.FocusEvent<HTMLDivElement>): void => {
    onChangeText(id, event.currentTarget.innerText, tag);
    setEditMode(false);
  };
  const onClickHandler = (): void => {
    const firstEl = 0;
    setEditMode(true);

    const currTags = store.noteState.notes.find(el => el.id === id)?.tags[firstEl].title;
    if (currTags) {
      store.setCurrentTags(currTags);
    }
  };
  const onChangeTextHandler = (e: FormEvent<HTMLDivElement>): void => {
    setTitle(e.currentTarget.innerText);
  };

  return (
    <div
      role="presentation"
      className={styles.editableElement}
      ref={DIV as any}
      contentEditable
      onBlur={e => {
        onChangeTextHandler(e);
        onBlurCallback(e);
      }}
      suppressContentEditableWarning
      onClick={() => {
        onClickHandler();
      }}
    >
      {title}
    </div>
  );
};
