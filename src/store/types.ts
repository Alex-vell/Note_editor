export type DataType = {
  notes: Array<NoteType>;
  currentNotes: Array<NoteType>;
  currentTag: string;
};

export type TagType = {
  id: string;
  title: string;
  noteId: string;
};

export type NoteType = {
  id: string;
  title: string;
  tags: Array<TagType>;
};
