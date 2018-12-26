/*
 * @Author: An Nguyen 
 * @Date: 2018-12-14 01:36:01 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-18 01:36:40
 */
import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import * as _ from 'lodash';
import * as types from '../type';
import * as actions from './action';
import * as api from '../const';

const getUserInfo = (action$, state$) =>
  action$.pipe(
    ofType(types.userInfo.TYPE),
    mergeMap(() =>
      ajax
        .getJSON(api.getinfo, {
          Authorization: api.token(_.get(state$, 'value.signIn.token', '')),
        })
        .pipe(
          map(res => actions.getUserSuccess(res)),
          catchError(err => of(actions.getUserFail(err)))
        )
    )
  );
export default getUserInfo;
