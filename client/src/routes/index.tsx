import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { routes, RouteBranch } from './controller';

export default () => (
  <Switch>
    {
      routes.map((route, i) => (
        <RenderWithSubRoute key={ i } { ...route } />
      ))
    }
  </Switch>
);

const RenderWithSubRoute = (route: RouteBranch) => {
  return (
    <Route 
      path={ route.path }
      render={ props => (
        <route.component { ...props } routes={ route.routes } />
      ) }
    />
  );
};
