/*
 * @Author: An Nguyen 
 * @Date: 2018-11-23 01:19:09 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2019-01-06 20:22:44
 */
import { of } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, map, catchError, filter } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import _ from 'lodash';
import * as types from '../type';
import * as actionApi from './action';
import * as api from '../const';

export const signInEpic = (action$, state$) =>
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

export const forgotPassEpic = (action$, state$) =>
  action$.pipe(
    ofType(types.forgotPassword.TYPE),
    filter(() => state$.value.info.isConnected),
    mergeMap(action =>
      ajax.post(api.forgotPassword, { email: action.email }).pipe(
        map(res => actionApi.forgotPasswordSuccess(res)),
        catchError(err => of(actionApi.forgotPasswordFail(_.get(err, 'xhr.response', err))))
      )
    )
  );

export const signUpEpic = (action$, state$) =>
  action$.pipe(
    ofType(types.signUp.TYPE),
    filter(() => state$.value.info.isConnected),
    mergeMap(action =>
      ajax.post(api.signUp, { email: action.email, password: action.password }).pipe(
        map(res => actionApi.signUpSuccess(res)),
        catchError(err => of(actionApi.signUpFail(_.get(err, 'xhr._response', err))))
      )
    )
  );
