/*
 * @Author: An Nguyen 
 * @Date: 2018-11-04 17:22:02 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-23 17:25:05
 */
/* eslint-disable */
import "rxjs";
import React, { PureComponent } from "react";
import { Dimensions, Text, Image, View, NetInfo } from "react-native";
import {
  Router,
  Scene,
  Stack,
  ActionConst,
  Actions,
  Tabs
} from "react-native-router-flux";
import { Provider, connect } from "react-redux";
import { bindActionCreators } from "redux";
import { PersistGate } from "redux-persist/lib/integration/react";
var PushNotification = require('react-native-push-notification');


import LoginScreen from "./src/cpn/LoginScreen/LoginScreen";
import MerchanListScreen from "./src/cpn/MerchantList/MerchanListScreen";
import MerchantDetailsScreen from "./src/cpn/Merchant/MerchantDetailsScreen";
import BasketScreen from "./src/cpn/Basket/BasketScreen";
import Splash from "./src/cpn/Splash/SplashScreen";
import CategoryListScreen from "./src/cpn/CategoryList/CategoryListScreen";
import UserScreen from "./src/cpn/UserScreen/UserScreen";

import * as Dialog from "./src/cpn/Modal/Dialog";
import DeliveryButton from "./src/cpn/NavBar/DeliveryButton";
import Color from "./src/assets/color/color";

import store, { persistor } from "./src/store";

import BaseApp from "./src/app";
import SplashScreen from "./src/cpn/Splash/SplashScreen";

const storeUri = require("./src/assets/image/store.png");
const storeTintUri = require("./src/assets/image/store_disable.png");
const categoryUri = require("./src/assets/image/category.png");
const categoryTintUri = require("./src/assets/image/category_disable.png");
const userUri = require("./src/assets/image/user.png");
const userTintUri = require("./src/assets/image/user_disable.png");

function TabIcon(props) {
  const { focused, iconUri, iconTintUri } = props;
  return (
    <View
      style={
        focused
          ? {
              height: "100%",
              aspectRatio: 1,
              backgroundColor: "white",
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center"
            }
          : {}
      }
    >
      <Image
        source={focused ? iconUri : iconTintUri}
        style={{ width: 22, height: 25 }}
      />
    </View>
  );
}

const ConnectedRouter = connect()(Router);

PushNotification.configure({
  onRegister: function(token) {
      console.log( 'TOKEN:', token );
  },
  onNotification: function(notification) {
      console.log( 'NOTIFICATION:', notification );
  },
  permissions: {
      alert: true,
      badge: true,
      sound: true
  },
  popInitialNotification: true,
  requestPermissions: true,
});

export default class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<SplashScreen />} persistor={persistor}>
          <BaseApp />
        </PersistGate>
      </Provider>
    );
  }
}
/* eslint-disable */
