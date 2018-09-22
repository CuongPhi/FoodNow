/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import SignInScreen from './src/cpn/SignIn/SignInScreen'
import SignUpScreen from './src/cpn/SignUp/SignUpScreen'
import ForgotPasswordScreen from './src/cpn/ForgotPassword/ForgotPasswordScreen'

export default class App extends Component {
  render() {
    return (
      <ForgotPasswordScreen/>
    );
  }
}


