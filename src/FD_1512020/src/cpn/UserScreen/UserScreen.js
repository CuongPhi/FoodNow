import React, { PureComponent } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import UserDialog from './UserDialog';
import UserForm from './UserForm';
import Color from '../../assets/color/color';
import * as Dialog from '../Modal/Dialog';
import * as actions from '../../feature/updatepass/action';
import * as signInActions from '../../feature/signIn/action';

const background = require('../../assets/image/FD_background.jpg');

const style = StyleSheet.create({
  main: {
    flex: 1,
  },
});

class UserScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.handleChangePassDialog = this.handleChangePassDialog.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidUpdate() {
    const { updatePass, signIn } = this.props;
    if (updatePass.success && this.succesDialog) {
      this.succesDialog.show();
      return;
    }
    if (updatePass.error && this.errorDialog) {
      this.errorDialog.show();
    }
    if (signIn.signOut) {
      Actions.splash();
    }
  }

  handleChangePassDialog() {
    const { actions: ac } = this.props;
    this.updateDialog.show(text => {
      if (text.length > 0) ac.updatePass(text);
    });
  }

  handleLogout() {
    const { signInActions: siAc, signIn } = this.props;
    if (signIn.token.length === 0) {
      return;
    }
    Alert.alert(
      'Logout',
      'Do you want to logout ?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          onPress: () => {
            siAc.signOut();
          },
        },
      ],
      { cancelable: false }
    );
  }

  render() {
    const { main } = style;
    const { signIn } = this.props;
    const isShowButton = signIn.token && signIn.token.length > 0;
    return (
      <ImageBackground source={background} style={main} blurRadius={0.3}>
        <Header
          barStyle="light-content"
          placement="left"
          outerContainerStyles={{ zIndex: 3, backgroundColor: Color.AColor.main }}
          centerComponent={{ text: 'PROFILE', style: { color: '#fff' } }}
          rightComponent={
            isShowButton ? (
              <TouchableOpacity onPress={this.handleChangePassDialog}>
                <Icon type="font-awesome" name="key" color="#fff" />
              </TouchableOpacity>
            ) : null
          }
          leftComponent={
            isShowButton ? (
              <TouchableOpacity onPress={this.handleLogout}>
                <Icon type="font-awesome" name="user-circle" color="#fff" />
              </TouchableOpacity>
            ) : null
          }
        />
        {signIn.token && signIn.token.length > 0 ? (
          <UserForm style={{ zIndex: 0 }} />
        ) : (
          <UserDialog />
        )}
        <Dialog.ChangePasswordDialog
          ref={x => {
            this.updateDialog = x;
          }}
        />
        <Dialog.SuccessDialog
          ref={x => {
            this.succesDialog = x;
          }}
          title="Success"
          message="Password Updated"
          doneTitle="OK"
        />
        <Dialog.ErrorDialog
          ref={x => {
            this.errorDialog = x;
          }}
          title="Error"
          message="Unknown Error"
          doneTitle="OK"
        />
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  signIn: state.signIn,
  updatePass: state.updatePass,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  signInActions: bindActionCreators(signInActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserScreen);
