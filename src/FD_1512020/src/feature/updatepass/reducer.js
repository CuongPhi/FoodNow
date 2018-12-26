/*
 * @Author: An Nguyen 
 * @Date: 2018-12-14 01:32:53 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-19 23:46:26
 */
import * as types from '../type';

const initialState = {
  loading: false,
};

export default function updatePass(prevState = initialState, action) {
  switch (action.type) {
    case types.updatePass.TYPE:
      return { loading: true };
    case types.updatePass.SUCCESS:
      return { loading: true, success: true };
    case types.updatePass.FAILURE:
      return { loading: true, success: false };
    default:
      return prevState;
  }
}
