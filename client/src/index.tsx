import React from 'react';
import ReactDOM from 'react-dom';
import './normalize.pcss';
import EntryRoute from './routes';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <EntryRoute />
  </BrowserRouter>
  , document.getElementById('root'));

