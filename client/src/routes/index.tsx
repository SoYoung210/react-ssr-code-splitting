import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { User } from './User';

const EntryRoute: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={User}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default EntryRoute;
