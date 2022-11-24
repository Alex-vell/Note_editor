import { AxiosError } from 'axios';
import { makeAutoObservable } from 'mobx';
import { v1 } from 'uuid';

import { noteAPI } from '../api/api';

import { DataType, NoteType, TagType } from './types';

export default class Store {
  noteState = {
    notes: [] as Array<NoteType>,
    currentNotes: [] as Array<NoteType>,
    currentTag: '' as string,
  } as DataType;

  constructor() {
    makeAutoObservable(this);
  }

  addTags(title: string, noteId: string, tag: TagType): void {
    this.noteState.notes = this.noteState.notes.map(nt =>
      nt.id === noteId
        ? {
            ...nt,
            tags: [tag],
          }
        : nt,
    );
  }

  addNote(noteTitle: string): void {
    this.noteState.notes.push({ id: v1(), title: noteTitle, tags: [] });
  }

  removeNote(id: string): void {
    this.noteState.notes = this.noteState.notes.filter(n => n.id !== id);
    this.pushNote();
  }

  setNote(notes: Array<NoteType>): void {
    this.noteState.notes = notes;
  }

  pushAllNotes(notes: Array<NoteType>): void {
    this.noteState.notes = notes;
  }

  changeNote(id: string, noteTitle: string): void {
    this.noteState.notes = this.noteState.notes.map(nt =>
      nt.id === id
        ? {
            ...nt,
            title: noteTitle,
          }
        : nt,
    );
  }

  searchNote(titleFilter: string): void {
    let currentTags: any = [];
    const currentTag = titleFilter;
    this.noteState.notes.forEach(e => {
      currentTags = currentTags.concat(
        e.tags.filter(c => c.title.split(' ').find(t => t === currentTag)),
      );
    });
    this.noteState.currentNotes = this.noteState.notes.filter(c =>
      c.title.split(' ').find(t => t === currentTag),
    );
    this.pushNote();
  }

  setCurrentTags(tags: string): void {
    this.noteState.currentTag = tags;
  }

  // requests
  pushNote(): void {
    const notesFromState = this.noteState.notes;
    noteAPI
      .pushNotes(notesFromState)
      .then(() => {
        this.pushAllNotes(notesFromState);
      })
      .catch((err: AxiosError) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }

  fetchNote(): void {
    noteAPI
      .getNotes()
      .then(res => {
        this.setNote(res.data.notes);
      })
      .catch((err: AxiosError) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }
}
