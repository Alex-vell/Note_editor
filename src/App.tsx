import React, { FC } from 'react';

import s from './App.module.scss';
import { NoteList } from './pages/NoteList/NoteList';

const App: FC = () => (
  <div className={s.App}>
    <NoteList />
  </div>
);

export default App;
