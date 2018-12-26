/*
 * @Author: An Nguyen 
 * @Date: 2018-12-22 16:27:53 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-22 17:48:16
 */
import _ from 'lodash';
import * as types from '../type';

const init = {
  loading: false,
  itemList: [],
};
export default function nearMe(prevState = init, action) {
  switch (action.type) {
    case types.nearMe.TYPE:
      return { loading: true, ...prevState };
    case types.nearMe.SUCCESS:
      return { loading: false, itemList: action.itemList };
    case types.nearMe.FAILURE:
      return { loading: false, itemList: [] };
    default:
      return prevState;
  }
}
