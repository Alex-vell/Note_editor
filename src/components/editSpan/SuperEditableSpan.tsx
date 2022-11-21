/* eslint-disable */
import React, {
  ChangeEvent,
  DetailedHTMLProps,
  HTMLAttributes,
  InputHTMLAttributes,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { TagType } from '../../store/types';
import SuperInputText from '../customInput/SuperInputText';

import styles from './SuperEditableSpan.module.scss';
import { Context } from '../../index';
// import note from "../../store/note";

// default input prop type
type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
// default span prop type
type DefaultSpanPropsType = DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;

type SuperEditableSpanType = DefaultInputPropsType & {
  tag: TagType;
  onChangeText: (id: string, value: string, tags: TagType) => void;
  onEnter?: () => void;
  error?: string;
  spanClassName?: string;
  value: string;
  id: string;
  spanProps?: DefaultSpanPropsType;
};

const SuperEditableSpan: React.FC<SuperEditableSpanType> = ({
  autoFocus,
  onBlur,
  onEnter,
  spanProps,
  onChangeText,
  value,
  id,
  tag,

  ...restProps
}) => {
  const { store } = useContext(Context);

  const [editMode, setEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(value);
  const { children, onDoubleClick, className, ...restSpanProps } = spanProps || {};

  const SPAN = useRef<HTMLSpanElement>();
  const SPAN2 = useRef<HTMLSpanElement>();
  const BOLD = useRef<RefObject<any>>();

  const CURR_TAGS = store.noteState.currentTag;

  useEffect(() => {
    if (SPAN.current) {
      const CURR_SPAN = SPAN.current;

      if (editMode) {
        const arrWords = CURR_TAGS.split(' ');

        for (let i = 0; i < arrWords.length; i++) {
          if (CURR_SPAN?.innerHTML.indexOf(arrWords[i]) !== -1) {
            CURR_SPAN.innerHTML = `${CURR_SPAN.innerHTML.replace(
              arrWords[i],
              `<span style="color: #4755f5">${arrWords[i]}</span>`,
            )}`;
          }
        }
      }
    }
    if (SPAN2.current) {
      SPAN2.current.textContent = title;
    }
  }, [editMode, title]);

  const onEnterCallback = () => {
    onChangeText(id, title, tag);
    setEditMode(false);

    if (onEnter) {
      onEnter();
    }
  };

  const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (SPAN.current) {
      const CURR_SPAN = SPAN.current;
      if (editMode) {
        const arrWords = CURR_TAGS.split(' ');

        for (let i = 0; i < arrWords.length; i++) {
          if (CURR_SPAN?.innerHTML.indexOf(arrWords[i]) !== -1) {
            CURR_SPAN.innerHTML = `${CURR_SPAN.innerHTML.replace(
              arrWords[i],
              `<span style="color: #181e5d">${arrWords[i]}</span>`,
            )}`;
          }
        }
      }
    }

    onChangeText(id, title, tag);
    setEditMode(false);

    if (onBlur) {
      onBlur(e);
    }
  };
  const onDoubleClickCallBack = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ): void => {
    setEditMode(true);

    if (onDoubleClick) {
      onDoubleClick(e);
    }

    const currTags = store.noteState.notes.find(el => el.id === id)?.tags[0].title;
    if (currTags) {
      store.setCurrentTags(currTags);
    }
  };
  const onChangeTextHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.currentTarget.value);
  };

  const spanClassName = `${styles.span} ${className || ''}`;

  return (
    <>
      {editMode ? (
        <span
          ref={SPAN as any}
          onDoubleClick={onDoubleClickCallBack}
          className={spanClassName}
          {...restSpanProps}
        >
          ✎ {children || title}
        </span>
      ) : (
        <span
          ref={SPAN2 as any}
          onDoubleClick={onDoubleClickCallBack}
          className={spanClassName}
          {...restSpanProps}
        >
          ✎ {children || title}
        </span>
      )}

      {editMode && (
        <div className={styles.editField}>
          <SuperInputText
            autoFocus
            onBlur={onBlurCallback}
            onEnter={onEnterCallback}
            onChange={onChangeTextHandler}
            defaultValue={title}
            isActiveEditMode={editMode}
            {...restProps}
          />
        </div>
      )}
    </>

    // <>
    //   {editMode ? (
    //     // <SuperInputText
    //     <SuperInputText
    //       autoFocus
    //       onBlur={onBlurCallback}
    //       onEnter={onEnterCallback}
    //       onChange={onChangeTextHandler}
    //       defaultValue={title}
    //       isActiveEditMode={editMode}
    //       {...restProps}
    //     />
    //   ) : (
    //     <span
    //       onDoubleClick={onDoubleClickCallBack}
    //       className={spanClassName}
    //       {...restSpanProps}
    //     >
    //       ✎ {children || title}
    //     </span>
    //   )}
    // </>
  );
};

export default SuperEditableSpan;
