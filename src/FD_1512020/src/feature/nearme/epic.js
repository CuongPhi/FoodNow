import { ofType } from 'redux-observable';
import { mergeMap, map, catchError, filter, takeUntil } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import _ from 'lodash';
import * as types from '../type';
import * as api from '../const';
import * as actions from './action';

const getNearMeEpic = (action$, state$) =>
  action$.pipe(
    ofType(types.nearMe.TYPE),
    filter(() => state$.value.info.isConnected),
    mergeMap(action =>
      ajax.getJSON(api.nearme(_.get(action, 'lat', 0), _.get(action, 'long', 0))).pipe(
        map(res => actions.getAllSuccess(res)),
        catchError(err => of(actions.getAllFail(err))),
        takeUntil(action$.pipe(ofType(types.nearMe.TYPE)))
      )
    )
  );

export default getNearMeEpic;
