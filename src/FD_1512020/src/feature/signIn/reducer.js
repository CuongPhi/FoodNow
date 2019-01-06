/*
 * @Author: An Nguyen 
 * @Date: 2018-11-23 01:10:31 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2019-01-06 19:53:19
 */
import _ from 'lodash';
import * as types from '../type';

const initialState = {
  loading: false,
  token: '',
  login: false,
};
export default function signIn(prevState = initialState, action) {
  switch (action.type) {
    case types.signIn.TYPE:
      return { loading: true };
    case types.signIn.SUCCESS: {
      return {
        loading: false,
        token: _.get(action, 'data.response.token', ''),
        login: true,
      };
    }
    case types.signIn.FAILURE:
      return { loading: false, token: undefined, login: false };
    case types.userInfo.FAILURE:
      return { ...prevState, token: undefined };
    case types.signOut:
      return {
        loading: false,
        token: '',
        login: false,
        signOut: true,
      };
    default:
      return prevState;
  }
}
