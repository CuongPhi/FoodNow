/*
 * @Author: An Nguyen 
 * @Date: 2018-12-30 15:03:37 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-30 16:29:04
 */

import * as types from '../type';

export const get = id => ({
  type: types.loadAllCmt.TYPE,
  id,
});

export const getSuccess = data => ({
  type: types.loadAllCmt.SUCCESS,
  data,
});

export const getFail = err => ({
  type: types.loadAllCmt.FAILURE,
  err,
});

export const postCmt = payload => ({
  type: types.postCmt.TYPE,
  payload,
});

export const postCmtSuccess = msg => ({
  type: types.postCmt.SUCCESS,
  msg,
});

export const postCmtFail = err => ({
  type: types.postCmt.FAILURE,
  err,
});
