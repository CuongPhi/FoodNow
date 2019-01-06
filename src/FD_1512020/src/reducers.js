/*
 * @Author: An Nguyen 
 * @Date: 2018-11-05 01:02:39 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2019-01-02 22:15:21
 */
import { combineReducers } from 'redux';
import info from './feature/info/reducer';
import merchantlist from './feature/merchantlist/reducer';
import userInfo from './feature/userinfo/reducer';
import address from './feature/address/reducer';
import signIn from './feature/signIn/reducer';
import updateInfo from './feature/updateInfo/reducer';
import updatePass from './feature/updatepass/reducer';
import category from './feature/category/reducer';
import nearMe from './feature/nearme/reducer';
import notifs from './feature/notifations/reducer';
import merchant from './feature/merchant/reducer';
import comments from './feature/comments/reducer';
import order from './feature/order/reducer';
import orderHistory from './feature/orderHistory/reducer';

const rootReducers = combineReducers({
  signIn,
  info,
  merchantlist,
  userInfo,
  address,
  updateInfo,
  updatePass,
  category,
  nearMe,
  notifs,
  merchant,
  comments,
  order,
  orderHistory,
});
export default rootReducers;
