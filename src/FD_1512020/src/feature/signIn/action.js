/*
 * @Author: An Nguyen 
 * @Date: 2018-11-23 01:13:17 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-20 00:42:36
 */
import * as types from '../type';

export const signIn = (email, password) => ({
  type: types.signIn.TYPE,
  payload: { email, password },
});

export function signInSuccesss(data) {
  return {
    type: types.signIn.SUCCESS,
    data,
  };
}

export function signInFail(error) {
  return {
    type: types.signIn.FAILURE,
    error,
  };
}

export function signOut() {
  return {
    type: types.signOut,
  };
}
