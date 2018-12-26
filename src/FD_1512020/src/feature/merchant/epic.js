/*
 * @Author: An Nguyen 
 * @Date: 2018-12-26 22:19:14 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-26 22:44:59
 */
import { ofType } from 'redux-observable';
import { mergeMap, map, catchError, filter } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import _ from 'lodash';
import * as types from '../type';
import * as api from '../const';
import * as actions from './action';

const getMerchantEpic = (action$, state$) =>
  action$.pipe(
    ofType(types.merchant.TYPE),
    filter(() => state$.value.info.isConnected),
    mergeMap(action =>
      ajax.getJSON(api.restaurant(_.get(action, 'id', ''))).pipe(
        map(res => actions.getSuccess(res)),
        catchError(err => of(actions.getFail(err)))
      )
    )
  );

export default getMerchantEpic;
