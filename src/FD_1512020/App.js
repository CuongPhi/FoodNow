/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
/* eslint-disable */
import React, { PureComponent } from "react";
import { Dimensions } from "react-native";
import { Router, Scene, Stack, ActionConst, Actions } from "react-native-router-flux";

import LoginScreen from "./src/cpn/LoginScreen/LoginScreen";
import MerchanListScreen from "./src/cpn/MerchantList/MerchanListScreen";
import MerchantDetailsScreen from "./src/cpn/Merchant/MerchantDetailsScreen";
import BasketScreen from "./src/cpn/Basket/BasketScreen";
import Splash from "./src/cpn/Splash/SplashScreen";

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
          <Scene key="main" hideNavBar="true" onBack={() => {
            init = "true"
          }}>
            <Scene
              key="merchantlist"
              component={() => <MerchanListScreen />}
              title="Merchant List"
              onBack={() => {
                console.log('back')
                Actions.refresh()
              }}
            />
          </Scene>
        </Scene>
      </Router>
    );
  }
}
/* eslint-disable */
