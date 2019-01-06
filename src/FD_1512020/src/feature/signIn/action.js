/*
 * @Author: An Nguyen 
 * @Date: 2018-11-23 01:13:17 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2019-01-06 20:15:52
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

export function forgotPassword(email) {
  return {
    type: types.forgotPassword.TYPE,
    email,
  };
}

export function forgotPasswordSuccess(res) {
  return {
    type: types.forgotPassword.SUCCESS,
    res,
  };
}
export function forgotPasswordFail(err) {
  return {
    type: types.forgotPassword.FAILURE,
    err,
  };
}

export function signUp(email, pass) {
  return {
    type: types.signUp.TYPE,
    email,
    pass,
  };
}

export function signUpSuccess(res) {
  return {
    type: types.signUp.SUCCESS,
    res,
  };
}
export function signUpFail(err) {
  return {
    type: types.signUp.FAILURE,
    err,
  };
}
