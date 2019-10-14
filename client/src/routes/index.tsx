import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
import { Provider } from 'react-redux';
import store from '@/store/stores'
// import User from './User';
// import Org from './Org';
const User = loadable(() => import(/* webpackChunkName: "user"*/ './User'))
const Org = loadable(() => import(/* webpackChunkName: "org"*/ './Org'))

const EntryRoute: React.FC = () => {
  return (
      <Provider store={store}>
        <Switch>
          <Route path='/user' component={User} />
          <Route path='/org' component={Org} />
        </Switch>
      </Provider>
  );
}

export default EntryRoute;
