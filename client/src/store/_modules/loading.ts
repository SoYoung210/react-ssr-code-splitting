import { createAction, handleActions } from 'redux-actions';

import { HttpStatusCode } from '@/api';

const START = 'loading/START';
const FINISH = 'loading/FINISH';

export const startLoading = createAction(START);
export const finishLoading = createAction(FINISH);

const initialState = {};

export type loadingState = {
  [index: string]: HttpStatusCode;
};

const reducer = {
  [START]: (
    state: loadingState,
    action: any
  ): loadingState => ({
    ...state,
    [action.payload.type]: action.payload.status
  }),
  [FINISH]: (
    state: loadingState,
    action: any
  ): loadingState => ({
    ...state,
    [action.payload.type]: action.payload.status
  })
};

export const loadingReducer = handleActions(reducer, initialState);
