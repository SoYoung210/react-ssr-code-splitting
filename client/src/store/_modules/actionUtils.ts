import { createAction, Action } from 'redux-actions';
import { of, Observable } from 'rxjs';
import { switchMap,map, catchError, flatMap, merge } from 'rxjs/operators';
import { AjaxError } from 'rxjs/ajax';
import { startLoading, finishLoading } from './loading';
import { Epic, ofType } from 'redux-observable';
import { HttpStatusCode } from '@/api';

export interface Sample {
  id: number,
  name: string,
}

export const createAsyncAction = <T>(type: string) =>  {
  const FETCH = `${type}/FETCH`
  const SUCCESS = `${type}/SUCCESS`
  const FAILURE = `${type}/FAILURE`

  return {
    FETCH,
    SUCCESS,
    FAILURE,
    fetch: createAction<T>(FETCH),
    success: createAction(SUCCESS),
    failure: createAction(FAILURE),
  }
}

export const createAsyncEpic = (
  type: string,
  req: (payload: any) => Observable<any>
) => {
  const actions = createAsyncAction(type);

  const epic: Epic = (action$: any) => {
    const startLoadingEpic = action$.pipe(
      ofType(actions.FETCH),
      map(() => {
        return startLoading({
          type,
          status: HttpStatusCode.LOADING
        })}
      )
    );

    const responseEpic = action$.pipe(
      ofType(actions.FETCH),
      switchMap((action: Action<any>) => {
        const payload = (action && action.payload) || null;

        return req(payload);
      }),
      flatMap(response => {
        return of(
          actions.success(response),
          finishLoading({
            type,
            status: HttpStatusCode.OK
          })
        );
      }),
      catchError((error: AjaxError) => {
        return of(
          actions.failure(error),
          finishLoading({
            type,
            status: error.status
          })
        );
      })
    )
    return startLoadingEpic.pipe(merge(responseEpic));
  };

  return epic;
};
