/*
 * @Author: An Nguyen 
 * @Date: 2018-12-18 01:26:04 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-19 01:01:50
 */
import * as types from '../type';

const initialState = {
  loading: false,
  success: false,
};

export default function updateInfo(prevState = initialState, action) {
  switch (action.type) {
    case types.updateInfo.TYPE:
      return { ...prevState, loading: true };
    case types.updateInfo.SUCCESS:
      return { ...prevState, loading: false, success: true };
    case types.updateInfo.FAILURE:
      return { ...prevState, loading: false, success: false };
    case types.updateAvatar.TYPE:
      return { ...prevState, loading: true };
    case types.updateAvatar.SUCCESS:
      return { ...prevState, loading: false, success: true };
    case types.updateAvatar.FAILURE:
      return { ...prevState, loading: false, success: false };
    default:
      return prevState;
  }
}
