/*
 * @Author: An Nguyen 
 * @Date: 2018-12-20 01:06:56 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2019-01-06 18:50:01
 */
import _ from 'lodash';
import * as types from '../type';

const initialState = {
  loading: false,
  category: [],
  foodMap: new Map(),
  foodList: [],
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
    case types.getFood.SUCCESS: {
      const list = _.get(action, 'res.res', []);
      const id = _.get(action, 'res.item.id');
      const { foodList, foodMap } = prevState;
      if (id) {
        const l = _.union(foodList, list);
        foodMap.set(id, list);
        return { ...prevState, foodList: l, foodMap };
      }
      return { ...prevState };
    }
    case types.REMOVE_CATE: {
      const id = _.get(action, 'item.id');
      const { foodMap, foodList } = prevState;
      if (id) {
        let l = [];
        const list = foodMap.get(id) || [];
        foodMap.delete(id);
        l = _.difference(foodList, list);
        return { ...prevState, foodList: l, foodMap };
      }
      return { ...prevState };
    }
    default:
      return prevState;
  }
}
