/*
 * @Author: An Nguyen 
 * @Date: 2019-01-06 19:50:34 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2019-01-06 20:04:44
 */
import _ from 'lodash';
import * as types from '../type';

const initialState = {
  loading: false,
  err: false,
};
export default function password(prevState = initialState, action) {
  switch (action.type) {
    case types.forgotPassword.TYPE:
      return { loading: true, err: false };
    case types.forgotPassword.SUCCESS: {
      return { loading: false, err: false, msg: action.res };
    }
    case types.forgotPassword.FAILURE:
      return { loading: false, err: true, msg: _.get(action, 'res.msg', '') };
    default:
      return prevState;
  }
}
