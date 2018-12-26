/*
 * @Author: An Nguyen 
 * @Date: 2018-12-14 01:29:35 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-17 01:29:18
 */
import * as type from '../type';

export const getUserInfo = () => ({
  type: type.userInfo.TYPE,
});

export const getUserSuccess = res => ({
  type: type.userInfo.SUCCESS,
  res,
});

export const getUserFail = res => ({
  type: type.userInfo.FAILURE,
  res,
});

export const changeText = (value, types) => ({
  type: types,
  value,
});
