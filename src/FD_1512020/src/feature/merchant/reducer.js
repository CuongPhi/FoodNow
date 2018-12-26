/*
 * @Author: An Nguyen 
 * @Date: 2018-12-26 22:02:51 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-26 22:49:01
 */
import * as types from '../type';

const init = {
  loading: false,
};

export default function merchant(prevState = init, action) {
  console.log(action);
  switch (action.type) {
    case types.merchant.TYPE:
      return { loading: true };
    case types.merchant.SUCCESS:
      return { loading: false, data: action.data };
    case types.merchant.FAILURE:
      return { loading: false };
    default:
      return prevState;
  }
}
