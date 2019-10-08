import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { User } from './User';
import { Provider } from 'react-redux';
import store from '@/store/stores'
import { Org } from './Org';

const EntryRoute: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route path='/user' component={User} />
          <Route path='/org' component={Org} />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default EntryRoute;
