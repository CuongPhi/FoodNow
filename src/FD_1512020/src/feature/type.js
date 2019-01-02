/*
 * @Author: An Nguyen 
 * @Date: 2018-12-16 17:32:03 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2019-01-02 02:34:41
 */
const SIGN_IN = 'SIGN_IN';
const SIGN_UP = 'SIGN_UP';
const S = '_SUCCESS';
const F = '_FAILURE';
const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
const NETWORK = 'NETWORK';
const MERCHANT_LIST = 'MERCHANT_LIST';
const MERCHANT_SEARCH = 'MERCHANT_SEARCH';
const USER_INFO = 'USER_INFO';
const DISTRICT = 'DISTRICT';
const WARD = 'WARD';
const UPDATE_INFO = 'UPDATE_INFO';
const UPDATE_AVATAR = 'UPDATE_AVATAR';
const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
const CATEGORY = 'CATEGORY';
const NEARME = 'NEARME';
const MERCHANT = 'MERCHANT';
const NOTIFICATION = 'NOTIFICATION';
const LOAD_COMMENT = 'LOAD_COMMENT';
const LOAD_ALL_COMMENT = 'LOAD_ALL_COMMENT';
const POST_COMMENT = 'POST_COMMENT';
const POST_ORDER = 'POST_ORDER';
export const PUSH_ITEM_LIST = 'PUSH_ITEM_LIST';
export const REMOVE_ITEM_LIST = 'REMOVE_ITEM_LIST';

const type = name => ({
  TYPE: name,
  SUCCESS: name + S,
  FAILURE: name + F,
});

export const signIn = type(SIGN_IN);
export const signUp = type(SIGN_UP);
export const forgotPassword = type(FORGOT_PASSWORD);
export const network = type(NETWORK);
export const merchantList = type(MERCHANT_LIST);
export const merchantSearch = type(MERCHANT_SEARCH);
export const userInfo = type(USER_INFO);
export const district = type(DISTRICT);
export const ward = type(WARD);
export const updateInfo = type(UPDATE_INFO);
export const updateAvatar = type(UPDATE_AVATAR);
export const updatePass = type(UPDATE_PASSWORD);
export const signOut = 'SIGN_OUT';
export const category = type(CATEGORY);
export const restaurantRefresh = 'RES_REFRESH';
export const nearMe = type(NEARME);
export const notif = type(NOTIFICATION);
export const merchant = type(MERCHANT);
export const loadCmt = type(LOAD_COMMENT);
export const loadAllCmt = type(LOAD_ALL_COMMENT);
export const postCmt = type(POST_COMMENT);
export const postOrder = type(POST_ORDER);
export const changeInfo = {
  USERNAME: 'changeInfoUSERNAME',
  EMAIL: 'changeInfoEMAIL',
  PHONE: 'changeInfoPHONE',
  DISTRICT: 'changeInfoDISTRICT',
  WARD: 'changeInfoWARD',
  STREET: 'changeInfoSTREET',
};
