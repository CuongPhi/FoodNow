/*
 * @Author: An Nguyen 
 * @Date: 2018-12-02 15:29:48 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-02 16:02:14
 */
import * as types from '../type';

export const netConnection = isConnected => ({
  type: types.network.TYPE,
  isConnected,
});
