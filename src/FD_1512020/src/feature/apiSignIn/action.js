/*
 * @Author: An Nguyen 
 * @Date: 2018-11-05 01:02:45 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-11-05 01:54:44
 */
import * as types from './type';

// export const getAllDistrict = () => ({
//   type: types.DISTRICT_GETALL,
//   payload: {
//     request: {
//       url: '/district/getAll',
//     },
//   },
// });

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
