/*
 * @Author: An Nguyen 
 * @Date: 2018-12-17 01:28:23 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2019-01-01 23:41:16
 */
import * as type from '../type';

export const getDistrict = () => ({
  type: type.district.TYPE,
});

export const getDistrictSuccess = res => ({
  type: type.district.SUCCESS,
  res,
});

export const getDistrictFail = err => ({
  type: type.district.FAILURE,
  err,
});

export const getWard = (id, getFromState) => ({
  type: type.ward.TYPE,
  id,
  getFromState,
});

export const getWardSuccess = res => ({
  type: type.ward.SUCCESS,
  res,
});

export const getWardFail = err => ({
  type: type.ward.FAILURE,
  err,
});
