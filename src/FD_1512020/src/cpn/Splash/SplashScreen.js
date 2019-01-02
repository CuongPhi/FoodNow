/*
 * @Author: An Nguyen 
 * @Date: 2018-11-05 01:02:47 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-30 22:12:47
 */
import React, { PureComponent } from 'react';
import { View, ImageBackground, StyleSheet, Image, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import * as InfoActions from '../../feature/info/action';
import * as InfoActions from '../../feature/signIn/action';

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
class Spash extends PureComponent {
  componentDidMount() {
    setTimeout(() => {
      Actions.reset('main');
    }, 300);
  }

  componentDidUpdate() {
    Actions.reset('main');
  }

  render() {
    const { main, brand, brandWrapper } = styles;
    return (
      <ImageBackground
        source={require('../../assets/image/FD_background.jpg')}
        style={main}
        blurRadius={0.5}
      >
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        <View style={brandWrapper}>
          <Image source={require('../../assets/image/logo.png')} style={brand} />
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  info: state.info,
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(InfoActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Spash);
