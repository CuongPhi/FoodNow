/*
 * @Author: An Nguyen 
 * @Date: 2018-12-02 16:23:26 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-26 22:08:08
 */

import * as types from '../type';

export const getAll = count => ({
  type: types.merchantList.TYPE,
  count,
});

export const getAllSuccess = itemList => ({
  type: types.merchantList.SUCCESS,
  itemList,
});

export const getAllFail = error => ({
  type: types.merchantList.FAILURE,
  error,
});

export const search = query => ({
  type: types.merchantSearch.TYPE,
  query,
});

export const searchSuccess = itemList => ({
  type: types.merchantSearch.SUCCESS,
  itemList,
});

export const searchFail = error => ({
  type: types.merchantSearch.FAILURE,
  error,
});

export const refresh = () => ({
  type: types.restaurantRefresh,
});
