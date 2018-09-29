import React, { PureComponent } from 'react';
import { View, ImageBackground, StyleSheet, Image } from 'react-native';
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';
import ForgotPassword from './ForgotPassword/ForgotPassword';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brand: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  brandWrapper: {
    flex: 1,
    width: '80%',
  },
  inputLayout: {
    marginVertical: 20,
    width: '80%',
  },
  input: {
    height: 50,
  },
});
export default class LoginScreen extends PureComponent {
  renderTypeView(params) {
    switch (params) {
      case 'signup':
        return <SignUp style={{ flex: 3 }} switch={this.handle} />;
      case 'signin':
        return <SignIn style={{ flex: 1 }} switch={this.handle} />;
      case 'forgotpassword':
        return <ForgotPassword style={{ flex: 1 }} />;
      default:
        return <View />;
    }
  }

  render() {
    const { main, brand, brandWrapper } = styles;
    const { type } = this.props;
    return (
      <ImageBackground
        source={require('../../assets/image/FD_background.jpg')}
        style={main}
        blurRadius={0.5}
      >
        <View style={brandWrapper}>
          <Image source={require('../../assets/image/logo.png')} style={brand} />
        </View>
        {this.renderTypeView(type)}
      </ImageBackground>
    );
  }
}
