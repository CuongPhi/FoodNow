/*
 * @Author: An Nguyen 
 * @Date: 2018-12-26 22:08:11 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-26 22:10:40
 */

import * as types from '../type';

export const get = id => ({
  type: types.merchant.TYPE,
  id,
});

export const getSuccess = data => ({
  type: types.merchant.SUCCESS,
  data,
});

export const getFail = err => ({
  type: types.merchant.FAILURE,
  err,
});
