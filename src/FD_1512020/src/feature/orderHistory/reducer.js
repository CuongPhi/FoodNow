/*
 * @Author: An Nguyen 
 * @Date: 2019-01-02 22:11:02 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2019-01-06 14:41:25
 */
import _ from 'lodash';
import * as types from '../type';

const init = {
  list: [],
  loading: false,
  loadDetail: false,
};

export default function orderHistory(prevState = init, action) {
  switch (action.type) {
    case types.orderHistory.TYPE:
      return { loading: true, list: [] };
    case types.orderHistory.SUCCESS:
      return { loading: false, list: action.res };
    case types.orderHistory.FAILURE:
      return { loading: false, list: [] };
    case types.orderDetail.TYPE:
      return { ...prevState, loadDetail: true };
    case types.orderDetail.SUCCESS: {
      const restaurant = Object.assign(
        _.get(action, 'res.restaurant.restaurant', {}),
        _.get(action, 'res.restaurant.address', {})
      );
      const detailList = _.filter(
        _.values(
          _.merge(
            _.keyBy(_.get(action, 'res.restaurant.menu', []), 'id'),
            _.keyBy(_.get(action, 'res.order.details', []), 'idFood')
          )
        ),
        o => o.quantity
      );
      return {
        ...prevState,
        detail: _.get(action, 'res.order.order', {}),
        detailList,
        restaurant,
        loadDetail: false,
      };
    }
    case types.orderDetail.FAILURE:
      return {
        ...prevState,
        loadDetail: false,
        loadDetailErr: true,
      };
    default:
      return prevState;
  }
}
