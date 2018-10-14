import React, { PureComponent } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Keyboard, AsyncStorage } from 'react-native';
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
export default class SignIn extends PureComponent {
  static async storeData(key, item) {
    try {
      await AsyncStorage.setItem(key, item);
    } catch (error) {
      console.log(error);
    }
  }

  constructor(props) {
    super(props);
    this.username = undefined;
    this.password = undefined;
    this.button = undefined;
    this.errorDialog = undefined;
    this.signin = this.signin.bind(this);
  }

  signin() {
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
    this.button.disable();
    Keyboard.dismiss();
    axios({
      url: 'https://food-delivery-server.herokuapp.com/login',
      method: 'post',
      data: {
        email,
        password: pass,
      },
    })
      .then(response => {
        if (response.status === 200) {
          try {
            console.log(response.data);
            SignIn.storeData('@Token', response.data.token);
          } catch (error) {
            console.log(error);
          }
          Actions.main();
        }
      })
      .catch(error => {
        try {
          this.errorDialog.setMessage(`${error.response.data.msg} (HTTP:${error.response.status})`);
          this.errorDialog.show();
        } catch (e) {
          this.errorDialog.show();
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
          disabled={false}
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
