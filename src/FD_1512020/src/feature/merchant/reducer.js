/*
 * @Author: An Nguyen 
 * @Date: 2018-12-26 22:02:51 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-30 16:47:51
 */
import _ from 'lodash';
import * as types from '../type';

const init = {
  loading: false,
  firstCmt: [],
};

export default function merchant(prevState = init, action) {
  switch (action.type) {
    case types.merchant.TYPE:
      return { loading: true, firstCmt: [] };
    case types.merchant.SUCCESS: {
      const data = _.get(action, 'data');
      return { loading: false, data, ...prevState };
    }
    case types.merchant.FAILURE:
      return { loading: false, ...prevState };
    case types.loadCmt.TYPE:
    case types.loadCmt.FAILURE:
      return { ...prevState, firstCmt: [] };
    case types.loadCmt.SUCCESS:
      return { ...prevState, firstCmt: _.get(action, 'data.result', []) };
    default:
      return prevState;
  }
}
