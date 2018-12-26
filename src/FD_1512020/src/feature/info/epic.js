/*
 * @Author: An Nguyen 
 * @Date: 2018-12-02 15:30:23 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-14 01:28:34
 */
import { ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import * as actions from './action';
import * as types from '../type';

const networkEpic = action$ =>
  action$.pipe(
    ofType(types.network.TYPE),
    mergeMap(action => of(action.isConnected).pipe(map(res => actions.setConnection(res))))
  );
export default networkEpic;
