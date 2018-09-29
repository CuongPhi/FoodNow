/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { ScrollView, View, Dimensions } from 'react-native';
import { Router, Scene } from 'react-native-router-flux'

import LoginScreen from './src/cpn/LoginScreen/LoginScreen';
import SignInScreen from './src/cpn/SignIn/SignInScreen'
import SignUpScreen from './src/cpn/SignUp/SignUpScreen'
import ForgotPasswordScreen from './src/cpn/ForgotPassword/ForgotPasswordScreen'
import MerchanListScreen from './src/cpn/MerchantList/MerchanListScreen'
import MerchantDetailsScreen from './src/cpn/Merchant/MerchantDetailsScreen'
import BasketScreen from './src/cpn/Basket/BasketScreen'

export default class App extends Component {

  render() {
    var { height, width } = Dimensions.get('window');

    return (
      <Router>
        <Scene key='root' hideNavBar='true'>
          <Scene key='signin' component={()=><LoginScreen type='signin'/>} title='Sign In' initial />
          <Scene key='signup' component={()=><LoginScreen type='signup'/>} title='Sign Up'/>
          <Scene key='forgotpassword' component={()=><LoginScreen type='forgotpassword'/>} title='Forgot Password'/>
        </Scene>
      </Router>
    );
  }
}


