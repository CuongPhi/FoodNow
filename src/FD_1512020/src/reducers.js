/*
 * @Author: An Nguyen 
 * @Date: 2018-11-05 01:02:39 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-11-05 01:03:01
 */
import { combineReducers } from 'redux';
import apiSignIn from './feature/apiSignIn/reducers';
import info from './feature/info/reducer';

const rootReducers = combineReducers({
  apiSignIn,
  info,
});
export default rootReducers;
