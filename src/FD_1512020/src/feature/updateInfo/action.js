/*
 * @Author: An Nguyen 
 * @Date: 2018-12-18 01:30:25 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-19 01:03:26
 */
import * as types from '../type';

export const updateInfo = payload => ({
  type: types.updateInfo.TYPE,
  payload,
});

export const updateInfoSuccess = data => ({
  type: types.updateInfo.SUCCESS,
  data,
});

export const updateInfoFail = err => ({
  type: types.updateInfo.FAILURE,
  err,
});

export const updateAvatar = data => ({
  type: types.updateAvatar.TYPE,
  data,
});

export const updateAvatarSuccess = data => ({
  type: types.updateAvatar.SUCCESS,
  data,
});

export const updateAvatarFail = err => ({
  type: types.updateAvatar.FAILURE,
  err,
});
