/*
 * @Author: An Nguyen 
 * @Date: 2018-11-04 18:24:54 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-11-04 18:38:37
 */
import * as types from './type';

const initialState = {
  isConnected: false,
};
export default function info(prevState = initialState, action) {
  switch (action.type) {
    case types.NET_CONNTECTION:
      return { ...prevState, isConnected: action.isConnected };
    default:
      return prevState;
  }
}
