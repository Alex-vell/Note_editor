import axios from 'axios';

import { NoteType } from '../store/types';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api/',
  withCredentials: false,
});

export const noteAPI = {
  pushNotes(notes: Array<NoteType>) {
    return instance.post<ResponseType<{ notes: NoteType }>>(
      'http://localhost:5000/api/update_json',
      { notes },
    );
  },
  getNotes() {
    return instance.get<GetNotesResponseType>('read_json');
  },
};

type GetNotesResponseType = {
  status: number;
  message: string;
  notes: Array<NoteType>;
};

export type ResponseType<D = {}> = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors: Array<string>;
  data: D;
};
