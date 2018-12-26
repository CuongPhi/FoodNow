/*
 * @Author: An Nguyen 
 * @Date: 2018-12-02 16:27:46 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-26 22:40:23
 */

import { ofType } from 'redux-observable';
import { mergeMap, map, catchError, filter, takeUntil, debounceTime } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import _ from 'lodash';
import * as types from '../type';
import * as api from '../const';
import * as actions from './actions';

export const getAllMerchantEpic = (action$, state$) =>
  action$.pipe(
    ofType(types.merchantList.TYPE),
    filter(() => state$.value.info.isConnected),
    mergeMap(action =>
      ajax
        .getJSON(
          api.restaurantGetAll(
            action.count,
            action.id ? action.id : _.get(state$, 'value.merchantlist.page', 1)
          )
        )
        .pipe(
          map(res => actions.getAllSuccess(res)),
          catchError(err => of(actions.getAllFail(err))),
          takeUntil(action$.pipe(ofType(types.merchantList.TYPE, types.merchantSearch.TYPE)))
        )
    )
  );

export const searchMerchantEpic = (action$, state$) =>
  action$.pipe(
    ofType(types.merchantSearch.TYPE),
    filter(() => _.get(state$, 'value.info.isConnected', false)),
    debounceTime(300),
    mergeMap(action =>
      ajax
        .getJSON(api.merchantSearch(_.get(action, 'query', '')))
        .pipe(
          map(
            res => actions.searchSuccess(res),
            catchError(err => of(actions.searchFail(err))),
            takeUntil(action$.pipe(ofType(types.merchantSearch.TYPE)))
          )
        )
    )
  );

export const refreshAll = (action$, state$) =>
  action$.pipe(
    ofType(types.restaurantRefresh),
    filter(() => !_.get(state$, 'value.merchantlist.loading', false)),
    mergeMap(() => of(actions.getAll(_.get(state$, 'value.merchantlist.count', 7))))
  );
