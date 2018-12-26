/*
 * @Author: An Nguyen 
 * @Date: 2018-12-02 16:17:25 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-22 17:50:50
 */
import _ from 'lodash';
import * as types from '../type';

const initialState = {
  loading: false,
  itemList: [],
  searchList: [],
  query: '',
  page: 1,
  count: 7,
  error: false,
};
const getItemList = (pre, now) => _.union(pre, now);

export default function merchantlist(prevState = initialState, action) {
  switch (action.type) {
    case types.restaurantRefresh:
      return {
        page: 1,
        itemList: [],
        searchList: [],
      };
    case types.merchantList.TYPE:
      return { ...prevState, loading: true, count: action.count, query: '' };
    case types.merchantList.SUCCESS: {
      return {
        ...prevState,
        loading: false,
        itemList: getItemList(_.get(prevState, 'itemList', []), _.get(action, 'itemList.data', [])),
        page: action.itemList.next_page,
      };
    }
    case types.merchantList.FAILURE:
      return { ...prevState, loading: false, error: true };
    case types.merchantSearch.TYPE:
      return { ...prevState, loading: true, query: action.query };
    case types.merchantSearch.SUCCESS:
      return { ...prevState, loading: false, searchList: action.itemList };
    case types.merchantSearch.FAILURE:
      return { ...prevState, loading: false, error: true };
    default:
      return prevState;
  }
}
