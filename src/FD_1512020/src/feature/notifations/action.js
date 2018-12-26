/*
 * @Author: An Nguyen 
 * @Date: 2018-12-23 18:39:38 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-24 22:44:56
 */
import * as types from '../type';
import { CREATE_NOTIF, IS_GET_NOTIF } from './reducer';

export const getAll = () => ({
  type: types.notif.TYPE,
});

export const getAllSuccess = res => ({
  type: types.notif.SUCCESS,
  res,
});

export const getAllFail = () => ({
  type: types.notif.FAILURE,
});

export const pushNotif = id => ({
  type: CREATE_NOTIF,
  id,
});

export const isGetNotif = res => ({
  type: IS_GET_NOTIF,
  res,
});
