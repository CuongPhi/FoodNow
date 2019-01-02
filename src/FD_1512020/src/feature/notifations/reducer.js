/*
 * @Author: An Nguyen 
 * @Date: 2018-12-23 18:32:29 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-30 19:31:16
 */
import _ from 'lodash';
import * as types from '../type';

export const CREATE_NOTIF = 'CREATE_NOTIF';
export const IS_GET_NOTIF = 'IS_GET_NOTIF';

const initialState = {
  loading: false,
  notifications: [],
  getnotif: true,
};

export default function notifs(prevState = initialState, action) {
  switch (action.type) {
    case types.notif.TYPE:
      return { ...prevState, loading: true };
    case types.notif.SUCCESS:
      return {
        ...prevState,
        loading: false,
        notifications: _.unionBy(action.res, prevState.notifications, 'id'),
      };
    case types.notif.FAILURE:
      return { ...prevState, loading: false, notifications: [] };
    case CREATE_NOTIF: {
      const ns = prevState.notifications;
      const n = ns.find(value => value.id === action.id);
      n.done = true;
      return {
        ...prevState,
        notifications: _.unionBy([n], prevState.notifications, 'id'),
      };
    }
    case IS_GET_NOTIF:
      return { ...prevState, getnotif: action.res };
    default:
      return prevState;
  }
}
