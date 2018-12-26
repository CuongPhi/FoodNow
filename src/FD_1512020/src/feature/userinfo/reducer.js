/*
 * @Author: An Nguyen 
 * @Date: 2018-12-14 01:32:53 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-18 23:54:33
 */
import * as types from '../type';

const initialState = {
  loading: false,
  email: '',
  district: [],
};

export default function userInfo(prevState = initialState, action) {
  const { address } = prevState;
  switch (action.type) {
    case types.userInfo.TYPE:
      return { loading: true };
    case types.userInfo.SUCCESS:
      return { ...action.res, loading: false };
    case types.userInfo.FAILURE:
      return { loading: false };
    case types.changeInfo.EMAIL:
      return { ...prevState, email: action.value };
    case types.changeInfo.USERNAME:
      return { ...prevState, userName: action.value };
    case types.changeInfo.PHONE:
      return { ...prevState, phone: action.value };
    case types.changeInfo.STREET: {
      const add = address;
      if (add) {
        add.street = action.value;
        return { ...prevState, address: add };
      }
      return { prevState };
    }
    case types.changeInfo.DISTRICT: {
      const add = address;
      if (add) {
        add.idDistrict = action.value;
        add.idWard = '';
        return { ...prevState, address: add };
      }
      return { prevState };
    }
    case types.changeInfo.WARD: {
      const add = address;
      if (add) {
        add.idWard = action.value;
        return { ...prevState, address: add };
      }
      return { prevState };
    }
    default:
      return prevState;
  }
}
