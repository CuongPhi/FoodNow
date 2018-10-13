import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
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
    backgroundColor: 'rgba(255,255,255,0.6)',
    padding: 10,
    borderRadius: 10,
  },
});
export default class ForgotPassword extends PureComponent {
  constructor(props) {
    super(props);
    this.username = undefined;
    this.resend = this.resend.bind(this);
  }

  resend() {
    if (!this.username) return;
    const email = this.username.getValue();

    if (StringUtils.isEmptyOrNull(email)) {
      Alert.alert('Error', 'Empty Email');
      return;
    }
    if (!StringUtils.validateEmail(email)) {
      Alert.alert('Error', 'Wrong Email');
    }
    console.log('send');
    axios({
      url: 'https://food-delivery-server.herokuapp.com/forgetPassword',
      method: 'post',
      data: {
        email,
      },
    })
      .then(response => {
        if (response.status === 200) {
          if (response.status === 200) {
            try {
              Alert.alert('Successfully', response.data.msg, [
                { text: 'OK', onPress: () => Actions.signin() },
              ]);
            } catch (error) {
              Alert.alert('Successfully', '', [{ text: 'OK', onPress: () => Actions.signin() }]);
            }
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
        <View style={textLayout}>
          <Text textAlign="justify" style={text}>
            {`Please enter your email address and we'll send you an email to reset your password`}
          </Text>
        </View>
        <View style={inputLayout}>
          <CustomInput
            ref={x => {
              this.username = x;
            }}
            style={input}
            icon="envelope-square"
            placeholder="Email"
            onChangeText={t => {
              if (StringUtils.isEmptyOrNull(t)) return true;
              return true;
            }}
          />
        </View>
        <CustomButton onPress={this.resend} style={[inputLayout, input]} text="Reset Password" />
      </View>
    );
  }
}
