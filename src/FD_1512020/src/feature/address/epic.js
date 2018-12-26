/*
 * @Author: An Nguyen 
 * @Date: 2018-12-17 01:29:30 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-19 01:56:15
 */
import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import * as _ from 'lodash';
import * as types from '../type';
import * as actions from './action';
import * as api from '../const';

export const getDistrict = action$ =>
  action$.pipe(
    ofType(types.district.TYPE),
    mergeMap(() =>
      ajax.getJSON(api.getdistrict).pipe(
        map(res => actions.getDistrictSuccess(res)),
        catchError(err => of(actions.getDistrictFail(err))),
        mergeMap(ac => of(ac, actions.getWard()))
      )
    )
  );

export const getWard = (action$, state$) =>
  action$.pipe(
    ofType(types.ward.TYPE),
    mergeMap(action =>
      ajax.getJSON(api.getWard(_.get(state$, 'value.userInfo.address.idDistrict', ''))).pipe(
        map(res => actions.getWardSuccess(res)),
        catchError(err => of(actions.getWardFail(err)))
      )
    )
  );
