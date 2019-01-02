/*
 * @Author: An Nguyen 
 * @Date: 2018-12-17 01:22:11 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2019-01-01 23:44:47
 */
import * as types from '../type';

const initState = {
  district: [],
  ward: [],
  loading: false,
};

export default function address(prevState = initState, action) {
  console.log(action);
  switch (action.type) {
    case types.district.TYPE:
      return { ...prevState, loading: true };
    case types.district.SUCCESS:
      return { district: action.res, ward: [], loading: false };
    case types.district.FAILURE:
      return { district: [], ward: [], loading: false };
    case types.ward.TYPE:
      return { ...prevState, ward: [], loading: true };
    case types.ward.SUCCESS:
      return { ...prevState, ward: action.res, loading: false };
    case types.ward.FAILURE:
      return { ...prevState, ward: [], loading: false };
    default:
      return prevState;
  }
}
