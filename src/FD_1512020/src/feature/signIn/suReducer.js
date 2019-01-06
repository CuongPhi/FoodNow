/*
 * @Author: An Nguyen 
 * @Date: 2019-01-06 20:11:29 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2019-01-06 20:27:40
 */
import _ from 'lodash';
import * as types from '../type';

const initialState = {
  loading: false,
  err: false,
};
export default function signUp(prevState = initialState, action) {
  switch (action.type) {
    case types.signUp.TYPE:
      return { loading: true, err: false };
    case types.signUp.SUCCESS: {
      return { loading: false, err: false, msg: action.res };
    }
    case types.signUp.FAILURE: {
      let err = '';
      try {
        const o = JSON.parse(action.err);
        err = _.get(o, 'msg', '');
      } catch (error) {
        console.log(err);
      }
      return { loading: false, err: true, msg: err };
    }
    default:
      return prevState;
  }
}
