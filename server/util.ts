import { MatchedRoute, matchRoutes } from 'react-router-config';
import { applyMiddleware,compose, createStore, Store } from "redux";
import { createEpicMiddleware } from 'redux-observable';
import root from 'window-or-global';

import { routes } from '@/routes/controller';
import epics from '@/store/epics';
import reducers from '@/store/reducers';


export const loadBranchData = (pathname: string) => (store: Store) => {
  // Get exact MatchedRoute.
  const branch: Array<MatchedRoute<any>> = matchRoutes(routes, pathname);

  const promises = branch.map(({ route }) => (
    route.loadData ? route.loadData(store) : Promise.resolve(null)
  ));

  return Promise.all(promises);
};

export const getStore = () => {
  const epicMiddleware = createEpicMiddleware();
  const composeEnhancers = (root as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const appStore = createStore(reducers, composeEnhancers(applyMiddleware(epicMiddleware)));
  epicMiddleware.run(epics);

  return appStore;
};
