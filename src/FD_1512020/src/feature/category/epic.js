/*
 * @Author: An Nguyen 
 * @Date: 2018-12-20 01:17:55 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-20 01:23:40
 */
import { ofType } from 'redux-observable';
import { mergeMap, map, catchError, filter, takeUntil } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import * as types from '../type';
import * as api from '../const';
import * as actions from './action';

const categoryEpic = (action$, state$) =>
  action$.pipe(
    ofType(types.category.TYPE),
    filter(() => state$.value.info.isConnected),
    mergeMap(() =>
      ajax.getJSON(api.category).pipe(
        map(res => actions.categorySuccess(res)),
        catchError(err => of(actions.categoryFail(err))),
        takeUntil(action$.pipe(ofType(types.category.TYPE)))
      )
    )
  );
export default categoryEpic;
