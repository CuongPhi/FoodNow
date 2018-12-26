/*
 * @Author: An Nguyen 
 * @Date: 2018-12-18 01:32:44 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-19 01:55:23
 */
import { of } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, map, catchError, filter, takeUntil } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import * as _ from 'lodash';
import * as types from '../type';
import * as actionApi from './action';
import * as actionAdd from '../address/action';
import * as api from '../const';

export const updateInfoEpic = (action$, state$) =>
  action$.pipe(
    ofType(types.updateInfo.TYPE),
    filter(() => state$.value.info.isConnected),
    mergeMap(action =>
      ajax
        .post(api.updateinfo, _.get(action, 'payload', {}), {
          Authorization: api.token(_.get(state$, 'value.signIn.token', '')),
        })
        .pipe(
          map(res => actionApi.updateInfoSuccess(res)),
          catchError(err => of(actionApi.updateInfoFail(err))),
          mergeMap(ac => of(ac, actionAdd.getWard(ac))),
          takeUntil(
            action$.pipe(
              ofType(
                types.updateInfo.TYPE,
                types.changeInfo.USERNAME,
                types.changeInfo.EMAIL,
                types.changeInfo.PHONE,
                types.changeInfo.STREET,
                types.changeInfo.DISTRICT,
                types.changeInfo.WARD
              )
            )
          )
        )
    )
  );

export const updateAvatar = (action$, state$) =>
  action$.pipe(
    ofType(types.updateAvatar.TYPE),
    filter(() => state$.value.info.isConnected),
    mergeMap(action =>
      ajax
        .put(api.updateavatar, _.get(action, 'data', null), {
          Authorization: api.token(_.get(state$, 'value.signIn.token', '')),
        })
        .pipe(
          map(res => actionApi.updateAvatarSuccess(res)),
          catchError(err => of(actionApi.updateAvatarFail(err))),
          mergeMap(ac => of(ac, { type: types.userInfo.TYPE }))
        )
    )
  );
