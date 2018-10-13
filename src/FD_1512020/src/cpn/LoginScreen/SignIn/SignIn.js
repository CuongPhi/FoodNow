import React, { PureComponent } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
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
  constructor(props) {
    super(props);
    this.username = undefined;
    this.password = undefined;
    this.signin = this.signin.bind(this);
  }

  signin() {
    console.log('Press');
    if (!this.username || !this.password) return;
    const email = this.username.getValue();
    const pass = this.password.getValue();
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
    }
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
            Alert.alert('Successfully', response.data.msg, [
              { text: 'OK', onPress: () => console.log('Main Screen') },
            ]);
          } catch (error) {
            Alert.alert('Successfully', '', [
              { text: 'OK', onPress: () => console.log('Main Screen') },
            ]);
          }
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
            secureTextEntry
            onChangeText={t => {
              if (StringUtils.isEmptyOrNull(t)) return true;
              return true;
            }}
          />
        </View>

        <CustomButton onPress={this.signin} style={[inputLayout, input]} text="Sign in" />

        <View style={textLayout}>
          <TouchableOpacity onPress={() => Actions.signup()}>
            <Text style={text}>Create new account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Actions.forgotpassword()}>
            <Text style={text}>Need help?</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
