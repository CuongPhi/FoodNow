/*
 * @Author: An Nguyen 
 * @Date: 2018-12-23 18:47:32 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-23 19:17:55
 */
import { of } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, map, catchError, filter, takeUntil } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import * as _ from 'lodash';
import * as types from '../type';
import * as actionApi from './action';
import * as api from '../const';

const loadNotifEpic = (action$, state$) =>
  action$.pipe(
    ofType(types.notif.TYPE),
    filter(() => state$.value.info.isConnected),
    mergeMap(() =>
      ajax
        .getJSON(api.notifs, {
          Authorization: api.token(_.get(state$, 'value.signIn.token', '')),
        })
        .pipe(
          map(res => actionApi.getAllSuccess(res)),
          catchError(err => of(actionApi.getAllFail(err))),
          takeUntil(action$.pipe(ofType(types.notif.TYPE)))
        )
    )
  );

export default loadNotifEpic;
