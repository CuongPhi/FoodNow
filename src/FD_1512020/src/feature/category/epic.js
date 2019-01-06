/*
 * @Author: An Nguyen 
 * @Date: 2018-12-20 01:17:55 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2019-01-06 18:13:00
 */
import { ofType } from 'redux-observable';
import { mergeMap, map, catchError, filter, takeUntil } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import _ from 'lodash';
import * as types from '../type';
import * as api from '../const';
import * as actions from './action';

export const categoryEpic = (action$, state$) =>
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

export const getFoodCategory = (action$, state$) =>
  action$.pipe(
    ofType(types.getFood.TYPE),
    filter(() => state$.value.info.isConnected),
    mergeMap(action =>
      ajax.getJSON(api.getFood(_.get(action, 'item.name', ''))).pipe(
        map(res => actions.getFoodSuccess({ res, item: action.item })),
        catchError(err => of(actions.getFoodFail(err)))
      )
    )
  );
