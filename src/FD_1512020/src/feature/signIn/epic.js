/*
 * @Author: An Nguyen 
 * @Date: 2018-11-23 01:19:09 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-16 00:14:13
 */
import { of } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, map, catchError, filter } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import * as types from '../type';
import * as actionApi from './action';
import * as api from '../const';

const signInEpic = (action$, state$) =>
  action$.pipe(
    ofType(types.signIn.TYPE),
    filter(() => state$.value.info.isConnected),
    mergeMap(action =>
      ajax.post(api.login, action.payload, api.contentTypeJson).pipe(
        map(res => actionApi.signInSuccesss(res)),
        catchError(err => of(actionApi.signInFail(err)))
      )
    )
  );
export default signInEpic;
