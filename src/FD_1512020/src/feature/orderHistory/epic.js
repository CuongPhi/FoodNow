/*
 * @Author: An Nguyen 
 * @Date: 2019-01-02 22:20:35 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2019-01-06 14:01:02
 */
import { ofType } from 'redux-observable';
import { mergeMap, map, catchError, filter, takeUntil, concatMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import _ from 'lodash';
import * as types from '../type';
import * as api from '../const';
import * as actions from './action';

export const orderHistoryEpic = (action$, state$) =>
  action$.pipe(
    ofType(types.orderHistory.TYPE),
    filter(() => state$.value.info.isConnected),
    mergeMap(() =>
      ajax
        .getJSON(api.orderHistory, {
          Authorization: api.token(_.get(state$, 'value.signIn.token', '')),
        })
        .pipe(
          map(res => actions.getAllSuccess(res)),
          catchError(err => of(actions.getAllFail(err))),
          takeUntil(action$.pipe(ofType(types.orderHistory.TYPE)))
        )
    )
  );

export const orderDetail = (action$, state$) =>
  action$.pipe(
    ofType(types.orderDetail.TYPE),
    filter(() => state$.value.info.isConnected),
    mergeMap(action =>
      ajax
        .getJSON(api.orderDetails(_.get(action, 'id', '')), {
          Authorization: api.token(_.get(state$, 'value.signIn.token', '')),
        })
        .pipe(
          concatMap(res =>
            ajax.getJSON(api.restaurant(_.get(res, 'order.idRestaurant', ''))).pipe(
              map(newRes => actions.getDetailSuccess({ order: res, restaurant: newRes })),
              catchError(err => of(actions.getDetailFail(err)))
            )
          ),
          catchError(err => of(actions.getDetailFail(err))),
          takeUntil(action$.pipe(ofType(types.orderDetail.TYPE)))
        )
    )
  );
