/*
 * @Author: An Nguyen 
 * @Date: 2019-01-02 02:32:53 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2019-01-02 19:53:46
 */
import { ofType } from 'redux-observable';
import { mergeMap, map, catchError, filter, takeUntil } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import _ from 'lodash';
import * as types from '../type';
import * as api from '../const';
import * as actions from './action';

const postOrderEpic = (action$, state$) =>
  action$.pipe(
    ofType(types.postOrder.TYPE),
    filter(() => state$.value.info.isConnected),
    mergeMap(action =>
      ajax
        .post(api.postOrder, action.payload, {
          Authorization: api.token(_.get(state$, 'value.signIn.token', '')),
          'Content-Type': 'application/json',
        })
        .pipe(
          map(res => actions.postOrderSuccess(res)),
          catchError(err => of(actions.postOrderFail(err))),
          takeUntil(action$.pipe(ofType(types.postOrder.TYPE)))
        )
    )
  );

export default postOrderEpic;
