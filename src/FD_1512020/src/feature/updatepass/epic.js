/*
 * @Author: An Nguyen 
 * @Date: 2018-12-19 23:49:36 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-19 23:56:24
 */
import { ofType } from 'redux-observable';
import { mergeMap, map, catchError, filter, takeUntil } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import * as _ from 'lodash';
import * as types from '../type';
import * as api from '../const';
import * as actions from './action';

const updatePassword = (action$, state$) =>
  action$.pipe(
    ofType(types.updatePass.TYPE),
    filter(() => state$.value.info.isConnected),
    mergeMap(action =>
      ajax
        .post(
          api.updatePassword,
          { password: action.data },
          {
            Authorization: api.token(_.get(state$, 'value.signIn.token', '')),
          }
        )
        .pipe(
          map(() => actions.updatePassSuccess()),
          catchError(err => of(actions.updatePassFail(err))),
          takeUntil(action$.pipe(ofType(types.updatePass.TYPE)))
        )
    )
  );

export default updatePassword;
