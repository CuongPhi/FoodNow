/*
 * @Author: An Nguyen 
 * @Date: 2018-12-19 23:47:21 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-19 23:49:09
 */
import * as types from '../type';

export const updatePass = data => ({
  type: types.updatePass.TYPE,
  data,
});

export const updatePassSuccess = () => ({
  type: types.updatePass.SUCCESS,
});

export const updatePassFail = err => ({
  type: types.updatePass.FAILURE,
  err,
});
