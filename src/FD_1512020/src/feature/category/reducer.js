/*
 * @Author: An Nguyen 
 * @Date: 2018-12-20 01:06:56 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-20 01:11:55
 */
import _ from 'lodash';
import * as types from '../type';

const initialState = {
  loading: false,
  category: [],
};
// const getItemList = (pre, now) => _.union(pre, now);

export default function category(prevState = initialState, action) {
  switch (action.type) {
    case types.category.TYPE:
      return { ...prevState, loading: true };
    case types.category.SUCCESS:
      return { ...prevState, loading: false, category: action.res };
    case types.category.FAILURE:
      return { ...prevState, loading: false };
    default:
      return prevState;
  }
}
