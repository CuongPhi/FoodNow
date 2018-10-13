import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import CustomInput from '../../CommonCpn/CustomInput';
import CustomButton from '../../CommonCpn/CustomButton';
import * as StringUtils from '../../../Utils/StringUtils';

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
    this.register = this.register.bind(this);
  }

  register() {
    if (!this.username || !this.password || !this.repassword) return;
    const email = this.username.getValue();
    const pass = this.password.getValue();
    const repass = this.repassword.getValue();
    if (StringUtils.isEmptyOrNull(email)) {
      Alert.alert('Error', 'Empty Email');
      return;
    }
    if (!StringUtils.validateEmail(email)) {
      Alert.alert('Error', 'Wrong Email');
      return;
    }
    if (StringUtils.isEmptyOrNull(pass)) {
      Alert.alert('Error', 'Empty Password');
      return;
    }
    if (repass !== pass) {
      Alert.alert('Error', 'Repassword and Password are not match');
    }

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
          Alert.alert('Successfully', '', [{ text: 'OK', onPress: () => Actions.pop() }]);
        }
      })
      .catch(error => {
        try {
          Alert.alert('Error', `${error.response.data.msg} (HTTP:${error.response.status})`);
        } catch (e) {
          Alert.alert('Error', `Unknown Error`);
        }
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

        <CustomButton style={[inputLayout, input]} text="Sign up" onPress={this.register} />
        <View style={textLayout}>
          <TouchableOpacity onPress={() => Actions.signin()}>
            <Text style={text}>Have an account already?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Actions.forgotpassword()}>
            <Text style={text}>Need help?</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
