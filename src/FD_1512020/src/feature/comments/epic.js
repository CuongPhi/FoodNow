/*
 * @Author: An Nguyen 
 * @Date: 2018-12-30 15:04:23 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-30 17:14:39
 */
import { ofType } from 'redux-observable';
import { mergeMap, map, catchError, filter } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import _ from 'lodash';
import * as types from '../type';
import * as api from '../const';
import * as actions from './action';

export const getAllCmtEpic = (action$, state$) =>
  action$.pipe(
    ofType(types.loadAllCmt.TYPE),
    filter(() => state$.value.info.isConnected),
    mergeMap(action =>
      ajax.getJSON(api.getAllComment(_.get(action, 'id', ''))).pipe(
        map(res => actions.getSuccess(res)),
        catchError(err => of(actions.getFail(err)))
      )
    )
  );

export const sendCmtEpic = (action$, state$) =>
  action$.pipe(
    ofType(types.postCmt.TYPE),
    filter(
      () => state$.value.info.isConnected && _.get(state$, 'value.userInfo.userName', '').length > 0
    ),
    mergeMap(action =>
      ajax
        .post(api.postComment, {
          name: _.get(state$, 'value.userInfo.userName', ''),
          idRestaurant: _.get(action, 'payload.id'),
          content: _.get(action, 'payload.content'),
        })
        .pipe(
          map(res => actions.postCmtSuccess(res)),
          catchError(err => of(actions.postCmtFail(err))),
          mergeMap(ac => of(ac, actions.get(_.get(action, 'payload.id'))))
        )
    )
  );
