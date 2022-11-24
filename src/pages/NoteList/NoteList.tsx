import React, { ChangeEvent, useContext, useEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';
import { v1 } from 'uuid';

import { Context } from '../../index';
import { TagType } from '../../store/types';

import { Note } from './Note/Note';
import { NoteForm } from './NoteForm/NoteForm';
import s from './NoteList.module.scss';

export const NoteList = observer(() => {
  const { store } = useContext(Context);

  const [title, setTitle] = useState<string>('');
  const [filter, setFilter] = useState<boolean>(false);
  const [filterTitle, setFilterTitle] = useState<string>('');

  useEffect(() => {
    store.fetchNote();
  }, [store.noteState]);

  const onChangeFilter = (event: ChangeEvent<HTMLInputElement>): void => {
    setFilterTitle(event.currentTarget.value);
  };

  const filterNotes = (): void => {
    store.searchNote(filterTitle);
    setFilter(true);
  };

  const clearFilter = (): void => {
    setFilter(false);
  };

  const OnChangeNote = (event: ChangeEvent<HTMLInputElement>): void => {
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

  const changeNote = (id: string, noteTitle: string): void => {
    const firstEl = 0;
    const valueTitle = noteTitle.split(' ');
    const hashTagArr = valueTitle.filter(t => t[firstEl] === '#');
    const hashTag = hashTagArr.join(' ');

    const tag: TagType = {
      id: v1(),
      title: hashTag,
      noteId: id,
    };

    store.addTags(hashTag, id, tag);
    store.changeNote(id, noteTitle);
    store.pushNote();

    const currTags = store.noteState.notes.find(el => el.id === id);
    if (currTags) {
      const fromTags = !!currTags.tags.find(el => el.id === tag.id);
      if (!fromTags) {
        store.addTags(hashTag, id, tag);
      }
    }
  };

  return (
    <div className={s.noteList}>
      <NoteForm
        OnChangeNote={OnChangeNote}
        title={title}
        addNote={addNote}
        onChangeFilter={onChangeFilter}
        filterTitle={filterTitle}
        filterNotes={filterNotes}
        clearFilter={clearFilter}
      />

      <div className={s.noteBlock}>
        {!filter &&
          store.noteState.notes.map(el => (
            <Note
              key={el.id}
              id={el.id}
              title={el.title}
              tags={el.tags}
              removeNoteCallback={removeNote}
              changeNoteCallback={changeNote}
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
              changeNoteCallback={changeNote}
            />
          ))}
      </div>
    </div>
  );
});
