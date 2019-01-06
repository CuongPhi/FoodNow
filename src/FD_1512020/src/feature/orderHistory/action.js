/*
 * @Author: An Nguyen 
 * @Date: 2019-01-02 22:09:17 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2019-01-02 23:41:03
 */
import * as types from '../type';

export const getAll = () => ({
  type: types.orderHistory.TYPE,
});

export const getAllSuccess = res => ({
  type: types.orderHistory.SUCCESS,
  res,
});

export const getAllFail = err => ({
  type: types.orderHistory.FAILURE,
  err,
});

export const getDetail = id => ({
  type: types.orderDetail.TYPE,
  id,
});

export const getDetailSuccess = res => ({
  type: types.orderDetail.SUCCESS,
  res,
});

export const getDetailFail = err => ({
  type: types.orderDetail.FAILURE,
  err,
});
