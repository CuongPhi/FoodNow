/*
 * @Author: An Nguyen 
 * @Date: 2018-11-04 14:57:19 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-30 19:20:20
 */
import React, { PureComponent } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CustomInput from '../../CommonCpn/CustomInput';
import CustomButton from '../../CommonCpn/CustomButton';
import * as StringUtils from '../../../ultilies/StringUtils';
import * as Dialog from '../../Modal/Dialog';
import * as ApiActions from '../../../feature/signIn/action';

const styles = StyleSheet.create({
  main: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  inputLayout: {
    marginVertical: 20,
    width: '80%',
  },
  input: {
    height: 50,
  },
  text: {
    color: '#2d3436',
  },
  textLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});
class SignIn extends PureComponent {
  constructor(props) {
    super(props);
    this.username = undefined;
    this.password = undefined;
    this.button = undefined;
    this.errorDialog = undefined;
    this.signin = this.signin.bind(this);
  }

  componentDidUpdate() {
    const { apiSignIn } = this.props;
    if (apiSignIn.loading) {
      this.button.disable();
    } else {
      this.button.enable();
    }
    // if (apiSignIn.error) {
    //   this.errorDialog.setMessage(`${apiSignIn.error.data.msg} (HTTP:${apiSignIn.error.status})`);
    //   this.errorDialog.show();
    // }
    if (apiSignIn.login) {
      Actions.replace('main');
    }
  }

  signin() {
    const { actions } = this.props;
    if (!this.username || !this.password) return;
    const email = this.username.getValue();
    const pass = this.password.getValue();
    if (StringUtils.isEmptyOrNull(email)) {
      this.errorDialog.setMessage('Empty Email');
      this.errorDialog.show();
      return;
    }
    if (!StringUtils.validateEmail(email)) {
      this.errorDialog.setMessage('Wrong Email');
      this.errorDialog.show();
      return;
    }
    if (StringUtils.isEmptyOrNull(pass)) {
      this.errorDialog.setMessage('Empty Password');
      this.errorDialog.show();
      return;
    }
    Keyboard.dismiss();
    actions.signIn(email, pass);
  }

  render() {
    const { main, inputLayout, input, text, textLayout } = styles;
    const { style, loading } = this.props;
    return (
      <View style={[main, style]}>
        <View style={inputLayout}>
          <CustomInput
            ref={x => {
              this.username = x;
            }}
            style={input}
            icon="envelope-square"
            placeholder="Email"
            textContentType="emailAddress"
            onChangeText={t => {
              if (StringUtils.isEmptyOrNull(t)) return true;
              return StringUtils.validateEmail(t);
            }}
            onSubmitEditing={() => {
              if (this.password) this.password.focus();
            }}
          />
        </View>

        <View style={inputLayout}>
          <CustomInput
            ref={x => {
              this.password = x;
            }}
            style={input}
            icon="key"
            placeholder="Password"
            secureTextEntry
            onChangeText={t => {
              if (StringUtils.isEmptyOrNull(t)) return true;
              return true;
            }}
            onSubmitEditing={() => {
              if (this.button) this.button.props.onPress();
            }}
          />
        </View>

        <CustomButton
          onPress={this.signin}
          ref={x => {
            this.button = x;
          }}
          disabled={loading}
          style={[inputLayout, input]}
          text="Sign in"
        />

        <View style={textLayout}>
          <TouchableOpacity onPress={() => Actions.signup()}>
            <Text style={text}>Create new account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Actions.forgotpassword()}>
            <Text style={text}>Need help?</Text>
          </TouchableOpacity>
        </View>
        <Dialog.ErrorDialog
          ref={x => {
            this.errorDialog = x;
          }}
          title="Error"
          message="Unknown Error"
          doneTitle="OK"
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  apiSignIn: state.signIn,
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ApiActions, dispatch),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
