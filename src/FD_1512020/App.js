/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { ScrollView, View, Dimensions } from 'react-native';
import SignInScreen from './src/cpn/SignIn/SignInScreen'
import SignUpScreen from './src/cpn/SignUp/SignUpScreen'
import ForgotPasswordScreen from './src/cpn/ForgotPassword/ForgotPasswordScreen'
import MerchanListScreen from './src/cpn/MerchantList/MerchanListScreen'
export default class App extends Component {

  render() {
    var { height, width } = Dimensions.get('window');

    return (
      <MerchanListScreen/>
      // <ScrollView
      // >
      //   <View style={{height:height}}>
      //     <SignInScreen />
      //   </View>
      //   <View style={{height:height}}>
      //     <SignUpScreen />
      //   </View>
      //   <View style={{height:height}}>
      //     <ForgotPasswordScreen />
      //   </View>
      // </ScrollView>
    );
  }
}


