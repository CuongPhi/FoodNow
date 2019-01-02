/*
 * @Author: An Nguyen 
 * @Date: 2018-12-31 16:50:00 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2019-01-02 02:39:34
 */
import * as types from '../type';

export const addNewItem = payload => ({
  type: types.PUSH_ITEM_LIST,
  payload,
});

export const removeItem = payload => ({
  type: types.REMOVE_ITEM_LIST,
  payload,
});

export const postOrder = payload => ({
  type: types.postOrder.TYPE,
  payload,
});

export const postOrderSuccess = res => ({
  type: types.postOrder.SUCCESS,
  res,
});

export const postOrderFail = err => ({
  type: types.postOrder.FAILURE,
  err,
});
