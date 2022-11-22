import React from 'react';

import backed from '../../../assets/svg/backed.svg';
import { EditableDiv } from '../../../components/EditableDiv/EditableDiv';
import { TagType } from '../../../store/types';
import s from '../NoteList.module.scss';

type NoteType = {
  id: string;
  title: string;
  tags: Array<TagType>;
  removeNoteCallback: (id: string) => void;
  changeNoteCallback: (id: string, title: string, tags: TagType) => void;
};

export const Note: React.FC<NoteType> = ({
  id,
  title,
  tags,
  removeNoteCallback,
  changeNoteCallback,
}) => {
  const tag: TagType = {
    id,
    title,
    noteId: id,
  };

  return (
    <div className={s.note} key={id}>
      <div className={s.fieldContainer}>
        <div className={s.editSpan}>
          <EditableDiv
            tag={tag}
            id={id}
            value={title}
            onChangeText={changeNoteCallback}
          />
        </div>

        <div
          className={s.removeBtnBlock}
          role="presentation"
          onClick={() => removeNoteCallback(id)}
        >
          <img src={backed} alt="delete" />
        </div>
      </div>
      <div className={s.tags}>
        {tags.map(tg => (
          <span className={s.tag} key={tg.id}>
            {tg.title}
          </span>
        ))}
      </div>
    </div>
  );
};
