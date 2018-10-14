import React, { PureComponent } from 'react';
import { View, ImageBackground, StyleSheet, Image, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

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
export default class Spash extends PureComponent {
  componentDidMount() {
    AsyncStorage.getItem('@Token')
      .then(value => {
        console.log(value);
        if (value !== null) {
          setTimeout(() => {
            Actions.reset('main');
          }, 300);
        } else {
          setTimeout(() => {
            Actions.reset('auth');
          }, 300);
        }
      })
      .catch(err => {
        console.log(err);
        setTimeout(() => {
          Actions.reset('auth');
        }, 300);
      });
  }

  render() {
    console.log('render');
    const { main, brand, brandWrapper } = styles;
    return (
      <ImageBackground
        source={require('../../assets/image/FD_background.jpg')}
        style={main}
        blurRadius={0.5}
      >
        <View style={brandWrapper}>
          <Image source={require('../../assets/image/logo.png')} style={brand} />
        </View>
      </ImageBackground>
    );
  }
}
