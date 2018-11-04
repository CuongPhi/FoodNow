/*
 * @Author: An Nguyen 
 * @Date: 2018-11-04 17:22:02 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-11-04 18:15:16
 */
/* eslint-disable */
import React, { PureComponent } from "react";
import { Dimensions, Text, Image, View, NetInfo } from "react-native";
import { Router, Scene, Stack, ActionConst, Actions, Tabs } from "react-native-router-flux";
import { Provider, connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LoginScreen from "./src/cpn/LoginScreen/LoginScreen";
import MerchanListScreen from "./src/cpn/MerchantList/MerchanListScreen";
import MerchantDetailsScreen from "./src/cpn/Merchant/MerchantDetailsScreen";
import BasketScreen from "./src/cpn/Basket/BasketScreen";
import Splash from "./src/cpn/Splash/SplashScreen";
import CategoryListScreen from "./src/cpn/CategoryList/CategoryListScreen";
import UserScreen from './src/cpn/UserScreen/UserScreen';

import * as Dialog from './src/cpn/Modal/Dialog'
import DeliveryButton from './src/cpn/NavBar/DeliveryButton';
import Color from './src/assets/color/color';

import store from './src/store';

import BaseApp from './src/app'

const storeUri = require('./src/assets/image/store.png');
const storeTintUri = require('./src/assets/image/store_disable.png')
const categoryUri = require('./src/assets/image/category.png');
const categoryTintUri = require('./src/assets/image/category_disable.png');
const userUri = require('./src/assets/image/user.png');
const userTintUri = require('./src/assets/image/user_disable.png');

function TabIcon(props) {
  const { focused, iconUri, iconTintUri } = props
  return (
    <View
      style={focused ? {
        height: '100%',
        aspectRatio: 1,
        backgroundColor: 'white',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
      } : {}}
    >
      <Image
        source={focused ? iconUri : iconTintUri}
        style={{ width: 22, height: 25, }}
      />
    </View>
  );
}

const ConnectedRouter = connect()(Router)


export default class App extends PureComponent {
  render() {
     return (
      <Provider store={store} >
        <BaseApp />
      </Provider>
    );
  }
}
/* eslint-disable */
