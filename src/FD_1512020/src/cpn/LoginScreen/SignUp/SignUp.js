import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import CustomInput from '../../CommonCpn/CustomInput';
import CustomButton from '../../CommonCpn/CustomButton';
import * as StringUtils from '../../../Utils/StringUtils';
import * as Dialog from '../../Modal/Dialog';

const styles = StyleSheet.create({
  main: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  inputLayout: {
    marginVertical: 10,
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

export default class SignUp extends PureComponent {
  constructor(props) {
    super(props);
    this.username = undefined;
    this.password = undefined;
    this.repassword = undefined;
    this.succesDialog = undefined;
    this.button = undefined;
    this.errorDialog = undefined;
    this.register = this.register.bind(this);
  }

  register() {
    if (!this.username || !this.password || !this.repassword) return;
    const email = this.username.getValue();
    const pass = this.password.getValue();
    const repass = this.repassword.getValue();
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
    if (repass !== pass) {
      this.errorDialog.setMessage('Repassword and Password are not match');
      this.errorDialog.show();
      return;
    }

    this.button.disable();
    Keyboard.dismiss();
    axios({
      url: 'https://food-delivery-server.herokuapp.com/register',
      method: 'post',
      data: {
        email,
        password: pass,
      },
    })
      .then(response => {
        if (response.status === 200) {
          this.succesDialog.show(() => {
            this.button.enable();
          });
        }
      })
      .catch(error => {
        try {
          this.errorDialog.setMessage(`${error.response.data.msg} (HTTP:${error.response.status})`);
          this.errorDialog.show(() => this.button.enable());
        } catch (e) {
          this.errorDialog.show(() => this.button.enable());
        }
        this.button.enable();
      });
  }

  render() {
    const { main, inputLayout, input, text, textLayout } = styles;
    const { style } = this.props;
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
            secureTextEntry={!false}
            onChangeText={t => {
              if (StringUtils.isEmptyOrNull(t)) return true;
              return true;
            }}
            onSubmitEditing={() => {
              if (this.repassword) this.repassword.focus();
            }}
          />
        </View>

        <View style={inputLayout}>
          <CustomInput
            ref={x => {
              this.repassword = x;
            }}
            style={input}
            icon="key"
            placeholder="Re-Password"
            secureTextEntry={!false}
            onChangeText={t => {
              if (StringUtils.isEmptyOrNull(t)) return true;
              if (!this.password || t !== this.password.getValue()) return false;
              return true;
            }}
          />
        </View>

        <CustomButton
          style={[inputLayout, input]}
          text="Sign up"
          onPress={this.register}
          ref={x => {
            this.button = x;
          }}
        />
        <View style={textLayout}>
          <TouchableOpacity onPress={() => Actions.signin()}>
            <Text style={text}>Have an account already?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Actions.forgotpassword()}>
            <Text style={text}>Need help?</Text>
          </TouchableOpacity>
        </View>
        <Dialog.SuccessDialog
          ref={x => {
            this.succesDialog = x;
          }}
          title="Success"
          message="Please verify your email (3 minutes left)"
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
      </View>
    );
  }
}
