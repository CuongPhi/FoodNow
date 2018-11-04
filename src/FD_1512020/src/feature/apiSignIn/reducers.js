/*
 * @Author: An Nguyen 
 * @Date: 2018-11-04 17:22:43 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-11-05 01:51:35
 */
import * as types from './type';

const SUCCESS = '_SUCCESS';
const FAIL = '_FAIL';
const initialState = {
  loading: false,
  isSuccess: false,
  data: {},
};
export default function apiSignIn(prevState = initialState, action) {
  switch (action.type) {
    case types.SIGN_IN:
      return { loading: true, type: types.SIGN_IN };
    case types.SIGN_IN + SUCCESS:
      return {
        data: action.payload.data,
        loading: false,
        isSuccess: true,
        type: types.SIGN_IN,
      };
    case types.SIGN_IN + FAIL:
      return {
        loading: false,
        isSuccess: false,
        error: action.error.response,
        type: types.SIGN_IN,
      };
    case types.SIGN_UP:
      return { loading: true, type: types.SIGN_UP };
    case types.SIGN_UP + SUCCESS:
      return { loading: false, isSuccess: true, data: action.payload.data, type: types.SIGN_UP };
    case types.SIGN_UP + FAIL:
      return {
        loading: false,
        isSuccess: false,
        error: action.error.response,
        type: types.SIGN_UP,
      };
    case types.FORGOT_PASSWORD:
      return { loading: true, type: types.FORGOT_PASSWORD };
    case types.FORGOT_PASSWORD + SUCCESS:
      return {
        loading: false,
        isSuccess: true,
        data: action.payload.data,
        type: types.FORGOT_PASSWORD,
      };
    case types.FORGOT_PASSWORD + FAIL:
      return {
        loading: false,
        isSuccess: false,
        error: action.error.response,
        type: types.FORGOT_PASSWORD,
      };
    default:
      return prevState;
  }
}
