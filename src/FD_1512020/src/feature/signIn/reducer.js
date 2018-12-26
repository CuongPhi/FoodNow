/*
 * @Author: An Nguyen 
 * @Date: 2018-11-23 01:10:31 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-20 00:44:19
 */
import * as types from '../type';
import * as utils from '../../ultilies/Utils';

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
      const data = utils.getSafe(action.data.response);
      return {
        loading: false,
        token: utils.getSafe(data.token),
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
