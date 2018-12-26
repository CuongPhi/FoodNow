/*
 * @Author: An Nguyen 
 * @Date: 2018-12-20 01:12:13 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-20 01:17:27
 */
import * as types from '../type';

export const category = () => ({ type: types.category.TYPE });
export const categorySuccess = res => ({ type: types.category.SUCCESS, res });
export const categoryFail = () => ({ type: types.category.FAILURE });
