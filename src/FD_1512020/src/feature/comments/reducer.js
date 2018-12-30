/*
 * @Author: An Nguyen 
 * @Date: 2018-12-30 10:00:43 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-30 16:31:58
 */
import _ from 'lodash';
import * as types from '../type';

const init = {
  loading: false,
  cmts: [],
  sending: false,
};

export default function comments(prevState = init, action) {
  switch (action.type) {
    case types.loadAllCmt.TYPE:
      return { loading: true, cmts: [] };
    case types.loadAllCmt.SUCCESS:
      return { loading: false, cmts: _.get(action, 'data.result', []) };
    case types.loadAllCmt.FAILURE:
      return { loading: false, cmts: [] };
    case types.postCmt.TYPE:
      return { ...prevState, sending: true };
    case types.postCmt.SUCCESS:
      return { ...prevState, sending: false, msg: action.msg, send: true };
    case types.postCmt.FAILURE:
    default:
      return { prevState };
  }
}
