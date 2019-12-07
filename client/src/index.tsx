import { loadableReady } from '@loadable/component';

import React from 'react';
import { hydrate } from 'react-dom';
import './normalize.pcss';
import EntryRoute from './routes';
import { BrowserRouter } from 'react-router-dom';

loadableReady(() => {
  const root = document.getElementById('root');
  hydrate(
    <BrowserRouter>
      <EntryRoute />
    </BrowserRouter>,
    root
  );
});