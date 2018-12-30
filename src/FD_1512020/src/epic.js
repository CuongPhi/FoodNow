import { combineEpics } from 'redux-observable';
import { getAllMerchantEpic, searchMerchantEpic, refreshAll } from './feature/merchantlist/epic';
import getUserInfo from './feature/userinfo/epic';
import { getDistrict, getWard } from './feature/address/epic';
import signInEpic from './feature/signIn/epic';
import { updateInfoEpic, updateAvatar } from './feature/updateInfo/epic';
import updatePassword from './feature/updatepass/epic';
import categoryEpic from './feature/category/epic';
import getNearMeEpic from './feature/nearme/epic';
import loadNotifEpic from './feature/notifations/epic';
import getMerchantEpic from './feature/merchant/epic';
import { getAllCmtEpic, sendCmtEpic } from './feature/comments/epic';

export default combineEpics(
  getAllMerchantEpic,
  searchMerchantEpic,
  getUserInfo,
  signInEpic,
  getDistrict,
  getWard,
  updateInfoEpic,
  updateAvatar,
  updatePassword,
  categoryEpic,
  refreshAll,
  getNearMeEpic,
  loadNotifEpic,
  getMerchantEpic,
  getAllCmtEpic,
  sendCmtEpic
);
