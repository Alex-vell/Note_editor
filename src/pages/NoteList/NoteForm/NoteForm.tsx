import React, { ChangeEvent, FC } from 'react';

import CustomButton from '../../../components/customButton/CustomButton';
import CustomInputText from '../../../components/customInput/CustomInputText';
import s from '../NoteList.module.scss';

type NoteFormType = {
  OnChangeNote: (event: ChangeEvent<HTMLInputElement>) => void;
  title: string;
  addNote: () => void;
  onChangeFilter: (event: ChangeEvent<HTMLInputElement>) => void;
  filterTitle: string;
  filterNotes: () => void;
  clearFilter: () => void;
};

export const NoteForm: FC<NoteFormType> = ({
  OnChangeNote,
  title,
  addNote,
  onChangeFilter,
  filterTitle,
  filterNotes,
  clearFilter,
}) => (
  <div className={s.fieldBlock}>
    <CustomInputText placeholder="Add note" onChange={OnChangeNote} value={title} />
    <CustomButton onClick={addNote} disabled={!title.length}>
      Add note
    </CustomButton>

    <CustomInputText
      onChange={onChangeFilter}
      value={filterTitle}
      placeholder="Search to hashtag"
    />
    <div className={s.filterButtons}>
      <CustomButton
        className={s.btn}
        onClick={filterNotes}
        disabled={!filterTitle.length}
      >
        Filter
      </CustomButton>
      <CustomButton className={s.btn} onClick={clearFilter}>
        Clear filter
      </CustomButton>
    </div>
  </div>
);
