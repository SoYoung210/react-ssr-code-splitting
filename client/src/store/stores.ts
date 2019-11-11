import "regenerator-runtime/runtime";
import { createEpicMiddleware } from 'redux-observable';
import { applyMiddleware, compose, createStore } from 'redux';
import root from 'window-or-global';
import epics from '@/store/epics'
import reducers from '@/store/reducers';

export default (() => {
  const preloadedState = root.__PRELOADED_STATE__;

  delete root.__PRELOADED_STATE__;

  const epicMiddleware = createEpicMiddleware();
  const composeEnhancers = (root as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    reducers, preloadedState, composeEnhancers(applyMiddleware(epicMiddleware))
  );
  epicMiddleware.run(epics);

  return store;
})();
