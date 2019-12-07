import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
import { Provider } from 'react-redux';
import store from '@/store/stores'

const User = loadable(() => import(/* webpackChunkName: "user"*/ './User'), {ssr: false})
const Org = loadable(() => import(/* webpackChunkName: "org"*/ './Org'))

export default () => {
  return (
    <Provider store={ store }>
      <Switch>
        <Route path='/user' component={User} />
        <Route path='/org' component={Org} />
      </Switch>
    </Provider>
  );
}
