import "regenerator-runtime/runtime";
import { createEpicMiddleware } from 'redux-observable';
import { applyMiddleware, compose, createStore } from 'redux';
import epics from '@/store/epics'
import reducers from '@/store/reducers';

export default (() => {
  const epicMiddleware = createEpicMiddleware();
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducers, composeEnhancers(applyMiddleware(epicMiddleware)));

  epicMiddleware.run(epics);

  return store;
})();
