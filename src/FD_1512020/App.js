/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
/* eslint-disable */
import React, { PureComponent } from "react";
import { Dimensions, Text, Image, View } from "react-native";
import { Router, Scene, Stack, ActionConst, Actions, Tabs } from "react-native-router-flux";

import LoginScreen from "./src/cpn/LoginScreen/LoginScreen";
import MerchanListScreen from "./src/cpn/MerchantList/MerchanListScreen";
import MerchantDetailsScreen from "./src/cpn/Merchant/MerchantDetailsScreen";
import BasketScreen from "./src/cpn/Basket/BasketScreen";
import Splash from "./src/cpn/Splash/SplashScreen";
import CategoryListScreen from "./src/cpn/CategoryList/CategoryListScreen";
import UserScreen from './src/cpn/UserScreen/UserScreen';

import DeliveryButton from './src/cpn/NavBar/DeliveryButton';
import Color from './src/assets/color/color';

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


export default class App extends PureComponent {
  render() {
    const { height, width } = Dimensions.get("window");

    return (
      <Router>
        <Scene key="root" hideNavBar="true">
          <Scene key="splash" component={() => <Splash />} initial />
          <Scene key="auth" hideNavBar="true">
            <Scene
              key="signin"
              component={() => <LoginScreen type="signin" />}
              title="Sign In"
              initial
            />
            <Scene
              key="signup"
              component={() => <LoginScreen type="signup" />}
              title="Sign Up"
            />
            <Scene
              key="forgotpassword"
              component={() => <LoginScreen type="forgotpassword" />}
              title="Forgot Password"
            />
          </Scene>
          <Tabs key="main"
            onBack={() => {
              init = "true"
            }}
            navigationBarStyle={{
              backgroundColor: Color.AColor.main,
            }}
            titleStyle={{
              color: 'white'
            }}
            tabStyle={{
              backgroundColor: Color.PColor.pico_8_pink(0.8),
            }}
            showLabel={false}
            tabBarPosition='bottom'
          >
            <Scene
              key="merchantlist"
              component={() => <MerchanListScreen />}
              title="Merchant List"
              onBack={() => {
                console.log('back')
                Actions.refresh()
              }}
              renderTitle={<DeliveryButton location='' />}
              iconUri={storeUri}
              iconTintUri={storeTintUri}
              icon={TabIcon}
            />
            <Scene
              key="categorylist"
              component={() => <CategoryListScreen />}
              title="Category"
              renderTitle={<DeliveryButton location='' />}
              iconUri={categoryUri}
              iconTintUri={categoryTintUri}
              icon={TabIcon}
            />
            <Scene
              key="userscreen"
              component={() => <UserScreen />}
              title="Forgot Password"
              iconUri={userUri}
              iconTintUri={userTintUri}
              icon={TabIcon}
            />
          </Tabs>
        </Scene>
      </Router>
    );
  }
}
/* eslint-disable */
