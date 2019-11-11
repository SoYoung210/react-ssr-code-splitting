import React from 'react';
import { loadableReady } from '@loadable/component';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { hydrate } from 'react-dom';
import './normalize.pcss';
import EntryRoute from './routes';
import store from '@/store/stores';

loadableReady(() => {
  const root = document.getElementById('root');
  hydrate(
    <Provider store={ store }>
      <BrowserRouter>
        <EntryRoute />
      </BrowserRouter>
    </Provider>,
    root
  );
});
