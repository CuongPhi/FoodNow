/*
 * @Author: An Nguyen 
 * @Date: 2018-12-02 16:23:26 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-22 16:32:20
 */

import * as types from '../type';

export const getAll = (lat, long) => ({
  type: types.nearMe.TYPE,
  lat,
  long,
});

export const getAllSuccess = itemList => ({
  type: types.nearMe.SUCCESS,
  itemList,
});

export const getAllFail = error => ({
  type: types.nearMe.FAILURE,
  error,
});
