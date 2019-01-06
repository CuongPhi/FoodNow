/*
 * @Author: An Nguyen 
 * @Date: 2018-12-20 01:12:13 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2019-01-06 18:35:19
 */
import * as types from '../type';

export const category = () => ({ type: types.category.TYPE });
export const categorySuccess = res => ({ type: types.category.SUCCESS, res });
export const categoryFail = () => ({ type: types.category.FAILURE });
export const getFood = item => ({ type: types.getFood.TYPE, item });
export const getFoodSuccess = res => ({ type: types.getFood.SUCCESS, res });
export const getFoodFail = err => ({ type: types.getFood.FAILURE, err });
export const removeCat = item => ({ type: types.REMOVE_CATE, item });
