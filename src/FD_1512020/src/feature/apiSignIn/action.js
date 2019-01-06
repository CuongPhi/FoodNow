/*
 * @Author: An Nguyen 
 * @Date: 2018-11-05 01:02:45 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2019-01-06 19:23:09
 */
import * as types from './type';

export const signIn = (email, password) => ({
  type: types.SIGN_IN,
  payload: {
    request: {
      url: '/login',
      method: 'post',
      data: { email, password },
    },
  },
});

export const signUp = (email, password) => ({
  type: types.SIGN_UP,
  payload: {
    request: {
      url: '/register',
      method: 'post',
      data: { email, password },
    },
  },
});

export const forgotPassword = email => ({
  type: types.FORGOT_PASSWORD,
  payload: {
    request: {
      url: '/forgetPassword',
      method: 'post',
      data: { email },
    },
  },
});
