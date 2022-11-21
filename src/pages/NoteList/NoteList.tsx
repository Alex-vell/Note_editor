import React, { ChangeEvent, useContext, useEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';

import SuperButton from '../../components/customButton/SuperButton';
import SuperInputText from '../../components/customInput/SuperInputText';
// import { note } from '../../store/note';
import { Context } from '../../index';
import { TagType } from '../../store/types';
import { Note } from '../Note/Note';

import s from './NoteList.module.scss';

export const NoteList = observer(() => {
  const { store } = useContext(Context);

  const [title, setTitle] = useState<string>('');
  const [filter, setFilter] = useState<boolean>(false);
  const [filterTitle, setFilterTitle] = useState<string>('');

  useEffect(() => {
    store.fetchNote();
  }, [store.noteState]);

  const onChangeFilterHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setFilterTitle(event.currentTarget.value);
  };

  const filterNotes = (): void => {
    store.searchNote(filterTitle);
    setFilter(true);
  };

  const filterOff = (): void => {
    setFilter(false);
  };

  const addNoteOnChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.currentTarget.value);
  };

  const addNote = (): void => {
    store.addNote(title);
    store.pushNote();
    setTitle('');
  };

  const removeNote = (id: string): void => {
    store.removeNote(id);
  };

  const changeNoteCallback = (id: string, noteTitle: string): void => {
    const firstEl = 0;
    const valueTitle = noteTitle.split(' ');
    const hashTagArr = valueTitle.filter(t => t[firstEl] === '#');
    const hashTag = hashTagArr.join(' ');

    const tag: TagType = {
      id,
      title: hashTag,
      noteId: id,
    };

    store.addTags(hashTag, id, tag);
    store.changeNote(id, noteTitle);
    store.pushNote();
  };

  return (
    <div className={s.noteList}>
      <div className={s.fieldBlock}>
        <SuperInputText
          placeholder="Add note"
          onChange={addNoteOnChangeHandler}
          value={title}
        />
        <SuperButton onClick={addNote} disabled={!title.length}>
          add note
        </SuperButton>

        <SuperInputText
          onChange={onChangeFilterHandler}
          value={filterTitle}
          placeholder="Search to hashtag"
        />
        <div className={s.filterButtons}>
          <SuperButton
            className={s.btn}
            onClick={filterNotes}
            disabled={!filterTitle.length}
          >
            filter
          </SuperButton>
          <SuperButton className={s.btn} onClick={filterOff}>
            all
          </SuperButton>
        </div>
      </div>

      <div className={s.noteBlock}>
        {!filter &&
          store.noteState.notes.map(el => (
            <Note
              key={el.id}
              id={el.id}
              title={el.title}
              tags={el.tags}
              removeNoteCallback={removeNote}
              changeNoteCallback={changeNoteCallback}
            />
          ))}
        {filter &&
          store.noteState.currentNotes.map(el => (
            <Note
              key={el.id}
              id={el.id}
              title={el.title}
              tags={el.tags}
              removeNoteCallback={removeNote}
              changeNoteCallback={changeNoteCallback}
            />
          ))}
      </div>
    </div>
  );
});
